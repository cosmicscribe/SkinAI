import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const PrivacyPolicy = ({ isAuthenticated, user, onLogout }) => {
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
                        Privacy Policy
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="text-gray-500 text-center mb-12">
                        Last updated: November 24, 2025
                    </motion.p>

                    <div className="space-y-12">
                        <motion.section variants={fadeInUp}>
                            <h2 className="text-2xl font-bold text-[#003366] mb-4">1. Information We Collect</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We collect information you provide directly to us, such as when you create an account, upload images for analysis, or contact us for support. This may include:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Personal identification information (Name, email address, phone number)</li>
                                <li>Health-related information (Skin images, symptoms description)</li>
                                <li>Device and usage information (IP address, browser type, operating system)</li>
                            </ul>
                        </motion.section>

                        <motion.section variants={fadeInUp}>
                            <h2 className="text-2xl font-bold text-[#003366] mb-4">2. How We Use Your Information</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We use the information we collect to provide, maintain, and improve our services, including:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
                                <li>Analyzing skin images to provide preliminary risk assessments.</li>
                                <li>Improving our AI algorithms and diagnostic accuracy.</li>
                                <li>Communicating with you about your account and updates to our services.</li>
                                <li>Ensuring the security and integrity of our platform.</li>
                            </ul>
                        </motion.section>

                        <motion.section variants={fadeInUp}>
                            <h2 className="text-2xl font-bold text-[#003366] mb-4">3. Data Security</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data transmission is encrypted using SSL/TLS protocols, and sensitive health data is stored in compliance with applicable regulations.
                            </p>
                        </motion.section>

                        <motion.section variants={fadeInUp}>
                            <h2 className="text-2xl font-bold text-[#003366] mb-4">4. Cookies and Tracking</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                            </p>
                        </motion.section>

                        <motion.section variants={fadeInUp}>
                            <h2 className="text-2xl font-bold text-[#003366] mb-4">5. Third-Party Links</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
                            </p>
                        </motion.section>

                        <motion.section variants={fadeInUp}>
                            <h2 className="text-2xl font-bold text-[#003366] mb-4">6. Contact Us</h2>
                            <p className="text-gray-600 leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at:
                                <br />
                                <a href="mailto:support@drskinai.com" className="text-[#00C2CB] hover:underline font-medium">support@drskinai.com</a>
                            </p>
                        </motion.section>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
