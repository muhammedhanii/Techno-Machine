import { useLanguage } from '../context/LanguageContext';

function Hero() {
  const { translate } = useLanguage();
  const stats = ['10+', '500+', '15+', '6'];

  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <p className="eyebrow">{translate('hero.eyebrow')}</p>
        <h1>
          {translate('hero.title')} <em>{translate('hero.titleEmphasis')}</em>
        </h1>
        <p className="hero-lead">{translate('hero.lead')}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#products">
            {translate('hero.browse')}
          </a>
          <a className="btn btn-ghost" href="#contact">
            {translate('hero.quote')}
          </a>
        </div>
        <div className="hero-stats">
          {stats.map((value, index) => (
            <article key={value} className="hero-stat">
              <p className="stat-num">{value}</p>
              <p className="stat-label">{translate('hero.stats')[index]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
