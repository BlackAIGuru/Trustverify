import { productCategories, getAllProducts } from "@/data/products";
import { ProductGrid, CategoryOverview } from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Users, Building, Shield, Headphones } from "lucide-react";

export default function Solutions() {
  const allProducts = getAllProducts();
  const popularProducts = allProducts.filter(product => product.popular);
  const newProducts = allProducts.filter(product => product.new);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#003366] via-[#004080] to-[#00C2A8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Our <span className="text-[#FFB400]">Complete</span> Solutions
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                From detection to resolution - comprehensive fraud protection for individuals and businesses worldwide
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button size="lg" className="bg-[#FFB400] text-[#003366] hover:bg-[#FFB400]/90 font-semibold px-8 py-4">
                  <Users className="w-5 h-5 mr-2" />
                  Consumer Solutions
                </Button>
              </Link>
              <Link href="/business">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#003366] font-semibold px-8 py-4">
                  <Building className="w-5 h-5 mr-2" />
                  Business Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-[#003366]">AI-Powered</div>
              <div className="text-gray-600">Fraud Detection</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-[#003366]">72hrs</div>
              <div className="text-gray-600">Resolution Time</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-[#003366]">Enterprise</div>
              <div className="text-gray-600">Grade Security</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-[#003366]">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      {popularProducts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductGrid 
              products={popularProducts}
              title="Most Popular Solutions"
              description="Our top-rated fraud protection services designed for modern businesses"
              columns={3}
            />
          </div>
        </section>
      )}

      {/* Product Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003366]">
              Complete Product Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of fraud protection solutions organized by category
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {productCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-br from-[#00C2A8] to-[#003366] rounded-xl text-white group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold text-[#003366] group-hover:text-[#00C2A8] transition-colors">
                          {category.name}
                        </CardTitle>
                        <div className="text-sm text-gray-500 mt-1">
                          {category.products.length} Products
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {category.description}
                    </CardDescription>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-[#003366]">Featured Products:</h4>
                      <div className="space-y-2">
                        {category.products.slice(0, 3).map((product) => (
                          <div key={product.id} className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-[#00C2A8] rounded-full"></div>
                            <span className="text-gray-600">{product.name}</span>
                            {product.popular && (
                              <div className="text-xs bg-[#FFB400] text-white px-2 py-0.5 rounded-full">
                                Popular
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Link href={`/solutions/${category.id}`}>
                      <Button className="w-full bg-[#003366] hover:bg-[#00C2A8] transition-all duration-300 group">
                        Explore {category.name}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* New Products Section */}
      {newProducts.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-[#003366]/5 to-[#00C2A8]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductGrid 
              products={newProducts}
              title="Latest Innovations"
              description="Cutting-edge fraud protection technologies now available"
              columns={newProducts.length >= 3 ? 3 : 2}
            />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#003366] to-[#00C2A8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90">
              Choose the right fraud protection solution for your needs today
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-[#FFB400] text-[#003366] hover:bg-[#FFB400]/90 font-semibold px-8 py-4">
                <Shield className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/enterprise-contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#003366] font-semibold px-8 py-4">
                <Headphones className="w-5 h-5 mr-2" />
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}