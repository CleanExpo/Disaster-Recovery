import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Shield, DollarSign, Clock, Star, CheckCircle, ArrowRight, Zap, BarChart3, Building2, Smartphone, Globe, Settings, Target, Award, FileText, Calendar, CreditCard } from "lucide-react"

export default function ContractorsPage() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F9FAFB]">
      <Header />
      <main className="py-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#7C4DFF]/10 border border-[#7C4DFF]/30 rounded-full text-[#7C4DFF] text-sm font-medium mb-6">
            🚀 Join Australia's Leading Restoration Marketplace Platform
          </div>
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-balance mb-6">
            Scale Your <span className="text-[#00BFA6]">Restoration Business</span> with Our Platform
          </h1>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto mb-8">
            Join our marketplace platform and access automated workflows, smart lead matching, business analytics, and growth tools designed specifically for restoration contractors.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center mb-8">
            <div>
              <div className="text-3xl font-bold text-[#00BFA6]">2,500+</div>
              <div className="text-[#9CA3AF]">Active Contractors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#2196F3]">$50M+</div>
              <div className="text-[#9CA3AF]">Platform Revenue</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FFD700]">4.8/5</div>
              <div className="text-[#9CA3AF]">Platform Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#7C4DFF]">40%</div>
              <div className="text-[#9CA3AF]">Avg. Revenue Growth</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-semibold px-8 py-3 text-lg">
              Join Platform Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-[#2196F3] text-[#2196F3] hover:bg-[#2196F3] hover:text-white px-8 py-3 text-lg bg-transparent">
              View Platform Demo
            </Button>
          </div>
        </section>

        {/* Platform Features Section */}
        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-poppins font-semibold text-3xl text-center text-white mb-12">Platform Features for Contractors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <Zap className="h-12 w-12 text-[#00BFA6] mb-4" />
              <h3 className="font-poppins font-semibold text-xl text-white mb-3">Smart Lead Matching</h3>
              <p className="text-[#9CA3AF] mb-4">
                AI-powered algorithm matches you with the most relevant projects based on your location, expertise, and availability.
              </p>
              <ul className="text-[#9CA3AF] text-sm space-y-1">
                <li>• Location-based matching</li>
                <li>• Skill assessment scoring</li>
                <li>• Availability optimization</li>
                <li>• Project preference learning</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <BarChart3 className="h-12 w-12 text-[#2196F3] mb-4" />
              <h3 className="font-poppins font-semibold text-xl text-white mb-3">Business Analytics</h3>
              <p className="text-[#9CA3AF] mb-4">
                Comprehensive dashboard with real-time insights into your performance, revenue, and growth opportunities.
              </p>
              <ul className="text-[#9CA3AF] text-sm space-y-1">
                <li>• Revenue tracking & forecasting</li>
                <li>• Performance metrics</li>
                <li>• Customer satisfaction scores</li>
                <li>• Market trend analysis</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <Settings className="h-12 w-12 text-[#7C4DFF] mb-4" />
              <h3 className="font-poppins font-semibold text-xl text-white mb-3">Automated Workflows</h3>
              <p className="text-[#9CA3AF] mb-4">
                Streamlined processes from lead acceptance to project completion with minimal manual intervention.
              </p>
              <ul className="text-[#9CA3AF] text-sm space-y-1">
                <li>• Automated quote generation</li>
                <li>• Project timeline tracking</li>
                <li>• Client communication templates</li>
                <li>• Invoice automation</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <Smartphone className="h-12 w-12 text-[#FF6B35] mb-4" />
              <h3 className="font-poppins font-semibold text-xl text-white mb-3">Mobile Platform</h3>
              <p className="text-[#9CA3AF] mb-4">
                Full-featured mobile app for managing projects, communicating with clients, and tracking progress on-the-go.
              </p>
              <ul className="text-[#9CA3AF] text-sm space-y-1">
                <li>• Real-time project updates</li>
                <li>• Photo documentation</li>
                <li>• GPS location tracking</li>
                <li>• Push notifications</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <CreditCard className="h-12 w-12 text-[#FFD700] mb-4" />
              <h3 className="font-poppins font-semibold text-xl text-white mb-3">Payment Processing</h3>
              <p className="text-[#9CA3AF] mb-4">
                Integrated payment system with automated invoicing, secure transactions, and timely payments.
              </p>
              <ul className="text-[#9CA3AF] text-sm space-y-1">
                <li>• Automated invoicing</li>
                <li>• Secure payment processing</li>
                <li>• Payment tracking</li>
                <li>• Financial reporting</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <Building2 className="h-12 w-12 text-[#00BFA6] mb-4" />
              <h3 className="font-poppins font-semibold text-xl text-white mb-3">Business Growth Tools</h3>
              <p className="text-[#9CA3AF] mb-4">
                Marketing tools, training modules, and business development resources to help you scale.
              </p>
              <ul className="text-[#9CA3AF] text-sm space-y-1">
                <li>• Marketing campaign tools</li>
                <li>• Training & certification</li>
                <li>• Business coaching</li>
                <li>• Industry networking</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-poppins font-semibold text-3xl text-center text-white mb-12">Why Join Our Platform?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <TrendingUp className="h-12 w-12 text-[#00BFA6] mb-4" />
              <h3 className="font-poppins font-semibold text-xl text-white mb-3">Scale Your Business</h3>
              <p className="text-[#9CA3AF] mb-4">
                Access our platform's automated systems to grow your business by up to 40% with minimal effort
              </p>
              <ul className="text-[#9CA3AF] text-sm space-y-1">
                <li>• AI-powered lead matching</li>
                <li>• Automated project management</li>
                <li>• Business growth analytics</li>
                <li>• Scalable workflow systems</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <Target className="h-12 w-12 text-[#2196F3] mb-4" />
              <h3 className="font-poppins font-semibold text-xl text-white mb-3">Smart Lead Generation</h3>
              <p className="text-[#9CA3AF] mb-4">Our platform's AI matches you with the most relevant, high-value projects</p>
              <ul className="text-[#9CA3AF] text-sm space-y-1">
                <li>• Pre-qualified project leads</li>
                <li>• Location-based matching</li>
                <li>• Skill-specific opportunities</li>
                <li>• Insurance-verified projects</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <Award className="h-12 w-12 text-[#00BFA6] mb-4" />
              <h3 className="font-poppins font-semibold text-xl text-white mb-3">Professional Credibility</h3>
              <p className="text-[#9CA3AF] mb-4">
                Build trust and establish your reputation through our verified platform ecosystem
              </p>
              <ul className="text-[#9CA3AF] text-sm space-y-1">
                <li>• Verified contractor badges</li>
                <li>• Customer review system</li>
                <li>• Portfolio showcase</li>
                <li>• Industry recognition</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <DollarSign className="h-12 w-12 text-[#FFD700] mb-4" />
              <h3 className="font-poppins font-semibold text-xl text-white mb-3">Transparent Pricing</h3>
              <p className="text-[#9CA3AF] mb-4">Set competitive rates with our platform's standardized pricing system</p>
              <ul className="text-[#9CA3AF] text-sm space-y-1">
                <li>• Market-based pricing guidance</li>
                <li>• No hidden platform fees</li>
                <li>• Automated payment processing</li>
                <li>• Financial reporting tools</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <Clock className="h-12 w-12 text-[#2196F3] mb-4" />
              <h3 className="font-poppins font-semibold text-xl text-white mb-3">Efficient Operations</h3>
              <p className="text-[#9CA3AF] mb-4">Streamlined workflows and automated processes save you time and effort</p>
              <ul className="text-[#9CA3AF] text-sm space-y-1">
                <li>• Automated project scheduling</li>
                <li>• Digital documentation system</li>
                <li>• Mobile platform access</li>
                <li>• Client communication tools</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <Globe className="h-12 w-12 text-[#FFD700] mb-4" />
              <h3 className="font-poppins font-semibold text-xl text-white mb-3">Market Expansion</h3>
              <p className="text-[#9CA3AF] mb-4">Access new markets and opportunities through our platform's network</p>
              <ul className="text-[#9CA3AF] text-sm space-y-1">
                <li>• Multi-location project access</li>
                <li>• Industry networking</li>
                <li>• Market trend insights</li>
                <li>• Growth opportunities</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Platform Tiers Section */}
        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-poppins font-semibold text-3xl text-center text-white mb-12">Platform Access Tiers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <h3 className="font-poppins font-semibold text-xl text-white mb-4">Starter Platform</h3>
              <div className="text-[#00BFA6] text-3xl font-bold mb-4">
                $99<span className="text-lg text-[#9CA3AF]">/month</span>
              </div>
              <ul className="text-[#9CA3AF] space-y-3 mb-6">
                <li>• Up to 15 platform leads/month</li>
                <li>• Basic platform profile</li>
                <li>• Mobile app access</li>
                <li>• Basic analytics dashboard</li>
                <li>• Email support</li>
                <li>• Automated invoicing</li>
              </ul>
              <button className="w-full bg-[#374151] hover:bg-[#4B5563] text-white font-semibold py-3 rounded-lg">
                Start Platform Trial
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#00BFA6] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#00BFA6] text-[#0F1115] px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="font-poppins font-semibold text-xl text-white mb-4">Professional Platform</h3>
              <div className="text-[#00BFA6] text-3xl font-bold mb-4">
                $199<span className="text-lg text-[#9CA3AF]">/month</span>
              </div>
              <ul className="text-[#9CA3AF] space-y-3 mb-6">
                <li>• Up to 40 platform leads/month</li>
                <li>• Featured platform profile</li>
                <li>• Advanced analytics & insights</li>
                <li>• Priority platform support</li>
                <li>• Marketing automation tools</li>
                <li>• Business growth coaching</li>
                <li>• API access</li>
              </ul>
              <button className="w-full bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-semibold py-3 rounded-lg">
                Choose Professional
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <h3 className="font-poppins font-semibold text-xl text-white mb-4">Enterprise Platform</h3>
              <div className="text-[#00BFA6] text-3xl font-bold mb-4">
                $399<span className="text-lg text-[#9CA3AF]">/month</span>
              </div>
              <ul className="text-[#9CA3AF] space-y-3 mb-6">
                <li>• Unlimited platform leads</li>
                <li>• Premium platform placement</li>
                <li>• Dedicated platform manager</li>
                <li>• Advanced business analytics</li>
                <li>• Custom platform branding</li>
                <li>• White-label opportunities</li>
                <li>• Full API & integration access</li>
              </ul>
              <button className="w-full bg-[#374151] hover:bg-[#4B5563] text-white font-semibold py-3 rounded-lg">
                Contact Platform Sales
              </button>
            </div>
          </div>
        </section>

        {/* Business Growth Section */}
        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-poppins font-semibold text-3xl text-center text-white mb-12">How Our Platform Drives Business Growth</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <h3 className="font-poppins font-semibold text-2xl text-white mb-6">Platform-Powered Growth Metrics</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[#9CA3AF]">Average Revenue Increase</span>
                  <span className="text-[#00BFA6] font-bold text-xl">+40%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9CA3AF]">Lead Conversion Rate</span>
                  <span className="text-[#2196F3] font-bold text-xl">+65%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9CA3AF]">Time Saved on Admin</span>
                  <span className="text-[#7C4DFF] font-bold text-xl">-50%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9CA3AF]">Customer Satisfaction</span>
                  <span className="text-[#FFD700] font-bold text-xl">4.8/5</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <h3 className="font-poppins font-semibold text-2xl text-white mb-6">Platform Features That Drive Results</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Smart Lead Matching</h4>
                    <p className="text-[#9CA3AF] text-sm">AI-powered matching increases project relevance by 80%</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BarChart3 className="h-6 w-6 text-[#2196F3] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Business Analytics</h4>
                    <p className="text-[#9CA3AF] text-sm">Data-driven insights help optimize pricing and operations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Settings className="h-6 w-6 text-[#7C4DFF] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Automated Workflows</h4>
                    <p className="text-[#9CA3AF] text-sm">Streamlined processes reduce admin time by 50%</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Building2 className="h-6 w-6 text-[#FFD700] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Growth Tools</h4>
                    <p className="text-[#9CA3AF] text-sm">Marketing and training resources accelerate business growth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-poppins font-semibold text-3xl text-center text-white mb-12">Platform Success Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#00BFA6] rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#0F1115] font-bold">MR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Mike's Restoration</h4>
                  <p className="text-[#9CA3AF] text-sm">Sydney, NSW</p>
                </div>
              </div>
              <p className="text-[#9CA3AF] mb-4">
                "The platform's AI matching and automated workflows increased our efficiency by 60%. We're now handling 3x more projects with the same team."
              </p>
              <div className="text-[#00BFA6] font-semibold">+60% Efficiency & Revenue</div>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#2196F3] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">AR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Aussie Restore Co</h4>
                  <p className="text-[#9CA3AF] text-sm">Melbourne, VIC</p>
                </div>
              </div>
              <p className="text-[#9CA3AF] mb-4">
                "The platform's analytics dashboard helped us optimize our pricing and operations. Our profit margins increased by 35% in just 6 months."
              </p>
              <div className="text-[#2196F3] font-semibold">+35% Profit Margins</div>
            </div>

            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#0F1115] font-bold">QR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Queensland Repairs</h4>
                  <p className="text-[#9CA3AF] text-sm">Brisbane, QLD</p>
                </div>
              </div>
              <p className="text-[#9CA3AF] mb-4">
                "The platform's business growth tools and automated lead generation helped us scale from 2 to 15 employees in 18 months."
              </p>
              <div className="text-[#FFD700] font-semibold">650% Team Growth</div>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-poppins font-semibold text-3xl text-center text-white mb-12">Contractor Requirements</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="font-poppins font-semibold text-xl text-white mb-4">Legal Requirements</h3>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Valid Licensing</h4>
                    <p className="text-[#9CA3AF] text-sm">Current trade licenses and certifications</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Insurance Coverage</h4>
                    <p className="text-[#9CA3AF] text-sm">Public liability ($20M) and professional indemnity ($5M)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">ABN Registration</h4>
                    <p className="text-[#9CA3AF] text-sm">Valid Australian Business Number</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-poppins font-semibold text-xl text-white mb-4">Experience & Skills</h3>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Industry Experience</h4>
                    <p className="text-[#9CA3AF] text-sm">Minimum 2 years in restoration services</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Technical Certifications</h4>
                    <p className="text-[#9CA3AF] text-sm">Relevant trade certifications and training</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Portfolio Evidence</h4>
                    <p className="text-[#9CA3AF] text-sm">Before/after photos of completed projects</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-poppins font-semibold text-xl text-white mb-4">Quality Standards</h3>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Background Check</h4>
                    <p className="text-[#9CA3AF] text-sm">Clean criminal background verification</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Client References</h4>
                    <p className="text-[#9CA3AF] text-sm">Minimum 5 verifiable client references</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Quality Commitment</h4>
                    <p className="text-[#9CA3AF] text-sm">Agreement to Australian building standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process Section */}
        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-poppins font-semibold text-3xl text-center text-white mb-12">Application Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#00BFA6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0F1115] font-bold text-xl">1</span>
                </div>
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">Submit Application</h3>
                <p className="text-[#9CA3AF] text-sm">
                  Complete our comprehensive application form with all required documentation
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">Verification Process</h3>
                <p className="text-[#9CA3AF] text-sm">
                  We verify your licenses, insurance, and conduct background checks
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0F1115] font-bold text-xl">3</span>
                </div>
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">Interview & Assessment</h3>
                <p className="text-[#9CA3AF] text-sm">
                  Phone interview and technical assessment to ensure quality standards
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">Welcome & Onboarding</h3>
                <p className="text-[#9CA3AF] text-sm">
                  Complete onboarding process and start receiving qualified leads
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-12 border border-[#374151]">
            <h2 className="font-poppins font-semibold text-3xl text-white mb-4">Ready to Scale Your Business with Our Platform?</h2>
            <p className="text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
              Join our marketplace platform and access automated workflows, smart lead matching, business analytics, and growth tools. Join over 2,500 successful contractors already scaling their business with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-semibold px-8 py-3 text-lg">
                Join Platform Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-[#2196F3] text-[#2196F3] hover:bg-[#2196F3] hover:text-white px-8 py-3 text-lg bg-transparent"
              >
                Schedule Platform Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
