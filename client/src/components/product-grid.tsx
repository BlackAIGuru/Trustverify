import { Product, ProductCategory } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, Star, Zap } from "lucide-react";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  hidePricing?: boolean;
}

export function ProductCard({ product, featured = false, hidePricing = false }: ProductCardProps) {
  const Icon = product.icon;
  
  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
      featured ? 'ring-2 ring-[#00C2A8] shadow-lg' : 'hover:shadow-xl'
    }`}>
      {product.popular && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-[#FFB400] text-white hover:bg-[#FFB400]/90">
            <Star className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}
      
      {product.new && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-gradient-to-r from-[#00C2A8] to-[#003366] text-white">
            <Zap className="w-3 h-3 mr-1" />
            New
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-xl ${
            featured ? 'bg-gradient-to-br from-[#00C2A8] to-[#003366]' : 'bg-[#003366]'
          } text-white transition-transform group-hover:scale-110`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-[#003366] group-hover:text-[#00C2A8] transition-colors">
              {product.name}
            </CardTitle>
            {product.pricing && !hidePricing && (
              <div className="flex items-baseline space-x-1 mt-1">
                <span className="text-2xl font-bold text-[#003366]">{product.pricing.price}</span>
                {product.pricing.period && (
                  <span className="text-sm text-gray-500">/{product.pricing.period}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-gray-600 leading-relaxed">
          {product.description}
        </CardDescription>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-[#003366]">Key Features:</h4>
          <ul className="space-y-1">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-[#00C2A8] rounded-full mt-2 flex-shrink-0"></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Link href={product.cta.href}>
          <Button className={`w-full group ${
            featured 
              ? 'bg-gradient-to-r from-[#00C2A8] to-[#003366] hover:shadow-lg transform hover:scale-105' 
              : 'bg-[#003366] hover:bg-[#00C2A8]'
          } transition-all duration-300`}>
            {product.cta.text}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
  featuredProductId?: string;
  columns?: 2 | 3 | 4;
  hidePricing?: boolean;
}

export function ProductGrid({ 
  products, 
  title, 
  description, 
  featuredProductId,
  columns = 3,
  hidePricing = false 
}: ProductGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3', 
    4: 'md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className="space-y-8">
      {(title || description) && (
        <div className="text-center space-y-4">
          {title && (
            <h2 className="text-3xl font-bold text-[#003366]">{title}</h2>
          )}
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
          )}
        </div>
      )}
      
      <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            featured={product.id === featuredProductId}
            hidePricing={hidePricing}
          />
        ))}
      </div>
    </div>
  );
}

interface CategoryOverviewProps {
  category: ProductCategory;
}

export function CategoryOverview({ category }: CategoryOverviewProps) {
  const Icon = category.icon;
  
  return (
    <div className="space-y-12">
      {/* Category Header */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-br from-[#00C2A8] to-[#003366] rounded-2xl text-white">
            <Icon className="w-12 h-12" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[#003366]">{category.name}</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>
      
      {/* Products Grid */}
      <ProductGrid 
        products={category.products}
        columns={category.products.length >= 4 ? 4 : 3}
      />
    </div>
  );
}