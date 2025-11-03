import Header from "@/components/header"
import Footer from "@/components/footer"
import { Mail, Phone, Clock, MessageSquare, Users, Shield, Headphones, Globe, Zap, BarChart3, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {

  const supportTeam = [
    {
      name: "Platform Support",
      description: "General platform questions, user onboarding, and platform feature assistance",
      email: "support@nrp.com.au",
      phone: "1800 NRPG AUS",
      icon: Headphones,
      color: "text-[#00BFA6]",
    },
    {
      name: "Technical Support",
      description: "Platform technical issues, API integration, and system troubleshooting",
      email: "tech@nrp.com.au",
      phone: "1800 NRPG TECH",
      icon: Shield,
      color: "text-[#2196F3]",
    },
    {
      name: "Partnership & Licensing",
      description: "White-label licensing, contractor partnerships, and business collaborations",
      email: "partners@nrp.com.au",
      phone: "1800 NRPG PART",
      icon: Users,
      color: "text-[#7C4DFF]",
    },
    {
      name: "Enterprise Sales",
      description: "Enterprise platform solutions, custom integrations, and large-scale deployments",
      email: "enterprise@nrp.com.au",
      phone: "1800 NRPG ENTER",
      icon: Globe,
      color: "text-[#FF9800]",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F9FAFB]">
      <Header />
      <main className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6] text-sm font-medium mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Australia's Leading Restoration Marketplace Platform
            </div>
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-balance mb-6">
              Contact Our <span className="gradient-text-teal-purple">Platform Team</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
              Get in touch with our platform support team for any inquiries, technical assistance, or partnership opportunities. We're here to help you succeed with our restoration marketplace platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <h2 className="font-poppins font-bold text-2xl text-white mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#F9FAFB] mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-[#0F1115] border border-[#374151] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00BFA6]"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#F9FAFB] mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-[#0F1115] border border-[#374151] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00BFA6]"
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F9FAFB] mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-[#0F1115] border border-[#374151] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00BFA6]"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F9FAFB] mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-[#0F1115] border border-[#374151] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00BFA6]"
                    placeholder="+61 4XX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F9FAFB] mb-2">Subject</label>
                  <select className="w-full px-4 py-3 bg-[#0F1115] border border-[#374151] rounded-lg text-[#F9FAFB] focus:outline-none focus:border-[#00BFA6]">
                    <option>Platform Support</option>
                    <option>Contractor Registration</option>
                    <option>Client Portal Access</option>
                    <option>Technical Issues</option>
                    <option>Partnership Opportunities</option>
                    <option>White-Label Licensing</option>
                    <option>General Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F9FAFB] mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-[#0F1115] border border-[#374151] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00BFA6] resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                <Button className="w-full bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-semibold py-3">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Quick Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
                <div className="flex items-center mb-4">
                  <Phone className="h-6 w-6 text-[#00BFA6] mr-3" />
                  <h3 className="font-poppins font-semibold text-xl text-white">Phone</h3>
                </div>
                <p className="text-[#9CA3AF] mb-2">General Inquiries</p>
                <p className="text-[#00BFA6] font-semibold text-lg">1800 NRPG AUS</p>
                <p className="text-[#9CA3AF] text-sm">Mon-Fri 8AM-6PM AEST</p>
              </div>

              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
                <div className="flex items-center mb-4">
                  <Mail className="h-6 w-6 text-[#2196F3] mr-3" />
                  <h3 className="font-poppins font-semibold text-xl text-white">Email</h3>
                </div>
                <p className="text-[#9CA3AF] mb-2">General Inquiries</p>
                <p className="text-[#2196F3] font-semibold">hello@nrp.com.au</p>
                <p className="text-[#9CA3AF] text-sm">Response within 24 hours</p>
              </div>

              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-[#FF9800] mr-3" />
                  <h3 className="font-poppins font-semibold text-xl text-white">Business Hours</h3>
                </div>
                <div className="space-y-1 text-[#9CA3AF]">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
                <p className="text-[#00BFA6] font-semibold mt-3">Emergency: 24/7 Available</p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="font-poppins font-bold text-3xl text-center mb-12">
              Support <span className="gradient-text-teal-purple">Team</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {supportTeam.map((team, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]"
                >
                  <div className="flex items-center mb-4">
                    <team.icon className={`h-6 w-6 ${team.color} mr-3`} />
                    <h3 className="font-poppins font-semibold text-lg text-white">{team.name}</h3>
                  </div>
                  <p className="text-[#9CA3AF] mb-4 text-sm leading-relaxed">{team.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-[#9CA3AF] mr-2" />
                      <span className={`text-sm ${team.color}`}>{team.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-[#9CA3AF] mr-2" />
                      <span className={`text-sm ${team.color}`}>{team.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="font-poppins font-bold text-3xl text-center mb-12">
              Platform <span className="gradient-text-teal-purple">Features</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] text-center">
                <Zap className="h-12 w-12 text-[#00BFA6] mx-auto mb-4" />
                <h3 className="font-poppins font-semibold text-xl text-white mb-3">AI-Powered Matching</h3>
                <p className="text-[#9CA3AF] text-sm">Smart algorithm connects clients with the most suitable contractors based on location, expertise, and project requirements.</p>
              </div>

              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] text-center">
                <BarChart3 className="h-12 w-12 text-[#2196F3] mx-auto mb-4" />
                <h3 className="font-poppins font-semibold text-xl text-white mb-3">Real-Time Analytics</h3>
                <p className="text-[#9CA3AF] text-sm">Comprehensive dashboard with project tracking, performance metrics, and business insights for all platform users.</p>
              </div>

              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] text-center">
                <Smartphone className="h-12 w-12 text-[#7C4DFF] mx-auto mb-4" />
                <h3 className="font-poppins font-semibold text-xl text-white mb-3">Mobile-First Design</h3>
                <p className="text-[#9CA3AF] text-sm">Access your platform dashboard, manage projects, and communicate with stakeholders from anywhere, anytime.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] text-center">
            <h3 className="font-poppins font-bold text-2xl text-white mb-4">24/7 Platform Support</h3>
            <p className="text-[#9CA3AF] mb-6">For urgent platform issues or emergency restoration needs, our support team is available around the clock</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-semibold">
                <Phone className="h-4 w-4 mr-2" />
                1800 NRPG SUPPORT
              </Button>
              <Button variant="outline" className="border-[#374151] text-[#F9FAFB] hover:bg-[#1F2937] bg-transparent">
                <MessageSquare className="h-4 w-4 mr-2" />
                Live Chat Support
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
