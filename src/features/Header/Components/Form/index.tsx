import React, { useTransition } from 'react';

import './index.scss';
import { useTranslation } from 'react-i18next';

type FormProps = {
  toggleForm: () => void;
  onAuthSuccess: () => void;
  switchToRegister: () => void;
  switchToLogin: () => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  isLoginMode: boolean;
};
const Form: React.FC<FormProps> = ({
  toggleForm,
  onAuthSuccess,
  switchToLogin,
  switchToRegister,
  setError,
  error,
  isLoginMode,
}) => {
  const { t } = useTranslation();
  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const url = isLoginMode
      ? 'ryu-no-kinu-back-production.up.railway.app/api/auth/login'
      : 'ryu-no-kinu-back-production.up.railway.app/api/auth/register';

    const payload = isLoginMode ? { email, password } : { username, email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      const json = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(json.message || (isLoginMode ? 'Помилка входу' : 'Помилка реєстрації'));
      }

      const { token } = json;
      localStorage.setItem('token', token);
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="overlay">
      <div className="form-modal" onClick={toggleForm}>
        <div
          className={`form-modal__content ${isLoginMode ? 'login' : 'regis'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="form-modal__header">
            <div className="form-modal__tabs">
              <h2
                className={`form-modal__title ${isLoginMode ? 'active' : ''}`}
                onClick={switchToLogin}
              >
                {t('login')}
              </h2>
              <span className="form-modal__title">/</span>
              <h2
                className={`form-modal__title ${!isLoginMode ? 'active' : ''}`}
                onClick={switchToRegister}
              >
                {t('regis')}
              </h2>
            </div>
          </div>

          <div className="form-modal__container">
            <form className="form" onSubmit={handleSubmit}>
              {!isLoginMode && (
                <>
                  <label className="form__label">{t('username')}</label>
                  <input
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    type="text"
                    className="form__input"
                    placeholder={t('username-input')}
                  />
                </>
              )}

              <label className="form__label">{t('email')}</label>
              <input
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                className="form__input"
                placeholder={t('email-input')}
              />

              <label className="form__label">{t('password')}</label>
              <input
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                className="form__input"
                placeholder={t('password-input')}
              />

              {error && <p className="form__error">{error}</p>}

              <button className="form__button" type="submit">
                {isLoginMode ? `${t('login_btn')}` : `${t('regis_btn')}`}
              </button>
            </form>
            <div className="form-modal__avatar">
              <img
                src="/assets/images/regis_auth_girl.png"
                alt="Regis Auth Girl"
                className="form-modal__hero"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
