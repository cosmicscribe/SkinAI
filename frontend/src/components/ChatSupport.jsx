import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Minimize2, Bot } from 'lucide-react'

const ChatSupport = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState(() => {
        // Load chat history from localStorage
        const savedMessages = localStorage.getItem('chatHistory')
        if (savedMessages) {
            return JSON.parse(savedMessages)
        }
        return [
            { id: 1, text: "Hello! I'm Dr. SkinAI's virtual assistant. How can I help you today?", sender: 'bot' }
        ]
    })
    const [inputText, setInputText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)

    // Save chat history to localStorage whenever messages change
    useEffect(() => {
        localStorage.setItem('chatHistory', JSON.stringify(messages))
    }, [messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    const handleSend = async (e) => {
        e.preventDefault()
        if (!inputText.trim()) return

        const userMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user'
        }

        setMessages(prev => [...prev, userMessage])
        setInputText('')
        setIsTyping(true)

        // Simulate AI processing
        setTimeout(() => {
            const botResponse = generateResponse(userMessage.text)
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: botResponse,
                sender: 'bot'
            }])
            setIsTyping(false)
        }, 1500)
    }

    const generateResponse = (text) => {
        const lowerText = text.toLowerCase()

        // Greetings
        if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
            return "Hello! How can I assist you with your skin health journey today?"
        }

        // Scan/Report related
        if (lowerText.includes('scan') || lowerText.includes('report') || lowerText.includes('upload')) {
            return "To get a scan report:\n1. Go to Dashboard\n2. Click on 'Skin Analysis' tab\n3. Upload a clear photo of the skin area\n4. Wait for AI analysis\n5. Download your PDF report\n\nMake sure the photo is well-lit and focused!"
        }

        // Skin diseases
        if (lowerText.includes('skin disease') || lowerText.includes('cancer') || lowerText.includes('melanoma') || lowerText.includes('mole') || lowerText.includes('spot')) {
            return "I can help identify potential skin risks. Our AI detects:\n- Melanoma\n- Basal Cell Carcinoma\n- Benign Keratosis\n- Dermatofibroma\n- Melanocytic Nevus\n- Vascular Lesions\n\nPlease upload a photo in the Dashboard for analysis."
        }

        // How it works
        if ((lowerText.includes('how') && lowerText.includes('work')) || lowerText.includes('ai') || lowerText.includes('technology')) {
            return "Dr. SkinAI uses deep learning trained on 10,000+ dermatological images. The AI analyzes patterns, colors, and textures to identify potential skin conditions with high accuracy. However, it's a screening tool - always consult a dermatologist for diagnosis."
        }

        // Doctor/Medical advice
        if (lowerText.includes('doctor') || lowerText.includes('appointment') || lowerText.includes('dermatologist')) {
            return "I'm an AI screening tool, not a replacement for medical professionals. If you have concerns or receive a high-risk result, please consult a dermatologist immediately. Early detection saves lives!"
        }

        // Pricing
        if (lowerText.includes('cost') || lowerText.includes('price') || lowerText.includes('free') || lowerText.includes('subscription')) {
            return "Dr. SkinAI offers:\n- FREE basic skin analysis\n- FREE preliminary risk assessment\n- Premium features for detailed reports and history tracking\n\nStart with a free scan today!"
        }

        // Privacy/Security
        if (lowerText.includes('privacy') || lowerText.includes('security') || lowerText.includes('data') || lowerText.includes('safe')) {
            return "Your data is secure! We use:\n- End-to-end encryption\n- GDPR & HIPAA compliance\n- No third-party sharing\n- You can delete your data anytime\n\nCheck our Privacy Policy for details."
        }

        // Account/Profile
        if (lowerText.includes('account') || lowerText.includes('profile') || lowerText.includes('history')) {
            return "Access your account features:\n- View scan history\n- Download past reports\n- Update profile info\n- Manage settings\n\nGo to Dashboard > Profile tab"
        }

        // General help
        if (lowerText.includes('help')) {
            return "I can help you with:\n- 📸 How to scan your skin\n- 📊 Understanding your results\n- 🔒 Privacy & security\n- 💰 Pricing & features\n- 🩺 Skin disease info\n\nWhat would you like to know?"
        }

        // Thank you
        if (lowerText.includes('thank') || lowerText.includes('thanks')) {
            return "You're welcome! Feel free to ask if you need anything else. Stay healthy! 😊"
        }

        // Default fallback
        return "I'm here to help! You can ask me about:\n- How to get a scan report\n- Skin disease information\n- App features and pricing\n- Privacy and security\n\nWhat would you like to know?"
    }

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-8 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100"
                    >
                        {/* Header */}
                        <div className="bg-[#003366] p-4 flex justify-between items-center text-white">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                                    <Bot size={18} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Dr. SkinAI Support</h3>
                                    <p className="text-xs text-white/70 flex items-center">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                                        Online
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <Minimize2 size={18} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                                ? 'bg-[#003366] text-white rounded-tr-none'
                                                : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                                            }`}
                                    >
                                        {msg.text.split('\n').map((line, i) => (
                                            <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex space-x-1">
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.6 }}
                                            className="w-2 h-2 bg-gray-400 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                            className="w-2 h-2 bg-gray-400 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                            className="w-2 h-2 bg-gray-400 rounded-full"
                                        />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <form onSubmit={handleSend} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]/20 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim()}
                                    className="p-2 bg-[#003366] text-white rounded-full hover:bg-[#002244] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 w-14 h-14 bg-[#003366] rounded-full flex items-center justify-center shadow-2xl cursor-pointer z-40 hover:bg-[#002244] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
            >
                {isOpen ? (
                    <X className="w-7 h-7 text-white" />
                ) : (
                    <MessageCircle className="w-7 h-7 text-white" />
                )}
            </motion.button>
        </>
    )
}

export default ChatSupport
