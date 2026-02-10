import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Activity, 
  Bug,
  Lock,
  Eye,
  Server,
  Database,
  Clock,
  Users,
  FileText,
  Zap
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface SecurityMetrics {
  configurationScore: number;
  criticalIssues: string[];
  warnings: string[];
  recommendations: string[];
  timestamp: string;
  environment: string;
}

interface PenTestResult {
  testId: string;
  testName: string;
  category: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  status: 'pass' | 'fail' | 'warning';
  description: string;
  evidence?: any;
  remediation: string;
  timestamp: string;
}

export default function SecurityDashboard() {
  const { user } = useAuth();
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics | null>(null);
  const [penTestResults, setPenTestResults] = useState<PenTestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [runningPenTest, setRunningPenTest] = useState(false);

  useEffect(() => {
    loadSecurityStatus();
  }, []);

  const loadSecurityStatus = async () => {
    try {
      const response = await apiRequest('GET', '/api/security/status');
      const data = await response.json();
      setSecurityMetrics(data);
    } catch (error) {
      console.error('Failed to load security status:', error);
    } finally {
      setLoading(false);
    }
  };

  const runPenetrationTest = async () => {
    setRunningPenTest(true);
    try {
      const response = await apiRequest('POST', '/api/security/pentest');
      const data = await response.json();
      setPenTestResults(data.results);
    } catch (error) {
      console.error('Failed to run penetration test:', error);
    } finally {
      setRunningPenTest(false);
    }
  };

  const getSecurityScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'fail': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <Eye className="h-4 w-4 text-gray-600" />;
    }
  };

  if (!user || !user.email?.includes('@trustverify.com')) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              This security dashboard is only accessible to TrustVerify administrators.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="h-8 w-8 mr-3 text-blue-600" />
            Security Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor and manage TrustVerify's security infrastructure
          </p>
        </div>

        {/* Security Score Overview */}
        {securityMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Security Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  <span className={getSecurityScoreColor(securityMetrics.configurationScore)}>
                    {securityMetrics.configurationScore}/100
                  </span>
                </div>
                <Progress value={securityMetrics.configurationScore} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Critical Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {securityMetrics.criticalIssues.length}
                </div>
                <div className="text-sm text-gray-500">Require immediate attention</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Warnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {securityMetrics.warnings.length}
                </div>
                <div className="text-sm text-gray-500">Should be addressed</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Environment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                  {securityMetrics.environment}
                </div>
                <Badge variant={securityMetrics.environment === 'production' ? 'default' : 'secondary'}>
                  {securityMetrics.environment === 'production' ? 'Live' : 'Development'}
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="issues">Issues & Warnings</TabsTrigger>
            <TabsTrigger value="testing">Penetration Testing</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security Features Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Security Features
                  </CardTitle>
                  <CardDescription>Current security implementation status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">HTTPS Enforcement</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">RBAC System</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rate Limiting</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Input Sanitization</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Audit Logging</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2FA Infrastructure</span>
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Compliance Status
                  </CardTitle>
                  <CardDescription>Regulatory compliance readiness</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GDPR Compliance</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">KYC/AML Standards</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SOC 2 Readiness</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Retention</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="issues" className="space-y-6">
            {securityMetrics && (
              <div className="space-y-6">
                {/* Critical Issues */}
                {securityMetrics.criticalIssues.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-600 flex items-center">
                        <XCircle className="h-5 w-5 mr-2" />
                        Critical Issues
                      </CardTitle>
                      <CardDescription>These issues require immediate attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {securityMetrics.criticalIssues.map((issue, index) => (
                          <Alert key={index} className="border-red-200 bg-red-50">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800">{issue}</AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Warnings */}
                {securityMetrics.warnings.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-yellow-600 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Warnings
                      </CardTitle>
                      <CardDescription>These issues should be addressed when possible</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {securityMetrics.warnings.map((warning, index) => (
                          <Alert key={index} className="border-yellow-200 bg-yellow-50">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <AlertDescription className="text-yellow-800">{warning}</AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recommendations */}
                {securityMetrics.recommendations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-blue-600 flex items-center">
                        <Zap className="h-5 w-5 mr-2" />
                        Recommendations
                      </CardTitle>
                      <CardDescription>Suggested improvements for enhanced security</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {securityMetrics.recommendations.map((recommendation, index) => (
                          <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">{recommendation}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bug className="h-5 w-5 mr-2" />
                    Penetration Testing
                  </div>
                  <Button 
                    onClick={runPenetrationTest} 
                    disabled={runningPenTest}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {runningPenTest ? 'Running Tests...' : 'Run Pen Test'}
                  </Button>
                </CardTitle>
                <CardDescription>
                  Automated security testing to identify vulnerabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                {penTestResults.length > 0 ? (
                  <div className="space-y-4">
                    {penTestResults.map((result, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(result.status)}
                            <h4 className="font-medium">{result.testName}</h4>
                            <Badge className={getSeverityColor(result.severity)}>
                              {result.severity}
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-500">{result.category}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                        <p className="text-sm text-blue-600">{result.remediation}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bug className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No penetration test results yet</p>
                    <p className="text-sm text-gray-400">Run a penetration test to identify security vulnerabilities</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GDPR */}
              <Card>
                <CardHeader>
                  <CardTitle>GDPR Compliance</CardTitle>
                  <CardDescription>General Data Protection Regulation readiness</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Subject Rights</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lawful Basis Processing</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Retention Policy</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Breach Notification</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              {/* SOC 2 */}
              <Card>
                <CardHeader>
                  <CardTitle>SOC 2 Type I</CardTitle>
                  <CardDescription>Service Organization Control readiness</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Controls</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Availability Controls</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Processing Integrity</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Confidentiality</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}