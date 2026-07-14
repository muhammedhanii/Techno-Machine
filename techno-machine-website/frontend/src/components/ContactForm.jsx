import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  message: ''
};

function ContactForm() {
  const { translate } = useLanguage();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseState, setResponseState] = useState({ type: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResponseState({ type: '', message: '' });

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      setResponseState({ type: 'success', message: data.message });
      setFormData(initialForm);
    } catch (error) {
      setResponseState({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section section-muted" id="contact">
      <div className="container">
        <p className="eyebrow section-eyebrow">{translate('contact.eyebrow')}</p>
        <h2 className="section-title">{translate('contact.title')}</h2>
        <div className="contact-grid">
          <aside className="contact-info">
            <h3>{translate('contact.infoTitle')}</h3>
            <p>{translate('contact.infoLead')}</p>
            <p>
              <span className="mono">TEL</span> +20 100 000 0000
            </p>
            <p>
              <span className="mono">WA</span> +20 100 000 0000
            </p>
            <p>
              <span className="mono">MAIL</span> info@technomachine.com
            </p>
            <p>
              <span className="mono">{translate('contact.addr')}</span> {translate('contact.addrValue')}
            </p>
          </aside>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name">{translate('contact.form.name')}</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={translate('contact.form.namePh')}
              />
            </div>
            <div className="form-row">
              <label htmlFor="phone">{translate('contact.form.phone')}</label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={translate('contact.form.phonePh')}
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">{translate('contact.form.email')}</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={translate('contact.form.emailPh')}
              />
            </div>
            <div className="form-row">
              <label htmlFor="message">{translate('contact.form.message')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={translate('contact.form.messagePh')}
              />
            </div>
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? translate('contact.form.sending') : translate('contact.form.submit')}
            </button>
            {responseState.message ? (
              <p className={responseState.type === 'error' ? 'error-state' : 'success-state'}>{responseState.message}</p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
