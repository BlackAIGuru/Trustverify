import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
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
import SdkDocumentation from "@/pages/sdk-documentation";
import IntegrationExamples from "@/pages/integration-examples";
import ApiReference from "@/pages/api-reference";
import TermsOfService from "@/pages/terms-of-service-new";
import PrivacyPolicy from "@/pages/privacy-policy-new";
import RegulatoryCompliance from "@/pages/regulatory-compliance";
import Disclaimer from "@/pages/disclaimer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/password-reset" component={PasswordResetPage} />
      <Route path="/demo" component={DemoPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/sdk-documentation" component={SdkDocumentation} />
      <Route path="/integration-examples" component={IntegrationExamples} />
      <Route path="/api-reference" component={ApiReference} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/regulatory-compliance" component={RegulatoryCompliance} />
      <Route path="/disclaimer" component={Disclaimer} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/transactions/new" component={NewTransaction} />
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
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
