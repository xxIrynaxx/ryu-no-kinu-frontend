import React from 'react';

import './index.scss';
import { ActiveSection, User } from '@/types';
import Orders from '../Orders';
import Settings from '../Settings';
import { Link } from 'react-router-dom';
import ProfileData from '../ProfileData';
import { fetchUserProfile } from '@/gateways';
import { PreferencesContext } from '@/context/PreferencesContext';
import { useTranslation } from 'react-i18next';

const UserProfile = () => {
  const { setLang } = React.useContext(PreferencesContext);
  const [activeSection, setActiveSection] = React.useState<ActiveSection>(
    () => (localStorage.getItem('activeSection') as ActiveSection) || 'profile',
  );
  const [isAutorized, setIsAutorized] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<User | null>(null);

  const fetchUserData = React.useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetchUserProfile(token)
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        console.error(error);
        setUserData(null);
      });
  }, []);

  React.useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAutorized(false);
    setLang('en');
  };

  React.useEffect(() => {
    localStorage.setItem('activeSection', activeSection);
  }, [activeSection]);

  const { t } = useTranslation();

  return (
    <>
      <div className="user-profile">
        <div className="user-profile__panel">
          <div className="user-profile__line"></div>
          <ul className="user-profile__list">
            <li>
              <button
                className={`user-profile__link ${activeSection === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveSection('profile')}
              >
                {t('my-acc')}
              </button>
            </li>
            <li>
              <button
                className={`user-profile__link ${activeSection === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveSection('orders')}
              >
                {t('my-order')}
              </button>
            </li>
            <li>
              <button
                className={`user-profile__link ${activeSection === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveSection('settings')}
              >
                {t('settings-title')}
              </button>
            </li>
            <Link to="/" className="user-profile__link">
              {t('on-main')}
            </Link>
          </ul>
        </div>
        {activeSection === 'profile' ? (
          <ProfileData user={userData} handleLogout={handleLogout} />
        ) : activeSection == 'orders' ? (
          <Orders />
        ) : (
          <Settings user={userData} refreshUser={fetchUserData} />
        )}
      </div>
    </>
  );
};

export default UserProfile;
