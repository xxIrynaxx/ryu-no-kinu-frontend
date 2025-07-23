import React from 'react';
import './index.scss';
import { Product } from '@/types';
import { Link } from 'react-router-dom';

const WishListContent = () => {
  const [wishlistItemsDetails, setWishlistItemsDetails] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        const lang = localStorage.getItem('lang') || 'uk';

        const res = await fetch(
          `ryu-no-kinu-back-production.up.railway.app/api/users/me/products?lang=${lang}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) throw new Error('Не вдалося отримати список обраного');

        const data = await res.json();
        setWishlistItemsDetails(data.wishlistProduct || []);
      } catch (error) {
        console.error('Помилка завантаження обраного:', error);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveItem = async (productId: string) => {
    try {
      const token = localStorage.getItem('token');

      await fetch(`ryu-no-kinu-back-production.up.railway.app/api/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlistItemsDetails(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Помилка видалення з обраного:', error);
    }
  };

  if (wishlistItemsDetails.length === 0) {
    return <div className="wishlist-empty">Список обраного порожній</div>;
  }

  return (
    <div className="wishlist-content">
      <div className="wishlist-content__block">
        {wishlistItemsDetails.map(product => {
          const avgRating = product.reviews?.length
            ? Math.round(
                product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length,
              )
            : 0;

          return (
            <div key={product.id} className="wishlist-content__item-wrapper">
              <div className="wishlist-content__item">
                <Link
                  to={`/product/${product.id}`}
                  className="wishlist__link"
                  style={{ display: 'flex', flex: 1 }}
                >
                  <img
                    src={product.photo[0]}
                    alt={product.name}
                    className="wishlist-content__image"
                  />

                  <div className="wishlist-content__text-block">
                    <h3 className="wishlist-content__name">{product.name}</h3>

                    <div className="wishlist-content__rate">
                      {[...Array(5)].map((_, i) => (
                        <img
                          key={i}
                          src={`/assets/icons/${i < avgRating ? 'star_active' : 'star_notactive'}.svg`}
                          alt="rating"
                          className="wishlist-content__rate-item"
                        />
                      ))}
                    </div>

                    <p className="wishlist-content__description">{product.description}</p>
                  </div>
                </Link>

                <div className="wishlist-content__price-wish">
                  <div className="wishlist-content__price">
                    {product.discountPrice ? (
                      <>
                        <span className="old-price">{product.price.toFixed(2)} ₴</span>{' '}
                        <span className="new-price">{product.discountPrice.toFixed(2)} ₴</span>
                      </>
                    ) : (
                      <span>{product.price.toFixed(2)} ₴</span>
                    )}
                  </div>
                  <img
                    src="/assets/icons/wishlist_active.svg"
                    alt="Видалити"
                    className="wishlist-content__price-img"
                    onClick={() => handleRemoveItem(product.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishListContent;
