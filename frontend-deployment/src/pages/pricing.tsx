import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  currencyConfig, 
  exchangeRates, 
  countryNames, 
  convertPrice, 
  formatPrice, 
  getBrowserLocale,
  getTranslation
} from "@/lib/multilingual";
import { Link } from "wouter";
import { 
  CheckCircle, 
  X, 
  Shield, 
  Zap, 
  Building, 
  Users, 
  Clock,
  Phone,
  Star,
  ArrowRight,
  Globe,
  Lock
} from "lucide-react";

export default function PricingPage() {
  const { user } = useAuth();
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState<string>(getBrowserLocale());
  const [planType, setPlanType] = useState<'consumer' | 'business'>('consumer');

  // Consumer Fraud Protection Plans
  const consumerPlans = [
    {
      name: "Premium",
      description: "Essential fraud protection for individuals and families",
      price: {
        monthly: 9.99,
        annual: 99
      },
      features: [
        "Unlimited fraud checks",
        "Dark web monitoring",
        "Scam message analysis",
        "Basic ID Vault",
        "Priority email support",
        "Browser extension with alerts",
        "Monthly fraud reports"
      ],
      limitations: [
        "Single user account",
        "Basic ID vault features",
        "Email support only"
      ],
      cta: "Start Premium",
      popular: false,
      cost: "Individuals"
    },
    {
      name: "Protect",
      description: "Advanced identity & credit protection for families",
      price: {
        monthly: 14.99,
        annual: 149
      },
      features: [
        "Everything in Premium",
        "Credit bureau monitoring",
        "Advanced ID Vault with biometrics",
        "Open banking transaction alerts",
        "Priority support (phone & email)",
        "Dispute letter generation",
        "Family sharing (up to 2 members)",
        "Identity theft insurance"
      ],
      limitations: [
        "Limited to 2 family members",
        "Standard insurance coverage"
      ],
      cta: "Get Protected",
      popular: true,
      cost: "Families"
    },
    {
      name: "Total",
      description: "Complete fraud resolution with insurance and concierge",
      price: {
        monthly: 19.99,
        annual: 199
      },
      features: [
        "Everything in Protect",
        "Fraud insurance up to £5,000",
        "24/7 concierge support",
        "Family coverage (up to 4 members)",
        "Priority dispute resolution",
        "Business account protection",
        "Dedicated fraud specialist",
        "White-glove recovery service"
      ],
      limitations: [],
      cta: "Go Total",
      popular: false,
      cost: "Full families"
    }
  ];

  // Business Fraud Protection Plans
  const businessPlans = [
    {
      name: "Professional",
      description: "Essential fraud protection for growing businesses",
      price: {
        monthly: 499,
        annual: 4999
      },
      features: [
        "Up to 10,000 fraud checks/month",
        "Real-time API access",
        "Email & phone support",
        "Standard fraud intelligence",
        "Basic reporting dashboard",
        "Team management (up to 5 users)",
        "Website integrity monitoring",
        "Transaction protection"
      ],
      limitations: [
        "Limited to 10,000 checks monthly",
        "Basic integrations only",
        "Standard support hours"
      ],
      cta: "Start Professional",
      popular: false,
      cost: "Growing businesses"
    },
    {
      name: "Enterprise",
      description: "Advanced fraud protection for established businesses",
      price: {
        monthly: 999,
        annual: 9999
      },
      features: [
        "Up to 50,000 fraud checks/month",
        "Full API access with webhooks",
        "Priority 24/7 support",
        "Advanced fraud intelligence",
        "Custom integrations",
        "Unlimited team members",
        "White-label solutions",
        "SLA guarantees (99.9% uptime)",
        "Advanced analytics & reporting",
        "KYC verification system"
      ],
      limitations: [
        "Limited to 50,000 checks monthly"
      ],
      cta: "Choose Enterprise",
      popular: true,
      cost: "Established businesses"
    },
    {
      name: "Scale",
      description: "Custom solutions for large-scale operations",
      price: {
        monthly: "£1,999+",
        annual: "£20,000+"
      },
      features: [
        "Unlimited fraud checks",
        "Dedicated API infrastructure",
        "24/7 enterprise support",
        "Custom fraud models",
        "On-premise deployment options",
        "Dedicated account manager",
        "Custom compliance reporting",
        "Enterprise SLA (99.99% uptime)",
        "Multi-region redundancy",
        "Advanced AI/ML capabilities",
        "Regulatory compliance automation"
      ],
      limitations: [
        "Custom implementation required",
        "Minimum annual commitment"
      ],
      cta: "Contact Sales",
      popular: false,
      cost: "Enterprise scale"
    }
  ];

  const basePlans = planType === 'consumer' ? consumerPlans : businessPlans;

  const consumerAddOns = [
    {
      name: "Additional Family Members",
      description: "Extend protection to extra family members",
      price: 4.99,
      per: "per member/month"
    },
    {
      name: "Enhanced Insurance Coverage",
      description: "Increase fraud insurance up to £25,000",
      price: 9.99,
      per: "per month"
    },
    {
      name: "Priority Dispute Resolution",
      description: "Fast-track dispute resolution within 24 hours",
      price: 19.99,
      per: "per incident"
    },
    {
      name: "Business Account Protection",
      description: "Extend fraud protection to business accounts",
      price: 49.99,
      per: "per month"
    }
  ];

  const businessAddOns = [
    {
      name: "Enhanced Verification",
      description: "Additional document verification and biometric checks",
      price: 25,
      per: "per verification"
    },
    {
      name: "Express Settlement",
      description: "Reduce settlement time to under 2 hours",
      price: 50,
      per: "per transaction"
    },
    {
      name: "Compliance Plus",
      description: "Advanced AML and sanctions screening",
      price: 499,
      per: "per month"
    },
    {
      name: "Custom Integration",
      description: "Dedicated development for platform integration",
      price: 4999,
      per: "one-time setup"
    }
  ];

  const addOns = planType === 'consumer' ? consumerAddOns : businessAddOns;

  const faqs = [
    {
      question: "What's included in the Perfect plan?",
      answer: "The Perfect plan includes up to 1,000 fraud checks per month, basic API access, email support, and our core fraud protection features. Ideal for small businesses getting started."
    },
    {
      question: "How does pricing scale with transaction volume?",
      answer: "Our pricing is based on monthly fraud check limits. For higher volumes, Enterprise plans offer unlimited checks with custom pricing available."
    },
    {
      question: "What are the transaction fees?",
      answer: "Transaction fees range from 2.9% + £0.30 (Perfect) to 1.9% + £0.30 (Enterprise) per successful transaction. Disputed transactions have no additional fees."
    },
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, ACH transfers, and wire transfers for Enterprise accounts."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees for Perfect and Professional plans. Enterprise plans may have custom setup depending on integration requirements."
    }
  ];

  // Convert base plans to localized pricing
  const plans = basePlans.map(plan => ({
    ...plan,
    localPrice: {
      monthly: typeof plan.price.monthly === 'string' ? plan.price.monthly : convertPrice(plan.price.monthly, currencyConfig[selectedLocale as keyof typeof currencyConfig]?.code || 'GBP'),
      annual: typeof plan.price.annual === 'string' ? plan.price.annual : convertPrice(plan.price.annual, currencyConfig[selectedLocale as keyof typeof currencyConfig]?.code || 'GBP')
    }
  }));

  const getPrice = (plan: typeof plans[0]) => {
    const price = isAnnual ? plan.localPrice.annual : plan.localPrice.monthly;
    const period = isAnnual ? "year" : "month";
    
    // Handle custom pricing - no savings calculation for custom plans
    if (typeof price === 'string') {
      return { price, period, savings: 0 };
    }
    
    const savings = isAnnual && typeof plan.localPrice.monthly === 'number' && typeof plan.localPrice.annual === 'number' 
      ? Math.round(((plan.localPrice.monthly * 12 - plan.localPrice.annual) / (plan.localPrice.monthly * 12)) * 100) 
      : 0;

    return { price, period, savings };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {planType === 'consumer' ? 'Consumer' : 'Business'} Fraud Protection Plans
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your {planType === 'consumer' ? 'personal and family' : 'business'} needs. No hidden fees, no surprises. 
            All plans include our core fraud prevention and {planType === 'consumer' ? 'identity' : 'transaction'} protection.
          </p>

          {/* Currency & Billing Controls */}
          <div className="flex flex-col items-center space-y-6 mb-8">
            {/* Currency Selector */}
            <div className="flex items-center space-x-4">
              <Globe className="h-5 w-5 text-gray-500" />
              <select 
                value={selectedLocale} 
                onChange={(e) => setSelectedLocale(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <optgroup label="English Speaking">
                  <option value="en-GB">🇬🇧 United Kingdom (£ GBP)</option>
                  <option value="en-US">🇺🇸 United States ($ USD)</option>
                  <option value="en-CA">🇨🇦 Canada (C$ CAD)</option>
                  <option value="en-AU">🇦🇺 Australia (A$ AUD)</option>
                </optgroup>
                <optgroup label="European Union">
                  <option value="de-DE">🇩🇪 Germany (€ EUR)</option>
                  <option value="fr-FR">🇫🇷 France (€ EUR)</option>
                  <option value="es-ES">🇪🇸 Spain (€ EUR)</option>
                  <option value="it-IT">🇮🇹 Italy (€ EUR)</option>
                  <option value="nl-NL">🇳🇱 Netherlands (€ EUR)</option>
                  <option value="pt-PT">🇵🇹 Portugal (€ EUR)</option>
                  <option value="be-BE">🇧🇪 Belgium (€ EUR)</option>
                  <option value="at-AT">🇦🇹 Austria (€ EUR)</option>
                  <option value="ie-IE">🇮🇪 Ireland (€ EUR)</option>
                  <option value="fi-FI">🇫🇮 Finland (€ EUR)</option>
                  <option value="gr-GR">🇬🇷 Greece (€ EUR)</option>
                </optgroup>
                <optgroup label="Nordic Countries">
                  <option value="se-SE">🇸🇪 Sweden (kr SEK)</option>
                  <option value="no-NO">🇳🇴 Norway (kr NOK)</option>
                  <option value="dk-DK">🇩🇰 Denmark (kr DKK)</option>
                  <option value="is-IS">🇮🇸 Iceland (kr ISK)</option>
                </optgroup>
                <optgroup label="Asia Pacific">
                  <option value="jp-JP">🇯🇵 Japan (¥ JPY)</option>
                  <option value="kr-KR">🇰🇷 South Korea (₩ KRW)</option>
                  <option value="cn-CN">🇨🇳 China (¥ CNY)</option>
                  <option value="in-IN">🇮🇳 India (₹ INR)</option>
                  <option value="sg-SG">🇸🇬 Singapore (S$ SGD)</option>
                  <option value="hk-HK">🇭🇰 Hong Kong (HK$ HKD)</option>
                </optgroup>
                <optgroup label="Latin America">
                  <option value="br-BR">🇧🇷 Brazil (R$ BRL)</option>
                  <option value="mx-MX">🇲🇽 Mexico ($ MXN)</option>
                  <option value="ar-AR">🇦🇷 Argentina ($ ARS)</option>
                </optgroup>
                <optgroup label="Middle East & Africa">
                  <option value="ae-AE">🇦🇪 UAE (د.إ AED)</option>
                  <option value="sa-SA">🇸🇦 Saudi Arabia (ر.س SAR)</option>
                  <option value="za-ZA">🇿🇦 South Africa (R ZAR)</option>
                  <option value="ng-NG">🇳🇬 Nigeria (₦ NGN)</option>
                  <option value="ke-KE">🇰🇪 Kenya (KSh KES)</option>
                  <option value="eg-EG">🇪🇬 Egypt (E£ EGP)</option>
                </optgroup>
                <optgroup label="Eastern Europe">
                  <option value="pl-PL">🇵🇱 Poland (zł PLN)</option>
                  <option value="cz-CZ">🇨🇿 Czech Republic (Kč CZK)</option>
                  <option value="hu-HU">🇭🇺 Hungary (Ft HUF)</option>
                  <option value="ro-RO">🇷🇴 Romania (lei RON)</option>
                  <option value="bg-BG">🇧🇬 Bulgaria (лв BGN)</option>
                  <option value="hr-HR">🇭🇷 Croatia (kn HRK)</option>
                  <option value="rs-RS">🇷🇸 Serbia (дин RSD)</option>
                  <option value="ua-UA">🇺🇦 Ukraine (₴ UAH)</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="ch-CH">🇨🇭 Switzerland (CHF)</option>
                  <option value="tr-TR">🇹🇷 Turkey (₺ TRY)</option>
                  <option value="ru-RU">🇷🇺 Russia (₽ RUB)</option>
                </optgroup>
              </select>
            </div>

            {/* Plan Type Toggle */}
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white rounded-full p-1 shadow-md border border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setPlanType('consumer')}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                      planType === 'consumer'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Consumer Plans
                  </button>
                  <button
                    onClick={() => setPlanType('business')}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                      planType === 'business'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Business Plans
                  </button>
                </div>
              </div>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-blue-600' : 'text-gray-500'}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-blue-600"
              />
              <span className={`text-sm font-medium ${isAnnual ? 'text-blue-600' : 'text-gray-500'}`}>
                Annual
              </span>
              {isAnnual && (
                <Badge className="bg-green-100 text-green-800 ml-2">
                  Save up to 17%
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {plans.map((plan, index) => {
            const pricing = getPrice(plan);
            return (
              <Card 
                key={plan.name}
                className={`relative bg-white border-2 shadow-lg ${
                  plan.popular 
                    ? 'border-blue-500 shadow-blue-100' 
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center p-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-6">
                    {plan.description}
                  </CardDescription>

                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        {typeof pricing.price === 'string' 
                          ? pricing.price 
                          : formatPrice(pricing.price, currencyConfig[selectedLocale as keyof typeof currencyConfig]?.code || 'GBP', selectedLocale)
                        }
                      </span>
                      <span className="text-gray-500 ml-2">
                        {typeof pricing.price === 'string' 
                          ? pricing.period 
                          : `/${pricing.period}`
                        }
                      </span>
                    </div>
                    {pricing.savings > 0 && (
                      <p className="text-sm text-green-600 mt-2">
                        Save {pricing.savings}% annually
                      </p>
                    )}
                  </div>



                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                    size="lg"
                    onClick={() => {
                      if (plan.cta === "Contact Sales") {
                        window.location.href = '/auth?mode=contact';
                      } else {
                        window.location.href = '/auth';
                      }
                    }}
                  >
                    {plan.cta}
                  </Button>
                </CardHeader>

                <CardContent className="p-8 pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Features included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, idx) => (
                            <li key={idx} className="flex items-start">
                              <X className="h-4 w-4 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                              <span className="text-sm text-gray-500">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Transaction Fees */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Transaction Fees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-2xl font-bold text-blue-600">
                  {plan.name === 'Starter' && '2.9%'}
                  {plan.name === 'Professional' && '2.4%'}
                  {plan.name === 'Enterprise' && '1.9%'}
                </div>
                <div className="text-sm text-gray-500">+ {formatPrice(0.30, currencyConfig[selectedLocale as keyof typeof currencyConfig]?.code || 'GBP', selectedLocale)} per transaction</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mt-6">
            No fees for failed transactions. Disputed transactions are protected at no additional cost.
          </p>
        </div>

        {/* Add-ons */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Optional Add-ons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <Card key={addon.name} className="bg-white border border-gray-200">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    {addon.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm mb-4">
                    {addon.description}
                  </CardDescription>
                  <div className="text-xl font-bold text-blue-600">
                    {formatPrice(addon.price, currencyConfig[selectedLocale as keyof typeof currencyConfig]?.code || 'GBP', selectedLocale)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {addon.per}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white border border-gray-200">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {faq.answer}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Secure Your Transactions?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses protecting their transactions with TrustVerify
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    onClick={() => window.location.href = '/auth'}
                  >
                    Start Free Trial
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                    onClick={() => window.location.href = '/demo'}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Watch Demo
                  </Button>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}