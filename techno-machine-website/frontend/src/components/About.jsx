import { useLanguage } from '../context/LanguageContext';

function About() {
  const { translate } = useLanguage();

  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div>
          <p className="eyebrow section-eyebrow">{translate('about.eyebrow')}</p>
          <h2 className="section-title">{translate('about.title')}</h2>
          <p className="section-lead">{translate('about.p1')}</p>
          <p className="section-copy">{translate('about.p2')}</p>
          <div className="value-list">
            {translate('about.values').map((item) => (
              <article className="value-item" key={item.title}>
                <span className="value-dot" aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="about-panel" aria-label={translate('about.panelTitle')}>
          <p className="mono">TM / PROFILE</p>
          <h3>{translate('about.panelTitle')}</h3>
          <ul>
            {translate('about.panelRows').map(([label, value]) => (
              <li key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

export default About;
