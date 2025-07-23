import React from 'react';

import './index.scss';
import { useTranslation } from 'react-i18next';
import { PreferencesContext } from '@/context/PreferencesContext';

type ButtonProps = {
  toggleModal: () => void;
};

const Button: React.FC<ButtonProps> = ({ toggleModal }) => {
  const { t } = useTranslation();

  return (
    <div className="btn" onClick={toggleModal}>
      {t('katalog')}
      <img src="/assets/icons/burger.svg" alt="Burger" className="btn__image" />
    </div>
  );
};

export default Button;
