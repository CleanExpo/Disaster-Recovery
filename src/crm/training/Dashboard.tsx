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

export default function DashboardModule() {
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
                Dashboard Navigation & Metrics
              </CardTitle>
              <CardDescription className="text-primary-700 mt-2">
                Master the dashboard features of the NRP CRM system
              </CardDescription>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="mb-2">
                Advanced
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
              <span className="text-gray-700">Dashboard Overview</span>
            </li>
            <li key="1" className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Key Performance Indicators</span>
            </li>
            <li key="2" className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Customizing Your Dashboard</span>
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
              {completedSections.includes('Dashboard Overview') ? (
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
              {completedSections.includes('Key Performance Indicators') ? (
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
              {completedSections.includes('Customizing Your Dashboard') ? (
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
              <CardTitle className="text-2xl">Dashboard Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  Your dashboard provides real-time insights into:
• Active insurance claims in your territories
• Lead conversion rates and revenue
• Emergency response requests
• Contractor performance metrics
• Territory coverage maps
• Revenue tracking and forecasts
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
                  onClick={() => markSectionComplete('Dashboard Overview')}
                  disabled={completedSections.includes('Dashboard Overview')}
                >
                  {completedSections.includes('Dashboard Overview') ? (
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
              <CardTitle className="text-2xl">Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  Critical Metrics to Monitor:
• Response Time: Average time to accept leads (target: <15 minutes)
• Conversion Rate: Percentage of leads converted to jobs (target: >70%)
• Customer Satisfaction: Insurance company ratings (target: >4.5/5)
• Territory Coverage: Percentage of your area served (target: >90%)
• Revenue Per Lead: Average job value (optimize for profitability)
• Emergency Response Rate: 24/7 availability score
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
                  onClick={() => markSectionComplete('Key Performance Indicators')}
                  disabled={completedSections.includes('Key Performance Indicators')}
                >
                  {completedSections.includes('Key Performance Indicators') ? (
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
              <CardTitle className="text-2xl">Customizing Your Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  Personalization Options:
• Drag and drop widget arrangement
• Custom date ranges for analytics
• Territory-specific views
• Service category filters
• Alert thresholds for urgent leads
• Mobile dashboard optimization
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
                  onClick={() => markSectionComplete('Customizing Your Dashboard')}
                  disabled={completedSections.includes('Customizing Your Dashboard')}
                >
                  {completedSections.includes('Customizing Your Dashboard') ? (
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
              Congratulations! You've successfully completed the Dashboard Navigation & Metrics module.
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
