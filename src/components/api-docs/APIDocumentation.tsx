'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Code,
  Book,
  Key,
  Webhook,
  Terminal,
  Shield,
  Zap,
  Database,
  Users,
  FileText,
  Bell,
  CreditCard,
  Activity,
  ChevronRight,
  Copy,
  ExternalLink,
  Download,
  Search,
  Play,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Import components
import { EndpointDocumentation } from './EndpointDocumentation';
import { AuthenticationDocs } from './AuthenticationDocs';
import { WebhooksDocs } from './WebhooksDocs';
import { APIPlayground } from './APIPlayground';
import { CodeExamples } from './CodeExamples';

import type { APICategory, APIEndpoint } from '@/types/api-docs';
import { API_BASE_URLS, API_VERSIONS } from '@/types/api-docs';

// Mock API categories and endpoints
const apiCategories: APICategory[] = [
  {
    id: 'auth',
    name: 'Authentication & Security',
    description: 'OAuth2 and API key support for secure, role-based access',
    icon: 'shield',
    order: 1,
    endpoints: [
      {
        id: 'auth-1',
        method: 'POST',
        path: '/auth/token',
        category: 'auth',
        description: 'Exchange credentials for access token',
        authentication: 'basic',
        version: 'v1',
        parameters: [],
        responses: [
          {
            status: 200,
            description: 'Successfully authenticated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    access_token: { type: 'string' },
                    token_type: { type: 'string' },
                    expires_in: { type: 'integer' },
                    refresh_token: { type: 'string' }
                  }
                }
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'users',
    name: 'User Management',
    description: 'User registration, authentication, and profile management',
    icon: 'users',
    order: 2,
    endpoints: [
      {
        id: 'user-1',
        method: 'POST',
        path: '/users/register',
        category: 'users',
        description: 'Register a new contractor/company user',
        summary: 'Creates a new user account and sends verification email',
        authentication: 'none',
        version: 'v1',
        parameters: [],
        requestBody: {
          description: 'User registration data',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', minimum: 12 },
                  firstName: { type: 'string' },
                  lastName: { type: 'string' },
                  company: { type: 'string' },
                  role: { type: 'string', enum: ['contractor', 'admin', 'viewer'] }
                },
                required: ['email', 'password', 'firstName', 'lastName']
              }
            }
          }
        },
        responses: [
          {
            status: 201,
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    email: { type: 'string' },
                    status: { type: 'string' }
                  }
                }
              }
            }
          }
        ]
      },
      {
        id: 'user-2',
        method: 'POST',
        path: '/users/login',
        category: 'users',
        description: 'Authenticate and issue JWT access token',
        authentication: 'none',
        version: 'v1',
        parameters: [],
        responses: []
      },
      {
        id: 'user-3',
        method: 'PATCH',
        path: '/users/password',
        category: 'users',
        description: 'Change or reset user password',
        authentication: 'bearer_token',
        version: 'v1',
        parameters: [],
        responses: []
      }
    ]
  },
  {
    id: 'documents',
    name: 'Document Upload & Verification',
    description: 'Upload and manage compliance documents',
    icon: 'file',
    order: 3,
    endpoints: [
      {
        id: 'doc-1',
        method: 'POST',
        path: '/docs/upload',
        category: 'documents',
        description: 'Upload certificates, insurance, or reference files',
        authentication: 'bearer_token',
        version: 'v1',
        parameters: [],
        responses: []
      },
      {
        id: 'doc-2',
        method: 'GET',
        path: '/docs/status',
        category: 'documents',
        description: 'Check verification or expiry status',
        authentication: 'bearer_token',
        version: 'v1',
        parameters: [
          {
            name: 'documentId',
            in: 'query',
            description: 'Document ID to check status',
            required: false,
            type: 'string'
          }
        ],
        responses: []
      }
    ]
  },
  {
    id: 'jobs',
    name: 'Job Data Integration',
    description: 'Clean Claims job management and synchronization',
    icon: 'briefcase',
    order: 4,
    endpoints: [
      {
        id: 'job-1',
        method: 'GET',
        path: '/jobs',
        category: 'jobs',
        description: 'Retrieve current jobs/leads for contractor',
        authentication: 'bearer_token',
        version: 'v1',
        parameters: [
          {
            name: 'status',
            in: 'query',
            description: 'Filter by job status',
            required: false,
            type: 'string',
            enum: ['pending', 'active', 'completed']
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Number of results to return',
            required: false,
            type: 'integer',
            default: 20,
            min: 1,
            max: 100
          }
        ],
        responses: []
      },
      {
        id: 'job-2',
        method: 'POST',
        path: '/jobs/update',
        category: 'jobs',
        description: 'Update job status and upload documentation',
        authentication: 'bearer_token',
        version: 'v1',
        parameters: [],
        responses: []
      }
    ]
  },
  {
    id: 'compliance',
    name: 'Compliance & Training',
    description: 'CARSI compliance and training management',
    icon: 'shield',
    order: 5,
    endpoints: [
      {
        id: 'compliance-1',
        method: 'GET',
        path: '/training/status',
        category: 'compliance',
        description: 'Get CEU/CPD compliance status',
        authentication: 'bearer_token',
        version: 'v1',
        parameters: [],
        responses: []
      },
      {
        id: 'compliance-2',
        method: 'POST',
        path: '/training/report',
        category: 'compliance',
        description: 'Submit course completion records',
        authentication: 'bearer_token',
        version: 'v1',
        parameters: [],
        responses: []
      }
    ]
  },
  {
    id: 'notifications',
    name: 'Notifications & Alerts',
    description: 'Send and manage notifications',
    icon: 'bell',
    order: 6,
    endpoints: [
      {
        id: 'notif-1',
        method: 'POST',
        path: '/notifications/send',
        category: 'notifications',
        description: 'Send custom notifications',
        authentication: 'bearer_token',
        version: 'v1',
        parameters: [],
        responses: []
      },
      {
        id: 'notif-2',
        method: 'GET',
        path: '/notifications/history',
        category: 'notifications',
        description: 'View notification history',
        authentication: 'bearer_token',
        version: 'v1',
        parameters: [],
        responses: []
      }
    ]
  },
  {
    id: 'billing',
    name: 'Billing & Payments',
    description: 'Process payments and manage billing',
    icon: 'credit-card',
    order: 7,
    endpoints: [
      {
        id: 'billing-1',
        method: 'POST',
        path: '/billing/charge',
        category: 'billing',
        description: 'Initiate payment charge',
        authentication: 'bearer_token',
        version: 'v1',
        parameters: [],
        responses: []
      },
      {
        id: 'billing-2',
        method: 'GET',
        path: '/billing/history',
        category: 'billing',
        description: 'View transaction history',
        authentication: 'bearer_token',
        version: 'v1',
        parameters: [],
        responses: []
      }
    ]
  }
];

export function APIDocumentation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<APICategory>(apiCategories[0]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);
  const [activeTab, setActiveTab] = useState('endpoints');
  const [selectedEnvironment, setSelectedEnvironment] = useState<'sandbox' | 'production'>('sandbox');
  const [selectedVersion, setSelectedVersion] = useState('v1');

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'shield': return <Shield className="h-5 w-5" />;
      case 'users': return <Users className="h-5 w-5" />;
      case 'file': return <FileText className="h-5 w-5" />;
      case 'briefcase': return <Briefcase className="h-5 w-5" />;
      case 'bell': return <Bell className="h-5 w-5" />;
      case 'credit-card': return <CreditCard className="h-5 w-5" />;
      default: return <Database className="h-5 w-5" />;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'PATCH': return 'bg-orange-100 text-orange-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEndpoints = searchQuery
    ? apiCategories.flatMap(cat => cat.endpoints).filter(endpoint =>
        endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        endpoint.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory.endpoints;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
                <Code className="h-8 w-8" />
                API Documentation
              </h1>
              <p className="text-blue-100">
                Build powerful integrations with the NRP platform
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-white/20 text-white border-white/50">
                Version: {selectedVersion}
              </Badge>
              <select
                value={selectedEnvironment}
                onChange={(e) => setSelectedEnvironment(e.target.value as 'sandbox' | 'production')}
                className="px-3 py-1 rounded bg-white/20 text-white border border-white/50"
              >
                <option value="sandbox">Sandbox</option>
                <option value="production">Production</option>
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-2xl font-bold">{apiCategories.length}</p>
              <p className="text-sm text-blue-100">API Categories</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-2xl font-bold">
                {apiCategories.reduce((sum, cat) => sum + cat.endpoints.length, 0)}
              </p>
              <p className="text-sm text-blue-100">Endpoints</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-2xl font-bold">99.9%</p>
              <p className="text-sm text-blue-100">Uptime SLA</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-2xl font-bold">100/s</p>
              <p className="text-sm text-blue-100">Rate Limit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('getting-started')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Quick Start</h3>
                  <p className="text-sm text-gray-600">Get started in 5 minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('authentication')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Key className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Authentication</h3>
                  <p className="text-sm text-gray-600">API keys & OAuth2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('webhooks')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Webhook className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Webhooks</h3>
                  <p className="text-sm text-gray-600">Real-time events</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('playground')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Play className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold">API Playground</h3>
                  <p className="text-sm text-gray-600">Test endpoints live</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="playground">Playground</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          </TabsList>

          {/* Endpoints Tab */}
          <TabsContent value="endpoints" className="mt-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Sidebar */}
              <div className="col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">API Categories</CardTitle>
                    <div className="relative mt-2">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search endpoints..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[600px]">
                      {apiCategories.map((category) => (
                        <div key={category.id}>
                          <button
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                              "w-full px-4 py-3 text-left hover:bg-gray-50 transition-colours flex items-center gap-3",
                              selectedCategory.id === category.id && "bg-blue-50 border-l-4 border-blue-600"
                            )}
                          >
                            {getCategoryIcon(category.icon)}
                            <div>
                              <p className="font-medium">{category.name}</p>
                              <p className="text-xs text-gray-500">
                                {category.endpoints.length} endpoints
                              </p>
                            </div>
                          </button>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Endpoint List */}
              <div className="col-span-9">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{selectedCategory.name}</CardTitle>
                        <CardDescription>{selectedCategory.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button variant="outline" size="sm">
                          <Terminal className="h-4 w-4 mr-2" />
                          Postman
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredEndpoints.map((endpoint) => (
                        <div
                          key={endpoint.id}
                          onClick={() => setSelectedEndpoint(endpoint)}
                          className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colours"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge className={getMethodColor(endpoint.method)}>
                                {endpoint.method}
                              </Badge>
                              <code className="text-sm font-mono">{endpoint.path}</code>
                            </div>
                            <div className="flex items-center gap-2">
                              {endpoint.authentication !== 'none' && (
                                <Badge variant="outline">
                                  <Key className="h-3 w-3 mr-1" />
                                  Auth
                                </Badge>
                              )}
                              {endpoint.deprecated && (
                                <Badge variant="destructive">Deprecated</Badge>
                              )}
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{endpoint.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Endpoint Detail Modal */}
                {selectedEndpoint && (
                  <EndpointDocumentation
                    endpoint={selectedEndpoint}
                    onClose={() => setSelectedEndpoint(null)}
                    environment={selectedEnvironment}
                  />
                )}
              </div>
            </div>
          </TabsContent>

          {/* Authentication Tab */}
          <TabsContent value="authentication" className="mt-6">
            <AuthenticationDocs environment={selectedEnvironment} />
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="mt-6">
            <WebhooksDocs />
          </TabsContent>

          {/* Playground Tab */}
          <TabsContent value="playground" className="mt-6">
            <APIPlayground 
              categories={apiCategories}
              environment={selectedEnvironment}
            />
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="mt-6">
            <CodeExamples categories={apiCategories} />
          </TabsContent>

          {/* Getting Started Tab */}
          <TabsContent value="getting-started" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started with NRP API</CardTitle>
                <CardDescription>
                  Follow these steps to integrate with our API
                </CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h3>1. Create an API Key</h3>
                <p>Sign in to your NRP dashboard and navigate to Settings → API Keys to create your first API key.</p>
                
                <h3>2. Choose Your Environment</h3>
                <p>Start with our sandbox environment for testing:</p>
                <pre className="bg-gray-100 p-3 rounded">
                  {API_BASE_URLS.sandbox}
                </pre>
                
                <h3>3. Make Your First Request</h3>
                <p>Try a simple GET request to check your authentication:</p>
                <pre className="bg-gray-100 p-3 rounded">
                  {`curl -H "X-API-Key: YOUR_API_KEY" \\
  ${API_BASE_URLS.sandbox}/users/profile`}
                </pre>
                
                <h3>4. Explore the Documentation</h3>
                <p>Browse our endpoint documentation and use the API Playground to test requests.</p>
                
                <h3>5. Implement Webhooks</h3>
                <p>Set up webhooks to receive real-time updates about important events.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <div className="space-y-2">
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  API Status
                </a>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  Changelog
                </a>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  Support
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">SDKs & Libraries</h4>
              <div className="space-y-2">
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600">JavaScript/TypeScript</a>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Python</a>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600">PHP</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">API Health</h4>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">All systems operational</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Response time: 145ms | Uptime: 99.99%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add missing import
import { Briefcase } from 'lucide-react';