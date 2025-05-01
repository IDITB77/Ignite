"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import { ArrowRight, Brain, Code, Heart, Lightbulb, Rocket, Sparkles, Users } from "lucide-react"
import { StudentCharacterAdvanced } from "@/components/student-character-advanced"

// Rotating taglines
const taglines = [
  "AI + Empathy = Power",
  "Where Hackers Meet Healers",
  "Code with Heart, Build with Purpose",
  "Learn. Grow. Transform.",
  "Skills + Emotions + Community",
]

// Inspirational quotes
const inspirationalQuotes = [
  {
    quote: "The future belongs to those who learn more skills and combine them in creative ways.",
    author: "Robert Greene",
  },
  {
    quote:
      "Technology alone is not enough. It's technology married with the liberal arts, married with the humanities, that yields the results that make our hearts sing.",
    author: "Steve Jobs",
  },
  {
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    quote: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    quote:
      "The most powerful person in the world is the storyteller. The storyteller sets the vision, values and agenda of an entire generation.",
    author: "Steve Jobs",
  },
]

export default function Home() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [currentTagline, setCurrentTagline] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [showQuote, setShowQuote] = useState(true)
  const quoteIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Rotate taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentTagline((prev) => (prev + 1) % taglines.length)
        setIsVisible(true)
      }, 500)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Auto-play quotes
  useEffect(() => {
    const startQuoteRotation = () => {
      quoteIntervalRef.current = setInterval(() => {
        setShowQuote(false)
        setTimeout(() => {
          setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length)
          setShowQuote(true)
        }, 1000)
      }, 8000)
    }

    startQuoteRotation()

    return () => {
      if (quoteIntervalRef.current) {
        clearInterval(quoteIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/5 dark:bg-primary/10"
                style={{
                  width: Math.random() * 10 + 2 + "px",
                  height: Math.random() * 10 + 2 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center space-y-4"
            >
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Badge
                    className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 mb-4"
                    variant="outline"
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-1" />
                    IGNITE: AI-Powered Growth for Every Student
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                    {t("home.hero.title")}
                  </span>
                </motion.h1>

                <motion.p
                  className="max-w-[600px] text-muted-foreground md:text-xl mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {t("home.hero.subtitle")} <span className="text-foreground font-medium">The future needs you.</span>
                </motion.p>

                <AnimatePresence mode="wait">
                  {isVisible && (
                    <motion.div
                      key={currentTagline}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="mt-2 text-sm md:text-base font-medium text-primary"
                    >
                      "{taglines[currentTagline]}"
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <Link href={user ? "/dashboard" : "/login"}>
                  <Button size="lg" className="gap-1 group">
                    🚀 {t("home.hero.cta")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href={user ? "/journal" : "/login"}>
                  <Button size="lg" variant="outline">
                    🎯 {t("home.hero.cta2")}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[500px] aspect-square">
                <StudentCharacterAdvanced />
              </div>
            </motion.div>
          </div>

          {/* Auto-playing quote carousel */}
          <motion.div
            className="mt-12 max-w-3xl mx-auto bg-background/50 backdrop-blur-sm border rounded-lg p-6 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="absolute top-0 left-0 w-full h-1">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>

            <AnimatePresence mode="wait">
              {showQuote && (
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-lg md:text-xl italic">"{inspirationalQuotes[currentQuote].quote}"</p>
                  <p className="mt-2 text-sm text-muted-foreground">— {inspirationalQuotes[currentQuote].author}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          >
            <div className="space-y-2">
              <Badge className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20" variant="outline">
                Platform Features
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Grow Holistically with AI</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform helps you develop all aspects of your growth journey
              </p>
            </div>
          </motion.div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
            {[
              {
                icon: <Code className="h-10 w-10 text-primary" />,
                title: "Technical Growth",
                description:
                  "Master coding, design, and other technical skills with guided learning paths and AI-powered recommendations.",
              },
              {
                icon: <Heart className="h-10 w-10 text-pink-500" />,
                title: "Emotional Intelligence",
                description:
                  "Develop self-awareness, empathy, and emotional resilience through guided exercises and peer support.",
              },
              {
                icon: <Users className="h-10 w-10 text-blue-500" />,
                title: "Social Impact",
                description:
                  "Apply your skills to real-world problems and make a difference through collaborative micro-projects.",
              },
              {
                icon: <Brain className="h-10 w-10 text-purple-500" />,
                title: "AI Coaching",
                description:
                  "Receive personalized guidance, feedback, and support from our AI coach tailored to your learning style.",
              },
              {
                icon: <Rocket className="h-10 w-10 text-amber-500" />,
                title: "Team Building",
                description:
                  "Find your ideal teammates based on skills, personality, and working style for maximum collaboration.",
              },
              {
                icon: <Lightbulb className="h-10 w-10 text-yellow-500" />,
                title: "Micro-Missions",
                description:
                  "Learn by doing through short, impactful projects that build your portfolio and confidence.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm bg-background"
              >
                <motion.div whileHover={{ rotate: 5 }} className="p-3 rounded-full bg-muted">
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          >
            <div className="space-y-2">
              <Badge className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20" variant="outline">
                Platform Preview
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Explore Our AI-Powered Features
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover how IGNITE helps you grow technically, emotionally, and socially
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              {
                title: "AI-Powered Growth Map",
                description: "Get personalized recommendations and track your progress with our AI assistant Nova.",
                image: "/placeholder.svg?height=300&width=500",
                features: ["Personalized learning paths", "Skill gap analysis", "Mood-based recommendations"],
                cta: "Explore Dashboard",
                link: "/dashboard",
                color: "from-blue-500/20 to-purple-500/20",
              },
              {
                title: "Emotion+AI Journal Assistant",
                description: "Reflect on your journey with AI-powered insights and emotional intelligence tracking.",
                image: "/placeholder.svg?height=300&width=500",
                features: ["Sentiment analysis", "Growth patterns", "Emotional intelligence coaching"],
                cta: "Start Journaling",
                link: "/journal",
                color: "from-pink-500/20 to-purple-500/20",
              },
              {
                title: "RPG Skill Tree",
                description: "Level up your skills in a gamified learning environment with achievements and badges.",
                image: "/placeholder.svg?height=300&width=500",
                features: ["Visual skill progression", "Unlockable roles", "XP-based achievements"],
                cta: "View Skill Tree",
                link: "/skills",
                color: "from-green-500/20 to-blue-500/20",
              },
              {
                title: "Live Project Incubation",
                description: "Collaborate with peers and get AI feedback on your projects in real-time.",
                image: "/placeholder.svg?height=300&width=500",
                features: ["Real-time collaboration", "AI project feedback", "Peer learning"],
                cta: "Join Incubation Room",
                link: "/incubation",
                color: "from-yellow-500/20 to-orange-500/20",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg border overflow-hidden bg-background"
              >
                <div className={`h-48 bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <FeaturePreviewAnimation index={index} />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2 mb-4">
                    {feature.features.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                        viewport={{ once: true }}
                        className="flex items-center"
                      >
                        <span className="mr-2 text-primary">✓</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  <Link href={user ? feature.link : "/login"}>
                    <Button className="w-full">
                      {feature.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Simple feature preview animations
function FeaturePreviewAnimation({ index }) {
  switch (index) {
    case 0: // Growth Map
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="w-32 h-32 rounded-full bg-primary/30 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-primary/50 flex items-center justify-center"
              animate={{ scale: [1, 0.9, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-primary/70 flex items-center justify-center text-white font-bold"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              >
                GROW
              </motion.div>
            </motion.div>
          </motion.div>

          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-primary/60"
              style={{
                top: `${30 + Math.random() * 40}%`,
                left: `${30 + Math.random() * 40}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )

    case 1: // Journal
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="w-48 h-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex flex-col"
            animate={{ y: [0, -5, 0], rotate: [0, 1, 0, -1, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-full h-4 bg-primary/20 rounded-sm mb-2" />
            <div className="w-3/4 h-3 bg-primary/20 rounded-sm mb-1" />
            <div className="w-full h-3 bg-primary/20 rounded-sm mb-1" />
            <div className="w-2/3 h-3 bg-primary/20 rounded-sm" />
          </motion.div>

          <motion.div
            className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Heart className="h-5 w-5" />
          </motion.div>
        </div>
      )

    case 2: // Skill Tree
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg className="w-full h-full">
            <motion.line
              x1="50%"
              y1="20%"
              x2="30%"
              y2="50%"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <motion.line
              x1="50%"
              y1="20%"
              x2="70%"
              y2="50%"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <motion.line
              x1="30%"
              y1="50%"
              x2="50%"
              y2="80%"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <motion.line
              x1="70%"
              y1="50%"
              x2="50%"
              y2="80%"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
          </svg>

          <motion.div
            className="absolute top-[20%] left-[50%] w-12 h-12 -ml-6 -mt-6 rounded-full bg-primary flex items-center justify-center text-white font-bold"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            10
          </motion.div>

          <motion.div
            className="absolute top-[50%] left-[30%] w-10 h-10 -ml-5 -mt-5 rounded-full bg-primary/80 flex items-center justify-center text-white font-bold"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, delay: 0.5, repeat: Number.POSITIVE_INFINITY }}
          >
            7
          </motion.div>

          <motion.div
            className="absolute top-[50%] left-[70%] w-10 h-10 -ml-5 -mt-5 rounded-full bg-primary/80 flex items-center justify-center text-white font-bold"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, delay: 1, repeat: Number.POSITIVE_INFINITY }}
          >
            8
          </motion.div>

          <motion.div
            className="absolute top-[80%] left-[50%] w-10 h-10 -ml-5 -mt-5 rounded-full bg-primary/60 flex items-center justify-center text-white font-bold"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, delay: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            5
          </motion.div>
        </div>
      )

    case 3: // Incubation
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="absolute w-40 h-40 rounded-full border-4 border-primary/30"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-primary flex items-center justify-center"
              style={{
                left: `calc(50% + ${Math.cos((i * (Math.PI * 2)) / 5) * 60}px)`,
                top: `calc(50% + ${Math.sin((i * (Math.PI * 2)) / 5) * 60}px)`,
              }}
              animate={{
                x: [0, Math.random() * 10 - 5],
                y: [0, Math.random() * 10 - 5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.2,
              }}
            >
              {String.fromCharCode(65 + i)}
            </motion.div>
          ))}

          <motion.div
            className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Team
          </motion.div>
        </div>
      )

    default:
      return null
  }
}
