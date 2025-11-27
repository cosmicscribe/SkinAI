import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, MessageCircle, ArrowLeft } from 'lucide-react'
import ChatSupport from '../components/ChatSupport'

const QuizPage = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState('quiz') // intro, quiz, analyzing, result
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState([])

    const questions = [
        {
            id: 1,
            question: "Are there any spots on your skin that stand out or look different from others?",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60", // Doctor examining skin with dermatoscope
            options: [
                { id: 'A', text: "Yes, several" },
                { id: 'B', text: "I'm not sure" },
                { id: 'C', text: "No, none that I've noticed" }
            ],
            tip: "Sometimes, the \"ugly duckling\" mole is the one to watch out for."
        },
        {
            id: 2,
            question: "Are you aware of any moles located in hard-to-see areas?",
            image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=500&auto=format&fit=crop&q=60", // Medical examination of back/skin
            options: [
                { id: 'A', text: "Yes" },
                { id: 'B', text: "Not sure" },
                { id: 'C', text: "No" }
            ],
            tip: "Moles in these areas are at higher risk of damage and should be monitored closely."
        },
        {
            id: 3,
            question: "Have you ever accidentally caused mechanical damage to any of your moles?",
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop&q=60", // Medical professional examining patient
            options: [
                { id: 'A', text: "Yes, multiple times" },
                { id: 'B', text: "Yes, but only once" },
                { id: 'C', text: "No, never" }
            ],
            tip: "Injuries raise the risk of complications, so regular check-ups are crucial."
        },
        {
            id: 4,
            question: "Have you ever had a mole that seemed to suddenly appear?",
            image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&auto=format&fit=crop&q=60", // Dermatology consultation
            options: [
                { id: 'A', text: "Yes, recently" },
                { id: 'B', text: "Maybe, but I'm unsure" },
                { id: 'C', text: "No, none that I've noticed" }
            ],
            tip: "New moles, especially in adulthood after the age of 25, could be a red flag."
        },
        {
            id: 5,
            question: "Do you have a family history of skin cancer?",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=60", // Medical team/healthcare professionals
            options: [
                { id: 'A', text: "Yes, multiple relatives" },
                { id: 'B', text: "Not that I know of" },
                { id: 'C', text: "No, no history" }
            ],
            tip: "If a close relative has had skin cancer, your risk of developing it can double or even triple."
        },
        {
            id: 6,
            question: "When was the last time you checked your skin for any unusual changes or spots?",
            image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&auto=format&fit=crop&q=60", // Medical examination/checkup
            options: [
                { id: 'A', text: "Recently, few months ago" },
                { id: 'B', text: "Maybe last year" },
                { id: 'C', text: "I can't remember" }
            ],
            tip: "Neglecting skin checks can be fatal; over 90% of skin cancers are treatable if found early."
        },
        {
            id: 7,
            question: "What's your main focus for skin monitoring? Let's work on it together!",
            image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=500&auto=format&fit=crop&q=60", // Healthcare/skin monitoring
            options: [
                { id: 'A', text: "Detecting risks early" },
                { id: 'B', text: "Tracking changes over time" },
                { id: 'C', text: "Maintaining healthy skin" }
            ],
            tip: "Regular monitoring is the key to healthy skin."
        }
    ]

    const handleAnswer = (option) => {
        const newAnswers = [...answers, { questionId: questions[currentQuestion].id, answer: option }]
        setAnswers(newAnswers)

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
        } else {
            setStep('intro') // Photo Instruction
        }
    }

    const handleComplete = () => {
        // Navigate to login/register with a flag or state to show auth modal immediately if needed
        // For now, let's just go to register as a default "next step"
        navigate('/register')
    }

    return (
        <div className="min-h-screen bg-[#F0F7FF] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col min-h-[600px]"
            >
                {/* Header/Close */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-white/80 backdrop-blur-sm">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center text-gray-600"
                    >
                        <ArrowLeft size={20} className="mr-1" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </button>
                    <div className="text-[#003366] font-bold text-lg">Dr. SkinAI</div>
                    <div className="w-20"></div> {/* Spacer for centering */}
                </div>

                <div className="flex-1 flex flex-col pt-16">
                    {step === 'intro' && (
                        <div className="p-8 flex flex-col items-center text-center h-full justify-center">
                            <h3 className="text-xl font-bold text-[#003366] mb-2">Before you start - learn</h3>
                            <h2 className="text-3xl font-bold text-[#003366] mb-8">How to make a suitable photo</h2>

                            <div className="flex-1 flex items-center justify-center mb-8 w-full">
                                {/* Placeholder for phone illustration */}
                                <div className="relative">
                                    <div className="w-32 h-48 border-4 border-dashed border-[#20B2AA] rounded-2xl mx-auto flex items-center justify-center bg-gray-50">
                                        <span className="text-4xl">📸</span>
                                    </div>
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                        <p className="text-sm font-bold text-[#003366]">2-4" or 5-10 cm</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-8 max-w-md text-lg">
                                The smallest possible distance <span className="font-bold text-[#003366]">(2-4" or 5-10 cm)</span> for a clear frame
                            </p>

                            <button
                                onClick={() => {
                                    setStep('analyzing')
                                    setTimeout(() => {
                                        setStep('result')
                                        handleComplete()
                                    }, 2500)
                                }}
                                className="w-full max-w-sm bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl transition-colors shadow-lg text-lg"
                            >
                                Got It
                            </button>
                        </div>
                    )}

                    {step === 'analyzing' && (
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-24 h-24 border-4 border-[#20B2AA] border-t-transparent rounded-full mb-8"
                            />
                            <h3 className="text-2xl font-bold text-[#003366] mb-4">Analyzing your responses...</h3>
                            <p className="text-gray-500 text-lg">Our AI is preparing your personalized risk profile.</p>
                        </div>
                    )}

                    {step === 'quiz' && (
                        <>
                            {/* Progress Bar */}
                            <div className="px-8 pt-2 pb-6">
                                <div className="flex space-x-1">
                                    {questions.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${idx <= currentQuestion ? 'bg-[#003366]' : 'bg-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="text-right text-xs text-gray-400 mt-2">
                                    Question {currentQuestion + 1} of {questions.length}
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto px-8 pb-8 overflow-x-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentQuestion}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="grid md:grid-cols-2 gap-8 h-full"
                                    >
                                        {/* Image Area */}
                                        <div className="relative h-64 md:h-auto bg-gray-100 rounded-2xl overflow-hidden shadow-inner">
                                            <motion.img
                                                initial={{ scale: 1.1 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                src={questions[currentQuestion].image}
                                                alt="Quiz Context"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full flex items-center space-x-2 shadow-sm">
                                                <span className="text-xs font-bold text-[#003366]">Dr. SkinAI</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col justify-center">
                                            <motion.h3
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                                                className="text-2xl font-bold text-[#003366] mb-8 leading-snug"
                                            >
                                                {questions[currentQuestion].question}
                                            </motion.h3>

                                            <motion.div
                                                variants={{
                                                    hidden: { opacity: 0 },
                                                    show: {
                                                        opacity: 1,
                                                        transition: {
                                                            staggerChildren: 0.2,
                                                            delayChildren: 0.3
                                                        }
                                                    }
                                                }}
                                                initial="hidden"
                                                animate="show"
                                                className="space-y-4 mb-8"
                                            >
                                                {questions[currentQuestion].options.map((option) => (
                                                    <motion.button
                                                        key={option.id}
                                                        variants={{
                                                            hidden: { opacity: 0, y: 20 },
                                                            show: {
                                                                opacity: 1,
                                                                y: 0,
                                                                transition: { duration: 0.5, ease: "easeOut" }
                                                            }
                                                        }}
                                                        whileHover={{ scale: 1.02, backgroundColor: "#F0F7FF", borderColor: "#20B2AA" }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleAnswer(option)}
                                                        className="w-full bg-white border-2 border-gray-100 p-5 rounded-xl flex items-center justify-between group transition-colors shadow-sm hover:shadow-md text-left"
                                                    >
                                                        <span className="font-medium text-gray-700 group-hover:text-[#003366] text-lg">{option.text}</span>
                                                        <ChevronRight size={24} className="text-gray-300 group-hover:text-[#20B2AA]" />
                                                    </motion.button>
                                                ))}
                                            </motion.div>

                                            {/* Tip Box */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                                                className="bg-[#9faec2] bg-opacity-10 rounded-xl p-5 flex items-start space-x-4"
                                            >
                                                <MessageCircle className="w-6 h-6 text-[#546e7a] flex-shrink-0 mt-0.5" />
                                                <p className="text-sm text-[#546e7a] font-medium leading-relaxed">
                                                    {questions[currentQuestion].tip}
                                                </p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>

            {/* Chat Support */}
            <ChatSupport />
        </div>
    )
}

export default QuizPage
