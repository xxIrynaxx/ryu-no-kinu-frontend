import React from 'react';

import './index.scss';
import { useTranslation } from 'react-i18next';

const Orders = () => {
  const { t } = useTranslation();
  return (
    <div className="my-orders">
      <h2 className="my-orders__title">{t('my-order')}</h2>
      <div className="my-orders__block">
        <div className="my-orders-empty">{t('order-is-empty')}</div>
      </div>
    </div>
  );
};

export default Orders;
