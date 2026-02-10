import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, Award, AlertTriangle, CheckCircle, Globe, Clock } from "lucide-react";
import { Navigation } from "@/components/navigation";

export default function Security() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 p-4 rounded-full">
                <Shield className="h-12 w-12 text-red-600" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Security Practices & Compliance
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              TrustVerify employs enterprise-grade security measures, encryption, and compliance 
              frameworks to protect user data and transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 px-8 py-4">
                Security Report
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4">
                Contact Security Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Security Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Security Framework
            </h2>
            <p className="text-lg text-gray-600">
              Multi-layered security approach protecting every aspect of our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Lock className="h-10 w-10 text-red-600 mb-4" />
                <CardTitle>End-to-End Encryption</CardTitle>
                <CardDescription>
                  All data is encrypted in transit and at rest using AES-256 encryption
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• TLS 1.3 for data in transit</li>
                  <li>• AES-256 encryption at rest</li>
                  <li>• Perfect forward secrecy</li>
                  <li>• Hardware security modules (HSM)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Eye className="h-10 w-10 text-red-600 mb-4" />
                <CardTitle>24/7 Monitoring</CardTitle>
                <CardDescription>
                  Continuous security monitoring with real-time threat detection and response
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time threat detection</li>
                  <li>• Automated incident response</li>
                  <li>• Security operations center (SOC)</li>
                  <li>• Machine learning anomaly detection</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Award className="h-10 w-10 text-red-600 mb-4" />
                <CardTitle>Compliance Certifications</CardTitle>
                <CardDescription>
                  Industry-leading compliance with global security standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• SOC 2 Type II certified</li>
                  <li>• ISO 27001 compliant</li>
                  <li>• PCI DSS Level 1</li>
                  <li>• GDPR & CCPA compliant</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Shield className="h-10 w-10 text-red-600 mb-4" />
                <CardTitle>Access Controls</CardTitle>
                <CardDescription>
                  Zero-trust architecture with multi-factor authentication and role-based access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Multi-factor authentication (MFA)</li>
                  <li>• Role-based access control (RBAC)</li>
                  <li>• Single sign-on (SSO) support</li>
                  <li>• Session management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <AlertTriangle className="h-10 w-10 text-red-600 mb-4" />
                <CardTitle>Incident Response</CardTitle>
                <CardDescription>
                  Comprehensive incident response plan with rapid containment and resolution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 24/7 security team</li>
                  <li>• Incident escalation procedures</li>
                  <li>• Forensic investigation capabilities</li>
                  <li>• Customer notification protocols</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Globe className="h-10 w-10 text-red-600 mb-4" />
                <CardTitle>Data Protection</CardTitle>
                <CardDescription>
                  Comprehensive data protection with privacy by design principles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Data minimization practices</li>
                  <li>• Automated data retention policies</li>
                  <li>• Right to erasure compliance</li>
                  <li>• Cross-border data protection</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Architecture */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Security Architecture
            </h2>
            <p className="text-lg text-gray-600">
              Defense in depth approach with multiple security layers
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Network Security</h3>
              <p className="text-gray-600 mb-4">
                Advanced firewalls, DDoS protection, and network segmentation
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Web Application Firewall</li>
                <li>• DDoS mitigation</li>
                <li>• Network segmentation</li>
                <li>• Intrusion detection</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Application Security</h3>
              <p className="text-gray-600 mb-4">
                Secure coding practices with regular security testing and reviews
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Static code analysis</li>
                <li>• Penetration testing</li>
                <li>• Vulnerability scanning</li>
                <li>• Code reviews</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive data protection with encryption and access controls
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Field-level encryption</li>
                <li>• Key management</li>
                <li>• Data loss prevention</li>
                <li>• Secure backup</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Monitoring & Response</h3>
              <p className="text-gray-600 mb-4">
                Continuous monitoring with automated threat response capabilities
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• SIEM integration</li>
                <li>• Automated response</li>
                <li>• Threat intelligence</li>
                <li>• Forensic analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-900 to-pink-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Regulatory Compliance
            </h2>
            <p className="text-xl text-red-100">
              Meeting the highest standards for data protection and privacy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-300 mb-2">SOC 2</div>
              <div className="text-lg font-medium">Type II</div>
              <div className="text-sm text-red-200 mt-1">Security & availability</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-red-300 mb-2">ISO</div>
              <div className="text-lg font-medium">27001</div>
              <div className="text-sm text-red-200 mt-1">Information security</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-red-300 mb-2">PCI DSS</div>
              <div className="text-lg font-medium">Level 1</div>
              <div className="text-sm text-red-200 mt-1">Payment security</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-red-300 mb-2">GDPR</div>
              <div className="text-lg font-medium">Compliant</div>
              <div className="text-sm text-red-200 mt-1">Data privacy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Security Best Practices
            </h2>
            <p className="text-lg text-gray-600">
              Our commitment to security extends beyond technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-red-600">Employee Security Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  All employees undergo comprehensive security training and background checks.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Mandatory security awareness training</li>
                  <li>• Regular phishing simulation exercises</li>
                  <li>• Background verification processes</li>
                  <li>• Confidentiality agreements</li>
                  <li>• Principle of least privilege access</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-red-600">Third-Party Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  All vendors and integrations undergo rigorous security assessments.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Vendor security assessments</li>
                  <li>• Contractual security requirements</li>
                  <li>• Regular security reviews</li>
                  <li>• Supply chain risk management</li>
                  <li>• Integration security testing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-red-600">Vulnerability Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Proactive vulnerability identification and remediation processes.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Regular penetration testing</li>
                  <li>• Automated vulnerability scanning</li>
                  <li>• Bug bounty program</li>
                  <li>• Patch management process</li>
                  <li>• Security advisory monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-red-600">Business Continuity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Comprehensive disaster recovery and business continuity planning.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Multi-region redundancy</li>
                  <li>• Automated backup systems</li>
                  <li>• Disaster recovery testing</li>
                  <li>• Business continuity planning</li>
                  <li>• RTO/RPO objectives</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Contact */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Shield className="h-16 w-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Report Security Issues
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            If you discover a security vulnerability, please report it responsibly. 
            We appreciate your help in keeping TrustVerify secure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 px-8 py-4">
              Report Vulnerability
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4">
              Security@trustverify.com
            </Button>
          </div>
          <div className="mt-8 text-sm text-gray-400">
            <p>We commit to responding to security reports within 24 hours</p>
          </div>
        </div>
      </section>
    </div>
  );
}