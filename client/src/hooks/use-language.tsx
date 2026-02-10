import React, { createContext, useContext, useState, useEffect } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string, params?: Record<string, string>) => string;
  languages: Language[];
  isRTL: boolean;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
];

const rtlLanguages = ['ar', 'he', 'fa', 'ur'];

// Translations object - in production this would come from a proper i18n library
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.academy': 'Academy',
    'nav.dashboard': 'Dashboard',
    'nav.certificates': 'Certificates',
    'nav.community': 'Community',
    'nav.signin': 'Sign In',
    'nav.signout': 'Sign Out',
    
    // Academy
    'academy.title': 'TrustVerify Academy',
    'academy.subtitle': 'Professional Fraud Prevention Training',
    'academy.description': 'Learn from industry experts and earn professional certifications in fraud prevention and cybersecurity.',
    'academy.getStarted': 'Get Started',
    'academy.learnMore': 'Learn More',
    
    // Course Levels
    'course.foundation.title': 'Foundation Level',
    'course.foundation.description': 'Essential fraud awareness for everyone',
    'course.intermediate.title': 'Intermediate Level',
    'course.intermediate.description': 'Advanced protection strategies and techniques',
    'course.advanced.title': 'Advanced Level',
    'course.advanced.description': 'Professional-grade fraud investigation skills',
    'course.expert.title': 'Expert Level',
    'course.expert.description': 'Master-level expertise with certification',
    
    // Common Actions
    'action.download': 'Download',
    'action.share': 'Share',
    'action.continue': 'Continue',
    'action.complete': 'Complete',
    'action.start': 'Start',
    'action.view': 'View',
    'action.edit': 'Edit',
    'action.cancel': 'Cancel',
    'action.submit': 'Submit',
    'action.save': 'Save',
    
    // Video Player
    'video.play': 'Play',
    'video.pause': 'Pause',
    'video.mute': 'Mute',
    'video.unmute': 'Unmute',
    'video.fullscreen': 'Fullscreen',
    'video.captions': 'Captions',
    'video.speed': 'Playback Speed',
    'video.progress': 'Progress: {{progress}}%',
    
    // Certificates
    'certificate.title': 'Certificate of Completion',
    'certificate.issued': 'This certifies that',
    'certificate.completed': 'has successfully completed',
    'certificate.verified': 'Blockchain Verified',
    'certificate.download': 'Download Certificate',
    'certificate.verify': 'Verify Certificate',
    'certificate.share': 'Share Achievement',
    
    // Feedback
    'feedback.title': 'Rate This {{type}}',
    'feedback.overall': 'Overall Rating',
    'feedback.aspects': 'Rate Specific Aspects',
    'feedback.recommend': 'Would you recommend this {{type}} to others?',
    'feedback.improvements': 'What could be improved?',
    'feedback.comments': 'Additional Comments',
    'feedback.submit': 'Submit Feedback',
    'feedback.thanks': 'Thank You for Your Feedback!',
    
    // Community
    'community.title': 'Community Forum',
    'community.subtitle': 'Connect with fellow fraud prevention professionals',
    'community.newPost': 'New Post',
    'community.searchPlaceholder': 'Search discussions...',
    'community.categories': 'Categories',
    'community.stats': 'Forum Stats',
    'community.noDiscussions': 'No discussions found',
    'community.startDiscussion': 'Start Discussion',
    
    // Accessibility
    'a11y.skipToContent': 'Skip to main content',
    'a11y.openMenu': 'Open navigation menu',
    'a11y.closeMenu': 'Close navigation menu',
    'a11y.languageSelector': 'Language selector',
    'a11y.userMenu': 'User menu',
    
    // Errors
    'error.generic': 'Something went wrong. Please try again.',
    'error.network': 'Network error. Please check your connection.',
    'error.unauthorized': 'You need to sign in to access this content.',
    'error.notFound': 'The content you\'re looking for was not found.',
    
    // Success Messages
    'success.saved': 'Changes saved successfully!',
    'success.submitted': 'Submitted successfully!',
    'success.completed': 'Completed successfully!',
    
    // Time and Dates
    'time.minute': 'minute',
    'time.minutes': 'minutes',
    'time.hour': 'hour', 
    'time.hours': 'hours',
    'time.day': 'day',
    'time.days': 'days',
    'time.week': 'week',
    'time.weeks': 'weeks'
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.academy': 'Academia',
    'nav.dashboard': 'Panel',
    'nav.certificates': 'Certificados',
    'nav.community': 'Comunidad',
    'nav.signin': 'Iniciar Sesión',
    'nav.signout': 'Cerrar Sesión',
    
    // Academy
    'academy.title': 'Academia TrustVerify',
    'academy.subtitle': 'Capacitación Profesional en Prevención de Fraudes',
    'academy.description': 'Aprende de expertos de la industria y obtén certificaciones profesionales en prevención de fraudes y ciberseguridad.',
    'academy.getStarted': 'Comenzar',
    'academy.learnMore': 'Saber Más',
    
    // Course Levels  
    'course.foundation.title': 'Nivel Básico',
    'course.foundation.description': 'Conocimientos esenciales sobre fraudes para todos',
    'course.intermediate.title': 'Nivel Intermedio',
    'course.intermediate.description': 'Estrategias y técnicas avanzadas de protección',
    'course.advanced.title': 'Nivel Avanzado',
    'course.advanced.description': 'Habilidades profesionales de investigación de fraudes',
    'course.expert.title': 'Nivel Experto',
    'course.expert.description': 'Experiencia de nivel maestro con certificación'
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.academy': 'Académie',
    'nav.dashboard': 'Tableau de bord',
    'nav.certificates': 'Certificats',
    'nav.community': 'Communauté',
    'nav.signin': 'Se connecter',
    'nav.signout': 'Se déconnecter',
    
    // Academy
    'academy.title': 'Académie TrustVerify',
    'academy.subtitle': 'Formation Professionnelle en Prévention de la Fraude',
    'academy.description': 'Apprenez auprès d\'experts de l\'industrie et obtenez des certifications professionnelles en prévention de la fraude et cybersécurité.',
    'academy.getStarted': 'Commencer',
    'academy.learnMore': 'En savoir plus'
  },
  de: {
    // Navigation  
    'nav.home': 'Startseite',
    'nav.academy': 'Akademie',
    'nav.dashboard': 'Dashboard',
    'nav.certificates': 'Zertifikate',
    'nav.community': 'Community',
    'nav.signin': 'Anmelden',
    'nav.signout': 'Abmelden',
    
    // Academy
    'academy.title': 'TrustVerify Akademie',
    'academy.subtitle': 'Professionelle Betrugspräventions-Schulung',
    'academy.description': 'Lernen Sie von Branchenexperten und erhalten Sie professionelle Zertifizierungen in Betrugsprävention und Cybersicherheit.',
    'academy.getStarted': 'Loslegen',
    'academy.learnMore': 'Mehr erfahren'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    // Get language from localStorage or browser preference
    const stored = localStorage.getItem('trustverify-language');
    if (stored) return stored;
    
    const browserLang = navigator.language.split('-')[0];
    return languages.find(lang => lang.code === browserLang)?.code || 'en';
  });

  const isRTL = rtlLanguages.includes(currentLanguage);

  useEffect(() => {
    localStorage.setItem('trustverify-language', currentLanguage);
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [currentLanguage, isRTL]);

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
  };

  const t = (key: string, params?: Record<string, string>): string => {
    const langTranslations = translations[currentLanguage] || translations.en;
    let translation = langTranslations[key] || translations.en[key] || key;
    
    // Replace parameters
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
      languages,
      isRTL
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Language Selector Component
export function LanguageSelector({ className = '' }: { className?: string }) {
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
        aria-label="Language selector"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {currentLang?.name}
        </span>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    setLanguage(language.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                    currentLanguage === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                  {currentLanguage === language.code && (
                    <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}