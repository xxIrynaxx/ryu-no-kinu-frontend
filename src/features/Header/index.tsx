import React from 'react';
import SearchBar from './Components/SearchBar';
import Logo from './Components/Logo';
import Button from './Components/Button';
import UserPanel from './Components/UserPanel';

import './index.scss';
import Form from './Components/Form';
import ModalCategory from './Components/ModalCategory';
import Cart from './Components/Cart';
import { CartItem } from '@/types';
import { PreferencesContext } from '@/context/PreferencesContext';

const Header = () => {
  const [isAutorized, setIsAutorized] = React.useState<boolean>(false);
  const [isVisibleForm, setIsVisibleForm] = React.useState<boolean>(false);
  const [isLoginMode, setIsLogin] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');

  const [isVisisbleModalCategory, setIsVisibleModalCategory] = React.useState<boolean>(false);
  const [isVisibleCart, setIsVisibleCart] = React.useState<boolean>(false);

  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAutorized(true);
    }

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleVisibleForm = () => {
    setIsVisibleForm(!isVisibleForm);
  };

  const handleAuthSuccess = () => {
    setIsAutorized(true);
    setIsVisibleForm(false);
  };

  const switchToRegister = () => {
    setIsLogin(false);
    setError('');
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setError('');
  };

  const toggleModalCategory = () => {
    setIsVisibleModalCategory(!isVisisbleModalCategory);
  };

  const toggleModalCart = () => {
    setIsVisibleCart(!isVisibleCart);
  };

  return (
    <header className={`header header_dark`}>
      <Logo />
      <SearchBar />
      <Button toggleModal={toggleModalCategory} />
      {isVisisbleModalCategory && <ModalCategory toggleModal={toggleModalCategory} />}
      <UserPanel
        isAutorized={isAutorized}
        toggleForm={toggleVisibleForm}
        toggleModalCart={toggleModalCart}
        cartItems={cartItems}
      />
      {!isAutorized && isVisibleForm && (
        <Form
          toggleForm={toggleVisibleForm}
          onAuthSuccess={handleAuthSuccess}
          switchToRegister={switchToRegister}
          switchToLogin={switchToLogin}
          setError={setError}
          error={error}
          isLoginMode={isLoginMode}
        />
      )}
      {isVisibleCart && (
        <Cart toggleModalCart={toggleModalCart} cartItems={cartItems} setCartItems={setCartItems} />
      )}
    </header>
  );
};

export default Header;
