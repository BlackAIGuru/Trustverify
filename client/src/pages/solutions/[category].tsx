import { useRoute } from "wouter";
import { getCategoryById } from "@/data/products";
import { CategoryOverview } from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ChevronRight } from "lucide-react";
import NotFound from "../not-found";

export default function CategoryPage() {
  const [, params] = useRoute("/solutions/:category");
  const categoryId = params?.category;
  
  if (!categoryId) {
    return <NotFound />;
  }
  
  const category = getCategoryById(categoryId);
  
  if (!category) {
    return <NotFound />;
  }

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
            <span className="text-gray-500">{category.name}</span>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/solutions">
            <Button variant="outline" className="group">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to All Solutions
            </Button>
          </Link>
        </div>
      </section>

      {/* Category Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryOverview category={category} />
        </div>
      </section>

      {/* Related CTA */}
      <section className="py-16 bg-[#003366] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Need Help Choosing the Right Solution?
          </h2>
          <p className="text-lg text-white/90">
            Our fraud protection experts are here to help you find the perfect solution for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/enterprise-contact">
              <Button size="lg" className="bg-[#FFB400] text-[#003366] hover:bg-[#FFB400]/90 font-semibold">
                Talk to an Expert
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#003366] font-semibold">
                Try Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}