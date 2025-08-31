import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Target, 
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Download,
  PlayCircle
} from 'lucide-react';

export default function IntroductionModule() {
  const [progress, setProgress] = React.useState(0);
  const [completedSections, setCompletedSections] = React.useState<string[]>([]);

  const markSectionComplete = (sectionTitle: string) => {
    if (!completedSections.includes(sectionTitle)) {
      const newCompleted = [...completedSections, sectionTitle];
      setCompletedSections(newCompleted);
      setProgress((newCompleted.length / 3) * 100);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Module Header */}
      <Card className="border-primary-200 bg-gradient-to-r from-primary-50 to-primary-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold text-primary-900">
                NRP CRM System Introduction
              </CardTitle>
              <CardDescription className="text-primary-700 mt-2">
                Master the introduction features of the NRP CRM system
              </CardDescription>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="mb-2">
                Required
              </Badge>
              <div className="flex items-center gap-2 text-sm text-primary-600">
                <Clock className="h-4 w-4" />
                <span>~30 minutes</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-primary-700">Module Progress</span>
              <span className="text-sm font-medium text-primary-700">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            
            <li key="0" className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Welcome to NRP CRM</span>
            </li>
            <li key="1" className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">System Overview</span>
            </li>
            <li key="2" className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Getting Started</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Training Content */}
      <Tabs defaultValue="section-0" className="space-y-4">
        <TabsList className="grid grid-cols-3 gap-4">
          
          <TabsTrigger 
            value="section-0"
            className="relative"
          >
            <span className="flex items-center gap-2">
              {completedSections.includes('Welcome to NRP CRM') ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <BookOpen className="h-4 w-4" />
              )}
              Section 1
            </span>
          </TabsTrigger>
          <TabsTrigger 
            value="section-1"
            className="relative"
          >
            <span className="flex items-center gap-2">
              {completedSections.includes('System Overview') ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <BookOpen className="h-4 w-4" />
              )}
              Section 2
            </span>
          </TabsTrigger>
          <TabsTrigger 
            value="section-2"
            className="relative"
          >
            <span className="flex items-center gap-2">
              {completedSections.includes('Getting Started') ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <BookOpen className="h-4 w-4" />
              )}
              Section 3
            </span>
          </TabsTrigger>
        </TabsList>

        
        <TabsContent value="section-0" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Welcome to NRP CRM</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  The NRP CRM is your central command center for managing disaster recovery operations across Australia. 
This comprehensive system enables efficient lead management, contractor coordination, and insurance claim processing.

Key Benefits:
• Automated lead distribution to qualified contractors
• Real-time insurance claim tracking
• 24/7 emergency response coordination
• Territory management across all Australian states
• Performance analytics and reporting
                </div>
              </div>

              {/* Interactive Elements */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900">Pro Tip</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Take notes as you go through this section. The concepts here form the foundation for all other modules.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => markSectionComplete('Welcome to NRP CRM')}
                  disabled={completedSections.includes('Welcome to NRP CRM')}
                >
                  {completedSections.includes('Welcome to NRP CRM') ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark as Complete
                    </>
                  )}
                </Button>

                
                <Button variant="primary">
                  Next Section
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="section-1" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">System Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  Core Components:
1. Lead Management System - Capture and distribute insurance claims
2. Contractor Network - Manage your nationwide contractor database
3. Territory Control - Define and manage service areas
4. Claim Processing - Track insurance claims from intake to completion
5. Emergency Response - Coordinate 24/7 disaster recovery operations
6. Analytics Dashboard - Monitor performance and revenue metrics
                </div>
              </div>

              {/* Interactive Elements */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900">Pro Tip</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Practice using these features in the demo environment before working with live data.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => markSectionComplete('System Overview')}
                  disabled={completedSections.includes('System Overview')}
                >
                  {completedSections.includes('System Overview') ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark as Complete
                    </>
                  )}
                </Button>

                
                <Button variant="primary">
                  Next Section
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="section-2" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  Initial Setup Steps:
1. Complete your contractor profile with certifications
2. Define your service territories and radius
3. Set your service categories and specializations
4. Configure lead preferences and pricing
5. Upload insurance credentials
6. Activate emergency response availability
                </div>
              </div>

              {/* Interactive Elements */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900">Pro Tip</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Consider how these features can improve your specific workflow and efficiency.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => markSectionComplete('Getting Started')}
                  disabled={completedSections.includes('Getting Started')}
                >
                  {completedSections.includes('Getting Started') ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark as Complete
                    </>
                  )}
                </Button>

                
                <Button variant="primary">
                  Complete Module
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary-600" />
            Additional Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <PlayCircle className="h-4 w-4 mr-2" />
              Watch Video Tutorial
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="h-4 w-4 mr-2" />
              Download Quick Guide
            </Button>
            <Button variant="outline" className="justify-start">
              <BookOpen className="h-4 w-4 mr-2" />
              View Documentation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Completion Certificate */}
      {progress === 100 && (
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-green-100">
          <CardHeader>
            <CardTitle className="text-2xl text-green-900 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6" />
              Module Completed!
            </CardTitle>
            <CardDescription className="text-green-700">
              Congratulations! You've successfully completed the NRP CRM System Introduction module.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full md:w-auto">
              Download Certificate
              <Download className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
