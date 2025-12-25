'use client';

import { AdminOnboardingOverview } from '@/components/onboarding/admin-onboarding-overview';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, BarChart3, Settings } from 'lucide-react';

export default function AdminOnboardingPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Contractor Onboarding Management</h1>
        <p className="text-muted-foreground mt-1">
          Monitor and manage contractor training and certification
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="modules">
            <BookOpen className="h-4 w-4 mr-2" />
            Training Modules
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <AdminOnboardingOverview />
        </TabsContent>

        <TabsContent value="modules">
          <Card>
            <CardHeader>
              <CardTitle>Training Module Management</CardTitle>
              <CardDescription>
                Manage course content, assessments, and certification requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Water Damage Restoration</h4>
                    <p className="text-sm text-muted-foreground">12 modules</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      View Curriculum
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Customer Service Excellence</h4>
                    <p className="text-sm text-muted-foreground">10 modules</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      View Curriculum
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Business Ownership</h4>
                    <p className="text-sm text-muted-foreground">13 frameworks</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      View Curriculum
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Settings</CardTitle>
              <CardDescription>
                Configure certification requirements and assessment rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Passing Score Requirement</h4>
                <p className="text-sm text-muted-foreground">
                  Minimum score required to pass module assessments
                </p>
                <Input type="number" defaultValue="70" className="max-w-xs" />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Target Completion Time</h4>
                <p className="text-sm text-muted-foreground">
                  Default number of days to complete onboarding
                </p>
                <Input type="number" defaultValue="30" className="max-w-xs" />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">AI Assessment</h4>
                <p className="text-sm text-muted-foreground">
                  Enable AI-powered competency assessment and quiz generation
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-green-600">Enabled</Badge>
                  <span className="text-sm text-muted-foreground">
                    Using T5-Gemma for personalized assessments
                  </span>
                </div>
              </div>

              <Button className="mt-4">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
