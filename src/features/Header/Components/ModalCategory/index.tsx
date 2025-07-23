import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { Category } from '@/types';
import { PreferencesContext } from '@/context/PreferencesContext';
import { useTranslation } from 'react-i18next';

type ModalCategoryProps = {
  toggleModal: () => void;
};

const ModalCategory: React.FC<ModalCategoryProps> = ({ toggleModal }) => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  const { t } = useTranslation();
  const { lang } = React.useContext(PreferencesContext);

  React.useEffect(() => {
    fetch(`http://localhost:8888/categories?lang=${lang}`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.log('Error loading categories:', err));
  }, []);

  const grouped = categories.reduce<Record<string, Category[]>>((acc, cat) => {
    const groupName = cat.type?.name || 'Інше';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(cat);
    return acc;
  }, {});

  return (
    <div className="modal-overlay" onClick={toggleModal}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{t('category')}</h2>

        <ul className="category-list">
          <li className="category-item all-products">
            <Link to="/products" onClick={toggleModal}>
              {t('all-products')}
            </Link>
          </li>

          {Object.entries(grouped).map(([groupName, groupCats]) => (
            <li className="category-group" key={groupName}>
              <h3 className="group-title">{groupName}</h3>
              <ul className="subcategory-list">
                {groupCats.map(cat => (
                  <li key={cat.id} className="category-item">
                    <Link to={`/products/${cat.id}`} onClick={toggleModal}>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <button className="close-button" onClick={toggleModal}>
          {t('close-btn')}
        </button>
      </div>
    </div>
  );
};

export default ModalCategory;
