import { useLanguage } from '../context/LanguageContext';

function Footer() {
  const { translate } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <a className="logo" href="#top" aria-label="Techno Machine Home">
          <span className="logo-mark">TM</span>
          <span className="logo-text">
            TECHNO<span> MACHINE</span>
          </span>
        </a>
        <nav aria-label="Footer">
          <a href="#about">{translate('nav.about')}</a>
          <a href="#products">{translate('nav.machinery')}</a>
          <a href="#process">{translate('nav.process')}</a>
          <a href="#contact">{translate('nav.contact')}</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>{translate('footer.rights')}</span>
        <span className="mono">EG · EST. 2014</span>
      </div>
    </footer>
  );
}

export default Footer;
