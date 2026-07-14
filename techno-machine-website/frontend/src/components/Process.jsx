import { useLanguage } from '../context/LanguageContext';

function Process() {
  const { translate } = useLanguage();

  return (
    <section className="section section-dark" id="process">
      <div className="container">
        <p className="eyebrow">{translate('process.eyebrow')}</p>
        <h2 className="section-title">{translate('process.title')}</h2>
        <div className="process-row">
          {translate('process.steps').map(([title, desc], index) => (
            <article className="proc-step" key={title}>
              <span className="proc-num">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
