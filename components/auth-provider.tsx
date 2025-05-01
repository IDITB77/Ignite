"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Demo user data with enhanced profiles
const demoUsers = [
  {
    id: "1",
    email: "demo@ignite.edu",
    password: "demo123",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "New Delhi, India",
    level: 12,
    xp: 2400,
    emotionalXp: 1200,
    nextLevelXp: 3000,
    mood: "happy", // happy, sad, tired, energetic, focused
    mbti: "ENFP",
    timezone: "IST",
    workingVibe: "Night Owl",
    languages: ["English", "Hindi"],
    role: "Builder",
    skills: {
      technical: {
        React: 7,
        JavaScript: 8,
        "HTML/CSS": 9,
        "Node.js": 5,
        "UI/UX": 6,
      },
      emotional: {
        Empathy: 8,
        Leadership: 6,
        Communication: 7,
        Resilience: 5,
        Teamwork: 8,
      },
    },
    badges: ["Frontend Wizard", "Team Player", "Creative Thinker"],
    missions: ["Eco Tracker", "Mental Health App", "Community Marketplace"],
    journal: [
      {
        date: "2025-04-28",
        content: "Feeling excited about my new React project! The team is great.",
        mood: "happy",
        aiInsight: "Your enthusiasm is contagious! Consider channeling this energy into mentoring others.",
      },
      {
        date: "2025-04-29",
        content: "Struggled with API integration today. Feeling a bit frustrated.",
        mood: "sad",
        aiInsight: "It's normal to face challenges. Consider taking a short break or asking for help in the community.",
      },
    ],
    timeCapsules: [
      {
        id: "tc1",
        message: "I hope by now you've completed the React certification you were worried about!",
        createdAt: "2025-03-15",
        openAt: "2025-05-15",
        opened: false,
      },
      {
        id: "tc2",
        message: "Remember how nervous you were about your first team leadership role? Look how far you've come!",
        createdAt: "2025-01-10",
        openAt: "2025-04-10",
        opened: true,
      },
    ],
    careerSimulations: [
      {
        role: "Frontend Developer",
        completedAt: "2025-04-15",
        enjoymentScore: 9,
        insights: "You showed strong problem-solving skills and attention to detail.",
      },
      {
        role: "UX Designer",
        completedAt: "2025-03-22",
        enjoymentScore: 7,
        insights: "You demonstrated creativity but found user research challenging.",
      },
    ],
    karmaPoints: 450,
    helpedOthers: 12,
    receivedHelp: 8,
    magicBoxHistory: [
      {
        date: "2025-04-29",
        surprise: "Mindfulness Challenge",
        completed: true,
      },
      {
        date: "2025-04-27",
        surprise: "Random Teammate Connection",
        completed: false,
      },
    ],
    aiCoachInsights: [
      "You tend to thrive in collaborative environments.",
      "Consider developing your backend skills to complement your frontend expertise.",
      "Your communication skills are a significant strength in team settings.",
    ],
  },
  {
    id: "2",
    email: "student@ignite.edu",
    password: "student123",
    name: "Riya Patel",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "Mumbai, India",
    level: 8,
    xp: 1600,
    emotionalXp: 1800,
    nextLevelXp: 2000,
    mood: "energetic",
    mbti: "INTJ",
    timezone: "IST",
    workingVibe: "Fast Builder",
    languages: ["English", "Hindi", "Gujarati"],
    role: "Visionary",
    skills: {
      technical: {
        "UI Design": 9,
        Figma: 8,
        "HTML/CSS": 7,
        JavaScript: 5,
        React: 4,
      },
      emotional: {
        Creativity: 9,
        Empathy: 7,
        Leadership: 8,
        Communication: 6,
        "Problem Solving": 7,
      },
    },
    badges: ["Design Guru", "Visionary Thinker", "Empathy Master"],
    missions: ["HealthTech App", "Education Platform", "Accessibility Tool"],
    journal: [
      {
        date: "2025-04-28",
        content: "Designed a new UI for the health app today. The team loved it!",
        mood: "happy",
        aiInsight: "Your design skills are impressive! Consider documenting your process to help others learn.",
      },
      {
        date: "2025-04-29",
        content: "Feeling overwhelmed with all the project deadlines.",
        mood: "tired",
        aiInsight: "It might be time to practice prioritization. Try breaking down your tasks into smaller chunks.",
      },
    ],
    timeCapsules: [
      {
        id: "tc1",
        message: "I hope you've overcome your fear of public speaking by now!",
        createdAt: "2025-02-20",
        openAt: "2025-05-20",
        opened: false,
      },
    ],
    careerSimulations: [
      {
        role: "UX Designer",
        completedAt: "2025-04-10",
        enjoymentScore: 10,
        insights: "You excel at understanding user needs and creating intuitive interfaces.",
      },
      {
        role: "Product Manager",
        completedAt: "2025-03-15",
        enjoymentScore: 8,
        insights: "You showed strong leadership but could improve on technical communication.",
      },
    ],
    karmaPoints: 320,
    helpedOthers: 8,
    receivedHelp: 5,
    magicBoxHistory: [
      {
        date: "2025-04-28",
        surprise: "Design Challenge",
        completed: true,
      },
    ],
    aiCoachInsights: [
      "Your visual thinking is exceptional - consider teaching others.",
      "Developing technical skills would complement your design expertise.",
      "You have natural leadership qualities that could be further developed.",
    ],
  },
]

export type User = (typeof demoUsers)[0]

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  updateUserMood: (mood: string) => void
  updateUserJournal: (entry: any) => void
  addTimeCapsule: (capsule: any) => void
  openTimeCapsule: (id: string) => void
  addCareerSimulation: (simulation: any) => void
  updateKarmaPoints: (points: number) => void
  addMagicBoxSurprise: (surprise: any) => void
  completeMagicBoxSurprise: (date: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("ignite-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const foundUser = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("ignite-user", JSON.stringify(foundUser))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ignite-user")
  }

  const updateUserMood = (mood: string) => {
    if (user) {
      const updatedUser = { ...user, mood }
      setUser(updatedUser)
      localStorage.setItem("ignite-user", JSON.stringify(updatedUser))
    }
  }

  const updateUserJournal = (entry: any) => {
    if (user) {
      const updatedUser = {
        ...user,
        journal: [entry, ...(user.journal || [])],
      }
      setUser(updatedUser)
      localStorage.setItem("ignite-user", JSON.stringify(updatedUser))
    }
  }

  const addTimeCapsule = (capsule: any) => {
    if (user) {
      const updatedUser = {
        ...user,
        timeCapsules: [...(user.timeCapsules || []), capsule],
      }
      setUser(updatedUser)
      localStorage.setItem("ignite-user", JSON.stringify(updatedUser))
    }
  }

  const openTimeCapsule = (id: string) => {
    if (user && user.timeCapsules) {
      const updatedTimeCapsules = user.timeCapsules.map((capsule) =>
        capsule.id === id ? { ...capsule, opened: true } : capsule,
      )
      const updatedUser = {
        ...user,
        timeCapsules: updatedTimeCapsules,
      }
      setUser(updatedUser)
      localStorage.setItem("ignite-user", JSON.stringify(updatedUser))
    }
  }

  const addCareerSimulation = (simulation: any) => {
    if (user) {
      const updatedUser = {
        ...user,
        careerSimulations: [...(user.careerSimulations || []), simulation],
      }
      setUser(updatedUser)
      localStorage.setItem("ignite-user", JSON.stringify(updatedUser))
    }
  }

  const updateKarmaPoints = (points: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        karmaPoints: (user.karmaPoints || 0) + points,
        helpedOthers: points > 0 ? (user.helpedOthers || 0) + 1 : user.helpedOthers,
        receivedHelp: points < 0 ? (user.receivedHelp || 0) + 1 : user.receivedHelp,
      }
      setUser(updatedUser)
      localStorage.setItem("ignite-user", JSON.stringify(updatedUser))
    }
  }

  const addMagicBoxSurprise = (surprise: any) => {
    if (user) {
      const updatedUser = {
        ...user,
        magicBoxHistory: [...(user.magicBoxHistory || []), surprise],
      }
      setUser(updatedUser)
      localStorage.setItem("ignite-user", JSON.stringify(updatedUser))
    }
  }

  const completeMagicBoxSurprise = (date: string) => {
    if (user && user.magicBoxHistory) {
      const updatedHistory = user.magicBoxHistory.map((item) =>
        item.date === date ? { ...item, completed: true } : item,
      )
      const updatedUser = {
        ...user,
        magicBoxHistory: updatedHistory,
      }
      setUser(updatedUser)
      localStorage.setItem("ignite-user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        updateUserMood,
        updateUserJournal,
        addTimeCapsule,
        openTimeCapsule,
        addCareerSimulation,
        updateKarmaPoints,
        addMagicBoxSurprise,
        completeMagicBoxSurprise,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
