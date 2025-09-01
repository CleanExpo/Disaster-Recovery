'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Clock, Users, Award, BookOpen,
  BarChart3, Settings, MessageSquare, Shield, Zap, Target,
  GraduationCap, FileText, Video, ChevronRight, Play
} from 'lucide-react';

export default function CRMPortalPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const trainingModules = {
    week1: [
      { day: 1, title: "Insurance Claims & Documentation", duration: "4 hours", progress: 100 },
      { day: 2, title: "Water Damage Categories & Assessment", duration: "4 hours", progress: 100 },
      { day: 3, title: "Psychrometry & Drying Science", duration: "4 hours", progress: 75 },
      { day: 4, title: "Mould Identification & Remediation", duration: "4 hours", progress: 50 },
      { day: 5, title: "Fire & Smoke Damage Restoration", duration: "4 hours", progress: 25 },
      { day: 6, title: "Biohazard & Contamination Control", duration: "4 hours", progress: 0 },
      { day: 7, title: "Structural Drying Techniques", duration: "4 hours", progress: 0 }
    ],
    week2: [
      { day: 8, title: "Commercial & Large Loss Projects", duration: "4 hours", progress: 0 },
      { day: 9, title: "Health, Safety & Compliance", duration: "4 hours", progress: 0 },
      { day: 10, title: "Customer Service Excellence", duration: "4 hours", progress: 0 },
      { day: 11, title: "Advanced Technology & Equipment", duration: "4 hours", progress: 0 },
      { day: 12, title: "Business Operations & Management", duration: "4 hours", progress: 0 },
      { day: 13, title: "Emergency Response Protocols", duration: "4 hours", progress: 0 },
      { day: 14, title: "Final Assessment & Certification", duration: "8 hours", progress: 0 }
    ]
  };

  const portalFeatures = [
    {
      icon: Users,
      title: "Lead Management",
      description: "Track and manage all your disaster recovery leads in one place",
      link: "/portal/leads",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: GraduationCap,
      title: "Training Academy",
      description: "Complete 14-day certification program with interactive modules",
      link: "/portal/training",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Monitor your progress and track key performance metrics",
      link: "/portal/analytics",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageSquare,
      title: "Communication Hub",
      description: "Connect with insurers, adjusters, and team members",
      link: "/portal/messages",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: FileText,
      title: "Documentation Center",
      description: "Access templates, forms, and compliance documents",
      link: "/portal/documents",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Shield,
      title: "Compliance Tracker",
      description: "Stay up-to-date with industry regulations and standards",
      link: "/portal/compliance",
      color: "from-gray-600 to-gray-800"
    }
  ];

  const quickActions = [
    { icon: "📊", label: "View Dashboard", link: "/portal/dashboard" },
    { icon: "📚", label: "Start Training", link: "/portal/training" },
    { icon: "📝", label: "New Lead", link: "/portal/leads/new" },
    { icon: "📅", label: "Schedule", link: "/portal/schedule" },
    { icon: "💬", label: "Messages", link: "/portal/messages" },
    { icon: "📈", label: "Reports", link: "/portal/reports" }
  ];

  const stats = [
    { label: "Active Leads", value: "47", change: "+12%", positive: true },
    { label: "Training Progress", value: "35%", change: "5 modules completed", positive: true },
    { label: "Response Time", value: "1.2h", change: "-15 min", positive: true },
    { label: "Certification Status", value: "In Progress", change: "9 days remaining", positive: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              NRP CRM Portal
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Your complete disaster recovery business management platform
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                >
                  <p className="text-sm text-blue-200">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs mt-1 ${stat.positive ? 'text-green-300' : 'text-yellow-300'}`}>
                    {stat.change}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 border-b border-blue-700">
            {['overview', 'training', 'leads', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 capitalize transition-colors ${
                  activeTab === tab 
                    ? 'border-b-2 border-white text-white' 
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <div className="flex gap-2">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.link}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span>{action.icon}</span>
                  <span className="text-sm font-medium hidden sm:inline">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Portal Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Portal Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={feature.link}>
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 cursor-pointer group">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium">
                      <span className="text-sm">Access Now</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Training Progress Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              14-Day Certification Program
            </h2>
            <Link href="/portal/training" className="text-blue-600 hover:text-blue-700 font-medium">
              View All Modules →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Week 1 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">
                  Week 1
                </span>
                Foundation Training
              </h3>
              <div className="space-y-3">
                {trainingModules.week1.map((module, index) => (
                  <Link key={index} href={`/portal/training/modules/day-${module.day}`}>
                    <div className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          module.progress === 100 
                            ? 'bg-green-100 text-green-700' 
                            : module.progress > 0 
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {module.day}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{module.title}</p>
                          <p className="text-xs text-gray-500">{module.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {module.progress > 0 && (
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                        )}
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Week 2 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mr-3">
                  Week 2
                </span>
                Advanced Training
              </h3>
              <div className="space-y-3">
                {trainingModules.week2.map((module, index) => (
                  <Link key={index} href={`/portal/training/modules/day-${module.day}`}>
                    <div className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          module.progress === 100 
                            ? 'bg-green-100 text-green-700' 
                            : module.progress > 0 
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {module.day}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{module.title}</p>
                          <p className="text-xs text-gray-500">{module.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {module.progress > 0 && (
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all"
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                        )}
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-gray-900">Overall Progress</h4>
              <span className="text-2xl font-bold text-blue-600">35%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                style={{ width: '35%' }}
              />
            </div>
            <div className="flex justify-between mt-3 text-sm text-gray-600">
              <span>5 of 14 modules completed</span>
              <span>Estimated completion: 9 days</span>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Learning Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <Video className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-sm text-gray-600 mb-4">
                Watch step-by-step guides for all restoration procedures
              </p>
              <Link href="/portal/resources/videos" className="text-blue-600 text-sm font-medium">
                Browse Videos →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <FileText className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-sm text-gray-600 mb-4">
                Access templates, forms, and compliance documents
              </p>
              <Link href="/portal/resources/documents" className="text-blue-600 text-sm font-medium">
                View Documents →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <Award className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Certifications</h3>
              <p className="text-sm text-gray-600 mb-4">
                Track your certifications and download certificates
              </p>
              <Link href="/portal/certifications" className="text-blue-600 text-sm font-medium">
                My Certificates →
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Excel in Disaster Recovery?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Complete your certification and join Australia's premier network of restoration professionals
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/portal/training">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Continue Training
              </button>
            </Link>
            <Link href="/portal/support">
              <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500">
                Get Support
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}