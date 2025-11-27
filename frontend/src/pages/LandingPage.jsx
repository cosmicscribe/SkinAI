import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ChatSupport from '../components/ChatSupport'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Check,
  Star,
  MessageCircle,
  ChevronRight,
  ShieldCheck,
  Award,
  Brain,
  Zap,
  Globe,
  Users,
  Activity,
  ArrowRight,
  HandCoins,
  Smartphone,
  Clock,
  Camera,
  Send,
  FileText,
  ScanLine,
  FileCheck,
  X
} from 'lucide-react'
import axios from 'axios'
import Navbar from '../components/Navbar'

// --- Components ---

const LandingPage = ({ isAuthenticated, onLogin, onLogout }) => {
  const navigate = useNavigate()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [authData, setAuthData] = useState({ username: '', password: '' })
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [carouselPaused, setCarouselPaused] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Refs for scroll animations
  const heroRef = useRef(null)
  const whyUseRef = useRef(null)
  const oneMinuteRef = useRef(null)
  const testimonialsRef = useRef(null)
  const infoRef = useRef(null)
  const earlyDetectionRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const whyUseInView = useInView(whyUseRef, { once: true, amount: 0.2 })
  const oneMinuteInView = useInView(oneMinuteRef, { once: true, amount: 0.2 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 })
  const infoInView = useInView(infoRef, { once: true, amount: 0.2 })
  const earlyDetectionInView = useInView(earlyDetectionRef, { once: true, amount: 0.2 })
  const aiAnalysisRef = useRef(null)
  const whyWorthRef = useRef(null)
  const howToUseRef = useRef(null)
  const aiAnalysisInView = useInView(aiAnalysisRef, { once: true, amount: 0.2 })
  const whyWorthInView = useInView(whyWorthRef, { once: true, amount: 0.2 })
  const howToUseInView = useInView(howToUseRef, { once: true, amount: 0.2 })

  const handleAuthSubmit = async (e) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)
    try {
      const endpoint = isLogin ? '/login' : '/signup'
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        username: authData.username,
        password: authData.password,
      })
      if (response.data.success) {
        onLogin(response.data)
        setShowAuthModal(false)
        // navigate('/dashboard') - Stay on home screen as requested
      }
    } catch (err) {
      setAuthError(err.response?.data?.message || (isLogin ? 'Login failed' : 'Signup failed'))
    } finally {
      setAuthLoading(false)
    }
  }

  const handleGetStarted = () => {
    if (isAuthenticated) navigate('/dashboard')
    else navigate('/login')
  }

  const handleTryNow = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/register')
    }
  }

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const buttonHover = { scale: 1.05, transition: { duration: 0.2 } }
  const buttonTap = { scale: 0.95 }

  // Carousel Logic
  const slides = [
    {
      id: 0,
      bg: "bg-gradient-to-r from-[#5B50FF] to-[#8C84FF]", // Purple Gradient
      title: "Start skin test that could change everything!",
      subtitle: "AI Analysis • Instant Results • Doctor Verified",
      image: null,
      icon: (
        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform rotate-12">
          <span className="text-4xl font-bold text-white">?</span>
        </div>
      ),
      action: handleGetStarted,
      hasImage: false
    },
    {
      id: 1,
      bg: "bg-[#00C2CB]", // Cyan
      title: "Sign up, get more!",
      subtitle: "Fast checkout • Reports • Results history",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60",
      icon: <Star className="w-8 h-8 text-yellow-400 fill-current" />,
      action: () => navigate('/register'),
      hasImage: true
    }
  ]

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection) => {
    setCurrentSlide((prev) => (prev + newDirection + slides.length) % slides.length)
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Navbar */}
      <Navbar isAuthenticated={isAuthenticated} user={null} onLogout={onLogout} />

      {/* Hero Section */}
      <section ref={heroRef} className="bg-[#003366] relative overflow-hidden flex items-center min-h-[500px] sm:min-h-[600px] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-white z-20 pb-12 md:pb-0"
            >
              <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12">
                Check your <span className="text-[#20B2AA]">skin</span>!
              </motion.h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-10 mb-4 sm:mb-8">
                {[
                  { step: 1, text: "Take a photo of a skin problem", icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" /> },
                  { step: 2, text: "AI instantly analyzes your photo", icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" /> },
                  { step: 3, text: "Get a personalized PDF report", icon: <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-white" /> },
                  { step: 4, text: "AI Consultant explains your result", icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" /> }
                ].map((item) => (
                  <motion.div key={item.step} variants={fadeInUp} className="flex items-center space-x-3 sm:space-x-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#20B2AA] to-[#1a9b94] flex items-center justify-center shadow-lg border-2 border-white/20">
                        {item.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 bg-[#003366] border border-[#20B2AA] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                        STEP {item.step}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-white/90 leading-snug max-w-[200px] sm:max-w-[150px]">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                variants={fadeInUp}
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={handleGetStarted}
                className="bg-[#FF3333] hover:bg-[#E62E2E] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold shadow-xl transition-all flex items-center justify-center space-x-2 group w-full max-w-full"
              >
                <span>GET INSTANT RESULT</span>
              </motion.button>

              <motion.p variants={fadeInUp} className="mt-4 sm:mt-6 text-[9px] sm:text-[10px] text-white/60 max-w-md">
                * The scan result is not a diagnosis. To obtain an accurate diagnosis and a recommendation for treatment - consult your doctor.
              </motion.p>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute top-0 right-0 bottom-0 w-1/2 hidden md:block"
            >
              {/* Image with Gradient Mask for Blending */}
              <div className="relative w-full h-full">
                {/* Top Blend */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#003366] to-transparent z-10"></div>
                {/* Left Blend */}
                <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#003366] to-transparent z-10"></div>
                {/* Right Blend */}
                <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#003366] to-transparent z-10"></div>

                <img
                  src="/woman_back.jpg"
                  alt="Skin Check"
                  className="w-full h-full object-cover object-center opacity-90"
                  style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)' }}
                />

                {/* Focus Box Animation */}
                <motion.div
                  className="absolute top-[40%] left-[30%] w-24 h-24 border-2 border-white rounded-xl z-20"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Corners */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white"></div>
                </motion.div>

                {/* Connecting Line & Tooltip */}
                <div className="absolute top-[45%] left-[42%] w-16 h-[1px] bg-white/60 z-20"></div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute top-[40%] left-[55%] text-white/90 max-w-[180px] z-20"
                >
                  <p className="text-xs font-medium leading-tight drop-shadow-md">
                    Take a photo with a mole and receive your risk assessment *
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Curved Bottom Divider - Specific Shape */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white z-20" style={{ clipPath: 'ellipse(70% 100% at 70% 100%)', transform: 'scaleX(-1)' }}></div>
      </section>

      {/* Why Should You Use Section */}
      <section ref={whyUseRef} className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={whyUseInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-12"
          >
            <div className="flex-1">
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#003366] mb-6 sm:mb-8">
                Why should you use Dr. SkinAI?
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                Developed with dermatologists and powered by artificial intelligence.
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  "Detects 58+ skin diseases, including melanoma and skin cancer",
                  "Over 97% accuracy, based on AI and clinical database",
                  "Result within 1 minute",
                  "Enables instant at-home screening",
                  "24/7 personal AI Consultant"
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="flex items-start space-x-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#20B2AA] flex-shrink-0 mt-1" strokeWidth={3} />
                    <span className="text-gray-700 text-xs sm:text-sm font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div variants={fadeInUp} className="flex flex-col space-y-6 items-center md:items-end">
              {/* ISO Certification removed */}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Worth Using Section */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#003366] mb-16 text-center"
          >
            Why is Dr. SkinAI worth using?
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Brain className="w-12 h-12 text-white" />,
                title: "Smart",
                text: "Dr. SkinAI is created on the basis of artificial intelligence as a result of joint work of IT specialists and doctors. Our app has the same accuracy as a professional dermatologist."
              },
              {
                icon: <Clock className="w-12 h-12 text-white" />,
                title: "Simple",
                text: "Place your phone near a mole or other formation on the skin and within 1 minute you will find out if there is cause for concern."
              },
              {
                icon: <Smartphone className="w-12 h-12 text-white" />,
                title: "Accessible",
                text: "Dr. SkinAI is available anytime, anywhere. Keep your health in check at your fingertips even when you are on the go."
              },
              {
                icon: <HandCoins className="w-12 h-12 text-white" />,
                title: "Affordable",
                text: "Dr. SkinAI's leading image analytics features come at an unbeatable price, fit for any request or budget. Flexible pricing plans and customizable bundles will save your practice both time and money."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-start"
              >
                <div className="w-24 h-24 rounded-full bg-[#20B2AA] flex items-center justify-center mb-6 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-4">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* How to Use Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#003366] mb-20"
          >
            How to use Dr. SkinAI?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {[
              {
                icon: <Zap className="w-16 h-16 text-[#003366]" />,
                step: "Take a photo*",
                desc: "Keep zoomed at the closest distance (less than 10 cm), keep in focus and center only the skin mark (without hair, wrinkles and other objects)"
              },
              {
                icon: <MessageCircle className="w-16 h-16 text-[#003366]" />,
                step: "Identify and send",
                desc: "Send your photo to the Artificial Intelligence. The system will analyze it and send you a risk assessment."
              },
              {
                icon: <Check className="w-16 h-16 text-[#20B2AA]" />,
                step: "Receive your risk assessment **",
                desc: "Get the result within 60 seconds and advice on the next steps to take."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center relative z-10"
              >
                <div className="w-40 h-40 bg-white border-2 border-gray-200 rounded-3xl flex items-center justify-center mb-8 shadow-sm relative">
                   <div className="absolute inset-2 border border-gray-100 rounded-2xl"></div>
                   {item.icon}
                   {idx === 0 && <div className="absolute top-2 right-2 bg-[#003366] text-white text-[10px] px-2 py-0.5 rounded">Focus</div>}
                   {idx === 1 && <div className="absolute bottom-4 bg-[#003366] text-white text-xs px-3 py-1 rounded">Send photo</div>}
                   {idx === 2 && <div className="absolute top-2 right-2 bg-[#003366] text-white text-[10px] px-2 py-0.5 rounded">Save result</div>}
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-4">{item.step}</h3>
                <p className="text-gray-600 text-sm max-w-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="mt-16 bg-[#FF3333] hover:bg-[#E62E2E] text-white px-12 py-4 rounded-full font-bold shadow-lg uppercase tracking-wide text-lg"
          >
            Try Now!
          </motion.button>
        </div>
      </section> */}

      {/* Unified Carousel Section */}
      <section className="py-8 sm:py-12 px-4 bg-gray-50 overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          <div className="relative h-[200px] sm:h-[220px] md:h-[200px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg cursor-grab active:cursor-grabbing">
            <AnimatePresence initial={false} custom={1}>
              <motion.div
                key={currentSlide}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
                onClick={() => slides[currentSlide].action()}
                className={`absolute inset-0 ${slides[currentSlide].bg} flex items-center justify-between px-6 sm:px-8 md:px-16`}
              >
                <div className="text-white z-10 max-w-lg flex-1">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    {!slides[currentSlide].hasImage && <div className="hidden sm:block">{slides[currentSlide].icon}</div>}
                    {slides[currentSlide].hasImage && <div className="hidden sm:block">{slides[currentSlide].icon}</div>}
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold leading-tight">{slides[currentSlide].title}</h3>
                  </div>
                  {slides[currentSlide].subtitle && (
                    <p className="text-white/90 font-medium text-sm sm:text-base md:text-lg mt-2">{slides[currentSlide].subtitle}</p>
                  )}
                </div>

                <div className="relative z-10">
                  {slides[currentSlide].hasImage ? (
                    <div className="hidden md:block w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                      <img src={slides[currentSlide].image} alt="Feature" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="hidden md:block">
                      {slides[currentSlide].icon}
                    </div>
                  )}
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${currentSlide === idx ? 'bg-[#5B50FF] w-4 sm:w-6' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What do you know in 1 minute */}
      <section ref={oneMinuteRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate={oneMinuteInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
                What do you know in 1 minute?
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-[#003366] font-medium mb-8">
                Risks Detection and Assessment of more than 58 diseases:
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 mb-10">
                {[
                  { title: "Skin cancer", desc: "(melanoma, BKK, BCC, etc.)" },
                  { title: "Benign formations", desc: "(moles, angioma, dermatofibroma, etc.)" },
                  { title: "Precancerous lesions", desc: "(blue and dysplastic nevus, etc.)" },
                  { title: "Papilloma virus", desc: "(warts, papillomas, mollusks, etc.)" },
                  { title: "6 types of acne", desc: "" },
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-[#20B2AA] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-[#003366] text-sm">{item.title}</p>
                      {item.desc && <p className="text-xs text-gray-500">{item.desc}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                variants={fadeInUp}
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={handleGetStarted}
                className="bg-[#FF3333] hover:bg-[#E62E2E] text-white px-12 py-3 rounded-full font-bold shadow-lg uppercase tracking-wide"
              >
                Try Now!
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={oneMinuteInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#20B2AA] to-[#1a9b94] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Dr. SkinAI is based on Artificial Intelligence technologies</h3>
                  <Brain className="w-24 h-24 text-white/20 absolute bottom-0 right-0" />
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>
            </motion.div>
          </div>

          {/* Tip Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={oneMinuteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-[#FFF4E5] border border-[#FFE0B2] rounded-xl p-4 flex items-start space-x-3 max-w-3xl mx-auto"
          >
            <div className="bg-[#FF9800] rounded-full p-1 text-white mt-0.5">
              <span className="text-xs font-bold">i</span>
            </div>
            <p className="text-sm text-[#E65100]">
              <span className="font-bold">Tip:</span> For more accurate results, upload 3 high-quality photos so the AI can thoroughly analyze the affected skin area.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dr. SkinAI Info Section */}
      <section ref={infoRef} className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* 3D Body Model Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={infoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              className="relative flex-shrink-0"
            >
              <img
                src="https://i.ibb.co/ksdd1MwL/ky3cmkih-1-removebg-preview.png"
                alt="Human Model"
                className="w-64 md:w-80 h-auto object-contain"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
                }}
              />

              {/* Scan Points */}
              <div className="absolute top-[28%] left-[52%] w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-red-500 font-bold text-sm">1</span>
              </div>
              <div className="absolute top-[45%] left-[35%] w-6 h-6 bg-white/60 rounded-full flex items-center justify-center shadow-md">
                <span className="text-red-500 font-bold text-xs">2</span>
              </div>
              <div className="absolute top-[60%] right-[22%] w-6 h-6 bg-white/60 rounded-full flex items-center justify-center shadow-md">
                <span className="text-red-500 font-bold text-xs">3</span>
              </div>

              {/* Tooltip on Body */}
              <div className="absolute top-[28%] left-[62%] bg-white p-3 rounded-lg shadow-xl flex items-center space-x-3 border border-gray-100 min-w-[200px] z-10">
                <div className="w-10 h-10 bg-[#FFE4E1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 bg-[#FF3333] rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#003366]">Your Scan <span className="font-normal text-gray-500">(20-01-2021)</span></p>
                  <p className="text-[10px] text-blue-500 font-medium cursor-pointer hover:underline">View result</p>
                </div>
              </div>
            </motion.div>

            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, x: 20 }}
                animate={infoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                className="text-3xl md:text-4xl font-bold text-[#003366] mb-6"
              >
                Dr. SkinAI can save your life
              </motion.h2>
              <p className="text-gray-500 mb-8 text-lg">
                One of the most dangerous diseases that Dr. SkinAI can help identify is skin cancer.
              </p>

              <div className="space-y-6">
                <p className="font-bold text-[#003366] text-lg">Skin cancer is the most common cancer in the United States and worldwide.</p>
                <ul className="space-y-4">
                  {[
                    "More than 2 people die of skin cancer every hour all over the world.",
                    "Melanoma is a skin cancer that can spread earlier and more quickly than other skin cancers.",
                    "Melanoma is the second most common of all cancers in men and women ages 15-29.",
                    "1 in 50 people will develop skin cancer in their lifetime.",
                    "When detected early, the 5-year survival rate for melanoma is 99 percent."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-gray-600">
                      <ArrowRight className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Detection Section */}
      <section ref={earlyDetectionRef} className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={earlyDetectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            className="bg-[#F0F7FF] rounded-3xl overflow-hidden flex flex-col md:flex-row relative"
          >
            <div className="p-10 md:p-16 flex-1 z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">
                Early Detection Saves Lives!
              </h2>
              <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                Small changes can mean big problems. 7 simple questions can reveal what your skin needs to stay healthy.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/quiz')}
                className="bg-[#FF3333] hover:bg-[#E62E2E] text-white px-10 py-4 rounded-full font-bold shadow-lg uppercase tracking-wide"
              >
                ACT NOW
              </motion.button>
            </div>

            {/* Image Background for Right Side */}
            <div className="md:w-1/2 relative min-h-[300px]">
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F0F7FF] via-[#F0F7FF]/50 to-transparent z-10"></div>
              <img
                src="/doctor_back.png"
                alt="Doctor Examining Back"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Focus Box Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/50 rounded-xl z-20">
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Carousel - Auto-scrolling */}
      <section className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#003366] mb-8 sm:mb-12">
            84% of our users find Dr. SkinAI helpful.
          </h2>

          {/* Auto-scrolling Container */}
          <div className="relative" onMouseEnter={() => setCarouselPaused(true)} onMouseLeave={() => setCarouselPaused(false)} onTouchStart={() => setCarouselPaused(true)} onTouchEnd={() => setCarouselPaused(false)}>
            {/* CSS keyframes for scrolling */}
            <style>{`
              @keyframes scroll {
                from { transform: translateX(0); }
                to { transform: translateX(-100%); }
              }
              @media (max-width: 640px) {
                @keyframes scroll {
                  from { transform: translateX(0); }
                  to { transform: translateX(-100%); }
                }
              }
            `}</style>
            <div
              className="flex gap-4 sm:gap-6"
              style={{
                animation: 'scroll 20s linear infinite',
                animationPlayState: carouselPaused ? 'paused' : 'running',
              }}
            >
              {/* Duplicate testimonials for seamless loop */}
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-4 sm:gap-6 flex-shrink-0">
                  {/* Testimonial 1 */}
                  <div className="w-[280px] sm:w-[350px] md:w-[400px] bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex-shrink-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#003366] mb-2 sm:mb-3">Korbannn</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                      Best tool to recognise syphilis
                    </p>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4].map((star) => (
                        <span key={star} className="text-yellow-400 text-base sm:text-lg">★</span>
                      ))}
                      <span className="text-gray-300 text-base sm:text-lg">★</span>
                    </div>
                  </div>

                  {/* Testimonial 2 */}
                  <div className="w-[280px] sm:w-[350px] md:w-[400px] bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex-shrink-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#003366] mb-2 sm:mb-3">Praise Makgale</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                      I think this is helpful a lot, it's really interesting App of dermatologist skin.
                    </p>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400 text-base sm:text-lg">★</span>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial 3 */}
                  <div className="w-[280px] sm:w-[350px] md:w-[400px] bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex-shrink-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#003366] mb-2 sm:mb-3">Priya Sharma</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                      बहुत अच्छा ऐप है! मेरी त्वचा की समस्या को पहचानने में बहुत मदद मिली। डॉक्टर के पास जाने से पहले यह जानकारी बहुत उपयोगी थी।
                    </p>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400 text-base sm:text-lg">★</span>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial 4 */}
                  <div className="w-[280px] sm:w-[350px] md:w-[400px] bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex-shrink-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#003366] mb-2 sm:mb-3">Rajesh Kumar</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                      Very helpful app for quick skin analysis. The AI is surprisingly accurate and gave you peace of mind before visiting your dermatologist.
                    </p>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400 text-base sm:text-lg">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Worth Using Section */}
      <section ref={whyWorthRef} className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#003366] mb-10 sm:mb-12 md:mb-16 text-center">
            Why is Dr. SkinAI worth using?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
                title: "Smart",
                text: "Dr. SkinAI is created on the basis of artificial intelligence as a result of joint work of IT specialists and doctors. Our app has the same accuracy as a professional dermatologist."
              },
              {
                icon: <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
                title: "Simple",
                text: "Place your phone near a mole or other formation on the skin and within 1 minute you will find out if there is cause for concern."
              },
              {
                icon: <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
                title: "Accessible",
                text: "Dr. SkinAI is available anytime, anywhere. Keep your health in check at your fingertips even when you are on the go."
              },
              {
                icon: <HandCoins className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
                title: "Affordable",
                text: "Dr. SkinAI's leading image analytics features come at an unbeatable price, fit for any request or budget. Flexible pricing plans and customizable bundles will save your practice both time and money."
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#20B2AA] flex items-center justify-center mb-4 sm:mb-6 shadow-lg hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#003366] mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section ref={howToUseRef} className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={howToUseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#003366] mb-10 sm:mb-12 md:mb-16 text-center"
          >
            How to use AI Dermatologist?
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 text-center">
            {[
              {
                icon: <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-[#003366]" />,
                title: "Take a photo*",
                text: "Keep zoomed at the closest distance (less than 10 cm), keep in focus and center only the skin mark (without hair, wrinkles and other objects)"
              },
              {
                icon: <Send className="w-10 h-10 sm:w-12 sm:h-12 text-[#003366]" />,
                title: "Identify and send",
                text: "Send your photo to the Artificial Intelligence. The system will analyze it and send you a risk assessment."
              },
              {
                icon: <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-[#003366]" />,
                title: "Receive your risk assessment **",
                text: "Get the result within 60 seconds and advice on the next steps to take."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={howToUseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl bg-gray-50">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#003366] mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={howToUseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-16"
          >
            <button
              onClick={() => isAuthenticated ? navigate('/dashboard') : navigate('/register')}
              className="bg-[#FF3B30] text-white px-12 py-4 rounded-full text-lg font-bold hover:bg-[#E6352B] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Try Now!
            </button>
          </motion.div>
        </div>
      </section>

      {/* How AI Analyzes Images Section */}
      <section ref={aiAnalysisRef} className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* AI Graphic with Blend */}
            <motion.div
              initial={{ opacity: 0, y: 50, visibility: 'hidden' }}
              whileInView={{ opacity: 1, y: 0, visibility: 'visible' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center items-center h-[400px]"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Large AI Text */}
                <span className="relative text-[250px] md:text-[350px] font-black leading-none bg-gradient-to-b from-[#5B50FF] to-[#00C2CB] bg-clip-text text-transparent select-none z-0">
                  AI
                </span>

                {/* Blended Image Overlay */}
                <div className="absolute inset-0 z-10 mix-blend-overlay opacity-60">
                  <img
                    src="/cyber_bg.jpg"
                    alt="Texture"
                    className="w-full h-full object-cover"
                    style={{
                      maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
                    }}
                  />
                </div>

                {/* Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white z-20"></div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial="hidden"
              animate={aiAnalysisInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#003366] mb-8">
                How does Artificial Intelligence analyze images?
              </motion.h2>

              <motion.div
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15 } }
                }}
                className="space-y-6 text-gray-700 text-base leading-relaxed"
              >
                <motion.p variants={fadeInUp}>
                  Dr. SkinAI uses a deep machine learning algorithm (AI-algorithm). The human ability to learn from examples and experiences has been transferred to a computer. For this purpose, the neural network has been trained using a dermoscopic imaging database containing tens of thousands of examples that have confirmed diagnosis and assessment by dermatologists.
                </motion.p>

                <motion.p variants={fadeInUp}>
                  The AI is able to distinguish between benign and malignant tumors, similar to the ABCDE rule (5 main signs of oncology: asymmetry, boundary, color, diameter, and change over time). The difference between them is that the algorithm can analyze thousands of features, but not only 5 of them. Of course, only a machine can detect that amount of evidence.
                </motion.p>

                <motion.p variants={fadeInUp}>
                  Due to the productive cooperation with doctors, the quality of the algorithm performance is constantly being improved. Based on growing experience and its own autonomous rules, the AI is able to distinguish between benign and malignant tumors, find risks of human papillomavirus, and classify different types of acne...
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-[#003366] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Dr. SkinAI</h3>
              <p className="text-sm text-white/70">Your personal skin health assistant powered by advanced artificial intelligence.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Links</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link to="/" onClick={handleHomeClick} className="hover:text-white">Home</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link to="/diseases" className="hover:text-white">Diseases</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-sm text-white/70">support@skinaiapp.com</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
            <p>&copy; 2024 SkinAI. All rights reserved.</p>
          </div>
        </div>
      </footer >

      {/* Chat Support */}
      <ChatSupport />

      {/* Auth Modal */}
      < AnimatePresence >
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#003366]">
                  {isLogin ? 'Welcome Back' : 'Join SkinAI'}
                </h3>
                <button
                  onClick={() => {
                    setShowAuthModal(false)
                    setAuthError('')
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => {
                    setIsLogin(true)
                    setAuthError('')
                  }}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${isLogin
                    ? 'bg-white text-[#003366] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false)
                    setAuthError('')
                  }}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${!isLogin
                    ? 'bg-white text-[#003366] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={authData.username}
                    onChange={(e) => setAuthData({ ...authData, username: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent transition-all outline-none"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={authData.password}
                    onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent transition-all outline-none"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {authError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-red-50 border-l-4 border-red-500 px-4 py-3 rounded text-sm text-red-700"
                  >
                    {authError}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-[#FF3333] hover:bg-[#E62E2E] text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {authLoading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                  Demo Credentials: <span className="font-mono text-gray-600">admin/admin123</span> or <span className="font-mono text-gray-600">user/user123</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence >
    </div >
  )
}

export default LandingPage
