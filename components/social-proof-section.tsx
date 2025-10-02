"use client"

import { Star, ChevronLeft, ChevronRight, Users, Clock, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function SocialProofSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Homeowner",
      avatar: "/professional-woman-smiling.png",
      quote:
        "Finally clarity in claims! The transparent pricing and real-time updates made what could have been a nightmare into a smooth process.",
      rating: 5,
    },
    {
      name: "Mike Rodriguez",
      role: "Contractor",
      avatar: "/professional-contractor-man.jpg",
      quote:
        "No more chasing payments or dealing with unreliable leads. This platform has transformed my business operations completely.",
      rating: 5,
    },
    {
      name: "Jennifer Chen",
      role: "Property Manager",
      avatar: "/professional-asian-woman.png",
      quote:
        "The standardized pricing across all locations has made budgeting so much easier. Quality service every time.",
      rating: 5,
    },
  ]

  const stats = [
    { label: "Happy Clients", value: "2,847", icon: Users, color: "#00BFA6" },
    { label: "Avg. Response Time", value: "< 2hrs", icon: Clock, color: "#2196F3" },
    { label: "Cost Savings", value: "38%", icon: DollarSign, color: "#7C4DFF" },
  ]

  useEffect(() => {
    if (!isClient) return
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length, isClient])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-4xl md:text-5xl text-balance mb-6 font-medium">
            Trusted by <span className="text-[#00BFA6]">Thousands</span>
          </h2>
          <p className="text-lg text-[#9CA3AF] font-inter max-w-3xl mx-auto leading-relaxed">
            Real stories from clients and contractors who've experienced the difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left side - Testimonial carousel */}
          <div>
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#00BFA6] fill-current" />
                  ))}
                </div>
                {isClient && (
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevTestimonial}
                      className="h-8 w-8 p-0 text-[#9CA3AF] hover:text-[#00BFA6]"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextTestimonial}
                      className="h-8 w-8 p-0 text-[#9CA3AF] hover:text-[#00BFA6]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="min-h-[200px] flex flex-col justify-between">
                <blockquote className="text-lg text-[#F9FAFB] font-inter leading-relaxed mb-6">
                  "{isClient ? testimonials[currentTestimonial].quote : testimonials[0].quote}"
                </blockquote>

                <div className="flex items-center space-x-4">
                  <img
                    src={isClient ? testimonials[currentTestimonial].avatar || "/placeholder.svg" : testimonials[0].avatar || "/placeholder.svg"}
                    alt={isClient ? testimonials[currentTestimonial].name : testimonials[0].name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-poppins font-semibold text-[#F9FAFB]">
                      {isClient ? testimonials[currentTestimonial].name : testimonials[0].name}
                    </div>
                    <div className="text-[#9CA3AF] text-sm">{isClient ? testimonials[currentTestimonial].role : testimonials[0].role}</div>
                  </div>
                </div>
              </div>

              {/* Carousel indicators */}
              {isClient && (
                <div className="flex justify-center space-x-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? "bg-[#00BFA6] w-6" : "bg-[#374151]"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side - Stats */}
          <div>
            <div className="space-y-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: stat.color }}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold font-poppins" style={{ color: stat.color }}>
                          {stat.value}
                        </div>
                        <div className="text-[#9CA3AF] font-inter">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Additional trust indicators */}
            <div className="mt-8 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-2xl p-6 border border-[#00BFA6]/20">
              <div className="text-center">
                <div className="text-2xl font-bold font-poppins text-[#00BFA6] mb-2">99.2% Satisfaction Rate</div>
                <div className="text-[#9CA3AF] font-inter">Based on 2,847 completed projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
