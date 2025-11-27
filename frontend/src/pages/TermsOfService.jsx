import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const TermsOfService = ({ isAuthenticated, user, onLogout }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }

    return (
        <div className="min-h-screen bg-[#F8FAFF] pb-20">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#003366] shadow-md py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                <div className="relative w-6 h-6">
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
                                <span className="text-xl font-bold leading-none text-white">Dr. SkinAI</span>
                                <span className="text-xs text-gray-300 font-light tracking-wider">Skin Scanner</span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white">
                            <Link to="/" className="hover:text-[#20B2AA] transition-colors">Home</Link>
                            <Link to="/faq" className="hover:text-[#20B2AA] transition-colors">FAQ</Link>
                            <Link to="/diseases" className="hover:text-[#20B2AA] transition-colors">Diseases dictionary</Link>
                            {isAuthenticated ? (
                                <>
                                    <Link to="/dashboard" className="hover:text-[#20B2AA] transition-colors">Profile</Link>
                                    <button onClick={onLogout} className="hover:text-[#20B2AA] transition-colors">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/register" className="hover:text-[#20B2AA] transition-colors">Register</Link>
                                    <Link to="/login" className="hover:text-[#20B2AA] transition-colors">Log In</Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-white"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 space-y-4 bg-[#003366]/95 backdrop-blur-sm rounded-lg mt-2">
                            <Link to="/" className="block text-white hover:text-[#20B2AA] font-medium">Home</Link>
                            <Link to="/faq" className="block text-white hover:text-[#20B2AA] font-medium">FAQ</Link>
                            <Link to="/diseases" className="block text-white hover:text-[#20B2AA] font-medium">Diseases dictionary</Link>
                            {isAuthenticated ? (
                                <>
                                    <Link to="/dashboard" className="block text-white hover:text-[#20B2AA] font-medium">Profile</Link>
                                    <button onClick={onLogout} className="block text-white hover:text-[#20B2AA] font-medium text-left">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/register" className="block text-white hover:text-[#20B2AA] font-medium">Register</Link>
                                    <Link to="/login" className="block text-white hover:text-[#20B2AA] font-medium">Log In</Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12"
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl font-bold text-[#003366] mb-8 text-center"
                    >
                        Terms of Service
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="text-gray-500 text-center mb-12">
                        Last updated: November 24, 2025
                    </motion.p>

                    <div className="space-y-12">
                        <motion.section variants={fadeInUp}>
                            <h2 className="text-2xl font-bold text-[#003366] mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-600 leading-relaxed">
                                By accessing or using Dr. SkinAI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                            </p>
                        </motion.section>

                        <motion.section variants={fadeInUp}>
                            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                                <h2 className="text-2xl font-bold text-[#003366] mb-4">2. Medical Disclaimer</h2>
                                <p className="text-gray-700 leading-relaxed font-medium">
                                    Dr. SkinAI is an artificial intelligence-based screening tool, NOT a diagnostic device. The content and analysis provided by this app are for informational purposes only and do not constitute medical advice, diagnosis, or treatment.
                                </p>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this application.
                                </p>
                            </div>
                        </motion.section>

                        <motion.section variants={fadeInUp}>
                            <h2 className="text-2xl font-bold text-[#003366] mb-4">3. User Accounts</h2>
                            <p className="text-gray-600 leading-relaxed">
                                To access certain features, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
                            </p>
                        </motion.section>

                        <motion.section variants={fadeInUp}>
                            <h2 className="text-2xl font-bold text-[#003366] mb-4">4. Intellectual Property</h2>
                            <p className="text-gray-600 leading-relaxed">
                                The Service and its original content, features, and functionality are and will remain the exclusive property of Dr. SkinAI and its licensors. The Service is protected by copyright, trademark, and other laws.
                            </p>
                        </motion.section>

                        <motion.section variants={fadeInUp}>
                            <h2 className="text-2xl font-bold text-[#003366] mb-4">5. Limitation of Liability</h2>
                            <p className="text-gray-600 leading-relaxed">
                                In no event shall Dr. SkinAI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                            </p>
                        </motion.section>

                        <motion.section variants={fadeInUp}>
                            <h2 className="text-2xl font-bold text-[#003366] mb-4">6. Governing Law</h2>
                            <p className="text-gray-600 leading-relaxed">
                                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is established, without regard to its conflict of law provisions.
                            </p>
                        </motion.section>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default TermsOfService
