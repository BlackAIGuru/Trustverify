import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Key, Copy, Plus, Trash2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  created: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API',
      key: 'tv_live_abc123xyz789...',
      permissions: ['transactions', 'fraud_detection', 'kyc'],
      created: '2025-01-15',
      lastUsed: '2025-01-19',
      status: 'active'
    },
    {
      id: '2',
      name: 'Sandbox Testing',
      key: 'tv_test_def456uvw012...',
      permissions: ['transactions', 'fraud_detection'],
      created: '2025-01-10',
      lastUsed: '2025-01-18',
      status: 'active'
    }
  ]);
  
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState("");
  const [newKeyName, setNewKeyName] = useState("");
  const { toast } = useToast();

  const handleToggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 2000);
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    });
  };

  const handleGenerateKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Key Name Required",
        description: "Please enter a name for your API key.",
        variant: "destructive",
      });
      return;
    }

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `tv_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      permissions: ['transactions', 'fraud_detection', 'kyc'],
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active'
    };

    setApiKeys(prev => [...prev, newKey]);
    setNewKeyName("");
    
    toast({
      title: "API Key Generated",
      description: `New API key "${newKeyName}" has been created successfully.`,
    });
  };

  const handleRevokeKey = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, status: 'revoked' as const } : key
    ));
    
    toast({
      title: "API Key Revoked",
      description: "The API key has been revoked and is no longer valid.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Keys</h1>
          <p className="text-gray-600">
            Manage your TrustVerify API keys for secure access to our services.
          </p>
        </div>

        {/* Generate New Key */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Generate New API Key
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Enter key name (e.g., Production API)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleGenerateKey}>
                <Key className="h-4 w-4 mr-2" />
                Generate Key
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Existing Keys */}
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <Card key={apiKey.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{apiKey.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <Badge variant={apiKey.status === 'active' ? 'default' : 'destructive'}>
                        {apiKey.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Created: {apiKey.created}
                      </span>
                      <span className="text-sm text-gray-500">
                        Last used: {apiKey.lastUsed}
                      </span>
                    </div>
                  </div>
                  {apiKey.status === 'active' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRevokeKey(apiKey.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Revoke
                    </Button>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium">API Key:</span>
                    <div className="flex items-center space-x-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {showKeys[apiKey.id] ? apiKey.key : '•'.repeat(24) + apiKey.key.slice(-8)}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleKeyVisibility(apiKey.id)}
                      >
                        {showKeys[apiKey.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopyKey(apiKey.key)}
                      >
                        {copiedKey === apiKey.key ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium mb-2 block">Permissions:</span>
                  <div className="flex flex-wrap gap-2">
                    {apiKey.permissions.map((permission) => (
                      <Badge key={permission} variant="secondary">
                        {permission.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Guidelines */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Security Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Store API keys securely and never expose them in client-side code</li>
              <li>• Use environment variables to store keys in your applications</li>
              <li>• Regularly rotate your API keys for enhanced security</li>
              <li>• Revoke unused or compromised keys immediately</li>
              <li>• Use different keys for different environments (production, staging, development)</li>
              <li>• Monitor API key usage and set up alerts for unusual activity</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}