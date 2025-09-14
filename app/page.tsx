import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import ProblemSection from "@/components/problem-section"
import SolutionSection from "@/components/solution-section"
import PlatformFeaturesSection from "@/components/platform-features-section"
import HowItWorksSection from "@/components/how-it-works-section"
import ClientBenefitsSection from "@/components/client-benefits-section"
import ContractorBenefitsSection from "@/components/contractor-benefits-section"
import TrustSection from "@/components/trust-section"
import PricingSection from "@/components/pricing-section"
import SocialProofSection from "@/components/social-proof-section"
import FinalCtaSection from "@/components/final-cta-section"
import StatsVisual from "@/components/stats-visual"
import ProcessVisual from "@/components/process-visual"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F9FAFB]">
      <Header />
      <main>
        <HeroSection />
        <StatsVisual />
        <ProblemSection />
        <SolutionSection />
        <PlatformFeaturesSection />
        <ProcessVisual />
        <HowItWorksSection />
        <ClientBenefitsSection />
        <ContractorBenefitsSection />
        <TrustSection />
        <PricingSection />
        <SocialProofSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  )
}
