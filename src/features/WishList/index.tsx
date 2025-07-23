import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import WishListHeader from './Components/WishlistHeader';
import WishListContent from './Components/WishListContent';

const Wishlist = () => {
  return (
    <>
      <Header />
      <WishListHeader />
      <WishListContent />
      <Footer />
    </>
  );
};

export default Wishlist;
