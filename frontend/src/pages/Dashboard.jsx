import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Shield, LogOut, User, History, Scan, Camera, Edit2, Check, Download, X, CheckCircle, Settings, Lock, Trash2, AlertTriangle, Book } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Dropzone from '../components/Dropzone'
import ChatSupport from '../components/ChatSupport'
import Navbar from '../components/Navbar'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('scan')

  // Load profile image and name from localStorage
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('profileImage') || null
  })
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState(() => {
    return localStorage.getItem('profileName') || user?.username || 'User'
  })
  const [userId] = useState(() => {
    // Generate 6-digit user ID
    const storedId = localStorage.getItem('userId')
    if (storedId) return parseInt(storedId)
    const newId = user?.user_id || Math.floor(100000 + Math.random() * 900000)
    localStorage.setItem('userId', newId.toString())
    return newId
  })
  const [selectedImages, setSelectedImages] = useState([])
  const [selectedImagePreviews, setSelectedImagePreviews] = useState([])
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)
  const [error, setError] = useState('')
  const [scanHistory, setScanHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    // Clear state on mount
    setPredictions([])
    setSelectedImages([])
    setScanComplete(false)
    setError('')
    setScanProgress(0)

    if (activeTab === 'profile') {
      fetchScanHistory()
    }
  }, [activeTab])

  const fetchScanHistory = async () => {
    setHistoryLoading(true)
    try {
      const response = await axios.get(`http://localhost:5000/history?user_id=${userId}`)
      if (response.data.success) {
        const formattedHistory = response.data.history.map(item => ({
          ...item,
          image: item.image_path
        }))
        setScanHistory(formattedHistory)
      }
    } catch (err) {
      console.error('Failed to fetch history:', err)
    } finally {
      setHistoryLoading(false)
    }
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result
        setProfileImage(imageData)
        // Save to localStorage
        localStorage.setItem('profileImage', imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveName = () => {
    setIsEditingName(false)
    // Save to localStorage
    localStorage.setItem('profileName', editedName)
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!')
      return
    }

    try {
      const response = await axios.post('http://localhost:5000/change-password', {
        user_id: userId,
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword
      })

      if (response.data.success) {
        alert('Password changed successfully! Please login with your new password.')
        setShowChangePasswordModal(false)
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        handleLogout()
      } else {
        alert(response.data.message || 'Failed to change password')
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to change password. Please try again.')
    }
  }

  const handleDeleteAccount = async () => {
    if (!passwordData.currentPassword) {
      alert('Please enter your password to confirm account deletion')
      return
    }

    try {
      const response = await axios.delete(`http://localhost:5000/user/${userId}`, {
        data: { password: passwordData.currentPassword }
      })

      if (response.data.success) {
        localStorage.clear()
        alert('Account deleted successfully!')
        setShowDeleteAccountModal(false)
        onLogout()
      } else {
        alert(response.data.message || 'Failed to delete account')
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete account. Please check your password.')
    }
  }

  const handleImageSelect = (files) => {
    setSelectedImages(files)
    setPredictions([])
    setError('')
    setScanComplete(false)

    // Create preview URLs
    const newPreviews = []
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result)
        if (newPreviews.length === files.length) {
          setSelectedImagePreviews(newPreviews)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handlePredict = async () => {
    if (selectedImages.length === 0) {
      setError('Please select at least one image')
      return
    }

    setLoading(true)
    setError('')
    setScanProgress(0)
    setScanComplete(false)

    // Simulate progress animation
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      const formData = new FormData()
      selectedImages.forEach(file => {
        formData.append('image', file)
      })
      formData.append('user_id', userId)

      const response = await axios.post(
        'http://localhost:5000/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      clearInterval(progressInterval)
      setScanProgress(100)

      if (response.data.success) {
        setPredictions(response.data.predictions)
        setScanComplete(true)

        // Add to scan history immediately
        const newScans = response.data.predictions.map(pred => ({
          id: Date.now() + Math.random(),
          disease: pred.disease,
          confidence: pred.confidence,
          timestamp: new Date().toISOString(),
          image: pred.image
        }))

        setScanHistory(prev => [...newScans, ...prev])

        // Refresh history from backend
        setTimeout(() => fetchScanHistory(), 1000)
      } else {
        setError('Prediction failed. Please try again.')
      }
    } catch (err) {
      clearInterval(progressInterval)
      setError(
        err.response?.data?.error || 'An error occurred. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const getConsultationTips = (disease) => {
    const tips = {
      Melanoma: [
        'Seek immediate medical attention for evaluation',
        'Avoid sun exposure and use broad-spectrum sunscreen',
        'Monitor for changes in size, shape, or color',
        'Regular skin examinations are recommended',
      ],
      'Basal Cell Carcinoma': [
        'Consult a dermatologist for proper diagnosis',
        'Protect skin from UV radiation',
        'Early treatment is highly effective',
        'Regular follow-ups are important',
      ],
      'Benign Keratosis': [
        'Usually harmless, but monitor for changes',
        'Can be removed if cosmetically bothersome',
        'Protect from sun exposure',
        'Regular skin checks recommended',
      ],
      Dermatofibroma: [
        'Benign growth, typically no treatment needed',
        'Monitor for any changes',
        'Can be removed if desired',
        'Usually stable over time',
      ],
      'Melanocytic Nevus': [
        'Common benign mole, usually harmless',
        'Monitor using ABCDE rule (Asymmetry, Border, Color, Diameter, Evolving)',
        'Protect from sun exposure',
        'Regular dermatologist visits recommended',
      ],
      'Vascular Lesion': [
        'Consult dermatologist for proper classification',
        'Treatment options vary by type',
        'Monitor for changes',
        'Some may require medical intervention',
      ],
      'Actinic Keratosis': [
        'Precancerous condition requiring medical attention',
        'Sun protection is crucial',
        'Multiple treatment options available',
        'Regular monitoring by dermatologist',
      ],
    }

    return tips[disease] || [
      'Consult with a healthcare professional',
      'Follow medical advice for your specific condition',
      'Maintain good skin health practices',
      'Regular check-ups are important',
    ]
  }

  const generatePDF = (scanData) => {
    const doc = new jsPDF()

    // Colors
    const primaryColor = [0, 51, 102] // #003366
    const accentColor = [32, 178, 170] // #20B2AA

    // Header with Dr. SkinAI branding
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, 210, 40, 'F')

    // Logo circle
    doc.setFillColor(255, 255, 255)
    doc.circle(20, 20, 8, 'F')
    doc.setFillColor(...primaryColor)
    doc.circle(20, 20, 6, 'F')

    // Title
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('Dr. SkinAI', 35, 18)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Skin Disease Detection Report', 35, 26)

    // Report date
    doc.setFontSize(9)
    doc.text(`Report Date: ${new Date(scanData.timestamp || Date.now()).toLocaleDateString()}`, 150, 20)

    // Patient Information
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Patient Information', 20, 50)

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Name: ${editedName}`, 20, 58)
    doc.text(`Patient ID: #${userId}`, 20, 65)
    doc.text(`Scan Date: ${new Date(scanData.timestamp || Date.now()).toLocaleString()}`, 20, 72)

    // Scan Image
    if (scanData.image) {
      doc.setFont('helvetica', 'bold')
      doc.text('Scan Image', 20, 85)
      try {
        doc.addImage(scanData.image, 'JPEG', 20, 90, 60, 60)
      } catch (e) {
        console.error('Error adding image to PDF:', e)
      }
    }

    // Analysis Results
    doc.setFillColor(...accentColor)
    doc.rect(90, 85, 100, 8, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('Analysis Results', 95, 90)

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(11)
    doc.text('Predicted Condition:', 95, 100)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(...primaryColor)
    doc.text(scanData.disease || 'N/A', 95, 108)

    doc.setTextColor(0, 0, 0)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text('Confidence Score:', 95, 118)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text(`${scanData.confidence || 0}%`, 95, 126)

    // Confidence bar
    doc.setFillColor(220, 220, 220)
    doc.rect(95, 130, 80, 6, 'F')
    doc.setFillColor(...accentColor)
    doc.rect(95, 130, (scanData.confidence || 0) * 0.8, 6, 'F')

    // Consultation Tips
    doc.setFillColor(...primaryColor)
    doc.rect(20, 160, 170, 8, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('Consultation Tips', 25, 165)

    doc.setTextColor(0, 0, 0)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const tips = getConsultationTips(scanData.disease)
    let yPos = 175
    tips.forEach((tip, index) => {
      const lines = doc.splitTextToSize(`${index + 1}. ${tip}`, 160)
      doc.text(lines, 25, yPos)
      yPos += lines.length * 5
    })

    // Disclaimer
    yPos += 5
    doc.setFillColor(255, 243, 205)
    doc.rect(20, yPos, 170, 25, 'F')
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text('IMPORTANT DISCLAIMER', 25, yPos + 5)
    doc.setFont('helvetica', 'normal')
    const disclaimer = 'This AI prediction is for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for accurate diagnosis and treatment. This report is generated by Dr. SkinAI automated system.'
    const disclaimerLines = doc.splitTextToSize(disclaimer, 160)
    doc.text(disclaimerLines, 25, yPos + 10)

    // Footer
    doc.setFontSize(8)
    doc.setTextColor(128, 128, 128)
    doc.text('Dr. SkinAI - Advanced Skin Disease Detection System', 105, 285, { align: 'center' })
    doc.text(`Generated on ${new Date().toLocaleString()}`, 105, 290, { align: 'center' })

    // Save PDF
    const fileName = `DrSkinAI_Report_${scanData.disease?.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`
    doc.save(fileName)
  }

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] to-[#E6F3F7]">
      {/* Navbar */}
      <Navbar isAuthenticated={true} user={user} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8">
        {/* Tab Navigation */}
        <div className="mb-6 sm:mb-8">
          <div className="flex space-x-2 sm:space-x-4 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all text-sm sm:text-base whitespace-nowrap ${activeTab === 'scan'
                ? 'text-[#003366] border-b-2 border-[#20B2AA]'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <Scan className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Skin Analysis</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all text-sm sm:text-base whitespace-nowrap ${activeTab === 'profile'
                ? 'text-[#003366] border-b-2 border-[#20B2AA]'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Profile</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'scan' ? (
            <motion.div
              key="scan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] mb-2">
                  Skin Disease Detection
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Upload an image to get an AI-powered diagnosis
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Left Column - Image Upload */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-100">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                    Upload Image
                  </h2>
                  <Dropzone onImageSelect={handleImageSelect} />

                  <div className="mt-3 sm:mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-2 sm:p-3">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-yellow-700">
                        <strong>Important:</strong> When uploading multiple images, ensure they are all of the <strong>SAME</strong> skin lesion (e.g., different angles). Do not upload photos of two different people or spots at once.
                      </p>
                    </div>
                  </div>

                  {selectedImages.length > 0 && (
                    <button
                      onClick={handlePredict}
                      disabled={loading}
                      className="mt-4 sm:mt-6 w-full bg-[#003366] hover:bg-[#002244] text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-sm sm:text-base"
                    >
                      {loading ? 'Analyzing...' : 'Analyze Image'}
                    </button>
                  )}

                  {error && (
                    <div className="mt-3 sm:mt-4 bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-md text-xs sm:text-sm">
                      {error}
                    </div>
                  )}
                </div>

                {/* Right Column - Results */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Results
                  </h2>

                  {loading ? (
                    <div className="space-y-6 py-12">
                      {/* Animated Progress Bar */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 mb-6">
                          <motion.div
                            className="absolute inset-0 border-4 border-[#20B2AA] rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <div className="absolute inset-2 bg-gradient-to-br from-[#E6F3F7] to-[#D1E9F0] rounded-full flex items-center justify-center">
                            <Scan className="w-10 h-10 text-[#003366]" />
                          </div>
                        </div>
                        <p className="text-[#003366] font-semibold mb-4">Analyzing your scan...</p>

                        {/* Progress Bar */}
                        <div className="w-full max-w-md">
                          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                            <motion.div
                              className="bg-gradient-to-r from-[#20B2AA] to-[#003366] h-full rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${scanProgress}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                          <p className="text-center text-sm text-gray-600 mt-2">{scanProgress}%</p>
                        </div>
                      </div>
                    </div>
                  ) : predictions.length > 0 ? (
                    <div className="space-y-8">
                      {predictions.map((prediction, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="space-y-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                        >
                          {/* Success Animation */}
                          {scanComplete && index === 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: [0, 1.2, 1] }}
                              transition={{ duration: 0.6 }}
                              className="flex justify-center mb-4"
                            >
                              <div className="bg-green-100 rounded-full p-3">
                                <CheckCircle className="w-12 h-12 text-green-600" />
                              </div>
                            </motion.div>
                          )}

                          {/* Prediction Card */}
                          <div className="bg-gradient-to-br from-[#E6F3F7] to-[#D1E9F0] rounded-xl p-6 border border-[#20B2AA]/30">
                            <div className="mb-4">
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Predicted Disease
                              </h3>
                              <p className="text-2xl font-bold text-[#003366]">
                                {prediction.disease}
                              </p>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Confidence Score
                              </h3>
                              <div className="flex items-center space-x-4">
                                <div className="flex-1 bg-gray-200 rounded-full h-4">
                                  <motion.div
                                    className="bg-gradient-to-r from-[#20B2AA] to-[#003366] h-4 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${prediction.confidence}%` }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                  />
                                </div>
                                <span className="text-lg font-semibold text-[#003366]">
                                  {prediction.confidence.toFixed(2)}%
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Download PDF Button */}
                          <button
                            onClick={() => generatePDF({
                              disease: prediction.disease,
                              confidence: prediction.confidence,
                              timestamp: Date.now(),
                              image: prediction.image
                            })}
                            className="w-full bg-[#20B2AA] hover:bg-[#1a9b94] text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md flex items-center justify-center space-x-2"
                          >
                            <Download className="w-5 h-5" />
                            <span>Download PDF Report</span>
                          </button>

                          {/* Consultation Tips */}
                          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                              Consultation Tips
                            </h3>
                            <ul className="space-y-2">
                              {getConsultationTips(prediction.disease).map((tip, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <span className="text-yellow-600 mt-1">•</span>
                                  <span className="text-gray-700 text-sm">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Disclaimer */}
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <p className="text-xs text-gray-600">
                              <strong>Disclaimer:</strong> This AI prediction is for
                              informational purposes only and should not replace
                              professional medical advice. Always consult with a qualified
                              healthcare provider for accurate diagnosis and treatment.
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <p>Upload an image and click "Analyze Image" to get results</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#003366] mb-2">
                  My Profile
                </h1>
                <p className="text-gray-600">
                  View your account information and scan history
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* User Info Card */}
                <div className="md:col-span-1">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="flex flex-col items-center">
                      {/* Profile Image with Upload */}
                      <div className="relative mb-4">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#20B2AA] to-[#003366] rounded-full flex items-center justify-center overflow-hidden">
                          {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" fill="currentColor" />
                              <path d="M12 14C8.13 14 5 15.57 5 17.5V20H19V17.5C19 15.57 15.87 14 12 14Z" fill="currentColor" />
                            </svg>
                          )}
                        </div>
                        <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-[#20B2AA] hover:bg-[#1a9b94] text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
                          <Camera className="w-4 h-4" />
                          <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Editable Name */}
                      {isEditingName ? (
                        <div className="flex items-center space-x-2 mb-2">
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="text-2xl font-bold text-[#003366] text-center border-b-2 border-[#20B2AA] focus:outline-none"
                            autoFocus
                          />
                          <button onClick={handleSaveName} className="text-[#20B2AA] hover:text-[#1a9b94]">
                            <Check className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 mb-2">
                          <h2 className="text-2xl font-bold text-[#003366]">
                            {editedName}
                          </h2>
                          <button onClick={() => setIsEditingName(true)} className="text-gray-400 hover:text-[#20B2AA]">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <p className="text-gray-500 text-sm mb-6">Member</p>

                      <div className="w-full space-y-4">
                        <div className="bg-[#F0F7FF] rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">Username</p>
                          <p className="text-sm font-semibold text-[#003366]">
                            {editedName}
                          </p>
                        </div>
                        <div className="bg-[#F0F7FF] rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">User ID</p>
                          <p className="text-sm font-semibold text-[#003366]">
                            #{userId.toString().padStart(6, '0')}
                          </p>
                        </div>
                        <div className="bg-[#F0F7FF] rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">Total Scans</p>
                          <p className="text-sm font-semibold text-[#003366]">
                            {scanHistory.length}
                          </p>
                        </div>
                      </div>

                      {/* Account Actions */}
                      <div className="w-full mt-6 space-y-3">
                        <button
                          onClick={() => setShowChangePasswordModal(true)}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Lock className="w-4 h-4" />
                          <span>Change Password</span>
                        </button>
                        <button
                          onClick={() => setShowDeleteAccountModal(true)}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scan History */}
                <div className="md:col-span-2">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="flex items-center space-x-2 mb-6">
                      <History className="w-6 h-6 text-[#003366]" />
                      <h2 className="text-2xl font-bold text-[#003366]">
                        Scan History
                      </h2>
                    </div>

                    {historyLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div>
                      </div>
                    ) : scanHistory.length > 0 ? (
                      <div className="space-y-4">
                        {scanHistory.map((scan, index) => (
                          <motion.div
                            key={scan.id || index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => {
                              setSelectedHistoryItem(scan)
                              setShowHistoryModal(true)
                            }}
                            className="bg-[#F0F7FF] rounded-lg p-3 border border-gray-200 cursor-pointer hover:border-[#20B2AA] transition-colors"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <h3 className="text-base font-bold text-[#003366]">
                                  {scan.predicted_disease || scan.disease}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  {new Date(scan.created_at || scan.timestamp).toLocaleString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-500 mb-0.5">Confidence</p>
                                <p className="text-lg font-bold text-[#20B2AA]">
                                  {scan.confidence.toFixed(2)}%
                                </p>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <motion.div
                                className="bg-[#003366] h-1.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${scan.confidence}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                              />
                            </div>
                            <div className="mt-2 flex items-center text-[#003366] text-xs font-medium">
                              <span>Click to view details and download report</span>
                              <Download className="w-3 h-3 ml-1" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No scan history yet</p>
                        <p className="text-sm text-gray-400 mt-2">
                          Start analyzing images to build your history
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* History Detail Modal */}
      <AnimatePresence>
        {showHistoryModal && selectedHistoryItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowHistoryModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#003366] to-[#20B2AA] text-white p-6 rounded-t-2xl flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Scan Details</h2>
                  <p className="text-sm opacity-90">
                    {new Date(selectedHistoryItem.created_at || selectedHistoryItem.timestamp).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Scan Image */}
                {selectedHistoryItem.image && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Scan Image</h3>
                    <img
                      src={selectedHistoryItem.image}
                      alt="Scan"
                      className="w-full max-w-md mx-auto rounded-lg shadow-md"
                    />
                  </div>
                )}

                {/* Prediction Results */}
                <div className="bg-gradient-to-br from-[#E6F3F7] to-[#D1E9F0] rounded-xl p-6 border border-[#20B2AA]/30">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis Results</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Predicted Disease</p>
                      <p className="text-2xl font-bold text-[#003366]">
                        {selectedHistoryItem.predicted_disease || selectedHistoryItem.disease}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Confidence Score</p>
                      <p className="text-2xl font-bold text-[#20B2AA]">
                        {selectedHistoryItem.confidence.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="bg-gray-200 rounded-full h-4">
                      <motion.div
                        className="bg-gradient-to-r from-[#20B2AA] to-[#003366] h-4 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedHistoryItem.confidence}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Consultation Tips */}
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Consultation Tips</h3>
                  <ul className="space-y-2">
                    {getConsultationTips(selectedHistoryItem.predicted_disease || selectedHistoryItem.disease).map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => generatePDF({
                    disease: selectedHistoryItem.predicted_disease || selectedHistoryItem.disease,
                    confidence: selectedHistoryItem.confidence,
                    timestamp: selectedHistoryItem.created_at || selectedHistoryItem.timestamp,
                    image: selectedHistoryItem.image
                  })}
                  className="w-full bg-[#20B2AA] hover:bg-[#1a9b94] text-white font-medium py-4 px-6 rounded-lg transition-colors shadow-md flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF Report</span>
                </button>

                {/* Disclaimer */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-xs text-gray-600">
                    <strong>Disclaimer:</strong> This AI prediction is for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for accurate diagnosis and treatment.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showChangePasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowChangePasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-[#003366] mb-4">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowChangePasswordModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="flex-1 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244] transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteAccountModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteAccountModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border-2 border-red-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-2 text-red-600 mb-4">
                <AlertTriangle className="w-8 h-8" />
                <h2 className="text-2xl font-bold">Delete Account</h2>
              </div>

              <p className="text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter your password to confirm
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Your password"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteAccountModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatSupport />
    </div >
  )
}

export default Dashboard
