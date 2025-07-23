import React from 'react';

import './index.scss';
import { Link } from 'react-router-dom';
import { User } from '@/types';
import moment from 'moment';

type ProfileDataProps = {
  user: User | null;
  handleLogout: () => void;
};

const ProfileData: React.FC<ProfileDataProps> = ({ handleLogout, user }) => {
  return (
    <div className="my-profile">
      <h2 className="my-profile__title">Мій акаунт</h2>
      <div className="my-profile__social-data">
        <img
          className="my-profile__image"
          src={
            user?.avatar
              ? user.avatar.startsWith('http://') || user.avatar.startsWith('https://')
                ? user.avatar
                : `https://ryu-no-kinu-back-production.up.railway.app${user.avatar}`
              : ''
          }
          alt=""
        />
        <p className="my-profile__name">{user?.username || ''}</p>
      </div>
      <h2 className="my-profile__personal-data">Персональні дані</h2>
      <div className="my-profile__email">
        <p className="my-profile__email-title">Ім'я користувача</p>
        <input type="text" value={user?.username} className="my-profile__email-field" readOnly />
      </div>
      <div className="my-profile__email">
        <p className="my-profile__email-title">Емейл</p>
        <input type="text" value={user?.email} className="my-profile__email-field" readOnly />
      </div>
      <div className="my-profile__email">
        <p className="my-profile__email-title">Мова</p>
        <input
          type="text"
          value={user?.lang == 'en' ? 'Англійська' : 'Українська'}
          className="my-profile__email-field"
          readOnly
        />
      </div>
      <div className="my-profile__email">
        <p className="my-profile__email-title">Акаунт створений</p>
        <input
          type="text"
          value={moment(user?.createdAt).format('DD.MM.YYYY HH:mm:ss')}
          className="my-profile__email-field"
          readOnly
        />
      </div>
      <h2 className="my-profile__logout">Вихід з акаунту</h2>
      <Link to="/">
        <button className="my-profile__logout-btn" onClick={handleLogout}>
          Вийти
        </button>
      </Link>
    </div>
  );
};

export default ProfileData;
