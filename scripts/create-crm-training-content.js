const fs = require('fs');
const path = require('path');

const trainingModules = {
  Introduction: {
    title: 'NRP CRM System Introduction',
    sections: [
      {
        title: 'Welcome to NRP CRM',
        content: `
The NRP CRM is your central command center for managing disaster recovery operations across Australia. 
This comprehensive system enables efficient lead management, contractor coordination, and insurance claim processing.

Key Benefits:
• Automated lead distribution to qualified contractors
• Real-time insurance claim tracking
• 24/7 emergency response coordination
• Territory management across all Australian states
• Performance analytics and reporting
        `
      },
      {
        title: 'System Overview',
        content: `
Core Components:
1. Lead Management System - Capture and distribute insurance claims
2. Contractor Network - Manage your nationwide contractor database
3. Territory Control - Define and manage service areas
4. Claim Processing - Track insurance claims from intake to completion
5. Emergency Response - Coordinate 24/7 disaster recovery operations
6. Analytics Dashboard - Monitor performance and revenue metrics
        `
      },
      {
        title: 'Getting Started',
        content: `
Initial Setup Steps:
1. Complete your contractor profile with certifications
2. Define your service territories and radius
3. Set your service categories and specializations
4. Configure lead preferences and pricing
5. Upload insurance credentials
6. Activate emergency response availability
        `
      }
    ]
  },
  Dashboard: {
    title: 'Dashboard Navigation & Metrics',
    sections: [
      {
        title: 'Dashboard Overview',
        content: `
Your dashboard provides real-time insights into:
• Active insurance claims in your territories
• Lead conversion rates and revenue
• Emergency response requests
• Contractor performance metrics
• Territory coverage maps
• Revenue tracking and forecasts
        `
      },
      {
        title: 'Key Performance Indicators',
        content: `
Critical Metrics to Monitor:
• Response Time: Average time to accept leads (target: <15 minutes)
• Conversion Rate: Percentage of leads converted to jobs (target: >70%)
• Customer Satisfaction: Insurance company ratings (target: >4.5/5)
• Territory Coverage: Percentage of your area served (target: >90%)
• Revenue Per Lead: Average job value (optimize for profitability)
• Emergency Response Rate: 24/7 availability score
        `
      },
      {
        title: 'Customizing Your Dashboard',
        content: `
Personalization Options:
• Drag and drop widget arrangement
• Custom date ranges for analytics
• Territory-specific views
• Service category filters
• Alert thresholds for urgent leads
• Mobile dashboard optimization
        `
      }
    ]
  },
  LeadManagement: {
    title: 'Lead Management & Distribution',
    sections: [
      {
        title: 'Lead Types & Priority',
        content: `
Lead Categories:
1. Emergency (Priority 1) - Immediate response required
   • Active flooding, fire damage, sewage overflow
   • Response time: <1 hour
   • Premium rates apply

2. Urgent (Priority 2) - Same-day service needed
   • Water damage, mould issues, storm damage
   • Response time: <4 hours
   • Standard emergency rates

3. Standard (Priority 3) - Scheduled service
   • Non-emergency restoration, preventive work
   • Response time: <24 hours
   • Standard rates apply
        `
      },
      {
        title: 'Lead Acceptance Process',
        content: `
Automated Lead Flow:
1. Insurance claim submitted → Lead generated
2. Territory matching → Qualified contractors notified
3. Lead acceptance → 15-minute response window
4. Job confirmation → Insurance company notified
5. Work authorization → Begin restoration
6. Progress updates → Automated reporting
7. Completion → Invoice processing
        `
      },
      {
        title: 'Territory-Based Distribution',
        content: `
Smart Lead Routing:
• Geo-location matching to contractor territories
• Service category alignment
• Capacity-based distribution
• Performance-weighted allocation
• Backup contractor assignment
• Cross-territory collaboration for large projects
        `
      }
    ]
  },
  Reporting: {
    title: 'Reporting & Analytics',
    sections: [
      {
        title: 'Standard Reports',
        content: `
Available Report Types:
• Daily Lead Summary - New leads, acceptance rates, revenue
• Weekly Performance - KPIs, territory coverage, trends
• Monthly Financial - Revenue, costs, profitability by service
• Insurance Company Reports - Claim status, completion times
• Territory Analysis - Coverage gaps, expansion opportunities
• Emergency Response Metrics - Response times, availability
        `
      },
      {
        title: 'Custom Report Builder',
        content: `
Creating Custom Reports:
1. Select data sources (leads, jobs, revenue, territories)
2. Choose metrics and dimensions
3. Apply filters (date, territory, service type)
4. Set visualization type (charts, maps, tables)
5. Schedule automated delivery
6. Export formats (PDF, Excel, API)
        `
      },
      {
        title: 'Analytics Integration',
        content: `
Data Insights:
• Predictive lead volume forecasting
• Seasonal trend analysis
• Territory optimization recommendations
• Pricing strategy insights
• Contractor performance benchmarking
• Insurance company scorecards
        `
      }
    ]
  },
  Communication: {
    title: 'Communication Hub',
    sections: [
      {
        title: 'Multi-Channel Communication',
        content: `
Communication Channels:
• SMS Alerts - Instant lead notifications
• Email Updates - Detailed job information
• In-App Messaging - Contractor collaboration
• Insurance Portal - Direct claim updates
• Customer Updates - Automated progress reports
• Emergency Hotline - 24/7 support access
        `
      },
      {
        title: 'Automated Notifications',
        content: `
Notification Triggers:
• New lead in territory → SMS + Push notification
• Lead acceptance deadline → Reminder alert
• Job milestone reached → Progress update
• Documentation required → Action needed alert
• Payment processed → Confirmation notice
• Emergency escalation → Priority alert
        `
      },
      {
        title: 'Insurance Company Interface',
        content: `
Insurer Communication:
• Real-time claim status updates
• Photo and document uploads
• Scope of work submissions
• Progress milestone reporting
• Completion certificates
• Invoice and payment processing
        `
      }
    ]
  },
  Automation: {
    title: 'Automation & Workflows',
    sections: [
      {
        title: 'Automated Workflows',
        content: `
Pre-Built Automations:
• Lead Auto-Accept - Criteria-based automatic acceptance
• Territory Expansion - Dynamic radius adjustment
• Pricing Rules - Service-based rate calculations
• Document Generation - Quotes, invoices, reports
• Follow-Up Sequences - Customer and insurance updates
• Escalation Protocols - Emergency response triggers
        `
      },
      {
        title: 'Custom Automation Rules',
        content: `
Creating Custom Rules:
1. Define trigger events (lead received, job completed)
2. Set conditions (territory, service type, value)
3. Configure actions (accept, notify, assign)
4. Add delays or schedules
5. Set fallback actions
6. Monitor automation performance
        `
      },
      {
        title: 'AI-Powered Features',
        content: `
Smart Automation:
• Lead scoring and prioritization
• Optimal contractor matching
• Price optimization suggestions
• Capacity planning predictions
• Quality assurance monitoring
• Fraud detection alerts
        `
      }
    ]
  },
  Analytics: {
    title: 'Advanced Analytics',
    sections: [
      {
        title: 'Performance Analytics',
        content: `
Key Analytics Areas:
• Revenue Analytics - Track income by service, territory, insurer
• Lead Analytics - Sources, conversion rates, response times
• Territory Analytics - Coverage, competition, growth potential
• Contractor Analytics - Performance rankings, capacity utilization
• Insurance Analytics - Claim types, approval rates, payment speeds
• Market Analytics - Demand forecasting, seasonal patterns
        `
      },
      {
        title: 'Predictive Analytics',
        content: `
Forecasting Capabilities:
• Disaster event predictions based on weather data
• Lead volume forecasting by territory
• Revenue projections by service category
• Contractor capacity planning
• Market expansion opportunities
• Risk assessment for large projects
        `
      },
      {
        title: 'Competitive Intelligence',
        content: `
Market Insights:
• Territory competitor analysis
• Pricing benchmarking
• Service gap identification
• Market share tracking
• Insurance company preferences
• Growth opportunity mapping
        `
      }
    ]
  },
  AdvancedFeatures: {
    title: 'Advanced Features & Integration',
    sections: [
      {
        title: 'API Integration',
        content: `
Integration Capabilities:
• Insurance Company APIs - Direct claim feeds
• Accounting Systems - QuickBooks, Xero, MYOB
• Project Management - Buildertrend, CoConstruct
• Documentation - DocuSign, Adobe Sign
• Payment Processing - Stripe, Square, Bank APIs
• Weather Services - BOM data for disaster tracking
        `
      },
      {
        title: 'Mobile Features',
        content: `
Mobile App Capabilities:
• On-site lead acceptance
• Photo and video documentation
• GPS territory tracking
• Offline mode for remote areas
• Push notifications for urgent leads
• Mobile invoicing and payments
• Voice-to-text job notes
        `
      },
      {
        title: 'Enterprise Features',
        content: `
Advanced Capabilities:
• Multi-territory franchise management
• Team hierarchy and permissions
• White-label options for insurance partners
• Custom SLA management
• Compliance and audit trails
• Advanced security features (2FA, SSO)
• Dedicated account management
        `
      }
    ]
  }
};

// Create comprehensive training modules
Object.entries(trainingModules).forEach(([moduleName, moduleData]) => {
  const filePath = path.join(__dirname, '..', 'src', 'crm', 'training', `${moduleName}.tsx`);
  
  const componentContent = `import React from 'react';
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

export default function ${moduleName}Module() {
  const [progress, setProgress] = React.useState(0);
  const [completedSections, setCompletedSections] = React.useState<string[]>([]);

  const markSectionComplete = (sectionTitle: string) => {
    if (!completedSections.includes(sectionTitle)) {
      const newCompleted = [...completedSections, sectionTitle];
      setCompletedSections(newCompleted);
      setProgress((newCompleted.length / ${moduleData.sections.length}) * 100);
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
                ${moduleData.title}
              </CardTitle>
              <CardDescription className="text-primary-700 mt-2">
                Master the ${moduleName.toLowerCase()} features of the NRP CRM system
              </CardDescription>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="mb-2">
                ${moduleName === 'Introduction' ? 'Required' : 'Advanced'}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-primary-600">
                <Clock className="h-4 w-4" />
                <span>~${15 + moduleData.sections.length * 5} minutes</span>
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
            ${moduleData.sections.map((section, idx) => `
            <li key="${idx}" className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">${section.title}</span>
            </li>`).join('')}
          </ul>
        </CardContent>
      </Card>

      {/* Training Content */}
      <Tabs defaultValue="section-0" className="space-y-4">
        <TabsList className="grid grid-cols-${Math.min(moduleData.sections.length, 3)} gap-4">
          ${moduleData.sections.map((section, idx) => `
          <TabsTrigger 
            value="section-${idx}"
            className="relative"
          >
            <span className="flex items-center gap-2">
              {completedSections.includes('${section.title}') ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <BookOpen className="h-4 w-4" />
              )}
              Section ${idx + 1}
            </span>
          </TabsTrigger>`).join('')}
        </TabsList>

        ${moduleData.sections.map((section, idx) => `
        <TabsContent value="section-${idx}" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">${section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  ${section.content.trim()}
                </div>
              </div>

              {/* Interactive Elements */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900">Pro Tip</p>
                    <p className="text-sm text-blue-700 mt-1">
                      ${idx === 0 ? 'Take notes as you go through this section. The concepts here form the foundation for all other modules.' :
                        idx === 1 ? 'Practice using these features in the demo environment before working with live data.' :
                        'Consider how these features can improve your specific workflow and efficiency.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => markSectionComplete('${section.title}')}
                  disabled={completedSections.includes('${section.title}')}
                >
                  {completedSections.includes('${section.title}') ? (
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

                ${idx < moduleData.sections.length - 1 ? `
                <Button variant="primary">
                  Next Section
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>` : `
                <Button variant="primary">
                  Complete Module
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                </Button>`}
              </div>
            </CardContent>
          </Card>
        </TabsContent>`).join('')}
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
              Congratulations! You've successfully completed the ${moduleData.title} module.
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
`;

  fs.writeFileSync(filePath, componentContent);
  console.log(`✓ Created comprehensive training module: ${moduleName}`);
});

console.log('\n✅ All CRM training modules have been created with full content!');