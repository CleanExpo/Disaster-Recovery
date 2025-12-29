import Header from "@/components/header"
import Footer from "@/components/footer"
import { Shield, Eye, Users, Mail, Lock, Database, Globe, FileText } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F9FAFB]">
      <Header />
      <main className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-balance mb-8">
              Privacy <span className="gradient-text-teal-purple">Policy</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] mb-4">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-[#9CA3AF]">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Section 1: Information Collection */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <Database className="h-8 w-8 text-[#00BFA6] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">Information We Collect</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-poppins font-semibold text-xl text-white mb-4">Personal Information</h3>
                  <ul className="space-y-2 text-[#9CA3AF]">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#00BFA6] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Name, email address, and phone number
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#00BFA6] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Property address and damage details
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#00BFA6] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Insurance information when provided
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#00BFA6] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Payment and billing information
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-poppins font-semibold text-xl text-white mb-4">Technical Information</h3>
                  <ul className="space-y-2 text-[#9CA3AF]">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#2196F3] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      IP address and device information
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#2196F3] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Browser type and operating system
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#2196F3] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Usage patterns and preferences
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#2196F3] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Cookies and tracking technologies
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: How We Use Information */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-[#2196F3] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">How We Use Your Information</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-[#00BFA6]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-[#00BFA6]" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Service Delivery</h3>
                  <p className="text-[#9CA3AF] text-sm">
                    Match you with qualified contractors and manage your restoration projects
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-[#2196F3]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-[#2196F3]" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Communication</h3>
                  <p className="text-[#9CA3AF] text-sm">
                    Send updates, notifications, and support messages related to your projects
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-[#7C4DFF]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-[#7C4DFF]" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Platform Security</h3>
                  <p className="text-[#9CA3AF] text-sm">
                    Protect against fraud, abuse, and ensure platform security and integrity
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Information Sharing & Protection */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <Lock className="h-8 w-8 text-[#7C4DFF] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">Information Sharing & Protection</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-poppins font-semibold text-xl text-white mb-4">When We Share Information</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-[#00BFA6] pl-4">
                      <h4 className="font-semibold text-white">With Contractors</h4>
                      <p className="text-[#9CA3AF] text-sm">
                        Only necessary project details to provide restoration services
                      </p>
                    </div>
                    <div className="border-l-4 border-[#2196F3] pl-4">
                      <h4 className="font-semibold text-white">Legal Requirements</h4>
                      <p className="text-[#9CA3AF] text-sm">When required by law or to protect our rights and safety</p>
                    </div>
                    <div className="border-l-4 border-[#7C4DFF] pl-4">
                      <h4 className="font-semibold text-white">Service Providers</h4>
                      <p className="text-[#9CA3AF] text-sm">
                        Trusted partners who help us operate our platform securely
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-poppins font-semibold text-xl text-white mb-4">Security Measures</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-[#00BFA6] mr-3" />
                      <span className="text-[#9CA3AF]">256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 text-[#00BFA6] mr-3" />
                      <span className="text-[#9CA3AF]">Secure data storage</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-5 w-5 text-[#00BFA6] mr-3" />
                      <span className="text-[#9CA3AF]">Regular security audits</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-[#00BFA6] mr-3" />
                      <span className="text-[#9CA3AF]">Limited access controls</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Your Rights & Contact */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-[#FF9800] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">Your Rights & Contact</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-poppins font-semibold text-xl text-white mb-4">Your Privacy Rights</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-[#FF9800] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <p className="text-white font-medium">Access Your Data</p>
                        <p className="text-[#9CA3AF] text-sm">Request a copy of your personal information</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-[#FF9800] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <p className="text-white font-medium">Correct Information</p>
                        <p className="text-[#9CA3AF] text-sm">Update or correct inaccurate data</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-[#FF9800] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <p className="text-white font-medium">Delete Account</p>
                        <p className="text-[#9CA3AF] text-sm">Request deletion of your account and data</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-[#FF9800] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <p className="text-white font-medium">Opt-Out</p>
                        <p className="text-[#9CA3AF] text-sm">Unsubscribe from marketing communications</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-poppins font-semibold text-xl text-white mb-4">Contact Our Privacy Team</h3>
                  <div className="space-y-4">
                    <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                      <div className="flex items-center mb-2">
                        <Mail className="h-5 w-5 text-[#00BFA6] mr-2" />
                        <span className="text-white font-medium">Email</span>
                      </div>
                      <p className="text-[#00BFA6]">nrpg.team@gmail.com</p>
                    </div>

                    <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                      <div className="flex items-center mb-2">
                        <Globe className="h-5 w-5 text-[#2196F3] mr-2" />
                        <span className="text-white font-medium">Address</span>
                      </div>
                      <p className="text-[#9CA3AF] text-sm">
                        Privacy Officer
                        <br />
                        NRPG - Unite Group Australia
                        <br />
                        Level 10, 123 Collins Street
                        <br />
                        Melbourne VIC 3000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
