import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/common.scss';
import './i18n';
import i18n from './i18n';

import MainPage from './layout/MainPage/MainPage';
import Profile from './features/Profile';
import Wishlist from './features/WishList';
import OrderPage from './features/OrderPage';
import Products from './features/Products';
import Product from './features/Product';

import { PreferencesProvider } from './context/PreferencesContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/myprofile',
    element: <Profile />,
  },
  {
    path: '/wishlist',
    element: <Wishlist />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/products/:categoryId',
    element: <Products />,
  },
  {
    path: '/product/:id',
    element: <Product />,
  },
  {
    path: '/order',
    element: <OrderPage />,
  },
  {
    path: '*',
    element: <div>404 - Not Found</div>,
  },
]);

const App = () => {
  useEffect(() => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme.toLowerCase());
    }
  }, []);

  return (
    <PreferencesProvider>
      <div className="page">
        <RouterProvider router={router} />
      </div>
    </PreferencesProvider>
  );
};

export default App;
