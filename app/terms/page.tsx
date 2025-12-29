import Header from "@/components/header"
import Footer from "@/components/footer"
import { FileText, Users, Shield, Scale, AlertTriangle, CheckCircle, Mail, Globe } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F9FAFB]">
      <Header />
      <main className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-balance mb-8">
              Terms of <span className="gradient-text-teal-purple">Service</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] mb-4">
              Please read these terms carefully before using our platform and services.
            </p>
            <p className="text-[#9CA3AF]">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Section 1: Service Agreement */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-[#00BFA6] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">Service Agreement</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-poppins font-semibold text-xl text-white mb-4">Acceptance of Terms</h3>
                  <p className="text-[#9CA3AF] mb-4 leading-relaxed">
                    By accessing and using NRPG's platform, you accept and agree to be bound by these terms and
                    conditions. If you do not agree to these terms, please do not use our services.
                  </p>
                  <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-[#00BFA6] mr-2" />
                      <span className="text-white font-medium">Platform Access</span>
                    </div>
                    <p className="text-[#9CA3AF] text-sm">
                      You must be 18+ years old and legally capable of entering contracts
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-poppins font-semibold text-xl text-white mb-4">Service Description</h3>
                  <p className="text-[#9CA3AF] mb-4 leading-relaxed">
                    NRPG provides a digital platform connecting property owners with verified restoration contractors,
                    facilitating transparent pricing, project management, and quality assurance.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-[#00BFA6] rounded-full mr-3"></span>
                      <span className="text-[#9CA3AF] text-sm">Contractor matching services</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-[#00BFA6] rounded-full mr-3"></span>
                      <span className="text-[#9CA3AF] text-sm">Project management tools</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-[#00BFA6] rounded-full mr-3"></span>
                      <span className="text-[#9CA3AF] text-sm">Quality assurance monitoring</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: User Responsibilities */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-[#2196F3] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">User Responsibilities</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="bg-[#00BFA6]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-[#00BFA6]" />
                  </div>
                  <h3 className="font-semibold text-white mb-3 text-center">Account Security</h3>
                  <ul className="space-y-2 text-[#9CA3AF] text-sm">
                    <li>• Maintain confidential login credentials</li>
                    <li>• Report unauthorized access immediately</li>
                    <li>• Use strong, unique passwords</li>
                    <li>• Keep contact information current</li>
                  </ul>
                </div>

                <div>
                  <div className="bg-[#2196F3]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-[#2196F3]" />
                  </div>
                  <h3 className="font-semibold text-white mb-3 text-center">Accurate Information</h3>
                  <ul className="space-y-2 text-[#9CA3AF] text-sm">
                    <li>• Provide truthful project details</li>
                    <li>• Submit accurate property information</li>
                    <li>• Update changes promptly</li>
                    <li>• Verify insurance details</li>
                  </ul>
                </div>

                <div>
                  <div className="bg-[#7C4DFF]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Scale className="h-8 w-8 text-[#7C4DFF]" />
                  </div>
                  <h3 className="font-semibold text-white mb-3 text-center">Lawful Use</h3>
                  <ul className="space-y-2 text-[#9CA3AF] text-sm">
                    <li>• Comply with all applicable laws</li>
                    <li>• Respect intellectual property rights</li>
                    <li>• No fraudulent or deceptive practices</li>
                    <li>• Professional communication standards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Platform Policies & Limitations */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-[#7C4DFF] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">Platform Policies & Limitations</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-poppins font-semibold text-xl text-white mb-4">Service Limitations</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-[#FF9800] pl-4">
                      <div className="flex items-center mb-1">
                        <AlertTriangle className="h-4 w-4 text-[#FF9800] mr-2" />
                        <h4 className="font-semibold text-white text-sm">Platform Role</h4>
                      </div>
                      <p className="text-[#9CA3AF] text-sm">
                        NRPG acts as a facilitator between clients and contractors. We do not perform restoration work
                        directly.
                      </p>
                    </div>

                    <div className="border-l-4 border-[#2196F3] pl-4">
                      <div className="flex items-center mb-1">
                        <Scale className="h-4 w-4 text-[#2196F3] mr-2" />
                        <h4 className="font-semibold text-white text-sm">Contractor Independence</h4>
                      </div>
                      <p className="text-[#9CA3AF] text-sm">
                        Contractors are independent businesses. Work quality and completion are their responsibility.
                      </p>
                    </div>

                    <div className="border-l-4 border-[#7C4DFF] pl-4">
                      <div className="flex items-center mb-1">
                        <Shield className="h-4 w-4 text-[#7C4DFF] mr-2" />
                        <h4 className="font-semibold text-white text-sm">Service Availability</h4>
                      </div>
                      <p className="text-[#9CA3AF] text-sm">
                        Platform availability may be affected by maintenance, updates, or technical issues.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-poppins font-semibold text-xl text-white mb-4">Prohibited Activities</h3>
                  <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                    <ul className="space-y-2 text-[#9CA3AF] text-sm">
                      <li className="flex items-start">
                        <span className="text-[#FF4444] mr-2">×</span>
                        Circumventing platform for direct contractor contact
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF4444] mr-2">×</span>
                        Submitting false or misleading information
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF4444] mr-2">×</span>
                        Attempting to hack or disrupt platform security
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF4444] mr-2">×</span>
                        Using platform for illegal or unauthorized purposes
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF4444] mr-2">×</span>
                        Harassment or inappropriate communication
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Legal Terms & Contact */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="flex items-center mb-6">
                <Scale className="h-8 w-8 text-[#FF9800] mr-4" />
                <h2 className="font-poppins font-bold text-3xl text-white">Legal Terms & Contact</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-poppins font-semibold text-xl text-white mb-4">Governing Law & Disputes</h3>
                  <div className="space-y-4">
                    <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                      <h4 className="font-semibold text-white mb-2">Australian Law</h4>
                      <p className="text-[#9CA3AF] text-sm">
                        These terms are governed by Australian law and the laws of Victoria. Any disputes will be
                        resolved in Victorian courts.
                      </p>
                    </div>

                    <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                      <h4 className="font-semibold text-white mb-2">Limitation of Liability</h4>
                      <p className="text-[#9CA3AF] text-sm">
                        NRPG's liability is limited to the maximum extent permitted by law. We are not liable for
                        indirect or consequential damages.
                      </p>
                    </div>

                    <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                      <h4 className="font-semibold text-white mb-2">Terms Updates</h4>
                      <p className="text-[#9CA3AF] text-sm">
                        We may update these terms periodically. Continued use constitutes acceptance of updated terms.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-poppins font-semibold text-xl text-white mb-4">Contact Legal Team</h3>
                  <div className="space-y-4">
                    <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                      <div className="flex items-center mb-2">
                        <Mail className="h-5 w-5 text-[#00BFA6] mr-2" />
                        <span className="text-white font-medium">Legal Inquiries</span>
                      </div>
                      <p className="text-[#00BFA6]">nrpg.team@gmail.com</p>
                      <p className="text-[#9CA3AF] text-sm mt-1">For questions about these terms or legal matters</p>
                    </div>

                    <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                      <div className="flex items-center mb-2">
                        <Globe className="h-5 w-5 text-[#2196F3] mr-2" />
                        <span className="text-white font-medium">Legal Address</span>
                      </div>
                      <p className="text-[#9CA3AF] text-sm">
                        Legal Department
                        <br />
                        NRPG - Unite Group Australia
                        <br />
                        Level 10, 123 Collins Street
                        <br />
                        Melbourne VIC 3000
                        <br />
                        Australia
                      </p>
                    </div>

                    <div className="bg-[#FF9800]/10 rounded-lg p-4 border border-[#FF9800]">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-5 w-5 text-[#FF9800] mr-2" />
                        <span className="text-white font-medium">Important Notice</span>
                      </div>
                      <p className="text-[#9CA3AF] text-sm">
                        By using our platform, you acknowledge that you have read, understood, and agree to these terms
                        of service.
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
