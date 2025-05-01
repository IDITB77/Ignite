"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Bot, Loader2, Maximize2, Minimize2, Send, X } from "lucide-react"

// Mock chatbot responses
const botResponses = {
  greeting: [
    "Hello! I'm Nova, your AI assistant. How can I help you today?",
    "Hi there! I'm Nova, ready to assist with your learning journey. What do you need help with?",
    "Welcome to Ignite! I'm Nova, your AI guide. What would you like to know?",
  ],
  fallback: [
    "I'm not sure I understand. Could you rephrase that?",
    "I'm still learning. Could you try asking in a different way?",
    "I don't have an answer for that yet. Is there something else I can help with?",
  ],
  responses: {
    hello: [
      "Hi there! How can I help you with your learning journey today?",
      "Hello! I'm Nova, your AI assistant. What would you like to know about Ignite?",
    ],
    hi: [
      "Hi there! How can I help you with your learning journey today?",
      "Hello! I'm Nova, your AI assistant. What would you like to know about Ignite?",
    ],
    help: [
      "I can help you with navigating the platform, finding learning resources, connecting with teammates, or understanding your progress. What specifically do you need help with?",
      "I can assist with skill development, project recommendations, or technical questions. What area do you need help in?",
    ],
    dashboard: [
      "The dashboard shows your personalized learning journey. You can see your progress, recommended activities, and upcoming events. Is there something specific you're looking for?",
      "Your dashboard is your command center. It displays your skills, projects, and AI-powered recommendations tailored to your learning style.",
    ],
    skills: [
      "The Skills page shows your technical and soft skills as an interactive RPG-style skill tree. You can see your progress and unlock new skills as you complete projects and challenges.",
      "Your skills are visualized as a skill tree. Each skill has levels and prerequisites. Complete projects and challenges to level up your skills!",
    ],
    projects: [
      "Projects are hands-on learning experiences. You can browse available projects, join existing teams, or create your own project. Each project helps you develop specific skills.",
      "We have various projects across different domains like web development, AI/ML, design, and more. What kind of project are you interested in?",
    ],
    teams: [
      "The Teams page helps you find and collaborate with other learners. You can join existing teams or create your own based on shared interests and complementary skills.",
      "Teams are matched based on skills, learning styles, and goals. Our AI helps find the perfect teammates for your projects!",
    ],
    missions: [
      "Missions are structured challenges designed to build specific skills. They include technical tasks, emotional intelligence exercises, and collaborative activities.",
      "Each mission has clear objectives, required skills, and rewards. Complete missions to earn XP and level up your skills!",
    ],
    journal: [
      "The Journal is your personal reflection space. Record your thoughts, track your emotional state, and receive AI insights about your learning patterns.",
      "Your journal entries are analyzed to provide personalized insights about your learning journey. It's a great tool for self-awareness and growth!",
    ],
    career: [
      "The Career Simulator lets you experience different tech roles through simulated workdays. It helps you explore career paths and identify which roles align with your interests.",
      "Try different roles like Frontend Developer, UX Designer, or Data Scientist to see which career path excites you most!",
    ],
    hackathon: [
      "Hackathons are time-limited coding events where you build projects with a team. Check the Events section for upcoming hackathons you can join!",
      "To prepare for a hackathon, focus on building your collaborative coding skills and quick prototyping abilities. Would you like some hackathon tips?",
    ],
    bug: [
      "The Bug Hunting challenge helps you develop debugging skills. You'll analyze code to find security vulnerabilities and logic errors.",
      "Bug hunting improves your code quality and security awareness. It's a valuable skill for any developer!",
    ],
    fraud: [
      "The Fraud Email Detection challenge teaches you to identify phishing attempts and other email scams using both manual analysis and ML techniques.",
      "Learning to spot fraudulent emails is an important cybersecurity skill. The challenge includes real-world examples to train your detection abilities.",
    ],
    "time capsule": [
      "The Time Capsule feature lets you send messages to your future self. It's a great way to reflect on your growth and set long-term goals.",
      "Write a message to your future self about your current goals and challenges. You'll receive it at a future date you specify!",
    ],
    emotion: [
      "The Emotion Modes feature adapts the UI based on your current emotional state. It can help optimize your learning environment for your current mood.",
      "Different emotional states benefit from different learning approaches. The platform adapts to help you learn effectively regardless of your mood.",
    ],
  },
}

// Find the most relevant response based on user input
function findResponse(input: string) {
  const lowerInput = input.toLowerCase()

  // Check for exact matches first
  for (const [key, responses] of Object.entries(botResponses.responses)) {
    if (lowerInput.includes(key)) {
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  // If no match, return a fallback response
  return botResponses.fallback[Math.floor(Math.random() * botResponses.fallback.length)]
}

// Simulate typing effect
function useTypingEffect(text: string, speed = 30) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!text) return

    setIsTyping(true)
    setDisplayedText("")

    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(timer)
        setIsTyping(false)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  return { displayedText, isTyping }
}

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [currentResponse, setCurrentResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { displayedText, isTyping } = useTypingEffect(currentResponse)

  // Initialize with greeting when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)]
      setCurrentResponse(greeting)
      setMessages([
        {
          id: 1,
          text: greeting,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, displayedText])

  const handleSendMessage = () => {
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI processing time
    setTimeout(() => {
      const response = findResponse(input)
      setCurrentResponse(response)

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-4 right-4 z-50">
        <Button size="lg" className="h-14 w-14 rounded-full shadow-lg" onClick={() => setIsOpen(true)}>
          <Bot className="h-6 w-6" />
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Card className={`w-80 md:w-96 shadow-lg ${isMinimized ? "h-auto" : "h-[500px]"}`}>
        <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0 border-b">
          <CardTitle className="text-base font-medium flex items-center">
            <Bot className="h-5 w-5 mr-2 text-primary" />
            Nova AI Assistant
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimized(!isMinimized)}>
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="p-3 h-[380px] overflow-y-auto">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex mb-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className={`h-8 w-8 ${message.sender === "user" ? "ml-2" : "mr-2"}`}>
                        {message.sender === "bot" ? (
                          <>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Nova" />
                            <AvatarFallback>AI</AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                            <AvatarFallback>You</AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <div>
                        <div
                          className={`rounded-lg px-3 py-2 ${
                            message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">
                            {message.id === messages.length && message.sender === "bot" ? displayedText : message.text}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.sender === "bot" ? "Nova" : "You"} •{" "}
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex mb-3 justify-start"
                  >
                    <div className="flex max-w-[80%] flex-row">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Nova" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="rounded-lg px-3 py-2 bg-muted">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </AnimatePresence>
            </CardContent>

            <CardFooter className="p-3 pt-0">
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                />
                <Button size="icon" onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </motion.div>
  )
}
