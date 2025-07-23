import React from 'react';

import './index.scss';
import { Link } from 'react-router-dom';

const WishListHeader = () => {
  return (
    <div className="wishlist-header">
      <Link to="/">
        <h2 className="wishlist-header__home">&larr; До головної</h2>
      </Link>
      <div className="wishlist-header__block">
        <h2 className="wishlist-header__title">Вішліст</h2>
        <ul className="wishlist-header__tabs">
          <li className={`wishlist-header__item active`}>Збережені товари</li>
        </ul>
      </div>
    </div>
  );
};

export default WishListHeader;
