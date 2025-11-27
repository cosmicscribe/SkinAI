import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ChevronRight, MessageCircle, Circle } from 'lucide-react'
import ChatSupport from '../components/ChatSupport'
import Navbar from '../components/Navbar'

// Sample disease data organized by first letter
const diseasesData = {
  A: [
    'Actinic Keratosis',
    'Acne Vulgaris',
    'Atopic Dermatitis',
    'Acral Nevus',
    'Allergic urticaria',
    'Alopecia Areata',
    'Angioma',
    'Atopic Eczema'
  ],
  B: [
    'Basal Cell Carcinoma',
    'Benign Keratosis',
    'Bullous Pemphigoid'
  ],
  C: [
    'Contact Dermatitis',
    'Cutaneous Lupus',
    'Cyst'
  ],
  D: [
    'Dermatitis',
    'Dermatofibroma',
    'Dysplastic Nevus'
  ],
  E: [
    'Eczema',
    'Erythema',
    'Epidermoid Cyst'
  ],
  F: [
    'Folliculitis',
    'Fungal Infection'
  ],
  G: [
    'Granuloma',
    'Genital Warts'
  ],
  H: [
    'Hives',
    'Herpes',
    'Hemangioma'
  ],
  K: [
    'Keloid',
    'Keratoacanthoma'
  ],
  L: [
    'Lichen Planus',
    'Lupus',
    'Lipoma'
  ],
  M: [
    'Melanoma',
    'Melanocytic Nevus',
    'Molluscum Contagiosum',
    'Mycosis Fungoides'
  ],
  O: [
    'Onychomycosis',
    'Oral Lichen Planus'
  ],
  P: [
    'Psoriasis',
    'Pityriasis Rosea',
    'Pemphigus',
    'Pigmented Lesion'
  ],
  R: [
    'Rosacea',
    'Rash',
    'Ringworm'
  ],
  S: [
    'Seborrheic Keratosis',
    'Squamous Cell Carcinoma',
    'Scabies',
    'Shingles',
    'Sebaceous Cyst'
  ],
  T: [
    'Tinea',
    'Tinea Versicolor',
    'Tumor'
  ],
  V: [
    'Vitiligo',
    'Vascular Lesion',
    'Verruca'
  ],
  W: [
    'Wart',
    'Wound',
    'Wheal'
  ]
}

const DiseasesDictionary = ({ isAuthenticated, user, onLogout }) => {
  const [selectedLetter, setSelectedLetter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleDiseaseClick = (diseaseName) => {
    navigate(`/diseases/${encodeURIComponent(diseaseName)}`)
  }

  // Get all letters that have diseases
  const availableLetters = Object.keys(diseasesData).sort()
  const allLetters = ['All', ...availableLetters]

  // Filter diseases based on selected letter and search query
  const getFilteredDiseases = () => {
    let diseases = []

    if (selectedLetter === 'All') {
      // Get all diseases from all letters
      Object.values(diseasesData).forEach(letterDiseases => {
        diseases.push(...letterDiseases)
      })
    } else {
      diseases = diseasesData[selectedLetter] || []
    }

    // Filter by search query
    if (searchQuery.trim()) {
      diseases = diseases.filter(disease =>
        disease.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return diseases.sort()
  }

  const filteredDiseases = getFilteredDiseases()

  // Get the first letter of filtered diseases for section header
  const getSectionHeader = () => {
    if (searchQuery.trim()) {
      return 'Search Results'
    }
    if (selectedLetter === 'All') {
      return 'All Diseases'
    }
    return selectedLetter
  }

  return (
    <div className="min-h-screen bg-[#F8FAFF] pb-20">
      {/* Navbar */}
      <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={onLogout} />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-[#2C3E50]">Diseases Dictionary</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search diseases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alphabetical Navigation Bar */}
        <div className="mb-8">
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2 mb-2">
            {allLetters.slice(0, 12).map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  setSelectedLetter(letter)
                  setSearchQuery('')
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedLetter === letter
                  ? 'bg-[#4A90E2] text-white'
                  : 'bg-white border border-[#E0E6ED] text-[#2C3E50] hover:border-[#A7D9FF]'
                  }`}
              >
                {letter}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
            {allLetters.slice(12).map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  setSelectedLetter(letter)
                  setSearchQuery('')
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedLetter === letter
                  ? 'bg-[#4A90E2] text-white'
                  : 'bg-white border border-[#E0E6ED] text-[#2C3E50] hover:border-[#A7D9FF]'
                  }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#2C3E50]">{getSectionHeader()}</h2>
        </div>

        {/* Disease List */}
        <div className="space-y-3">
          {filteredDiseases.length > 0 ? (
            filteredDiseases.map((disease, index) => (
              <motion.div
                key={`${disease}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                onClick={() => handleDiseaseClick(disease)}
                className="bg-white rounded-lg border border-[#E0E6ED] shadow-sm p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
              >
                <span className="text-[#2C3E50] font-medium text-lg">{disease}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-lg border border-[#E0E6ED] shadow-sm p-8 text-center">
              <p className="text-[#2C3E50] text-lg">No diseases found</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Support */}
      <ChatSupport />
    </div>
  )
}

export default DiseasesDictionary

