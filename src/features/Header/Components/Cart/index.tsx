import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { CartItem, Product } from '@/types';
import { useTranslation } from 'react-i18next';
import { PreferencesContext } from '@/context/PreferencesContext';

type CartProps = {
  toggleModalCart: () => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const Cart: React.FC<CartProps> = ({ toggleModalCart, cartItems, setCartItems }) => {
  const [cartItemsDetails, setCartItemsDetails] = React.useState<Product[]>([]);

  const { t } = useTranslation();
  const { lang } = React.useContext(PreferencesContext);

  React.useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      fetchCartItemsDetails(parsedCart);
    }
  }, []);

  const fetchCartItemsDetails = async (cart: CartItem[]) => {
    const response = await Promise.all(
      cart.map(item =>
        fetch(
          `ryu-no-kinu-back-production.up.railway.app/api/products/${item.productId}?lang=${lang}`,
        ),
      ),
    );
    const data = await Promise.all(response.map(res => res.json()));
    setCartItemsDetails(data);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, cartItem) => {
      const product = cartItemsDetails.find(p => p.id === cartItem.productId);
      if (!product) return total;
      const price = product.discountPrice ?? product.price;
      return total + price * cartItem.quantity;
    }, 0);
  };

  const handleQuantityChange = (productId: string, size: string, delta: number) => {
    const updated = cartItems.map(item =>
      item.productId === productId && item.size === size
        ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
        : item,
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleRemoveItem = (productId: string, size: string) => {
    const updated = cartItems.filter(item => !(item.productId === productId && item.size === size));
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setCartItemsDetails([]);
    localStorage.removeItem('cart');
  };

  return (
    <div className="overlay" onClick={toggleModalCart}>
      <div className="form-cart">
        <div className="form-cart__content" onClick={e => e.stopPropagation()}>
          <div className="form-cart__header">
            {t('cart')}
            <span className="cart-count">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          {cartItems.length === 0 || cartItemsDetails.length === 0 ? (
            <div className="empty-cart">{t('cart-empty')}</div>
          ) : (
            cartItems.map((cartItem, index) => {
              const product = cartItemsDetails.find(p => p.id === cartItem.productId);
              if (!product) return null;

              const price = product.discountPrice ?? product.price;

              return (
                <div key={index} className="cart-item">
                  <div className="cart-item__info">
                    <img src={product.photo[0]} alt={product.name} className="cart-item__image" />
                    <div className="cart-item__text-block">
                      <div className="cart-item__name">{product.name}</div>
                      <div className="cart-item__details">
                        <span>{`${t('size')} ${cartItem.size}`}</span>
                        <div className="cart-item__quantity">
                          <button
                            onClick={() =>
                              handleQuantityChange(cartItem.productId, cartItem.size, -1)
                            }
                          >
                            -
                          </button>
                          <span>{cartItem.quantity}</span>
                          <button
                            onClick={() =>
                              handleQuantityChange(cartItem.productId, cartItem.size, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <span className="cart-item__price">
                          {`${lang === 'en' ? `${((price / 48.04) * cartItem.quantity).toFixed(2)}€` : `${(price * cartItem.quantity).toFixed(2)}₴`}`}
                        </span>
                        <button
                          onClick={() => handleRemoveItem(cartItem.productId, cartItem.size)}
                          className="remove-item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          <div className="cart-footer">
            <div className="cart-footer__total">
              <span>{t('summary')}</span>
              <span className="total-price">
                {`${lang === 'en' ? `${(calculateTotal() / 48.04).toFixed(2)}€` : `${calculateTotal().toFixed(2)}₴`}`}
              </span>
            </div>
            <button className="delete-cart" onClick={handleClearCart}>
              {t('delete_products')}
            </button>
            <Link to="/order">
              <button className="checkout-button primary">{t('create-order')}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
