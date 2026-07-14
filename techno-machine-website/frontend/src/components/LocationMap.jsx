import { useLanguage } from '../context/LanguageContext';

function LocationMap() {
  const { translate } = useLanguage();

  return (
    <section className="section" id="location">
      <div className="container location-grid">
        <article>
          <p className="mono">TM / LOCATION</p>
          <h2 className="section-title">{translate('location.title')}</h2>
          <p className="section-copy">{translate('location.lead')}</p>
          <ul className="location-list">
            <li>
              <strong>{translate('location.addressLabel')}</strong>
              <span>{translate('location.address')}</span>
            </li>
            <li>
              <strong>{translate('location.hoursLabel')}</strong>
              <span>{translate('location.hours')}</span>
            </li>
            <li>
              <strong>{translate('location.phoneLabel')}</strong>
              <span>+20 100 000 0000</span>
            </li>
          </ul>
        </article>
        <div className="map-frame">
          <iframe
            title="Techno Machine Location"
            src="https://www.google.com/maps?q=Cairo,Egypt&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

export default LocationMap;
