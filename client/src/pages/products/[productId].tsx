import { useRoute } from "wouter";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, ChevronRight, Star, Zap, CheckCircle } from "lucide-react";
import NotFound from "../not-found";

export default function ProductPage() {
  const [, params] = useRoute("/products/:productId");
  const productId = params?.productId;
  
  if (!productId) {
    return <NotFound />;
  }
  
  const product = getProductById(productId);
  
  if (!product) {
    return <NotFound />;
  }

  const Icon = product.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb Navigation */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#003366] hover:text-[#00C2A8] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/solutions" className="text-[#003366] hover:text-[#00C2A8] transition-colors">
              Solutions
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href={`/solutions/${product.category}`} className="text-[#003366] hover:text-[#00C2A8] transition-colors">
              {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/solutions/${product.category}`}>
            <Button variant="outline" className="group">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Button>
          </Link>
        </div>
      </section>

      {/* Product Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-[#00C2A8] to-[#003366] rounded-2xl text-white">
                    <Icon className="w-12 h-12" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.popular && (
                      <Badge className="bg-[#FFB400] text-white hover:bg-[#FFB400]/90">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {product.new && (
                      <Badge className="bg-gradient-to-r from-[#00C2A8] to-[#003366] text-white">
                        <Zap className="w-3 h-3 mr-1" />
                        New
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#003366] leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {product.pricing && (
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold text-[#003366]">{product.pricing.price}</span>
                      {product.pricing.period && (
                        <span className="text-lg text-gray-500">/{product.pricing.period}</span>
                      )}
                    </div>
                    {product.pricing.tier && (
                      <div className="text-sm text-gray-600">
                        {product.pricing.tier} Plan
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={product.cta.href}>
                  <Button size="lg" className="bg-gradient-to-r from-[#00C2A8] to-[#003366] hover:shadow-lg transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                    {product.cta.text}
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Try Live Demo
                  </Button>
                </Link>
              </div>
            </div>

            {/* Product Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#003366]/5 to-[#00C2A8]/5 rounded-3xl p-12 border-2 border-[#00C2A8]/20">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center justify-center h-64">
                    <Icon className="w-32 h-32 text-[#003366]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003366] mb-4">Key Features & Benefits</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to protect against fraud and secure your transactions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.features.map((feature, index) => (
              <Card key={index} className="border-l-4 border-l-[#00C2A8] hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-[#00C2A8]/10 rounded-lg flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#00C2A8]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#003366] mb-2">{feature}</h3>
                      <p className="text-gray-600 text-sm">
                        Advanced protection feature designed to keep your business and customers safe from emerging threats.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#003366] to-[#00C2A8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started with {product.name}?
            </h2>
            <p className="text-xl text-white/90">
              Join the next generation of secure business transactions with TrustVerify
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={product.cta.href}>
              <Button size="lg" className="bg-[#FFB400] text-[#003366] hover:bg-[#FFB400]/90 font-semibold px-8 py-4">
                {product.cta.text}
              </Button>
            </Link>
            <Link href="/enterprise-contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#003366] font-semibold px-8 py-4">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}