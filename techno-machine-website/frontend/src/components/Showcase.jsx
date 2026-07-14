import { useLanguage } from '../context/LanguageContext';

function Showcase() {
  const { translate } = useLanguage();

  return (
    <section className="section section-dark">
      <div className="container">
        <p className="eyebrow">{translate('showcase.eyebrow')}</p>
        <h2 className="section-title">{translate('showcase.title')}</h2>
        <div className="showcase-grid">
          <article className="showcase-main">
            <div className="placeholder-pattern" aria-hidden="true" />
            <p className="mono">SHIPMENT / 2026-014</p>
            <h3>{translate('showcase.mainTitle')}</h3>
            <p>{translate('showcase.mainDesc')}</p>
          </article>
          <div className="showcase-side">
            {translate('showcase.items').map(([title, desc], index) => (
              <article className="showcase-item" key={title}>
                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                <strong>{title}</strong>
                <span>{desc}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Showcase;
