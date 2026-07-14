import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const icons = {
  packaging: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="8" y="16" width="32" height="22" rx="1" />
      <path d="M14 16v-4a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v4" />
      <line x1="8" y1="26" x2="40" y2="26" />
      <line x1="18" y1="30" x2="18" y2="34" />
      <line x1="30" y1="30" x2="30" y2="34" />
    </svg>
  ),
  food: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="9" />
      <path d="M24 8v5M24 35v5M8 24h5M35 24h5M13 13l3.5 3.5M31.5 31.5L35 35M13 35l3.5-3.5M31.5 16.5L35 13" />
    </svg>
  ),
  cnc: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="6" y="10" width="24" height="28" rx="1" />
      <line x1="30" y1="16" x2="42" y2="16" />
      <line x1="30" y1="24" x2="42" y2="24" />
      <line x1="30" y1="32" x2="38" y2="32" />
      <circle cx="14" cy="30" r="3" />
    </svg>
  ),
  injection: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 34V16a2 2 0 0 1 2-2h10l6 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2Z" />
      <line x1="18" y1="26" x2="30" y2="26" />
    </svg>
  ),
  printing: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="10" y="8" width="28" height="14" rx="1" />
      <rect x="14" y="26" width="20" height="14" rx="1" />
      <line x1="18" y1="31" x2="30" y2="31" />
      <line x1="18" y1="35" x2="26" y2="35" />
    </svg>
  ),
  spareParts: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 6l16 9v18l-16 9-16-9V15Z" />
      <path d="M24 6v18M8 15l16 9 16-9M24 24v18" />
    </svg>
  )
};

function Categories() {
  const { language, translate } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        setLoading(true);
        setError('');
        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${baseUrl}/api/products`);
        if (!response.ok) {
          throw new Error('Failed to load categories');
        }
        const data = await response.json();
        if (isMounted) {
          setCategories(data);
        }
      } catch {
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCategories();
    return () => {
      isMounted = false;
    };
  }, [language]);

  return (
    <section className="section section-muted" id="products">
      <div className="container">
        <p className="eyebrow section-eyebrow">{translate('categories.eyebrow')}</p>
        <h2 className="section-title">{translate('categories.title')}</h2>
        <p className="section-copy">{translate('categories.lead')}</p>

        {loading ? <p className="load-state">{translate('categories.loading')}</p> : null}
        {!loading && error ? <p className="error-state">{translate('categories.error')}</p> : null}

        {!loading && !error ? (
          <div className="cat-grid">
            {categories.map((category) => (
              <article className="cat-card" key={category.id}>
                <span className="cat-code">{category.code}</span>
                <div className="cat-icon">{icons[category.icon] ?? icons.packaging}</div>
                <div>
                  <h3>{language === 'ar' ? category.title_ar : category.title_en}</h3>
                  <p>{language === 'ar' ? category.desc_ar : category.desc_en}</p>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Categories;
