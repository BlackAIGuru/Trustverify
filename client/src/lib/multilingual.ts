// Multilingual and currency support utilities
export const currencyConfig = {
  'en-GB': { symbol: '£', code: 'GBP', name: 'British Pound' },
  'en-US': { symbol: '$', code: 'USD', name: 'US Dollar' },
  'en-CA': { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' },
  'en-AU': { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' },
  'de-DE': { symbol: '€', code: 'EUR', name: 'Euro' },
  'fr-FR': { symbol: '€', code: 'EUR', name: 'Euro' },
  'es-ES': { symbol: '€', code: 'EUR', name: 'Euro' },
  'it-IT': { symbol: '€', code: 'EUR', name: 'Euro' },
  'nl-NL': { symbol: '€', code: 'EUR', name: 'Euro' },
  'pt-PT': { symbol: '€', code: 'EUR', name: 'Euro' },
  'se-SE': { symbol: 'kr', code: 'SEK', name: 'Swedish Krona' },
  'no-NO': { symbol: 'kr', code: 'NOK', name: 'Norwegian Krone' },
  'dk-DK': { symbol: 'kr', code: 'DKK', name: 'Danish Krone' },
  'ch-CH': { symbol: 'CHF', code: 'CHF', name: 'Swiss Franc' },
  'jp-JP': { symbol: '¥', code: 'JPY', name: 'Japanese Yen' },
  'kr-KR': { symbol: '₩', code: 'KRW', name: 'South Korean Won' },
  'cn-CN': { symbol: '¥', code: 'CNY', name: 'Chinese Yuan' },
  'in-IN': { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
  'sg-SG': { symbol: 'S$', code: 'SGD', name: 'Singapore Dollar' },
  'hk-HK': { symbol: 'HK$', code: 'HKD', name: 'Hong Kong Dollar' },
  'br-BR': { symbol: 'R$', code: 'BRL', name: 'Brazilian Real' },
  'mx-MX': { symbol: '$', code: 'MXN', name: 'Mexican Peso' },
  'ar-AR': { symbol: '$', code: 'ARS', name: 'Argentine Peso' },
  'za-ZA': { symbol: 'R', code: 'ZAR', name: 'South African Rand' },
  'ng-NG': { symbol: '₦', code: 'NGN', name: 'Nigerian Naira' },
  'ke-KE': { symbol: 'KSh', code: 'KES', name: 'Kenyan Shilling' },
  'eg-EG': { symbol: 'E£', code: 'EGP', name: 'Egyptian Pound' },
  'ae-AE': { symbol: 'د.إ', code: 'AED', name: 'UAE Dirham' },
  'sa-SA': { symbol: 'ر.س', code: 'SAR', name: 'Saudi Riyal' },
  'tr-TR': { symbol: '₺', code: 'TRY', name: 'Turkish Lira' },
  'ru-RU': { symbol: '₽', code: 'RUB', name: 'Russian Ruble' },
  'pl-PL': { symbol: 'zł', code: 'PLN', name: 'Polish Zloty' },
  'cz-CZ': { symbol: 'Kč', code: 'CZK', name: 'Czech Koruna' },
  'hu-HU': { symbol: 'Ft', code: 'HUF', name: 'Hungarian Forint' },
  'ro-RO': { symbol: 'lei', code: 'RON', name: 'Romanian Leu' },
  'bg-BG': { symbol: 'лв', code: 'BGN', name: 'Bulgarian Lev' },
  'hr-HR': { symbol: 'kn', code: 'HRK', name: 'Croatian Kuna' },
  'rs-RS': { symbol: 'дин', code: 'RSD', name: 'Serbian Dinar' },
  'ua-UA': { symbol: '₴', code: 'UAH', name: 'Ukrainian Hryvnia' },
  'by-BY': { symbol: 'Br', code: 'BYN', name: 'Belarusian Ruble' },
  'lt-LT': { symbol: '€', code: 'EUR', name: 'Euro' },
  'lv-LV': { symbol: '€', code: 'EUR', name: 'Euro' },
  'ee-EE': { symbol: '€', code: 'EUR', name: 'Euro' },
  'fi-FI': { symbol: '€', code: 'EUR', name: 'Euro' },
  'is-IS': { symbol: 'kr', code: 'ISK', name: 'Icelandic Krona' },
  'ie-IE': { symbol: '€', code: 'EUR', name: 'Euro' },
  'mt-MT': { symbol: '€', code: 'EUR', name: 'Euro' },
  'cy-CY': { symbol: '€', code: 'EUR', name: 'Euro' },
  'gr-GR': { symbol: '€', code: 'EUR', name: 'Euro' },
  'mk-MK': { symbol: 'ден', code: 'MKD', name: 'Macedonian Denar' },
  'al-AL': { symbol: 'L', code: 'ALL', name: 'Albanian Lek' },
  'ba-BA': { symbol: 'КМ', code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark' },
  'me-ME': { symbol: '€', code: 'EUR', name: 'Euro' },
  'xk-XK': { symbol: '€', code: 'EUR', name: 'Euro' },
  'si-SI': { symbol: '€', code: 'EUR', name: 'Euro' },
  'sk-SK': { symbol: '€', code: 'EUR', name: 'Euro' },
  'at-AT': { symbol: '€', code: 'EUR', name: 'Euro' },
  'be-BE': { symbol: '€', code: 'EUR', name: 'Euro' },
  'lu-LU': { symbol: '€', code: 'EUR', name: 'Euro' },
  'mc-MC': { symbol: '€', code: 'EUR', name: 'Euro' },
  'ad-AD': { symbol: '€', code: 'EUR', name: 'Euro' },
  'sm-SM': { symbol: '€', code: 'EUR', name: 'Euro' },
  'va-VA': { symbol: '€', code: 'EUR', name: 'Euro' },
} as const;

// Exchange rates (base: GBP = 1.00)
export const exchangeRates: { [key: string]: number } = {
  'GBP': 1.00,    // British Pound (base)
  'USD': 1.27,    // US Dollar
  'CAD': 1.72,    // Canadian Dollar
  'AUD': 2.00,    // Australian Dollar
  'EUR': 1.18,    // Euro
  'SEK': 13.98,   // Swedish Krona
  'NOK': 14.20,   // Norwegian Krone
  'DKK': 8.78,    // Danish Krone
  'CHF': 1.14,    // Swiss Franc
  'JPY': 188,     // Japanese Yen
  'KRW': 1720,    // South Korean Won
  'CNY': 9.15,    // Chinese Yuan
  'INR': 108,     // Indian Rupee
  'SGD': 1.71,    // Singapore Dollar
  'HKD': 9.90,    // Hong Kong Dollar
  'BRL': 7.65,    // Brazilian Real
  'MXN': 25.8,    // Mexican Peso
  'ARS': 1270,    // Argentine Peso
  'ZAR': 23.1,    // South African Rand
  'NGN': 1955,    // Nigerian Naira
  'KES': 163,     // Kenyan Shilling
  'EGP': 62.5,    // Egyptian Pound
  'AED': 4.67,    // UAE Dirham
  'SAR': 4.77,    // Saudi Riyal
  'TRY': 43.5,    // Turkish Lira
  'RUB': 123,     // Russian Ruble
  'PLN': 5.12,    // Polish Zloty
  'CZK': 30.2,    // Czech Koruna
  'HUF': 490,     // Hungarian Forint
  'RON': 5.85,    // Romanian Leu
  'BGN': 2.31,    // Bulgarian Lev
  'HRK': 8.90,    // Croatian Kuna
  'RSD': 138,     // Serbian Dinar
  'UAH': 53.2,    // Ukrainian Hryvnia
  'BYN': 4.12,    // Belarusian Ruble
  'ISK': 175,     // Icelandic Krona
  'MKD': 72.8,    // Macedonian Denar
  'ALL': 117,     // Albanian Lek
  'BAM': 2.31,    // Bosnia-Herzegovina Convertible Mark
};

// Country names for display
export const countryNames: { [key: string]: string } = {
  'en-GB': '🇬🇧 United Kingdom',
  'en-US': '🇺🇸 United States', 
  'en-CA': '🇨🇦 Canada',
  'en-AU': '🇦🇺 Australia',
  'de-DE': '🇩🇪 Germany',
  'fr-FR': '🇫🇷 France',
  'es-ES': '🇪🇸 Spain',
  'it-IT': '🇮🇹 Italy',
  'nl-NL': '🇳🇱 Netherlands',
  'pt-PT': '🇵🇹 Portugal',
  'se-SE': '🇸🇪 Sweden',
  'no-NO': '🇳🇴 Norway',
  'dk-DK': '🇩🇰 Denmark',
  'ch-CH': '🇨🇭 Switzerland',
  'jp-JP': '🇯🇵 Japan',
  'kr-KR': '🇰🇷 South Korea',
  'cn-CN': '🇨🇳 China',
  'in-IN': '🇮🇳 India',
  'sg-SG': '🇸🇬 Singapore',
  'hk-HK': '🇭🇰 Hong Kong',
  'br-BR': '🇧🇷 Brazil',
  'mx-MX': '🇲🇽 Mexico',
  'ar-AR': '🇦🇷 Argentina',
  'za-ZA': '🇿🇦 South Africa',
  'ng-NG': '🇳🇬 Nigeria',
  'ke-KE': '🇰🇪 Kenya',
  'eg-EG': '🇪🇬 Egypt',
  'ae-AE': '🇦🇪 UAE',
  'sa-SA': '🇸🇦 Saudi Arabia',
  'tr-TR': '🇹🇷 Turkey',
  'ru-RU': '🇷🇺 Russia',
  'pl-PL': '🇵🇱 Poland',
  'cz-CZ': '🇨🇿 Czech Republic',
  'hu-HU': '🇭🇺 Hungary',
  'ro-RO': '🇷🇴 Romania',
  'bg-BG': '🇧🇬 Bulgaria',
  'hr-HR': '🇭🇷 Croatia',
  'rs-RS': '🇷🇸 Serbia',
  'ua-UA': '🇺🇦 Ukraine',
  'by-BY': '🇧🇾 Belarus',
  'lt-LT': '🇱🇹 Lithuania',
  'lv-LV': '🇱🇻 Latvia',
  'ee-EE': '🇪🇪 Estonia',
  'fi-FI': '🇫🇮 Finland',
  'is-IS': '🇮🇸 Iceland',
  'ie-IE': '🇮🇪 Ireland',
  'mt-MT': '🇲🇹 Malta',
  'cy-CY': '🇨🇾 Cyprus',
  'gr-GR': '🇬🇷 Greece',
  'mk-MK': '🇲🇰 North Macedonia',
  'al-AL': '🇦🇱 Albania',
  'ba-BA': '🇧🇦 Bosnia and Herzegovina',
  'me-ME': '🇲🇪 Montenegro',
  'xk-XK': '🇽🇰 Kosovo',
  'si-SI': '🇸🇮 Slovenia',
  'sk-SK': '🇸🇰 Slovakia',
  'at-AT': '🇦🇹 Austria',
  'be-BE': '🇧🇪 Belgium',
  'lu-LU': '🇱🇺 Luxembourg',
  'mc-MC': '🇲🇨 Monaco',
  'ad-AD': '🇦🇩 Andorra',
  'sm-SM': '🇸🇲 San Marino',
  'va-VA': '🇻🇦 Vatican City',
};

// Currency conversion functions
export const convertPrice = (gbpPrice: number, targetCurrency: string): number => {
  const rate = exchangeRates[targetCurrency] || 1;
  const converted = gbpPrice * rate;
  
  // Round to appropriate precision based on currency
  if (['JPY', 'KRW', 'ARS', 'NGN', 'KES', 'HUF', 'ISK', 'ALL'].includes(targetCurrency)) {
    return Math.round(converted); // No decimals for these currencies
  }
  return Math.round(converted * 100) / 100; // 2 decimal places for others
};

export const formatPrice = (price: number, currencyCode: string, locale: string = 'en-GB'): string => {
  const config = currencyConfig[locale as keyof typeof currencyConfig];
  if (!config) return `£${price}`;
  
  const convertedPrice = convertPrice(price, currencyCode);
  
  // Format with proper currency symbol positioning
  if (['AED', 'SAR'].includes(currencyCode)) {
    return `${convertedPrice} ${config.symbol}`; // Symbol after for Arabic currencies
  }
  
  // Format with thousand separators for large amounts
  const formattedNumber = convertedPrice.toLocaleString(locale);
  return `${config.symbol}${formattedNumber}`;
};

// Get browser/user locale or fallback to en-GB
export const getBrowserLocale = (): string => {
  if (typeof window !== 'undefined') {
    const browserLocale = navigator.language;
    
    // Map common browser locales to our supported locales
    const localeMap: { [key: string]: string } = {
      'en': 'en-GB',
      'en-US': 'en-US',
      'en-CA': 'en-CA', 
      'en-AU': 'en-AU',
      'de': 'de-DE',
      'de-DE': 'de-DE',
      'fr': 'fr-FR',
      'fr-FR': 'fr-FR',
      'es': 'es-ES',
      'es-ES': 'es-ES',
      'it': 'it-IT',
      'it-IT': 'it-IT',
      'nl': 'nl-NL',
      'nl-NL': 'nl-NL',
      'pt': 'pt-PT',
      'pt-PT': 'pt-PT',
      'sv': 'se-SE',
      'sv-SE': 'se-SE',
      'nb': 'no-NO',
      'nb-NO': 'no-NO',
      'da': 'dk-DK',
      'da-DK': 'dk-DK',
      'ja': 'jp-JP',
      'ja-JP': 'jp-JP',
      'ko': 'kr-KR',
      'ko-KR': 'kr-KR',
      'zh': 'cn-CN',
      'zh-CN': 'cn-CN',
      'hi': 'in-IN',
      'hi-IN': 'in-IN',
      // Add more mappings as needed
    };
    
    return localeMap[browserLocale] || 'en-GB';
  }
  
  return 'en-GB'; // fallback
};

// Multilingual translations
export const translations = {
  'en-GB': {
    pricing: 'Pricing',
    choosePlan: 'Choose the perfect plan for your business',
    monthly: 'Monthly',
    annual: 'Annual',
    saveUp: 'Save up to',
    mostPopular: 'Most Popular',
    startFreeTrial: 'Start Free Trial',
    contactSales: 'Contact Sales',
    featuresIncluded: 'Features included:',
    limitations: 'Limitations:',
    transactionFees: 'Transaction Fees',
    frequentlyAsked: 'Frequently Asked Questions',
  },
  'en-US': {
    pricing: 'Pricing',
    choosePlan: 'Choose the perfect plan for your business',
    monthly: 'Monthly',
    annual: 'Annual',
    saveUp: 'Save up to',
    mostPopular: 'Most Popular',
    startFreeTrial: 'Start Free Trial',
    contactSales: 'Contact Sales',
    featuresIncluded: 'Features included:',
    limitations: 'Limitations:',
    transactionFees: 'Transaction Fees',
    frequentlyAsked: 'Frequently Asked Questions',
  },
  'de-DE': {
    pricing: 'Preise',
    choosePlan: 'Wählen Sie den perfekten Plan für Ihr Unternehmen',
    monthly: 'Monatlich',
    annual: 'Jährlich', 
    saveUp: 'Sparen Sie bis zu',
    mostPopular: 'Beliebteste',
    startFreeTrial: 'Kostenlose Testversion starten',
    contactSales: 'Vertrieb kontaktieren',
    featuresIncluded: 'Enthaltene Funktionen:',
    limitations: 'Einschränkungen:',
    transactionFees: 'Transaktionsgebühren',
    frequentlyAsked: 'Häufig gestellte Fragen',
  },
  'fr-FR': {
    pricing: 'Tarifs',
    choosePlan: 'Choisissez le plan parfait pour votre entreprise',
    monthly: 'Mensuel',
    annual: 'Annuel',
    saveUp: 'Économisez jusqu\'à',
    mostPopular: 'Le plus populaire',
    startFreeTrial: 'Commencer l\'essai gratuit',
    contactSales: 'Contacter les ventes',
    featuresIncluded: 'Fonctionnalités incluses:',
    limitations: 'Limitations:',
    transactionFees: 'Frais de transaction',
    frequentlyAsked: 'Questions fréquemment posées',
  },
  'es-ES': {
    pricing: 'Precios',
    choosePlan: 'Elija el plan perfecto para su negocio',
    monthly: 'Mensual',
    annual: 'Anual',
    saveUp: 'Ahorre hasta',
    mostPopular: 'Más popular',
    startFreeTrial: 'Iniciar prueba gratuita',
    contactSales: 'Contactar ventas',
    featuresIncluded: 'Características incluidas:',
    limitations: 'Limitaciones:',
    transactionFees: 'Tasas de transacción',
    frequentlyAsked: 'Preguntas frecuentes',
  },
  // Add more languages as needed
} as const;

export type SupportedLocale = keyof typeof translations;

export const getTranslation = (locale: string, key: keyof typeof translations['en-GB']): string => {
  const supportedLocale = locale as SupportedLocale;
  return translations[supportedLocale]?.[key] || translations['en-GB'][key];
};