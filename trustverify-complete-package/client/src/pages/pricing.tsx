import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small businesses",
      price: {
        monthly: 29,
        annual: 290
      },
      features: [
        "Up to 50 transactions/month",
        "Basic identity verification",
        "Standard escrow protection",
        "Email support",
        "2-day settlement",
        "Basic fraud detection",
        "Mobile app access",
        "Transaction history"
      ],
      limitations: [
        "Limited API access",
        "No priority support",
        "Basic reporting only"
      ],
      cta: "Start Free Trial",
      popular: false,
      maxTransactionValue: "$10,000"
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses and teams",
      price: {
        monthly: 99,
        annual: 990
      },
      features: [
        "Up to 500 transactions/month",
        "Advanced KYC verification",
        "Premium escrow protection",
        "Priority email & chat support",
        "Same-day settlement",
        "AI-powered fraud detection",
        "Full API access",
        "Advanced analytics",
        "Team management (up to 10 users)",
        "Custom transaction categories",
        "Dispute resolution assistance",
        "White-label options"
      ],
      limitations: [
        "No phone support",
        "Standard SLA"
      ],
      cta: "Start Free Trial",
      popular: true,
      maxTransactionValue: "$100,000"
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex needs",
      price: {
        monthly: 499,
        annual: 4990
      },
      features: [
        "Unlimited transactions",
        "Enterprise KYC & compliance",
        "Maximum escrow protection",
        "24/7 phone & priority support",
        "Instant settlement options",
        "Custom fraud detection rules",
        "Dedicated API endpoints",
        "Real-time analytics & reporting",
        "Unlimited team members",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantees",
        "Advanced security features",
        "Compliance reporting",
        "Custom workflows"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      maxTransactionValue: "Unlimited"
    }
  ];

  const addOns = [
    {
      name: "Enhanced Verification",
      description: "Additional document verification and biometric checks",
      price: 15,
      per: "per verification"
    },
    {
      name: "Express Settlement",
      description: "Reduce settlement time to under 2 hours",
      price: 25,
      per: "per transaction"
    },
    {
      name: "Compliance Plus",
      description: "Advanced AML and sanctions screening",
      price: 299,
      per: "per month"
    },
    {
      name: "Custom Integration",
      description: "Dedicated development for platform integration",
      price: 2500,
      per: "one-time setup"
    }
  ];

  const faqs = [
    {
      question: "What's included in the free trial?",
      answer: "All plans include a 14-day free trial with full access to features. No credit card required to start."
    },
    {
      question: "How does pricing scale with transaction volume?",
      answer: "Our pricing is based on monthly transaction limits. For higher volumes, Enterprise plans offer unlimited transactions with custom pricing available."
    },
    {
      question: "What are the transaction fees?",
      answer: "Transaction fees range from 2.9% + $0.30 (Starter) to 1.9% + $0.30 (Enterprise) per successful transaction. Disputed transactions have no additional fees."
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
      answer: "No setup fees for Starter and Professional plans. Enterprise plans may have custom setup depending on integration requirements."
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    const price = isAnnual ? plan.price.annual : plan.price.monthly;
    const period = isAnnual ? "year" : "month";
    const savings = isAnnual ? Math.round(((plan.price.monthly * 12 - plan.price.annual) / (plan.price.monthly * 12)) * 100) : 0;

    return { price, period, savings };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. No hidden fees, no surprises. 
            All plans include our core fraud prevention and escrow protection.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
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
                        ${pricing.price}
                      </span>
                      <span className="text-gray-500 ml-2">
                        /{pricing.period}
                      </span>
                    </div>
                    {pricing.savings > 0 && (
                      <p className="text-sm text-green-600 mt-2">
                        Save {pricing.savings}% annually
                      </p>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    Max transaction value: {plan.maxTransactionValue}
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
                <div className="text-sm text-gray-500">+ $0.30 per transaction</div>
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
                    ${addon.price}
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
                    onClick={() => window.open('mailto:sales@trustverify.com?subject=Enterprise Pricing Inquiry', '_blank')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Sales
                  </Button>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}