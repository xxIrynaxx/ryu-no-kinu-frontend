import React, { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import './index.scss';
import { Product } from '@/types';
import { PreferencesContext } from '@/context/PreferencesContext';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 5;

const ProductListPage: React.FC = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [sortOption, setSortOption] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { lang } = React.useContext(PreferencesContext);
  const { t } = useTranslation();

  useEffect(() => {
    let url = '';

    if (searchQuery) {
      url = `https://ryu-no-kinu-back-production.up.railway.app/api/products/search?query=${encodeURIComponent(searchQuery)}&lang=${lang}`;
    } else {
      url = categoryId
        ? `https://ryu-no-kinu-back-production.up.railway.app/api/products/category/${categoryId}?lang=${lang}`
        : `https://ryu-no-kinu-back-production.up.railway.app/api/products?lang=${lang}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);
        setSortOption('default');
        setMinPrice('');
        setMaxPrice('');
        applyFilters(data, 'default', '', '');
      })
      .catch(err => console.error('Error fetching products:', err));
  }, [categoryId, searchQuery]);

  const applyFilters = (products: Product[], sort: string, min: string, max: string) => {
    let result = [...products];

    if (min || max) {
      result = result.filter(p => {
        const price = p.discountPrice ?? p.price;
        const minOk = min ? price >= parseFloat(min) : true;
        const maxOk = max ? price <= parseFloat(max) : true;
        return minOk && maxOk;
      });
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime());
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setVisibleProducts(result.slice(0, PAGE_SIZE));
    setVisibleCount(PAGE_SIZE);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    applyFilters(allProducts, value, minPrice, maxPrice);
  };

  const handlePriceFilter = () => {
    applyFilters(allProducts, sortOption, minPrice, maxPrice);
  };

  const handleShowMore = () => {
    const newCount = Math.min(visibleCount + PAGE_SIZE, filteredProducts.length);
    setVisibleCount(newCount);
    setVisibleProducts(filteredProducts.slice(0, newCount));
  };

  const getAverageRating = (product: Product): number => {
    if (!product.reviews?.length) return 0;
    const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round(sum / product.reviews.length);
  };

  const renderStars = (product: Product) => {
    const rating = getAverageRating(product);
    return (
      <div className="products__rate">
        {Array.from({ length: 5 }).map((_, i) => (
          <img
            key={i}
            src={`/assets/icons/${i < rating ? 'star_active' : 'star_notactive'}.svg`}
            alt="star"
            className="products__rate-item"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="products">
      <div className="products-list-container">
        <Link to="/">
          <h2 className="products__home">{t('back-to-products')}</h2>
        </Link>

        <h1 className="products__cat">
          {searchQuery
            ? `Результати пошуку: "${searchQuery}"`
            : categoryId
              ? 'Товари по категорії'
              : 'Усі товари'}
        </h1>

        <div className="products__filters">
          <label htmlFor="sort">Сортувати:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={e => handleSortChange(e.target.value)}
            className="products__select"
          >
            <option value="default">За замовчуванням</option>
            <option value="price-asc">Ціна: за зростанням</option>
            <option value="price-desc">Ціна: за спаданням</option>
            <option value="newest">Новинки</option>
            <option value="oldest">Старіші</option>
          </select>

          <label htmlFor="min">Ціна від:</label>
          <input
            id="min"
            type="number"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="products__input"
          />

          <label htmlFor="max">до:</label>
          <input
            id="max"
            type="number"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="products__input"
          />

          <button className="products__filter-btn" onClick={handlePriceFilter}>
            Застосувати
          </button>
        </div>

        <div className="products-grid">
          {visibleProducts.map(p => (
            <Link to={`/product/${p.id}`} key={p.id} className="products-card">
              <img src={`${p.photo?.[0]}`} alt={p.name} className="products-image" />
              <h3 className="products__header">{p.name}</h3>

              {renderStars(p)}

              <p className="price">
                {p.discountPrice ? (
                  <>
                    <span className="old-price">{p.price.toFixed(2)} ₴</span>
                    <span className="new-price">{p.discountPrice.toFixed(2)} ₴</span>
                  </>
                ) : (
                  <span>{p.price.toFixed(2)} ₴</span>
                )}
              </p>
            </Link>
          ))}
        </div>

        {visibleCount < filteredProducts.length && (
          <button className="show-more-btn" onClick={handleShowMore}>
            Показати ще ({Math.min(PAGE_SIZE, filteredProducts.length - visibleCount)})
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
