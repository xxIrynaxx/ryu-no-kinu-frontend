import React from 'react';
import './index.scss';
import { useTranslation } from 'react-i18next';

const OrderForm = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="order">
      <form className="order-form">
        <h2 className="order-form__title">{t('order-form-title')}</h2>

        <div className="order-form__name">
          <label className="order-form__label">{t('first-name')}:</label>
          <input className="order-form__input" type="text" name="firstName" required />

          <label className="order-form__label">{t('last-name')}:</label>
          <input className="order-form__input" type="text" name="lastName" required />
        </div>

        <label className="order-form__label">{t('payment-type')}:</label>
        <select className="order-form__input" name="paymentMethod" required>
          <option value="">{t('choose-payment')}</option>
          <option value="card">{t('payment-card')}</option>
          <option value="cash">{t('payment-cash')}</option>
        </select>

        <label className="order-form__label">{t('delivery-address')}:</label>
        <input className="order-form__input" type="text" name="address" required />

        <label className="order-form__label">{t('delivery-method')}:</label>
        <select className="order-form__input" name="deliveryMethod" required>
          {lang === 'uk' ? (
            <>
              <option value="">{t('choose-delivery')}</option>
              <option value="nova_poshta">{t('nova-poshta')}</option>
              <option value="ukr_poshta">{t('ukr-poshta')}</option>
              <option value="self_pickup">{t('self-pickup')}</option>
            </>
          ) : (
            <>
              <option value="">{t('choose-delivery')}</option>
              <option value="dhl">{t('dhl-express')}</option>
              <option value="ups">{t('ups')}</option>
              <option value="eu_standard">{t('standard-eu')}</option>
              <option value="self_pickup">{t('self-pickup')}</option>
            </>
          )}
        </select>

        <button type="submit">{t('submit-order')}</button>
      </form>
    </div>
  );
};

export default OrderForm;
