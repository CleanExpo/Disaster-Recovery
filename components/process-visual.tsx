import { Search, FileText, Wrench, CheckCircle } from "lucide-react"

export default function ProcessVisual() {
  return (
    <section className="py-16 bg-[#0A0E13]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="font-poppins font-bold text-3xl text-white mb-4">
            Simple <span className="gradient-text-teal-purple">4-Step Process</span>
          </h3>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8 md:mb-0">
            <div className="w-20 h-20 bg-[#00BFA6] rounded-full flex items-center justify-center mb-4">
              <Search className="h-10 w-10 text-white" />
            </div>
            <h4 className="font-poppins font-semibold text-lg text-white mb-2">1. Search</h4>
            <p className="text-[#9CA3AF] text-sm max-w-32">Find verified contractors</p>
          </div>

          <div className="hidden md:block w-16 h-0.5 bg-[#374151] mx-4"></div>

          <div className="flex flex-col items-center text-center mb-8 md:mb-0">
            <div className="w-20 h-20 bg-[#2196F3] rounded-full flex items-center justify-center mb-4">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h4 className="font-poppins font-semibold text-lg text-white mb-2">2. Quote</h4>
            <p className="text-[#9CA3AF] text-sm max-w-32">Get transparent pricing</p>
          </div>

          <div className="hidden md:block w-16 h-0.5 bg-[#374151] mx-4"></div>

          <div className="flex flex-col items-center text-center mb-8 md:mb-0">
            <div className="w-20 h-20 bg-[#7C4DFF] rounded-full flex items-center justify-center mb-4">
              <Wrench className="h-10 w-10 text-white" />
            </div>
            <h4 className="font-poppins font-semibold text-lg text-white mb-2">3. Work</h4>
            <p className="text-[#9CA3AF] text-sm max-w-32">Track progress live</p>
          </div>

          <div className="hidden md:block w-16 h-0.5 bg-[#374151] mx-4"></div>

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-[#00BFA6] rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h4 className="font-poppins font-semibold text-lg text-white mb-2">4. Complete</h4>
            <p className="text-[#9CA3AF] text-sm max-w-32">Secure payment</p>
          </div>
        </div>
      </div>
    </section>
  )
}
