import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Circle } from 'lucide-react'
import ChatSupport from '../components/ChatSupport'
import Navbar from '../components/Navbar'

const faqData = [
  {
    question: 'How is Machine Learning used in the application?',
    answer: 'Our application uses advanced machine learning algorithms, specifically deep learning models trained on the HAM10000 dataset, to analyze skin images. The AI model processes images through convolutional neural networks (CNNs) to identify patterns and features associated with various skin conditions. The model has been trained on thousands of dermatoscopic images to recognize characteristics of different skin diseases, providing instant preliminary assessments with confidence scores.'
  },
  {
    question: 'What is Dr. SkinAI?',
    answer: 'Dr. SkinAI is an artificial intelligence-powered tool designed to assist in the preliminary assessment of skin conditions. It uses machine learning algorithms trained on extensive dermatological data to analyze images of skin lesions, moles, or other skin concerns. While it provides valuable insights and risk assessments, it is not a replacement for professional medical diagnosis. The AI serves as a first-line screening tool to help users identify when they should seek professional medical attention.'
  },
  {
    question: 'Who should use Dr. SkinAI?',
    answer: 'Dr. SkinAI is suitable for anyone who wants to perform a preliminary check on their skin condition. It is particularly useful for individuals who notice new or changing moles, skin lesions, or other dermatological concerns. However, it is important to note that this tool is designed for informational purposes and should be used by adults who can understand its limitations. It is not intended for use in medical emergencies, and users should always consult with a qualified healthcare provider for accurate diagnosis and treatment recommendations.'
  },
  {
    question: 'Does Dr. SkinAI replace the Doctor?',
    answer: 'No, Dr. SkinAI does not replace a doctor or licensed dermatologist. It is a screening and educational tool designed to provide preliminary assessments and raise awareness about skin health. The AI analysis is not a medical diagnosis and should not be used as a substitute for professional medical evaluation. Always consult with a qualified healthcare provider, especially if you notice concerning changes in your skin, have a family history of skin cancer, or receive a high-risk assessment from the AI tool.'
  },
  {
    question: 'Is my personal information safe?',
    answer: 'Yes, we take your privacy and data security seriously. All images and personal information are encrypted and stored securely. We comply with data protection regulations including GDPR and HIPAA where applicable. Your images are processed for analysis purposes only and are not shared with third parties without your explicit consent. We use industry-standard security measures to protect your data, and you can delete your account and associated data at any time through your account settings.'
  },
  {
    question: 'How to Cancel a Subscription: A Step-by-Step Guide',
    answer: 'To cancel your subscription, follow these steps: 1) Log in to your account, 2) Navigate to the Account Settings or Subscription section, 3) Click on "Manage Subscription" or "Cancel Subscription", 4) Follow the prompts to confirm cancellation, 5) You will receive a confirmation email. Note that cancellation takes effect at the end of your current billing period, and you will continue to have access to premium features until that time. If you need assistance, please contact our support team.'
  },
  {
    question: 'How to save results',
    answer: 'To save your scan results: 1) After receiving your analysis, click on the "Save Results" button located below your report, 2) Your results will be automatically saved to your account history, 3) You can access saved results anytime by going to your Dashboard and clicking on "History" or "My Scans", 4) You can also download your results as a PDF report by clicking the "Download PDF" option. All saved results are stored securely in your account and can be accessed from any device where you are logged in.'
  },
  {
    question: 'How to delete account?',
    answer: 'To delete your account: 1) Log in to your account, 2) Go to Account Settings, 3) Scroll down to the "Account Management" section, 4) Click on "Delete Account" or "Deactivate Account", 5) You will be asked to confirm your password and acknowledge that this action is permanent, 6) Confirm the deletion. Please note that deleting your account will permanently remove all your data, including scan history, saved results, and personal information. This action cannot be undone. If you have an active subscription, you may need to cancel it first before deleting your account.'
  },
  {
    question: 'How to Add the Dr. SkinAI Website to Your Phone/Device',
    answer: 'To add our website to your phone for quick access: For iOS (iPhone/iPad): 1) Open Safari and navigate to our website, 2) Tap the Share button at the bottom, 3) Scroll down and tap "Add to Home Screen", 4) Customize the name if desired, 5) Tap "Add". For Android: 1) Open Chrome and navigate to our website, 2) Tap the three-dot menu, 3) Select "Add to Home screen" or "Install app", 4) Confirm by tapping "Add" or "Install". Once added, you can access the app directly from your home screen like a native application.'
  },
  {
    question: 'How accurate is the AI diagnosis?',
    answer: 'Our AI model has been trained on extensive dermatological datasets and achieves high accuracy in identifying various skin conditions. However, accuracy can vary depending on image quality, lighting conditions, and the specific condition being analyzed. The AI provides confidence scores with each prediction to help you understand the reliability of the assessment. It is important to remember that AI analysis is a screening tool and not a definitive diagnosis. For accurate diagnosis and treatment, always consult with a licensed dermatologist or healthcare provider.'
  },
  {
    question: 'What types of skin conditions can the AI detect?',
    answer: 'Our AI can detect and analyze various skin conditions including but not limited to: melanoma, basal cell carcinoma, squamous cell carcinoma, benign keratosis, dermatofibroma, melanocytic nevus, vascular lesions, actinic keratosis, and other common dermatological conditions. The system is trained on the HAM10000 dataset which covers a wide range of skin lesions. However, the AI works best with clear, well-lit images of skin lesions or moles. For conditions that are not clearly visible or require clinical examination, professional medical evaluation is recommended.'
  },
  {
    question: 'Can I use the app for children?',
    answer: 'While the app can technically analyze images of children\'s skin, we recommend that all users under 18 have their accounts managed by a parent or guardian. Additionally, any concerning skin conditions in children should be evaluated by a pediatric dermatologist or healthcare provider. The AI analysis is designed primarily for adult skin conditions, and some pediatric skin conditions may require specialized medical knowledge that goes beyond the scope of this screening tool.'
  }
]

const FAQ = ({ isAuthenticated, user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState(null)
  const [showContactForm, setShowContactForm] = useState(false)

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFF] pb-20">
      {/* Navbar */}
      <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={onLogout} />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Find answers to common questions about Dr. SkinAI</p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="bg-white rounded-lg border border-[#E0E6ED] shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#2C3E50] font-medium text-lg pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 border-t border-[#E0E6ED]">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 p-6 bg-white rounded-lg border border-[#E0E6ED] shadow-sm"
        >
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Still have questions?</h2>
          <p className="text-gray-700 text-lg mb-4">
            If you couldn't find the answer you're looking for, please don't hesitate to contact our support team.
          </p>
          <button
            onClick={() => setShowContactForm(true)}
            className="bg-[#4A90E2] hover:bg-[#3a7bc8] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Contact Support
          </button>
        </motion.div>

        {/* Contact Modal */}
        <AnimatePresence>
          {showContactForm && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowContactForm(false)}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative z-10 overflow-hidden"
              >
                {/* Modal Header */}
                <div className="bg-[#003366] p-6 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">Contact Support</h3>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    // Mock submission
                    const btn = e.target.querySelector('button[type="submit"]')
                    const originalText = btn.innerText
                    btn.innerText = 'Sending...'
                    btn.disabled = true
                    setTimeout(() => {
                      btn.innerText = 'Sent!'
                      btn.classList.add('bg-green-500', 'hover:bg-green-600')
                      setTimeout(() => {
                        setShowContactForm(false)
                        // Reset button state (optional, as modal unmounts)
                      }, 1500)
                    }, 1000)
                  }}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent outline-none transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent outline-none transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                          required
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent outline-none transition-all resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowContactForm(false)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#4A90E2] hover:bg-[#3a7bc8] text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md flex items-center"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Support */}
      <ChatSupport />
    </div>
  )
}

export default FAQ

