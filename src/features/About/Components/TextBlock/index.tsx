import React from 'react';
import { useTranslation } from 'react-i18next';
import './index.scss';
import { PreferencesContext } from '@/context/PreferencesContext';

const TextBlock = () => {
  const { t } = useTranslation();

  return (
    <div className="textblock">
      <h1 className={`textblock__title_dark`}>{t('about_textblock-title')}</h1>
      <p className={`textblock__quote_dark`}>{t('about_textblock-quote')}</p>
      <p className={`textblock__text_dark`}>{t('about_textblock-text')}</p>
    </div>
  );
};

export default TextBlock;
