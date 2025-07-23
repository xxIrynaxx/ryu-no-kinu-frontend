import React from 'react';
import './index.scss';
import { Link, useParams } from 'react-router-dom';
import { Product } from '@/types';
import { addToCart, addToWishList } from '@/gateways';
import { PreferencesContext } from '@/context/PreferencesContext';
import { useTranslation } from 'react-i18next';

const ProductInfo: React.FC = () => {
  const { lang } = React.useContext(PreferencesContext);
  const { t } = useTranslation();
  const { id } = useParams();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = React.useState<string>('');

  React.useEffect(() => {
    if (!id) return;
    fetch(`ryu-no-kinu-back-production.up.railway.app/api/products/${id}?lang=${lang}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error('Error fetching product:', err));
  }, [id, lang]);

  const getAverageRating = () => {
    if (!product?.reviews?.length) return 0;
    const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round(sum / product.reviews.length);
  };

  const renderStars = () => {
    const rating = getAverageRating();
    return Array.from({ length: 5 }).map((_, i) => (
      <img
        key={i}
        src={`/assets/icons/${i < rating ? 'star_active' : 'star_notactive'}.svg`}
        alt="rating"
        className="product__rate-item"
      />
    ));
  };

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert(t('login-request'));
        return;
      }

      await addToWishList(product?.id || '', token);
      alert(t('wishlist-added'));
    } catch (err) {
      console.error('Wishlist error:', err);
      alert(t('wishlist-error'));
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert(t('select-size'));
      return;
    }
    try {
      await addToCart(product?.id || '', selectedSize);
      alert(t('cart-added'));
    } catch (err) {
      console.error('Cart error:', err);
      alert(t('cart-error'));
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  if (!product) return <div>{t('loading')}</div>;

  return (
    <div className="product">
      <Link to="/">
        <h2 className="product__to-products">{t('back-to-products')}</h2>
      </Link>

      <div className="product__tabs">
        <div className="product__character active">{t('characteristics')}</div>
        <div className="product__review">{t('reviews')}</div>
      </div>

      <div className="product__card">
        <img src={product.photo[0]} alt={product.name} className="product__image" />
        <div className="product__text-block">
          <h2 className="product__title">{product.name}</h2>
          <p className="product__price">
            {product.discountPrice ? (
              <>
                <span className="old-price">{product.price.toFixed(2)} ₴</span>
                <span className="new-price">{product.discountPrice.toFixed(2)} ₴</span>
              </>
            ) : (
              <span>{product.price.toFixed(2)} ₴</span>
            )}
          </p>

          <div className="product__rate">{renderStars()}</div>
          <p className="product__country">
            {t('product-country')}: {t('char-value-country')}
          </p>
          <p className="product__number">
            {t('product-id')}: {product.id}
          </p>
          <p className="product__size-title">{t('size')}</p>

          <div className="product__sizes">
            {product.variants.map((v, i) => (
              <div
                key={i}
                className={`product__sizes-item ${selectedSize === v.size ? 'selected' : ''}`}
                onClick={() => handleSizeChange(v.size)}
              >
                {v.size}
              </div>
            ))}
          </div>

          <div className="product__buttons">
            <div className="btn" onClick={handleAddToCart}>
              {t('to-cart-btn')}
            </div>
            <div className="btn" onClick={handleAddToWishlist}>
              {t('add-to-wishlist')}
            </div>
            <Link to="/order">
              <div className="btn">{t('create-order')}</div>
            </Link>
          </div>
        </div>
      </div>

      <div className="char-block">
        <h2 className="char-block__title">{t('product-characteristics')}</h2>
        <div className="char-block__main">
          <ul className="char-block__name">
            <li className="char-block__value-item">{t('char-title')}</li>
            <li className="char-block__value-item">{t('char-country')}</li>
            <li className="char-block__value-item">{t('char-color')}</li>
            <li className="char-block__value-item">{t('char-fabric')}</li>
            <li className="char-block__value-item">{t('char-patterns')}</li>
            <li className="char-block__value-item">{t('char-type')}</li>
            <li className="char-block__value-item">{t('char-size')}</li>
          </ul>
          <ul className="char-block__value">
            <li className="char-block__value-item">{t('char-value-brand')}</li>
            <li className="char-block__value-item">{t('char-value-country')}</li>
            <li className="char-block__value-item">{t('char-value-color')}</li>
            <li className="char-block__value-item">{t('char-value-fabric')}</li>
            <li className="char-block__value-item">{t('char-value-pattern')}</li>
            <li className="char-block__value-item">{t('char-value-type')}</li>
            <li className="char-block__value-item">{t('char-value-size')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
