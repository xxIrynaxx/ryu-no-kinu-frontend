import React from 'react';

import './index.scss';
import { ActiveAdminTab } from '@/types';
import { Link } from 'react-router-dom';
import ProfileData from '@/features/Profile/Components/ProfileData';
import Settings from '@/features/Profile/Components/Settings';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = React.useState<ActiveAdminTab>(
    () => (localStorage.getItem('ActiveAdminTab') as ActiveAdminTab) || 'profile',
  );

  const [isAutorized, setIsAutorized] = React.useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAutorized(false);
  };

  React.useEffect(() => {
    localStorage.setItem('ActiveAdminTab', activeSection);
  }, [activeSection]);

  return (
    <>
      <div className="admin-profile">
        <div className="admin-profile__panel">
          <div className="admin-profile__line"></div>
          <ul className="admin-profile__list">
            <li>
              <button
                className={`admin-profile__link ${activeSection === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveSection('profile')}
              >
                Мій акаунт
              </button>
            </li>

            <li>
              <button
                className={`admin-profile__link ${activeSection === 'user' ? 'active' : ''}`}
                onClick={() => setActiveSection('user')}
              >
                Робота з користувачами
              </button>
            </li>

            <li>
              <button
                className={`admin-profile__link ${activeSection === 'product' ? 'active' : ''}`}
                onClick={() => setActiveSection('product')}
              >
                Робота з товарами
              </button>
            </li>

            <li>
              <button
                className={`admin-profile__link ${activeSection === 'discount' ? 'active' : ''}`}
                onClick={() => setActiveSection('discount')}
              >
                Робота з акціями
              </button>
            </li>

            <li>
              <button
                className={`admin-profile__link ${activeSection === 'category' ? 'active' : ''}`}
                onClick={() => setActiveSection('category')}
              >
                Робота з категоріями
              </button>
            </li>

            <li>
              <button
                className={`admin-profile__link ${activeSection === 'style' ? 'active' : ''}`}
                onClick={() => setActiveSection('style')}
              >
                Робота з стилями
              </button>
            </li>

            <li>
              <button
                className={`admin-profile__link ${activeSection === 'type' ? 'active' : ''}`}
                onClick={() => setActiveSection('type')}
              >
                Робота з типами
              </button>
            </li>

            <li>
              <button
                className={`admin-profile__link ${activeSection === 'order' ? 'active' : ''}`}
                onClick={() => setActiveSection('order')}
              >
                Робота з замовленнями
              </button>
            </li>

            <li>
              <button
                className={`admin-profile__link ${activeSection === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveSection('settings')}
              >
                Налаштування
              </button>
            </li>
            <Link to="/" className="admin-profile__link">
              На головну
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
