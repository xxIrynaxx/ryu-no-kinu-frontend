import React from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';
import { PreferencesContext } from '@/context/PreferencesContext';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className={`footer footer_dark`}>
        <div className="footer__about">
          <p className={`footer__shop-title_dark`}>{t('about-shop')}</p>
          <ul className={`footer__list_dark`}>
            <li className="footer__list-item">{t('our-contacts')}</li>
            <li className="footer__list-item">{t('about-shop-art')}</li>
            <li className="footer__list-item">{t('career')}</li>
          </ul>
          <p className={`footer__location-title__dark`}>{t('location')}</p>
          <ul className={`footer__location-list_dark`}>
            <li className="footer__location-list-item">
              <a href="https://www.google.com/maps/place/%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%93%D0%BE%D0%B3%D0%BE%D0%BB%D1%8F,+16,+%D0%9E%D0%B4%D0%B5%D1%81%D0%B0,+%D0%9E%D0%B4%D0%B5%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+65000/data=!4m2!3m1!1s0x40c631bdc333d5bb:0x363eb3a4c2eeda5a?sa=X&ved=1t:242&ictx=111">
                {t('address')}
              </a>
            </li>

            <li className="footer__location-list-item">+ 380 (63) 765 82 82</li>
            <li className="footer__location-list-item">+ 380 (98) 464 46 55</li>
          </ul>
        </div>

        <div className="footer__help">
          <p className={`footer__help-title_dark`}>{t('help')}</p>
          <ul className={`footer__list_dark`}>
            <li className="footer__list-item">{t('about')}</li>
            <li className="footer__list-item">{t('product')}</li>
            <li className="footer__list-item">{t('discount')}</li>
            <li className="footer__list-item">{t('payment')}</li>
            <li className="footer__list-item">{t('delivery')}</li>
            <li className="footer__list-item">{t('returns')}</li>
            <li className="footer__list-item">{t('contact')}</li>
            <li className="footer__list-item">{t('user-agreement')}</li>
            <li className="footer__list-item">{t('privacy-policy')}</li>
          </ul>
        </div>

        <div className="footer__social">
          <p className={`footer__contact-title_dark`}>{t('contact-us')}</p>
          <a href="https://www.facebook.com/?locale=ru_RU" className="footer__links">
            <img src="/assets/icons/facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.viber.com/ru/" className="footer__links">
            <img src="/assets/icons/viber.png" alt="Viber" />
          </a>
          <a href="https://web.telegram.org" className="footer__links">
            <img src="/assets/icons/telegram.png" alt="Telegram" />
          </a>
          <a href="https://www.whatsapp.com/" className="footer__links">
            <img src="/assets/icons/whatsapp.png" alt="WhatsApp" />
          </a>
          <p className={`footer__social-title_dark`}>{t('social')}</p>
          <a href="https://www.instagram.com/" className="footer__links">
            <img src="/assets/icons/instagram.png" alt="Instagram" />
          </a>
          <a href="https://x.com/" className="footer__links">
            <img src="/assets/icons/twitter.png" alt="Twitter" />
          </a>
          <a href="www.youtube.com" className="footer__links">
            <img src="/assets/icons/youtube.png" alt="Youtube" />
          </a>
        </div>
      </div>
      <div className={`footer__annotation_dark`}>
        <p className={`footer__annotation-text_dark`}>@2025 Ryū no Kinu </p>
      </div>
    </footer>
  );
};

export default Footer;
