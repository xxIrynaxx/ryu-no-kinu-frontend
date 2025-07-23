import React from 'react';
import './index.scss';
import { PreferencesContext } from '@/context/PreferencesContext';

const Avatar = () => {
  return (
    <div className="avatar">
      <div className={`avatar__red_dark`}></div>
      <div className={`avatar__orange_dark}`}></div>
      <img src="/assets/images/hero.png" alt="Avatar" className="avatar__hero" />
    </div>
  );
};

export default Avatar;
