import { useLanguage } from '../context/LanguageContext';

function Header() {
  const { translate, toggleLanguage } = useLanguage();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="logo" href="#top" aria-label="Techno Machine Home">
          <span className="logo-mark">TM</span>
          <span className="logo-text">
            TECHNO<span> MACHINE</span>
          </span>
        </a>
        <nav className="main-nav" aria-label="Primary">
          <a href="#about">{translate('nav.about')}</a>
          <a href="#products">{translate('nav.machinery')}</a>
          <a href="#process">{translate('nav.process')}</a>
          <a href="#location">{translate('nav.location')}</a>
          <a href="#contact">{translate('nav.contact')}</a>
          <button type="button" className="lang-toggle" onClick={toggleLanguage}>
            {translate('header.langToggle')}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
