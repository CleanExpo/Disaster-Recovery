import { 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  Settings, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Building2,
  Smartphone,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PlatformFeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#7C4DFF]/10 border border-[#7C4DFF]/30 rounded-full text-[#7C4DFF] text-sm font-medium mb-6">
            🏗️ Built for Scale & Growth
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-balance mb-6">
            <span className="text-[#00BFA6]">Platform Features</span> That Power Success
          </h2>
          <p className="text-xl text-[#9CA3AF] font-inter max-w-3xl mx-auto leading-relaxed">
            Our marketplace-as-a-service platform provides everything needed to run a successful restoration business network
          </p>
        </div>

        {/* Core Platform Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] hover:border-[#00BFA6]/50 transition-all duration-300">
            <div className="w-16 h-16 bg-[#00BFA6] rounded-2xl flex items-center justify-center mb-6">
              <Zap className="h-8 w-8 text-[#0F1115]" />
            </div>
            <h3 className="font-poppins font-semibold text-xl text-white mb-4">Smart Matching Engine</h3>
            <p className="text-[#9CA3AF] mb-4">AI-powered algorithm matches clients with the most qualified contractors based on location, expertise, and availability.</p>
            <ul className="text-[#9CA3AF] text-sm space-y-2">
              <li>• Location-based matching</li>
              <li>• Skill assessment</li>
              <li>• Availability tracking</li>
              <li>• Performance scoring</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] hover:border-[#2196F3]/50 transition-all duration-300">
            <div className="w-16 h-16 bg-[#2196F3] rounded-2xl flex items-center justify-center mb-6">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-poppins font-semibold text-xl text-white mb-4">Automated Workflows</h3>
            <p className="text-[#9CA3AF] mb-4">Streamlined processes from lead generation to project completion with minimal manual intervention.</p>
            <ul className="text-[#9CA3AF] text-sm space-y-2">
              <li>• Lead qualification</li>
              <li>• Quote generation</li>
              <li>• Project tracking</li>
              <li>• Payment processing</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] hover:border-[#7C4DFF]/50 transition-all duration-300">
            <div className="w-16 h-16 bg-[#7C4DFF] rounded-2xl flex items-center justify-center mb-6">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-poppins font-semibold text-xl text-white mb-4">Analytics Dashboard</h3>
            <p className="text-[#9CA3AF] mb-4">Comprehensive insights into performance, revenue, and growth opportunities for both clients and contractors.</p>
            <ul className="text-[#9CA3AF] text-sm space-y-2">
              <li>• Real-time metrics</li>
              <li>• Revenue tracking</li>
              <li>• Performance analytics</li>
              <li>• Growth insights</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] hover:border-[#00BFA6]/50 transition-all duration-300">
            <div className="w-16 h-16 bg-[#00BFA6] rounded-2xl flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-[#0F1115]" />
            </div>
            <h3 className="font-poppins font-semibold text-xl text-white mb-4">Quality Assurance</h3>
            <p className="text-[#9CA3AF] mb-4">Built-in verification, insurance tracking, and quality control to ensure consistent service delivery.</p>
            <ul className="text-[#9CA3AF] text-sm space-y-2">
              <li>• License verification</li>
              <li>• Insurance tracking</li>
              <li>• Quality reviews</li>
              <li>• Compliance monitoring</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] hover:border-[#2196F3]/50 transition-all duration-300">
            <div className="w-16 h-16 bg-[#2196F3] rounded-2xl flex items-center justify-center mb-6">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-poppins font-semibold text-xl text-white mb-4">White-Label Ready</h3>
            <p className="text-[#9CA3AF] mb-4">Fully customizable platform that can be rebranded and licensed to other restoration companies.</p>
            <ul className="text-[#9CA3AF] text-sm space-y-2">
              <li>• Custom branding</li>
              <li>• Multi-tenant architecture</li>
              <li>• API access</li>
              <li>• Scalable infrastructure</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] hover:border-[#7C4DFF]/50 transition-all duration-300">
            <div className="w-16 h-16 bg-[#7C4DFF] rounded-2xl flex items-center justify-center mb-6">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-poppins font-semibold text-xl text-white mb-4">Mobile-First Design</h3>
            <p className="text-[#9CA3AF] mb-4">Responsive platform optimized for mobile devices with native app capabilities.</p>
            <ul className="text-[#9CA3AF] text-sm space-y-2">
              <li>• Mobile-optimized UI</li>
              <li>• Push notifications</li>
              <li>• Offline capabilities</li>
              <li>• Native app support</li>
            </ul>
          </div>
        </div>

        {/* Integration Section */}
        <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] mb-16">
          <div className="text-center mb-8">
            <h3 className="font-poppins font-semibold text-2xl text-white mb-4">Seamless Integrations</h3>
            <p className="text-[#9CA3AF] max-w-2xl mx-auto">
              Connect with the tools you already use. Our platform integrates with leading business software to streamline operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00BFA6]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-[#00BFA6]" />
              </div>
              <h4 className="font-semibold text-white mb-2">Clean Claims</h4>
              <p className="text-[#9CA3AF] text-sm">Claims management integration</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2196F3]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-[#2196F3]" />
              </div>
              <h4 className="font-semibold text-white mb-2">Xero/QuickBooks</h4>
              <p className="text-[#9CA3AF] text-sm">Automated invoicing & payments</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#7C4DFF]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#7C4DFF]" />
              </div>
              <h4 className="font-semibold text-white mb-2">CRM Systems</h4>
              <p className="text-[#9CA3AF] text-sm">Customer relationship management</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF6B35]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-[#FF6B35]" />
              </div>
              <h4 className="font-semibold text-white mb-2">API Access</h4>
              <p className="text-[#9CA3AF] text-sm">Custom integrations & webhooks</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="font-poppins font-bold text-3xl text-white mb-6">
            Ready to Transform Your Restoration Business?
          </h3>
          <p className="text-xl text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
            Join Australia's leading restoration marketplace platform and start growing your business today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-poppins font-semibold text-lg px-8 py-4"
            >
              Get Started as Client
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#2196F3] text-[#2196F3] hover:bg-[#2196F3] hover:text-white font-poppins font-semibold text-lg px-8 py-4 bg-transparent"
            >
              Join as Contractor
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
