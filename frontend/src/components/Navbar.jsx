import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  const navbarClasses = "fixed top-0 left-0 right-0 z-50 bg-[#003366] shadow-md py-2"

  const isActive = (path) => {
    return location.pathname === path ? "text-[#20B2AA]" : "text-white hover:text-[#20B2AA]"
  }

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                <div className="absolute inset-0 border-2 border-[#003366] rounded-full opacity-30"></div>
                <div className="absolute inset-1 border-2 border-[#003366] rounded-full opacity-60"></div>
                <div className="absolute inset-2 bg-[#003366] rounded-full"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0.5 h-1.5 bg-[#003366]"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0.5 h-1.5 bg-[#003366]"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-1.5 h-0.5 bg-[#003366]"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-1.5 h-0.5 bg-[#003366]"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-bold leading-none text-white">Dr. SkinAI</span>
              <span className="text-[10px] sm:text-xs text-gray-300 font-light tracking-wider">Skin Scanner</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm">
            <Link to="/" className={`${isActive('/')} transition-colors font-medium`}>
              Home
            </Link>
            <Link to="/faq" className={`${isActive('/faq')} transition-colors font-medium`}>
              FAQ
            </Link>
            <Link to="/diseases" className={`${isActive('/diseases')} transition-colors font-medium`}>
              Diseases dictionary
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={`${isActive('/dashboard')} transition-colors font-medium`}>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-white hover:text-[#20B2AA] transition-colors font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`${isActive('/login')} transition-colors font-medium`}>
                  Login
                </Link>
                <Link to="/register" className="bg-[#20B2AA] hover:bg-[#1a9b94] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-[#002244] rounded-b-xl border-t border-white/10 mt-2"
            >
              <div className="py-4 space-y-3 px-4">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block ${isActive('/')} transition-colors font-medium py-2`}
                >
                  Home
                </Link>
                <Link
                  to="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block ${isActive('/faq')} transition-colors font-medium py-2`}
                >
                  FAQ
                </Link>
                <Link
                  to="/diseases"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block ${isActive('/diseases')} transition-colors font-medium py-2`}
                >
                  Diseases dictionary
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block ${isActive('/dashboard')} transition-colors font-medium py-2`}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                      className="block w-full text-left text-white hover:text-[#20B2AA] transition-colors font-medium py-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block ${isActive('/login')} transition-colors font-medium py-2`}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block bg-[#20B2AA] hover:bg-[#1a9b94] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors text-center"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar

