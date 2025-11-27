import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Shield, Sparkles, Scan, Activity, HeartPulse } from 'lucide-react'
import axios from 'axios'

// Medical-themed background images
const MEDICAL_IMAGES = [
  'https://images.unsplash.com/photo-1578496781985-452d4a934d50?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1579762715459-5a068c288007?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1581595214219-5d6d60a3826f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
]

const LoginRegister = ({ onLogin }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLogin, setIsLogin] = useState(location.pathname !== '/register')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetData, setResetData] = useState({
    username: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const [resetStep, setResetStep] = useState(1) // 1: Username, 2: New Password
  const [resetError, setResetError] = useState('')
  const [resetSuccess, setResetSuccess] = useState('')

  const handleResetSubmit = async (e) => {
    e.preventDefault()
    setResetError('')
    setResetSuccess('')
    setLoading(true)

    if (resetStep === 1) {
      // Just verify username is not empty for now, real check happens on submit or we could check existence first
      if (!resetData.username) {
        setResetError('Please enter your username')
        setLoading(false)
        return
      }
      setResetStep(2)
      setLoading(false)
      return
    }

    if (resetStep === 2) {
      if (!resetData.newPassword || !resetData.confirmNewPassword) {
        setResetError('Please fill in all fields')
        setLoading(false)
        return
      }
      if (resetData.newPassword !== resetData.confirmNewPassword) {
        setResetError('Passwords do not match')
        setLoading(false)
        return
      }

      try {
        const response = await axios.post('http://localhost:5000/reset-password', {
          username: resetData.username,
          new_password: resetData.newPassword
        })

        if (response.data.success) {
          setResetSuccess('Password reset successfully! You can now login.')
          setTimeout(() => {
            setShowForgotPassword(false)
            setResetStep(1)
            setResetData({ username: '', newPassword: '', confirmNewPassword: '' })
            setResetSuccess('')
          }, 2000)
        }
      } catch (err) {
        setResetError(err.response?.data?.message || 'Failed to reset password')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validation
    if (!formData.username || !formData.password) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const endpoint = isLogin ? '/login' : '/signup'
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        username: formData.username,
        password: formData.password,
        ...(isLogin ? {} : { email: formData.email })
      })

      if (response.data.success) {
        onLogin(response.data)
        navigate('/')
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        (isLogin ? 'Login failed. Please check your credentials.' : 'Signup failed. Please try again.')
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366] via-[#004080] to-[#003366] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Image and Welcome Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative h-[600px] overflow-hidden">
              <motion.img
                src={MEDICAL_IMAGES[0]}
                alt="Skin analysis"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/90 via-[#003366]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                <motion.div
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Scan className="w-8 h-8 text-[#20B2AA]" />
                  <Activity className="w-8 h-8 text-[#20B2AA]" />
                  <HeartPulse className="w-8 h-8 text-[#20B2AA]" />
                </motion.div>
                <motion.h2
                  className="text-4xl font-bold text-white"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                >
                  SkinAI Dermatology Hub
                </motion.h2>
              </div>
            </div>
            {/* Overlay with text */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 via-[#003366]/50 to-transparent flex flex-col justify-end p-8">
              <motion.div
                key={isLogin ? 'login' : 'register'}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
              >
                <motion.div
                  className="space-y-4"
                  variants={{
                    hidden: { opacity: 0, [isLogin ? 'x' : 'y']: 20 },
                    visible: { opacity: 1, [isLogin ? 'x' : 'y']: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <p className="text-lg text-white/90 leading-relaxed">
                    <span className="font-semibold">SkinAI</span> combines cutting-edge AI with dermatological expertise to provide:
                  </p>
                  <ul className="space-y-3 text-white/85">
                    {[
                      'Instant lesion analysis',
                      'Personalized treatment plans',
                      'Medical-grade accuracy'
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-2"
                        variants={{
                          hidden: { opacity: 0, [isLogin ? 'x' : 'y']: 20 },
                          visible: { opacity: 1, [isLogin ? 'x' : 'y']: 0, transition: { duration: 0.5 } }
                        }}
                      >
                        <div className="w-2 h-2 bg-[#20B2AA] rounded-full" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login/Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#20B2AA] to-[#1a9b94] rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-[#003366] mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-gray-600">
                {isLogin
                  ? 'Sign in to continue to your dashboard'
                  : 'Join thousands of users protecting their skin health'}
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {
                  setIsLogin(true)
                  setError('')
                  setFormData({ username: '', email: '', password: '', confirmPassword: '' })
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${isLogin
                  ? 'bg-[#003366] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#003366]'
                  }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false)
                  setError('')
                  setFormData({ username: '', email: '', password: '', confirmPassword: '' })
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${!isLogin
                  ? 'bg-[#003366] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#003366]'
                  }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#20B2AA] focus:outline-none transition-colors"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Email (Register only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#20B2AA] focus:outline-none transition-colors"
                      placeholder="Enter your email"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-[#20B2AA] focus:outline-none transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#003366] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Register only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#20B2AA] focus:outline-none transition-colors"
                      placeholder="Confirm your password"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}

              {/* Forgot Password (Login only) */}
              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-[#20B2AA] hover:text-[#1a9b94] font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 p-4 rounded"
                >
                  <p className="text-red-700 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#003366] to-[#004080] text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{
                  scale: 1.02,
                  background: 'linear-gradient(to right, #004080, #003366)',
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </motion.button>
            </form>


            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin)
                    setError('')
                    setFormData({ username: '', email: '', password: '', confirmPassword: '' })
                  }}
                  className="text-[#20B2AA] hover:text-[#1a9b94] font-semibold"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
              <Link to="/" className="block mt-4 text-sm text-gray-500 hover:text-[#003366]">
                ← Back to home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForgotPassword(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-[#003366] mb-4">Reset Password</h2>

              {resetSuccess ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-4">
                  <p className="text-green-700">{resetSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleResetSubmit} className="space-y-4">
                  {resetStep === 1 ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <input
                        type="text"
                        value={resetData.username}
                        onChange={(e) => setResetData({ ...resetData, username: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                        placeholder="Enter your username"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          value={resetData.newPassword}
                          onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          value={resetData.confirmNewPassword}
                          onChange={(e) => setResetData({ ...resetData, confirmNewPassword: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </>
                  )}

                  {resetError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                      <p className="text-red-700 text-sm">{resetError}</p>
                    </div>
                  )}

                  <div className="flex space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244] transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : (resetStep === 1 ? 'Next' : 'Reset Password')}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LoginRegister
