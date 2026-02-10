import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Brain, TrendingUp, CheckCircle, Target, Zap, Globe } from "lucide-react";
import { Navigation } from "@/components/navigation";

export default function FraudDetection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Advanced Fraud Detection
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Protect your business with AI-powered fraud detection that identifies suspicious activities 
              in real-time, preventing losses before they occur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Fraud Protection
            </h2>
            <p className="text-lg text-gray-600">
              Multi-layered detection algorithms that adapt to emerging threats
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Brain className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>AI-Powered Analysis</CardTitle>
                <CardDescription>
                  Machine learning algorithms analyze patterns and behaviors to detect anomalies in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Behavioral pattern recognition</li>
                  <li>• Device fingerprinting</li>
                  <li>• Transaction velocity analysis</li>
                  <li>• Geolocation anomaly detection</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Real-Time Scoring</CardTitle>
                <CardDescription>
                  Instant risk assessment with dynamic scoring that updates as new data becomes available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Sub-second response times</li>
                  <li>• Dynamic risk thresholds</li>
                  <li>• Confidence scoring</li>
                  <li>• Automated decision rules</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Globe className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Global Intelligence</CardTitle>
                <CardDescription>
                  Leverage worldwide fraud databases and threat intelligence for comprehensive protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Cross-platform data sharing</li>
                  <li>• Known fraud pattern matching</li>
                  <li>• IP reputation analysis</li>
                  <li>• Email domain verification</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Target className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Precision Targeting</CardTitle>
                <CardDescription>
                  Advanced algorithms minimize false positives while maximizing fraud detection accuracy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 99.8% accuracy rate</li>
                  <li>• &lt;0.1% false positive rate</li>
                  <li>• Custom rule engines</li>
                  <li>• Industry-specific models</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <AlertTriangle className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Threat Intelligence</CardTitle>
                <CardDescription>
                  Stay ahead of emerging threats with continuously updated fraud intelligence networks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Daily threat updates</li>
                  <li>• Industry collaboration</li>
                  <li>• Emerging pattern detection</li>
                  <li>• Proactive alerts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Adaptive Learning</CardTitle>
                <CardDescription>
                  Continuously improving detection models that learn from your specific business patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Business-specific tuning</li>
                  <li>• Feedback loop optimization</li>
                  <li>• Model performance metrics</li>
                  <li>• Seasonal pattern recognition</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Our Fraud Detection Works
            </h2>
            <p className="text-lg text-gray-600">
              A comprehensive four-stage process that ensures maximum protection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Collection</h3>
              <p className="text-gray-600">
                Gather transaction details, user behavior, device information, and contextual data
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Apply machine learning models to identify patterns and anomalies in real-time
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Risk Scoring</h3>
              <p className="text-gray-600">
                Generate dynamic risk scores with confidence levels and detailed explanations
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Action & Response</h3>
              <p className="text-gray-600">
                Trigger appropriate responses based on risk levels and business rules
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Proven Results Across Industries
            </h2>
            <p className="text-xl text-blue-100">
              Trusted by leading companies worldwide to protect billions in transactions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300 mb-2">AI-First</div>
              <div className="text-lg font-medium">Detection Technology</div>
              <div className="text-sm text-blue-200 mt-1">Advanced machine learning</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300 mb-2">Real-Time</div>
              <div className="text-lg font-medium">Protection Ready</div>
              <div className="text-sm text-blue-200 mt-1">Instant fraud prevention</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300 mb-2">150ms</div>
              <div className="text-lg font-medium">Response Speed</div>
              <div className="text-sm text-blue-200 mt-1">Lightning-fast analysis</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300 mb-2">Global</div>
              <div className="text-lg font-medium">Coverage Ready</div>
              <div className="text-sm text-blue-200 mt-1">Worldwide protection</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center text-white">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Ready to Eliminate Fraud?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the next generation of fraud protection with TrustVerify's comprehensive platform 
            designed to protect your transactions and customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}