import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Info, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SecurityDisclaimerProps {
  variant?: 'default' | 'compact';
}

export function SecurityDisclaimer({ variant = 'default' }: SecurityDisclaimerProps) {
  if (variant === 'compact') {
    return (
      <div className="text-xs text-gray-500 text-center p-3 border-t bg-gray-50">
        <p className="mb-1">
          <strong>Disclaimer:</strong> Analysis results are for informational purposes only and should not be the sole basis for security decisions.
        </p>
        <p>
          TrustVerify provides technical analysis but cannot guarantee complete accuracy. Always verify website legitimacy through official channels.
        </p>
      </div>
    );
  }

  return (
    <Card className="mt-8 border-blue-200 bg-blue-50/50">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Important Disclaimer</h3>
            <div className="space-y-3 text-sm text-blue-800">
              <p>
                <strong>Informational Tool Only:</strong> This website integrity checker provides technical analysis for educational and informational purposes. Results should not be the sole basis for making security or business decisions.
              </p>
              
              <p>
                <strong>Accuracy Limitations:</strong> While we use real-time security analysis, no automated system can guarantee 100% accuracy. False positives and false negatives may occur. Always verify website legitimacy through official channels.
              </p>
              
              <p>
                <strong>Not Professional Advice:</strong> This analysis does not constitute professional security, legal, or financial advice. For critical decisions, consult qualified professionals.
              </p>

              <p>
                <strong>No Warranty:</strong> TrustVerify provides this service "as is" without warranties of any kind. We are not liable for any decisions made based on our analysis results.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-200 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Found an issue with our analysis?</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              className="text-blue-700 border-blue-300 hover:bg-blue-100"
              onClick={() => window.open('mailto:support@trustverify.com?subject=Website Analysis Feedback', '_blank')}
            >
              <Mail className="h-4 w-4 mr-2" />
              Report Issue
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="text-blue-700 border-blue-300 hover:bg-blue-100"
              onClick={() => window.open('/contact', '_blank')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Request Review
            </Button>
          </div>
          
          <p className="text-xs text-blue-600 mt-3">
            We continuously improve our analysis accuracy and welcome your feedback to enhance our service.
          </p>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-yellow-800">
              <strong>Security Reminder:</strong> Never share sensitive information (passwords, financial details, personal data) with websites you haven't independently verified, regardless of our analysis results.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}