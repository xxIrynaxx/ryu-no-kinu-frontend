import React from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { PreferencesContext } from '@/context/PreferencesContext';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
  const { t } = useTranslation();
  const { lang } = React.useContext(PreferencesContext);
  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);
  const navigate = useNavigate();
  const timeoutRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetch(
        `ryu-no-kinu-back-production.up.railway.app/api/products/search?query=${encodeURIComponent(query)}&lang=${lang}`,
      )
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(data => {
          setSuggestions(data);
        })
        .catch(() => setSuggestions([]));
    }, 300);
  }, [query]);

  const handleSelect = (id: string) => {
    setQuery('');
    setSuggestions([]);
    navigate(`/product/${id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar__wrapper">
        <div className={`search-bar__enter`}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-bar__input"
            type="text"
            placeholder={t('search-bar-input')}
          />
          <img src="/assets/icons/search.svg" alt="search" className="search-bar__image" />
        </div>

        {suggestions.length > 0 && (
          <ul className="search-bar__suggestions">
            {suggestions.slice(0, 5).map((product: any) => (
              <li
                key={product.id}
                className="search-bar__suggestion"
                onClick={() => handleSelect(product.id)}
              >
                <img src={product.photo} alt="Product" className="suggestion-image" />
                <span className="suggestion-name">{product.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
