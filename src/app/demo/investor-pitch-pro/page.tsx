'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize,
  Download, Settings, ChevronLeft, ChevronRight, Mic, Music,
  TrendingUp, Users, Shield, Globe, Zap, Award, DollarSign,
  BarChart3, Target, Rocket, Building, HandshakeIcon, Info
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Dynamic imports for heavy libraries
const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Chart), { ssr: false });

// Professional slide data with enhanced content
const professionalSlides = [
  {
    id: 1,
    chapter: "Introduction",
    title: "Disaster Recovery",
    subtitle: "National Recovery Partners",
    content: {
      headline: "Transforming Australia's $4.2B Restoration Industry",
      bullets: [
        "AI-Powered Claims Distribution Platform",
        "115,350+ Contractors Nationwide",
        "Zero Human Intervention Required"
      ],
      metrics: [
        { label: "Market Size", value: "$4.2B", trend: "+12%" },
        { label: "Properties at Risk", value: "23.7M", trend: "+35%" },
        { label: "Digital Adoption", value: "2%", trend: "Opportunity" }
      ]
    },
    visualType: "hero",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    animation: "slideUp",
    duration: 12000,
    narration: "Welcome to National Recovery Partners. We're revolutionizing Australia's 4.2 billion dollar disaster recovery industry through our AI-powered claims distribution platform. With 23.7 million properties at risk and disasters increasing 35% since the 1990s, we're building the infrastructure to connect insurance companies with quality contractors instantly, across every location in Australia.",
    speakerNotes: "Emphasize the scale of the opportunity and our unique position as a technology platform, not a service provider. Highlight that we're building infrastructure, not just another restoration company."
  },
  {
    id: 2,
    chapter: "Problem",
    title: "The Broken Industry",
    subtitle: "A $4.2 Billion Problem",
    content: {
      headline: "Current System Failures",
      problems: [
        { issue: "Admin Control", stat: "95%", description: "Market controlled by middlemen taking huge cuts" },
        { issue: "Resolution Time", stat: "6-12mo", description: "Average claim resolution period" },
        { issue: "Fragmentation", stat: "115,350", description: "Contractors with no unified platform" },
        { issue: "Digital Gap", stat: "2%", description: "Industry digital adoption rate" }
      ],
      impact: "Customers wait months, contractors struggle, insurers lose billions"
    },
    visualType: "problemGrid",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    animation: "fadeScale",
    duration: 11000,
    narration: "The Australian restoration industry is fundamentally broken. Admin companies control 95% of the market, taking massive cuts while customers wait 6 to 12 months for resolution. With 115,350 fragmented contractors and only 2% digital adoption, the industry desperately needs disruption. This inefficiency costs insurers billions and leaves communities devastated.",
    speakerNotes: "Paint a vivid picture of the problem. Use specific examples if asked - mention recent floods, bushfires. This slide sets up the need for our solution."
  },
  {
    id: 3,
    chapter: "Solution",
    title: "Our Revolutionary Solution",
    subtitle: "Self-Running Distribution Platform",
    content: {
      headline: "100% Automated Claims Distribution",
      features: [
        { icon: "🤖", title: "AI Matching", desc: "Instant contractor selection" },
        { icon: "🚀", title: "Zero Touch", desc: "No human intervention" },
        { icon: "🌐", title: "National Scale", desc: "Every Australian location" },
        { icon: "⚡", title: "Real-Time", desc: "24/7 instant response" }
      ],
      differentiator: "We don't provide services - we distribute opportunities"
    },
    visualType: "solutionFlow",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    animation: "slideRight",
    duration: 10000,
    narration: "Our solution is revolutionary yet simple. We've built a completely self-running platform that uses artificial intelligence to instantly match insurance claims with qualified contractors. No call centers, no admin overhead, just direct connections that work 24/7. We're not a restoration company - we're the distribution infrastructure that makes the entire industry efficient.",
    speakerNotes: "Emphasize automation and scale. Make clear we're a tech platform, not a service provider. This is Uber for disaster recovery."
  },
  {
    id: 4,
    chapter: "Market",
    title: "Massive Market Opportunity",
    subtitle: "Growing Exponentially",
    content: {
      headline: "Australian & Global Markets",
      marketData: {
        TAM: { value: "$41B", label: "Global Market", growth: "+5.7%" },
        SAM: { value: "$4.2B", label: "Australian Market", growth: "+12%" },
        SOM: { value: "$420M", label: "Achievable by 2027", growth: "+40%" }
      },
      drivers: [
        "Climate change increasing disasters 35%",
        "Insurance premiums rising 20% annually",
        "Digital transformation accelerating post-COVID"
      ]
    },
    visualType: "marketChart",
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    animation: "zoomIn",
    chartData: {
      labels: ["2024", "2025", "2026", "2027", "2028"],
      datasets: [{
        label: "Market Size ($B)",
        data: [4.2, 4.7, 5.3, 5.9, 6.6],
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.2)"
      }]
    },
    duration: 12000,
    narration: "The opportunity is massive and growing. Australia's 4.2 billion dollar restoration market is part of a 41 billion dollar global industry growing at 5.7% annually. With climate change driving a 35% increase in disasters and insurance premiums rising 20% yearly, demand will only accelerate. We're positioned to capture 10% of the Australian market by 2027.",
    speakerNotes: "Show the inevitability of growth. Climate change isn't going away. Insurance companies need our solution to stay profitable."
  },
  {
    id: 5,
    chapter: "Business Model",
    title: "Multiple Revenue Streams",
    subtitle: "Proven Unit Economics",
    content: {
      headline: "Diversified Revenue Model",
      streams: [
        { source: "Onboarding", amount: "$2,475", desc: "$275 application + $2,200 joining" },
        { source: "Subscriptions", amount: "$495/mo", desc: "Per contractor after ramp-up" },
        { source: "Lead Fees", amount: "10-15%", desc: "Commission on completed jobs" },
        { source: "Territory Rights", amount: "$5-25K", desc: "Exclusive area licensing" }
      ],
      projection: "4,000 contractors = $40M ARR at 96% margins"
    },
    visualType: "revenueBreakdown",
    background: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    animation: "slideLeft",
    duration: 11000,
    narration: "Our business model captures value at every point. Contractors pay 275 dollars to apply and 2,200 to join, then 495 monthly after ramp-up. We earn 10 to 15% commission on successful jobs and offer premium territory rights from 5 to 25 thousand dollars. With just 4,000 contractors, we achieve 40 million in annual recurring revenue at 96% margins.",
    speakerNotes: "Highlight the multiple revenue streams and exceptional margins. Compare to SaaS businesses - we have better economics."
  },
  {
    id: 6,
    chapter: "Platform Value",
    title: "$1.6M Platform Already Built",
    subtitle: "2 Years of Development Complete",
    content: {
      headline: "Production-Ready Technology",
      achievements: [
        { metric: "$1.6M", label: "Development Value" },
        { metric: "26,803", label: "Lines of Code" },
        { metric: "8,750", label: "Dev Hours" },
        { metric: "100%", label: "Complete" }
      ],
      systems: [
        "AI fraud detection integrated",
        "Payment processing operational", 
        "SEO engine automated",
        "Quality assurance built"
      ]
    },
    visualType: "techStack",
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    animation: "float",
    duration: 10000,
    narration: "We've already invested 1.6 million dollars building a complete platform. With over 26,000 lines of code and 8,750 development hours, we've eliminated two years of development risk for investors. The platform is production-ready today with AI fraud detection, payment processing, automated SEO, and quality assurance systems fully operational.",
    speakerNotes: "This is a key differentiator - the platform exists and works. We're not asking for money to build, but to scale."
  },
  {
    id: 7,
    chapter: "Technology",
    title: "Unbeatable Technology Moat",
    subtitle: "AI-First Architecture",
    content: {
      headline: "Proprietary Technology Stack",
      capabilities: [
        { tech: "OpenAI GPT-4", purpose: "Fraud detection & matching" },
        { tech: "30,000 Pages", purpose: "Automated SEO generation" },
        { tech: "Stripe Connect", purpose: "Split payment processing" },
        { tech: "IICRC Standards", purpose: "Quality compliance" }
      ],
      advantage: "18-24 months ahead of any competitor"
    },
    visualType: "techDiagram",
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    animation: "rotate3d",
    duration: 10000,
    narration: "Our technology creates an unbeatable moat. We use GPT-4 for intelligent fraud detection and contractor matching. Our SEO engine can generate 30,000 location-specific pages automatically. Stripe Connect handles complex payment splitting, while our IICRC compliance system ensures quality. We're 18 to 24 months ahead of any potential competitor.",
    speakerNotes: "Emphasize the sophistication and barriers to entry. This isn't just a website - it's complex infrastructure."
  },
  {
    id: 8,
    chapter: "Go-to-Market",
    title: "Domination Strategy",
    subtitle: "SEO Monopoly + Direct Sales",
    content: {
      headline: "Three-Phase Market Capture",
      phases: [
        { phase: 1, target: "Major Cities", timeline: "Months 1-6", cities: 8 },
        { phase: 2, target: "Regional Centers", timeline: "Months 7-12", cities: 50 },
        { phase: 3, target: "Complete Coverage", timeline: "Months 13-24", locations: "All" }
      ],
      strategy: "Own every [disaster] + [location] search term"
    },
    visualType: "timeline",
    background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    animation: "stagger",
    duration: 11000,
    narration: "Our go-to-market strategy ensures complete market domination. Phase one captures major cities in 6 months. Phase two expands to 50 regional centers by month 12. Phase three achieves complete national coverage by year two. Our SEO strategy will own every combination of disaster and location keywords, making us impossible to compete with.",
    speakerNotes: "Show the systematic approach to market domination. Emphasize first-mover advantage and network effects."
  },
  {
    id: 9,
    chapter: "Financials",
    title: "Path to $40M Revenue",
    subtitle: "Conservative Projections",
    content: {
      headline: "5-Year Financial Forecast",
      projections: [
        { year: "Y1", contractors: 250, revenue: "$2.9M", margin: "50%" },
        { year: "Y2", contractors: 750, revenue: "$8.1M", margin: "82%" },
        { year: "Y3", contractors: 1500, revenue: "$15.5M", margin: "91%" },
        { year: "Y5", contractors: 4000, revenue: "$40M", margin: "96%" }
      ],
      breakeven: "Month 6 with just 50 contractors"
    },
    visualType: "financialChart",
    background: "linear-gradient(135deg, #9890e3 0%, #b1f4cf 100%)",
    animation: "slideUp",
    chartData: {
      labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
      datasets: [{
        label: "Revenue ($M)",
        data: [2.9, 8.1, 15.5, 25.2, 40],
        backgroundColor: "rgba(34, 197, 94, 0.5)"
      }]
    },
    duration: 12000,
    narration: "Our financial projections are conservative yet exciting. Year one: 250 contractors generating 2.9 million. Year two: 750 contractors and 8.1 million. By year five, 4,000 contractors generate 40 million in revenue at 96% margins. We break even at month six with just 50 contractors. These projections assume no major partnerships or acquisitions.",
    speakerNotes: "These are base case projections. With insurance partnerships, we could 10x these numbers. Emphasize the margin story."
  },
  {
    id: 10,
    chapter: "Competitive Advantage",
    title: "Why We Win",
    subtitle: "Multiple Defensive Moats",
    content: {
      headline: "Unbeatable Competitive Position",
      moats: [
        { moat: "First Mover", desc: "No national platform exists" },
        { moat: "Network Effects", desc: "Value increases exponentially" },
        { moat: "SEO Domination", desc: "30,000 pages lock out competitors" },
        { moat: "Tech Lead", desc: "2 years ahead, $1.6M invested" },
        { moat: "Switching Costs", desc: "Contractors locked into ecosystem" }
      ],
      timing: "US giants haven't entered - our window is now"
    },
    visualType: "competitiveMatrix",
    background: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    animation: "pulse",
    duration: 11000,
    narration: "We have multiple defensive moats. As first mover, we'll establish network effects where our value increases exponentially with each contractor. Our SEO strategy with 30,000 pages makes us impossible to displace. We're two years ahead technologically with 1.6 million already invested. High switching costs lock contractors into our ecosystem. US giants like SERVPRO haven't entered Australia yet - our window is now.",
    speakerNotes: "Emphasize urgency - this opportunity won't last. Someone will build this. It should be us."
  },
  {
    id: 11,
    chapter: "Exit Strategy",
    title: "Multiple Exit Paths",
    subtitle: "20x+ Return Potential",
    content: {
      headline: "Clear Exit Opportunities",
      scenarios: [
        { buyer: "Insurance Companies", examples: "Suncorp, IAG, QBE", multiple: "5-8x" },
        { buyer: "US Giants", examples: "SERVPRO, BELFOR", multiple: "8-10x" },
        { buyer: "Private Equity", examples: "Industry roll-up", multiple: "6-8x" }
      ],
      valuations: [
        { scenario: "Conservative", multiple: "3x", value: "$120M" },
        { scenario: "Expected", multiple: "5x", value: "$200M" },
        { scenario: "Optimistic", multiple: "8x", value: "$320M" }
      ]
    },
    visualType: "exitChart",
    background: "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
    animation: "flip",
    duration: 11000,
    narration: "Exit opportunities are abundant. Insurance companies like Suncorp and IAG need our technology to stay competitive. US restoration giants want Australian market entry. Private equity sees consolidation opportunity. At conservative 3x revenue, that's 120 million. At expected 5x, 200 million. In an competitive scenario, 8x delivers 320 million valuation. That's 20 to 30x returns for Series A investors.",
    speakerNotes: "Show comparable exits in similar industries. ServiceMaster sold for 8x. This is realistic, not fantasy."
  },
  {
    id: 12,
    chapter: "Investment",
    title: "Series A: $2.5M",
    subtitle: "Join Us in Transforming an Industry",
    content: {
      headline: "Investment Allocation",
      allocation: [
        { category: "Marketing & Growth", amount: "$1.0M", percentage: 40 },
        { category: "Team Expansion", amount: "$875K", percentage: 35 },
        { category: "Technology", amount: "$375K", percentage: 15 },
        { category: "Working Capital", amount: "$250K", percentage: 10 }
      ],
      terms: {
        round: "Series A",
        amount: "$2.5M",
        valuation: "$10M pre-money",
        use: "Scale to market dominance"
      },
      callToAction: "Be part of the transformation"
    },
    visualType: "investmentBreakdown",
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    animation: "slideUp",
    duration: 15000,
    narration: "We're raising 2.5 million dollars to dominate the Australian market. 40% goes to marketing and contractor acquisition. 35% for team expansion. 15% for technology enhancement. 10% working capital. The platform is built, the market is massive, and the timing is perfect. This is your opportunity to transform an entire industry while delivering exceptional returns. Join us in building the future of disaster recovery.",
    speakerNotes: "Close with confidence. The opportunity is clear, the team is ready, and the technology works. Ask for the investment."
  }
];

// Particle background component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const particleCount = 50;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

// Animated counter component
const AnimatedCounter = ({ value, duration = 2000, prefix = '', suffix = '' }: any) => {
  const [displayValue, setDisplayValue] = useState(0);
  const nodeRef = useRef<any>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ''));
            const startTime = Date.now();
            
            const updateCounter = () => {
              const now = Date.now();
              const progress = Math.min((now - startTime) / duration, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const current = Math.floor(numericValue * easeOutQuart);
              
              setDisplayValue(current);
              
              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              }
            };
            
            updateCounter();
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={nodeRef}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

function InvestorPitchProPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [narrationVolume, setNarrationVolume] = useState(1);
  const [autoAdvance, setAutoAdvance] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slide = professionalSlides[currentSlide];

  // Professional narration with ElevenLabs fallback to Speech Synthesis
  const playNarration = useCallback(async (text: string) => {
    if (isMuted) return;

    try {
      // Try ElevenLabs API first
      const response = await fetch('/api/elevenlabs-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'professional' })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        if (audioRef.current) {
          audioRef.current.pause();
        }
        
        audioRef.current = new Audio(audioUrl);
        audioRef.current.volume = narrationVolume;
        await audioRef.current.play();
      } else {
        throw new Error('ElevenLabs API failed');
      }
    } catch (error) {
      // Fallback to browser Speech Synthesis
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.volume = narrationVolume;
        
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
          voice.lang.includes('en-AU') || 
          voice.name.includes('Microsoft') || 
          voice.name.includes('Google')
        );
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
        
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [isMuted, narrationVolume]);

  // Background music management
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = musicVolume * 0.3; // Keep it subtle
    }
  }, [musicVolume]);

  // Auto-advance with narration
  useEffect(() => {
    if (isPlaying && autoAdvance) {
      playNarration(slide.narration);
      
      timerRef.current = setTimeout(() => {
        if (currentSlide < professionalSlides.length - 1) {
          setCurrentSlide(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, slide.duration);
      
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [currentSlide, isPlaying, autoAdvance, slide, playNarration]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch(e.key) {
        case ' ':
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
        case 'ArrowRight':
          if (currentSlide < professionalSlides.length - 1) {
            setCurrentSlide(prev => prev + 1);
          }
          break;
        case 'ArrowLeft':
          if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
          }
          break;
        case 'f':
        case 'F':
          handleFullscreen();
          break;
        case 'm':
        case 'M':
          setIsMuted(prev => !prev);
          break;
        case 'n':
        case 'N':
          setShowNotes(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const handleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    const content = professionalSlides.map((slide, index) => 
      `SLIDE ${index + 1}: ${slide.title}
${slide.subtitle}

${slide.content.headline}

NARRATION:
${slide.narration}

SPEAKER NOTES:
${slide.speakerNotes}

---
`).join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NRP-Professional-Pitch-Deck.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Slide content renderers
  const renderSlideContent = () => {
    switch(slide.visualType) {
      case 'hero':
        return (
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              className="mb-8"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Image
                src="/images/logos/dr-logo.svg"
                alt="Disaster Recovery"
                width={300}
                height={120}
                className="mx-auto mb-6"
              />
            </motion.div>
            
            <h1 className="text-7xl font-bold mb-4">{slide.content.headline}</h1>
            
            <div className="flex justify-center gap-8 mt-12">
              {slide.content.metrics?.map((metric, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="text-4xl font-bold">
                    <AnimatedCounter value={metric.value} prefix={metric.value.includes('$') ? '$' : ''} suffix={metric.value.includes('B') ? 'B' : metric.value.includes('M') ? 'M' : ''} />
                  </div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                  <div className="text-xs text-green-300">{metric.trend}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'problemGrid':
        return (
          <motion.div className="text-white">
            <h2 className="text-5xl font-bold mb-8 text-center">{slide.content.headline}</h2>
            <div className="grid grid-cols-2 gap-6">
              {slide.content.problems?.map((problem, index) => (
                <motion.div
                  key={index}
                  className="bg-red-900/30 backdrop-blur-sm rounded-xl p-6 border border-red-600/30"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl font-bold text-red-400">{problem.stat}</div>
                  <div className="text-lg font-semibold mt-2">{problem.issue}</div>
                  <div className="text-sm opacity-80 mt-1">{problem.description}</div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="text-center mt-8 text-xl italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              "{slide.content.impact}"
            </motion.div>
          </motion.div>
        );

      case 'financialChart':
        if (slide.chartData) {
          return (
            <motion.div className="text-white">
              <h2 className="text-5xl font-bold mb-8 text-center">{slide.content.headline}</h2>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <Chart
                  type="bar"
                  data={slide.chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      title: { display: false }
                    },
                    scales: {
                      y: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'white' }
                      },
                      x: {
                        grid: { display: false },
                        ticks: { color: 'white' }
                      }
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-4 gap-4 mt-8">
                {slide.content.projections?.map((proj, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-sm opacity-60">{proj.year}</div>
                    <div className="text-2xl font-bold">{proj.revenue}</div>
                    <div className="text-sm text-emerald-600">{proj.margin} margin</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        }
        break;

      default:
        return (
          <motion.div 
            className="text-white text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-5xl font-bold mb-8">{slide.content.headline}</h2>
            {/* Generic content renderer */}
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden" ref={containerRef}>
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Main Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 flex items-center justify-center p-12"
          style={{ background: slide.background }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl w-full">
            {renderSlideContent()}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Professional Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10">
        <div className="px-6 py-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>{slide.chapter}</span>
              <span>Slide {currentSlide + 1} of {professionalSlides.length}</span>
            </div>
            <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSlide + 1) / professionalSlides.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => currentSlide > 0 && setCurrentSlide(prev => prev - 1)}
                disabled={currentSlide === 0}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition disabled:opacity-30"
              >
                <SkipBack className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              
              <button
                onClick={() => currentSlide < professionalSlides.length - 1 && setCurrentSlide(prev => prev + 1)}
                disabled={currentSlide === professionalSlides.length - 1}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition disabled:opacity-30"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            {/* Center Info */}
            <div className="text-center">
              <div className="text-white font-semibold">{slide.title}</div>
              <div className="text-gray-400 text-sm">{slide.subtitle}</div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="Speaker Notes (N)"
              >
                <Info className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="Mute (M)"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <Settings className="h-5 w-5" />
              </button>
              
              <button
                onClick={handleFullscreen}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="Fullscreen (F)"
              >
                <Maximize className="h-5 w-5" />
              </button>
              
              <button
                onClick={handleDownload}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="absolute top-20 right-6 bg-black/90 backdrop-blur-xl rounded-xl p-6 border border-white/10 w-80"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h3 className="text-white font-semibold mb-4">Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                  <Mic className="h-4 w-4" />
                  Narration Volume
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={narrationVolume}
                  onChange={(e) => setNarrationVolume(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                  <Music className="h-4 w-4" />
                  Background Music
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={autoAdvance}
                    onChange={(e) => setAutoAdvance(e.target.checked)}
                    className="mr-2"
                  />
                  Auto-advance slides
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speaker Notes */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            className="absolute top-20 left-6 bg-black/90 backdrop-blur-xl rounded-xl p-6 border border-white/10 w-96 max-h-96 overflow-y-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="text-white font-semibold mb-4">Speaker Notes</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {slide.speakerNotes}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter Navigation */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {professionalSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default InvestorPitchProPage;