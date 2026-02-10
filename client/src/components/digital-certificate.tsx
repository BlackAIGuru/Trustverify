import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Download, 
  Share2, 
  Shield, 
  Calendar, 
  CheckCircle2,
  ExternalLink,
  QrCode,
  Copy,
  Linkedin,
  Twitter,
  Facebook
} from "lucide-react";
import { format } from "date-fns";

interface DigitalCertificateProps {
  certificate: {
    id: string;
    courseTitle: string;
    courseLevel: string;
    studentName: string;
    completionDate: string;
    certificateNumber: string;
    blockchainHash?: string;
    verificationUrl: string;
    instructorName?: string;
    creditsEarned: number;
    skillsVerified: string[];
  };
  showActions?: boolean;
}

export function DigitalCertificate({ certificate, showActions = true }: DigitalCertificateProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const downloadCertificate = () => {
    // Generate and download PDF certificate
    const link = document.createElement('a');
    link.href = `/api/certificates/${certificate.id}/download`;
    link.download = `TrustVerify_Certificate_${certificate.certificateNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyVerificationUrl = async () => {
    try {
      await navigator.clipboard.writeText(certificate.verificationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const shareToLinkedIn = () => {
    const text = `I've earned a professional certification in ${certificate.courseTitle} from TrustVerify Academy!`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificate.verificationUrl)}&title=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const text = `🎓 Just earned my ${certificate.courseTitle} certification from @TrustVerify Academy! Protecting businesses from fraud one skill at a time. #FraudPrevention #Cybersecurity`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(certificate.verificationUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const getCertificateGradient = (level: string) => {
    switch (level.toLowerCase()) {
      case 'foundation': return 'from-blue-600 to-blue-800';
      case 'intermediate': return 'from-green-600 to-green-800';
      case 'advanced': return 'from-purple-600 to-purple-800';
      case 'expert': return 'from-amber-600 to-amber-800';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'foundation': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Certificate Display */}
      <Card className="overflow-hidden">
        <div className={`bg-gradient-to-br ${getCertificateGradient(certificate.courseLevel)} p-8 text-white relative`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white/20"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full border-2 border-white/20"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/10"></div>
          </div>
          
          {/* Header */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Shield className="h-10 w-10 text-white" />
                <div>
                  <h1 className="text-2xl font-bold">TrustVerify Academy</h1>
                  <p className="text-white/80">Professional Certification</p>
                </div>
              </div>
              <Badge className={`${getLevelBadgeColor(certificate.courseLevel)} text-lg px-4 py-2`}>
                {certificate.courseLevel} Level
              </Badge>
            </div>

            {/* Certificate Content */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <Award className="h-16 w-16 text-white mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Certificate of Completion</h2>
                <p className="text-white/90 text-lg">This certifies that</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
                <h3 className="text-4xl font-bold mb-2">{certificate.studentName}</h3>
                <p className="text-white/90 text-lg mb-4">has successfully completed</p>
                <h4 className="text-2xl font-semibold text-teal-300">{certificate.courseTitle}</h4>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Completed: {format(new Date(certificate.completionDate), 'MMMM dd, yyyy')}
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  {certificate.creditsEarned} CPD Credits
                </div>
              </div>
            </div>

            {/* Certificate Number and Verification */}
            <div className="border-t border-white/20 pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <p className="text-white/80 text-sm">Certificate Number</p>
                  <p className="font-mono text-lg font-bold">{certificate.certificateNumber}</p>
                </div>
                {certificate.blockchainHash && (
                  <div className="text-center md:text-right">
                    <p className="text-white/80 text-sm">Blockchain Verified</p>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-400" />
                      <p className="font-mono text-sm">{certificate.blockchainHash.substring(0, 12)}...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Skills Verified */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
            Skills Verified
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificate.skillsVerified.map((skill, index) => (
              <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      {showActions && (
        <Card>
          <CardHeader>
            <CardTitle>Certificate Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Download and Verification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={downloadCertificate}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => window.open(certificate.verificationUrl, '_blank')}
              >
                <Shield className="mr-2 h-4 w-4" />
                Verify Certificate
              </Button>
            </div>

            {/* Verification URL */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Verification URL
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={certificate.verificationUrl}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded bg-white"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyVerificationUrl}
                >
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Social Sharing */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Share Your Achievement</h4>
              <div className="flex space-x-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={shareToLinkedIn}
                  className="flex items-center space-x-2"
                >
                  <Linkedin className="h-4 w-4 text-blue-600" />
                  <span>LinkedIn</span>
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={shareToTwitter}
                  className="flex items-center space-x-2"
                >
                  <Twitter className="h-4 w-4 text-blue-400" />
                  <span>Twitter</span>
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'My TrustVerify Certificate',
                        text: `I've earned a ${certificate.courseTitle} certification!`,
                        url: certificate.verificationUrl
                      });
                    }
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            {/* Blockchain Verification Details */}
            {certificate.blockchainHash && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-900 mb-2">Blockchain Verification</h4>
                    <p className="text-sm text-green-700 mb-3">
                      This certificate is permanently recorded on the blockchain for tamper-proof verification.
                    </p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-green-800">Transaction Hash:</span>
                        <p className="font-mono text-xs text-green-600 break-all">{certificate.blockchainHash}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`https://etherscan.io/tx/${certificate.blockchainHash}`, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View on Blockchain
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}