import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DigitalCertificate } from "@/components/digital-certificate";
import { 
  Shield, 
  Award, 
  Calendar,
  Download,
  Eye,
  Search,
  Filter,
  ArrowRight,
  Trophy,
  CheckCircle2,
  Star
} from "lucide-react";
import { useState } from "react";

export default function CertificatesPage() {
  const { user } = useAuth();
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in_progress'>('all');

  // Mock certificates data
  const certificates = [
    {
      id: 'cert-001',
      courseTitle: 'Foundation Level Fraud Prevention',
      courseLevel: 'Foundation',
      studentName: user?.username || 'Student Name',
      completionDate: '2025-08-15',
      certificateNumber: 'TV-FOUND-2025-001234',
      blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
      verificationUrl: 'https://verify.trustverify.io/cert/TV-FOUND-2025-001234',
      instructorName: 'Dr. Sarah Mitchell',
      creditsEarned: 6,
      skillsVerified: [
        'Fraud Type Recognition',
        'Basic Prevention Strategies',
        'Personal Security Fundamentals',
        'Digital Safety Basics',
        'Incident Response Planning'
      ],
      status: 'completed',
      earnedDate: '2025-08-15'
    },
    {
      id: 'cert-002',
      courseTitle: 'Intermediate Level Fraud Protection',
      courseLevel: 'Intermediate', 
      studentName: user?.username || 'Student Name',
      completionDate: '2025-08-25',
      certificateNumber: 'TV-INTER-2025-001235',
      blockchainHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
      verificationUrl: 'https://verify.trustverify.io/cert/TV-INTER-2025-001235',
      instructorName: 'Prof. Michael Chen',
      creditsEarned: 8,
      skillsVerified: [
        'Advanced Scam Detection',
        'Social Engineering Defense',
        'Investment Fraud Protection',
        'Business Email Compromise Prevention',
        'Advanced Digital Security'
      ],
      status: 'in_progress',
      progress: 75
    }
  ];

  const stats = [
    { label: 'Certificates Earned', value: '1', icon: Award },
    { label: 'CPD Credits', value: '6', icon: Star },
    { label: 'Skills Verified', value: '5', icon: CheckCircle2 },
    { label: 'Career Level', value: 'Foundation', icon: Trophy }
  ];

  const filteredCertificates = certificates.filter(cert => {
    if (filter === 'completed') return cert.status === 'completed';
    if (filter === 'in_progress') return cert.status === 'in_progress';
    return true;
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to view your certificates.</p>
            <Link href="/auth">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedCert = selectedCertificate 
    ? certificates.find(cert => cert.id === selectedCertificate)
    : null;

  if (selectedCert) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">TrustVerify</h1>
                    <p className="text-sm text-gray-500">Certificate Viewer</p>
                  </div>
                </div>
              </Link>
              <Button
                variant="outline"
                onClick={() => setSelectedCertificate(null)}
              >
                ← Back to Certificates
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DigitalCertificate certificate={selectedCert} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">TrustVerify</h1>
                  <p className="text-sm text-gray-500">My Certificates</p>
                </div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/lms/dashboard">
                <Button variant="outline">
                  Learning Dashboard
                </Button>
              </Link>
              <Link href="/fraud-academy">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Certificates
          </h1>
          <p className="text-gray-600">
            View and manage your professional fraud prevention certifications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
            >
              All Certificates
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilter('completed')}
              size="sm"
            >
              Completed
            </Button>
            <Button
              variant={filter === 'in_progress' ? 'default' : 'outline'}
              onClick={() => setFilter('in_progress')}
              size="sm"
            >
              In Progress
            </Button>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCertificates.map((certificate) => (
            <Card key={certificate.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant={certificate.status === 'completed' ? 'default' : 'secondary'}>
                        {certificate.status === 'completed' ? 'Completed' : 'In Progress'}
                      </Badge>
                      {certificate.status === 'completed' && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {certificate.courseTitle}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Certificate Number: {certificate.certificateNumber}
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-amber-500" />
                </div>

                {certificate.status === 'completed' ? (
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Earned on {new Date(certificate.completionDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 mr-2" />
                      {certificate.creditsEarned} CPD Credits
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        onClick={() => setSelectedCertificate(certificate.id)}
                        className="flex-1"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Certificate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = `/api/certificates/${certificate.id}/download`;
                          link.download = `TrustVerify_Certificate_${certificate.certificateNumber}.pdf`;
                          link.click();
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{certificate.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${certificate.progress || 0}%` }}
                      ></div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => window.location.href = `/course/${certificate.courseLevel.toLowerCase()}`}
                      className="w-full"
                    >
                      Continue Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No certificates found
              </h3>
              <p className="text-gray-600 mb-6">
                Complete courses to earn professional certifications
              </p>
              <Link href="/fraud-academy">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Browse Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}