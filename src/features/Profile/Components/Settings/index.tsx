import React from 'react';

import './index.scss';
import { Lang, Theme, User } from '@/types';
import { deleteUser, updateUserLang, updateUserProfile, updateUserTheme } from '@/gateways';
import LangToggle from './Components/Lang';
import ThemeToggle from './Components/Theme';
import { PreferencesContext } from '@/context/PreferencesContext';
import { useTranslation } from 'react-i18next';

type SettingsProps = {
  user: User | null;
  refreshUser: () => void;
};

const Settings: React.FC<SettingsProps> = ({ user, refreshUser }) => {
  const { t } = useTranslation();
  const { lang, setLang } = React.useContext(PreferencesContext);

  const [username, setUsername] = React.useState(user?.username || '');
  const [password, setPassword] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState(user?.avatar || '');
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    const formData = new FormData();
    formData.append('username', username);
    if (password) formData.append('password', password);
    if (avatarFile) {
      formData.append('avatarFile', avatarFile);
    } else if (avatarUrl) {
      formData.append('avatar', avatarUrl);
    }

    try {
      const result = await updateUserProfile(formData, token);
      refreshUser();
    } catch (error) {
      console.error('Помилка оновлення профілю', error);
    }
  };

  const handleLangChange = async (newLang: Lang) => {
    setLang(newLang);

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const data = await updateUserLang(newLang, token);
      refreshUser();
    } catch (error) {
      console.error('Не вдалося змінити мову', error);
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await deleteUser(token);
      setLang('en');
      localStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.error('Не вдалося видалити акаунт', error);
    }
  };

  return (
    <div className="my-settings">
      <h2 className="my-settings__title">{t('settings-title')}</h2>

      <div className="my-settings__block">
        <h3 className="my-settings__subtitle">{t('basic-info')}</h3>
        <form className="form" onSubmit={handleProfileSubmit}>
          <label className="avatar__file">{t('avatar-file')}</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setAvatarFile(e.target.files?.[0] || null)}
          />

          <label className="avatar__link">{t('avatar-link')}</label>
          <input
            className="avatar__input"
            type="text"
            onChange={e => setAvatarUrl(e.target.value)}
            value={avatarUrl}
            placeholder="https://example.com/avatar.jpg"
          />

          <label className="form__label">{t('username')}</label>
          <input
            name="username"
            value={username}
            type="text"
            className="form__input"
            onChange={e => setUsername(e.target.value)}
            placeholder={t('username-input')}
          />
          <label className="form__label">{t('password')}</label>
          <input
            name="password"
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
            className="form__input"
            placeholder={t('password')}
          />
          <button className="form__btn" type="submit">
            {t('change-btn')}
          </button>
        </form>
      </div>

      <div className="my-settings__block">
        <h3 className="my-settings__subtitle">{t('lang-int')}</h3>
        <div className="form">
          <label className="form__label">{t('choose-lang')}</label>
          <LangToggle lang={lang} onChange={handleLangChange} />
        </div>
      </div>

      <div className="my-settings__block delete-block">
        <h3 className="my-settings__subtitle">{t('delete-acc')}</h3>
        <p className="delete-block__warning">{t('warning-da')}</p>
        <button className="form__btn delete-btn" onClick={handleDeleteAccount}>
          {t('delete-acc-btn')}
        </button>
      </div>
    </div>
  );
};

export default Settings;
