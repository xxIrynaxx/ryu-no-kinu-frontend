import React from 'react';
import './index.scss';
import { PreferencesContext } from '@/context/PreferencesContext';

const Logo = () => {
  return (
    <div className="logo">
      <img src="/assets/logo/darkLogo.svg" alt="Dark Samurai" className="logo__image" />
      <div className={`logo__title logo__title_dark`}>Ryū no Kinu</div>
    </div>
  );
};

export default Logo;
