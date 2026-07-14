import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const translations = {
  ar: {
    siteTitle: 'Techno Machine | تكنو مشين — استيراد وتصدير المكن الصناعي',
    nav: { about: 'من نحن', machinery: 'المكن', process: 'آلية العمل', location: 'الموقع', contact: 'اتصل بنا' },
    header: { langToggle: 'EN' },
    hero: {
      eyebrow: 'استيراد وتصدير المكن الصناعي منذ 2014',
      title: 'مكن صناعي بجودة موثوقة،',
      titleEmphasis: 'من المصنع لحد عندك',
      lead: 'تكنو مشين بتوفر لأصحاب المصانع والورش أحدث خطوط الإنتاج والمكن الصناعي المستورد، مع متابعة كاملة من الفحص لحد التركيب.',
      browse: 'تصفح فئات المكن',
      quote: 'اطلب عرض سعر',
      stats: ['سنوات خبرة', 'عميل', 'دولة تصدير', 'فئات مكن رئيسية']
    },
    about: {
      eyebrow: 'من نحن',
      title: 'شريككم الموثوق في تجهيز المصانع',
      p1: 'تكنو مشين شركة متخصصة في استيراد وتصدير المكن الصناعي بمختلف أنواعه، بنشتغل مع مصانع وورش من كل الأحجام على توفير خطوط إنتاج حديثة وموثوقة بأسعار تنافسية.',
      p2: 'بنختار كل قطعة مكنة بعناية من موردين معتمدين، وبنتابع الشحنة من لحظة التعاقد لحد وصولها وتركيبها عندكم، مع خدمة صيانة وقطع غيار مستمرة.',
      values: [
        { title: 'فحص قبل الشحن', desc: 'كل مكنة بتتفحص وبتتجرب قبل ما تتشحن' },
        { title: 'تخليص جمركي كامل', desc: 'بنتكفل بكل إجراءات الاستيراد والتصدير' },
        { title: 'دعم فني مستمر', desc: 'فريق صيانة وقطع غيار جاهز بعد التسليم' }
      ],
      panelTitle: 'بطاقة الشركة',
      panelRows: [
        ['تأسست', '2014'],
        ['التخصص', 'استيراد وتصدير مكن صناعي'],
        ['النطاق', 'محلي ودولي'],
        ['عدد الفئات', '6+'],
        ['خدمة ما بعد البيع', 'متاحة']
      ]
    },
    categories: {
      eyebrow: 'فئات المكن',
      title: 'كل اللي محتاجه مصنعك في مكان واحد',
      lead: 'بنغطي أكتر من 6 فئات من المكن الصناعي، وكل فئة بتتضم موديلات متعددة حسب حجم الإنتاج المطلوب.',
      loading: 'جاري تحميل الفئات...',
      error: 'تعذر تحميل الفئات حالياً.'
    },
    showcase: {
      eyebrow: 'مكن مميز',
      title: 'نماذج من أحدث الشحنات',
      mainTitle: 'خط إنتاج تعبئة أوتوماتيك بالكامل',
      mainDesc: 'مكان الصورة الفعلية للمكنة — هيتم استبداله بصور حقيقية من المصنع بعد توفيرها.',
      items: [
        ['ماكينة CNC خمس محاور', 'دقة تشغيل تصل حتى 0.01 مم'],
        ['ماكينة حقن بلاستيك 250 طن', 'مناسبة لقوالب الإنتاج الكبير']
      ]
    },
    process: {
      eyebrow: 'آلية العمل',
      title: 'من الطلب لحد التشغيل عندك',
      steps: [
        ['الطلب والاستفسار', 'بتبعتلنا احتياجاتك وبنرشحلك المكنة المناسبة لحجم إنتاجك.'],
        ['الفحص والمعاينة', 'بنفحص المكنة عند المورد ونجهز تقرير حالة كامل قبل الشحن.'],
        ['الشحن والتخليص', 'بنتابع الشحن والتخليص الجمركي بالكامل نيابة عنك.'],
        ['التسليم والتركيب', 'فريقنا بيركب المكنة عندك ويتأكد إنها شغالة بكفاءة.'],
        ['الصيانة المستمرة', 'متابعة دورية وقطع غيار جاهزة على مدار السنة.']
      ]
    },
    location: {
      title: 'زورونا في مقر الشركة',
      lead: 'محتاجين تشوفوا المكن أو تتناقشوا مع فريقنا وش لوش؟ تقدروا تحجزوا زيارة للمعرض في أي وقت خلال أيام العمل.',
      addressLabel: 'العنوان',
      address: 'المنطقة الصناعية، القاهرة، مصر — [ضع العنوان التفصيلي هنا]',
      hoursLabel: 'مواعيد العمل',
      hours: 'السبت – الخميس، 9 ص – 5 م',
      phoneLabel: 'التليفون'
    },
    contact: {
      eyebrow: 'اتصل بنا',
      title: 'جاهزين نجاوب على استفسارك',
      infoTitle: 'بيانات التواصل',
      infoLead: 'ابعتلنا تفاصيل المكنة اللي محتاجها وهنرجعلك بعرض سعر خلال 24 ساعة.',
      addr: 'عنوان',
      addrValue: 'المنطقة الصناعية، القاهرة',
      form: {
        name: 'الاسم',
        namePh: 'اسمك بالكامل',
        phone: 'رقم التليفون',
        phonePh: '01xxxxxxxxx',
        email: 'البريد الإلكتروني',
        emailPh: 'example@email.com',
        message: 'الرسالة',
        messagePh: 'اكتب تفاصيل المكنة أو الاستفسار اللي محتاجه...',
        submit: 'إرسال الطلب',
        sending: 'جارٍ الإرسال...'
      }
    },
    footer: {
      rights: '© 2026 تكنو مشين لاستيراد وتصدير المكن الصناعي. جميع الحقوق محفوظة.'
    }
  },
  en: {
    siteTitle: 'Techno Machine | Industrial Machinery Import & Export',
    nav: { about: 'About', machinery: 'Machinery', process: 'Process', location: 'Location', contact: 'Contact' },
    header: { langToggle: 'AR' },
    hero: {
      eyebrow: 'INDUSTRIAL MACHINERY IMPORT & EXPORT SINCE 2014',
      title: 'Industrial machinery you can trust,',
      titleEmphasis: 'from the factory floor to yours',
      lead: 'Techno Machine supplies factory and workshop owners with the latest imported production lines and industrial machinery, with full support from inspection to installation.',
      browse: 'Browse Machinery',
      quote: 'Request a Quote',
      stats: ['Years of Experience', 'Clients Served', 'Export Destinations', 'Machinery Categories']
    },
    about: {
      eyebrow: 'About Us',
      title: 'Your trusted partner in factory equipment',
      p1: 'Techno Machine is a specialized industrial machinery trading company. We work with factories and workshops of every size to deliver modern, reliable production lines at competitive prices.',
      p2: 'Every machine is carefully sourced from certified suppliers, and we follow each shipment from contract to on-site installation, backed by ongoing maintenance and spare parts support.',
      values: [
        { title: 'Pre-shipment inspection', desc: 'Every machine is tested and inspected before it ships' },
        { title: 'Full customs clearance', desc: 'We handle all import and export procedures' },
        { title: 'Ongoing technical support', desc: 'A maintenance and spare-parts team ready after delivery' }
      ],
      panelTitle: 'Company Snapshot',
      panelRows: [
        ['Founded', '2014'],
        ['Specialty', 'Industrial machinery trade'],
        ['Reach', 'Local & International'],
        ['Categories', '6+'],
        ['After-sales', 'Available']
      ]
    },
    categories: {
      eyebrow: 'Machinery Categories',
      title: 'Everything your factory needs, in one place',
      lead: 'We cover more than 6 categories of industrial machinery, each with multiple models suited to your production scale.',
      loading: 'Loading categories...',
      error: 'Unable to load categories right now.'
    },
    showcase: {
      eyebrow: 'Featured Machinery',
      title: 'From our latest shipments',
      mainTitle: 'Fully automatic filling production line',
      mainDesc: 'Placeholder for the actual machine photo — to be replaced with real factory images once provided.',
      items: [
        ['5-Axis CNC Machine', 'Machining precision up to 0.01mm'],
        ['250-Ton Plastic Injection Unit', 'Suited to large-scale mould production']
      ]
    },
    process: {
      eyebrow: 'How It Works',
      title: 'From order to operating on your floor',
      steps: [
        ['Inquiry', 'You send us your requirements and we recommend the right machine for your production scale.'],
        ['Inspection', 'We inspect the machine at the supplier and prepare a full condition report before shipping.'],
        ['Shipping & Clearance', 'We manage shipping and full customs clearance on your behalf.'],
        ['Delivery & Installation', 'Our team installs the machine on-site and verifies it runs at full efficiency.'],
        ['Ongoing Maintenance', 'Regular follow-up and spare parts available year-round.']
      ]
    },
    location: {
      title: 'Visit our headquarters',
      lead: 'Want to see the machinery in person or talk directly with our team? You can arrange a showroom visit any working day.',
      addressLabel: 'Address',
      address: 'Industrial Zone, Cairo, Egypt — [Insert full address here]',
      hoursLabel: 'Working Hours',
      hours: 'Sat – Thu, 9 AM – 5 PM',
      phoneLabel: 'Phone'
    },
    contact: {
      eyebrow: 'Contact Us',
      title: 'Ready to answer your questions',
      infoTitle: 'Get in Touch',
      infoLead: "Send us the machine details you need and we'll get back to you with a quote within 24 hours.",
      addr: 'ADDR',
      addrValue: 'Industrial Zone, Cairo',
      form: {
        name: 'Name',
        namePh: 'Your full name',
        phone: 'Phone Number',
        phonePh: 'e.g. +20 1xxxxxxxxx',
        email: 'Email',
        emailPh: 'example@email.com',
        message: 'Message',
        messagePh: 'Describe the machine or inquiry you need...',
        submit: 'Send Request',
        sending: 'Sending...'
      }
    },
    footer: {
      rights: '© 2026 Techno Machine Industrial Import & Export. All rights reserved.'
    }
  }
};

const LanguageContext = createContext(null);

const getByPath = (obj, path) => path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ar');

  useEffect(() => {
    const html = document.documentElement;
    const root = document.getElementById('root');

    html.lang = language;
    html.dir = language === 'ar' ? 'rtl' : 'ltr';
    root?.classList.remove('lang-ar', 'lang-en');
    root?.classList.add(language === 'ar' ? 'lang-ar' : 'lang-en');
    document.title = translations[language].siteTitle;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const translate = (key) => getByPath(translations[language], key) ?? key;

  const value = useMemo(
    () => ({
      language,
      toggleLanguage,
      translate,
      dictionary: translations[language]
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
