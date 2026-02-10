import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { LanguageProvider } from "@/hooks/use-language";
import { ProtectedRoute } from "./lib/protected-route";
import ZendeskChat from "@/components/ZendeskChat";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import PasswordResetPage from "@/pages/password-reset";
import DemoPage from "@/pages/demo-page";
import Dashboard from "@/pages/dashboard";
import Transactions from "@/pages/transactions";
import Messages from "@/pages/messages";
import ScamReports from "@/pages/scam-reports";
import AdminDashboard from "@/pages/admin-dashboard";
import DeveloperPortal from "@/pages/developer-portal";
import VerificationPage from "@/pages/verification-page";
import EscrowPage from "@/pages/escrow-page";
import ReportScam from "@/pages/report-scam";
import PricingPage from "@/pages/pricing";
import SecurityDashboard from "@/pages/security-dashboard";
import NotFound from "@/pages/not-found";
import NewTransaction from "@/pages/new-transaction";
import TransactionDetail from "@/pages/transaction-detail";
import SdkDocumentation from "@/pages/sdk-documentation";
import IntegrationExamples from "@/pages/integration-examples";
import ApiReference from "@/pages/api-reference";
import TermsOfService from "@/pages/terms-of-service-new";
import PrivacyPolicy from "@/pages/privacy-policy-new";
import RegulatoryCompliance from "@/pages/regulatory-compliance";
import Disclaimer from "@/pages/disclaimer";
import AboutUs from "@/pages/about-us";
import Careers from "@/pages/careers";
import Press from "@/pages/press";
import Contact from "@/pages/contact";
import HelpCenter from "@/pages/help-center";
import FraudPreventionPage from "@/pages/fraud-prevention";
import WebsiteIntegrityPage from "@/pages/website-integrity";
import PDFReportPage from "@/pages/pdf-report";
import PlatformPage from "@/pages/platform";
import DevelopersPage from "@/pages/developers";
import BusinessPage from "@/pages/business";
import ApiDocs from "@/pages/api-docs";
import EnterpriseContact from "@/pages/enterprise-contact";
import Resources from "@/pages/resources";
import SupportCenter from "@/pages/support-center";
import UserGuide from "@/pages/user-guide";
import ApiKeys from "@/pages/api-keys";
import ApiDocsPage from "@/pages/api-docs";
import WebhooksPage from "@/pages/webhooks";
import FraudDemo from "@/pages/fraud-demo";
import UnifiedFraudDemo from "@/pages/unified-fraud-demo";
import BusinessFlowDemo from "@/pages/business-flow-demo";
import Solutions from "@/pages/solutions";
import CategoryPage from "@/pages/solutions/[category]";
import ProductPage from "@/pages/products/[productId]";
import FraudAcademy from "@/pages/fraud-academy";
import LmsDashboard from "@/pages/lms-dashboard";
import EnrollPage from "@/pages/enroll";
import CoursePage from "@/pages/course/[courseLevel]";
import CertificatesPage from "@/pages/certificates";
import MenuPage from "@/pages/menu";
import TrustScoreDemo from "@/pages/trustscore-demo";
import { lazy } from "react";

const TrustReportPage = lazy(() => import("@/pages/trust-report"));
const WidgetEmbedPage = lazy(() => import("@/pages/widget-embed"));
const FeaturesPage = lazy(() => import("@/pages/features"));


function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/menu" component={MenuPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/password-reset" component={PasswordResetPage} />
      <Route path="/demo" component={DemoPage} />
      <Route path="/trustscore-demo" component={TrustScoreDemo} />
      <Route path="/fraud-demo" component={FraudDemo} />
      <Route path="/complete-demo" component={UnifiedFraudDemo} />
      <Route path="/business-flow" component={BusinessFlowDemo} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/solutions/:category" component={CategoryPage} />
      <Route path="/products/:productId" component={ProductPage} />
      <Route path="/sdk-documentation" component={SdkDocumentation} />
      <Route path="/integration-examples" component={IntegrationExamples} />
      <Route path="/api-reference" component={ApiReference} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/regulatory-compliance" component={RegulatoryCompliance} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/careers" component={Careers} />
      <Route path="/press" component={Press} />
      <Route path="/contact" component={Contact} />
      <Route path="/help-center" component={HelpCenter} />
      <Route path="/fraud-prevention" component={FraudPreventionPage} />
      <Route path="/website-integrity" component={WebsiteIntegrityPage} />
      <Route path="/pdf-report" component={PDFReportPage} />
      <Route path="/trust-report/:domain" component={TrustReportPage} />
      <Route path="/widget/trust-score" component={WidgetEmbedPage} />
      <Route path="/features" component={FeaturesPage} />
      <Route path="/platform" component={PlatformPage} />
      <Route path="/developers" component={DevelopersPage} />
      <Route path="/business" component={BusinessPage} />
      <Route path="/fraud-academy" component={FraudAcademy} />
      <Route path="/academy" component={FraudAcademy} />
      <Route path="/training" component={FraudAcademy} />
      <Route path="/lms/dashboard" component={LmsDashboard} />
      <Route path="/enroll/:level" component={EnrollPage} />
      <Route path="/course/:courseLevel" component={CoursePage} />
      <Route path="/certificates" component={CertificatesPage} />
      <Route path="/api-docs" component={ApiDocs} />
      <Route path="/enterprise-contact" component={EnterpriseContact} />
      <Route path="/resources" component={Resources} />
      <Route path="/support-center" component={SupportCenter} />
      <Route path="/user-guide" component={UserGuide} />
      <Route path="/api-keys" component={ApiKeys} />
      <Route path="/api-docs" component={ApiDocsPage} />
      <Route path="/webhooks" component={WebhooksPage} />
      <Route path="/api-playground" component={ApiDocsPage} />
      <Route path="/docs/sdk/:language" component={ApiDocsPage} />
      <Route path="/examples/:type" component={ApiDocsPage} />

      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/dashboard/business-flow" component={BusinessFlowDemo} />
      <ProtectedRoute path="/transactions/new" component={NewTransaction} />
      <ProtectedRoute path="/transactions/:id" component={TransactionDetail} />
      <ProtectedRoute path="/transactions" component={Transactions} />
      <ProtectedRoute path="/messages" component={Messages} />
      <ProtectedRoute path="/scam-reports" component={ScamReports} />
      <ProtectedRoute path="/admin-dashboard" component={AdminDashboard} />
      <ProtectedRoute path="/developer-portal" component={DeveloperPortal} />
      <ProtectedRoute path="/verification" component={VerificationPage} />
      <ProtectedRoute path="/escrow" component={EscrowPage} />
      <ProtectedRoute path="/report-scam" component={ReportScam} />
      <ProtectedRoute path="/security-dashboard" component={SecurityDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <ZendeskChat />
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
