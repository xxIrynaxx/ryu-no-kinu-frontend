import React from 'react';

import './index.scss';
import { Product } from '@/types';
import { PreferencesContext } from '@/context/PreferencesContext';
import { useTranslation } from 'react-i18next';

const Novelties = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const { t } = useTranslation();
  const { lang } = React.useContext(PreferencesContext);

  React.useEffect(() => {
    fetch(`ryu-no-kinu-back-production.up.railway.app/api/products/latest?lang=${lang}`)
      .then(res => {
        if (!res.ok) throw new Error('Ошибка загрузки товаров');
        return res.json();
      })
      .then(data => {
        console.log(data);
        setProducts(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % products.length);
    }, 12000);

    return () => clearInterval(interval);
  }, [products]);

  const selectSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (products.length === 0) {
    return <div>{t('load-novel')}</div>;
  }

  const product = products[currentIndex];

  return (
    <section className={`novelties novelties_dark`}>
      <h2 className={`novelties__header_dark`}>{t('novelties')}</h2>
      <div className="novelties__content">
        <div className="novelties__block">
          <img
            src={
              product.photo && product.photo.length > 0
                ? product.photo[0]
                : '/assets/images/tovar.png'
            }
            alt={product.name}
            className="novelties__img"
          />
          <div className={`novelties__bg_dark`}></div>
        </div>

        <div className="novelties__text-block">
          <div className={`novelties__title_dark`}>{product.name}</div>
          <p className={`novelties__description_dark`}>{product.description}</p>

          <p className={`novelties__size-title_dark`}>{t('size')}</p>
          <div className="novelties__sizes">
            {product.variants && product.variants.length > 0
              ? product.variants.map((variant, idx) => (
                  <div key={idx} className={`novelties__sizes-item_dark`}>
                    {variant.size}
                  </div>
                ))
              : ''}
          </div>

          <div className="novelties__price-block">
            <p className={`novelties__price-title_dark`}>{t('price')}</p>
            {product.discountPrice && (
              <>
                <div className={`novelties__price-discount_dark`}>
                  {lang === 'ua' ? `${product.price}₴` : `${(product.price / 48.04).toFixed(2)}€`}
                </div>
                <div className={`novelties__price_dark`}>
                  {lang === 'ua'
                    ? `${product.discountPrice.toFixed(2)}₴`
                    : `${(product.discountPrice / 48.04).toFixed(2)}€`}
                </div>
              </>
            )}
            {!product.discountPrice && (
              <div className={`novelties__price_dark`}>
                {lang === 'ua' ? `${product.price}₴` : `${(product.price / 48.04).toFixed(2)}€`}
              </div>
            )}
          </div>

          <div className="novelties__buttons">
            <div className={`btn_dark`}>
              {t('to-cart-btn')}
              <img src="/assets/icons/cart.png" alt="Cart" className="btn__image" />
            </div>
            <div className={`btn_dark`}>{t('to-product-btn')}</div>
          </div>
        </div>
      </div>

      <div className="novelties__dots">
        {products.map((_, idx) => (
          <div
            key={idx}
            className={
              idx === currentIndex
                ? `novelties__dot_active novelties__dot_active_dark}`
                : 'novelties__dot'
            }
            onClick={() => selectSlide(idx)}
            style={{ cursor: 'pointer' }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Novelties;
