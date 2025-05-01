"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"

// Emotion modes
export const emotionModes = {
  zen: {
    name: "Zen Mode",
    description: "Calm, focus-oriented UI",
    icon: "💡",
    primaryColor: "hsl(262.1, 83.3%, 57.8%)", // Default primary
    secondaryColor: "hsl(240, 4.8%, 95.9%)", // Default secondary
    animationSpeed: "slow",
    fontWeight: "normal",
    cardOpacity: "1",
    spacing: "relaxed",
  },
  hustle: {
    name: "Hustle Mode",
    description: "Energy-packed learning boosts",
    icon: "⚡",
    primaryColor: "hsl(25, 95%, 53%)", // Orange
    secondaryColor: "hsl(47, 100%, 68%)", // Yellow
    animationSpeed: "fast",
    fontWeight: "bold",
    cardOpacity: "1",
    spacing: "compact",
  },
  creative: {
    name: "Creative Flow Mode",
    description: "Colorful, idea-focused layout",
    icon: "🎨",
    primaryColor: "hsl(280, 87%, 65%)", // Purple
    secondaryColor: "hsl(196, 94%, 67%)", // Blue
    animationSpeed: "medium",
    fontWeight: "normal",
    cardOpacity: "0.95",
    spacing: "standard",
  },
}

type EmotionMode = keyof typeof emotionModes

interface EmotionContextType {
  currentMode: EmotionMode
  setMode: (mode: EmotionMode) => void
  modes: typeof emotionModes
  autoDetectMode: boolean
  setAutoDetectMode: (auto: boolean) => void
  getEmotionFromInput: (text: string) => string
  analyzeEmotionalState: (data: any) => any
}

const EmotionContext = createContext<EmotionContextType | undefined>(undefined)

export function EmotionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [currentMode, setCurrentMode] = useState<EmotionMode>("zen")
  const [autoDetectMode, setAutoDetectMode] = useState(false)

  // Load emotion mode preference from localStorage
  useEffect(() => {
    const storedMode = localStorage.getItem("ignite-emotion-mode") as EmotionMode
    if (storedMode && emotionModes[storedMode]) {
      setCurrentMode(storedMode)
    }

    const autoDetect = localStorage.getItem("ignite-auto-detect-emotion")
    if (autoDetect) {
      setAutoDetectMode(autoDetect === "true")
    }
  }, [])

  // Auto-detect mode based on user mood if enabled
  useEffect(() => {
    if (autoDetectMode && user?.mood) {
      switch (user.mood) {
        case "happy":
        case "energetic":
          setCurrentMode("hustle")
          break
        case "sad":
        case "tired":
          setCurrentMode("zen")
          break
        case "focused":
          setCurrentMode("creative")
          break
        default:
          // Keep current mode
          break
      }
    }
  }, [autoDetectMode, user?.mood])

  // Set mode and save to localStorage
  const setMode = (mode: EmotionMode) => {
    if (emotionModes[mode]) {
      setCurrentMode(mode)
      localStorage.setItem("ignite-emotion-mode", mode)

      // Update CSS variables
      document.documentElement.style.setProperty("--primary", emotionModes[mode].primaryColor)
      document.documentElement.style.setProperty("--secondary", emotionModes[mode].secondaryColor)

      // Apply animation speed class to body
      document.body.dataset.animationSpeed = emotionModes[mode].animationSpeed
      document.body.dataset.spacing = emotionModes[mode].spacing
    }
  }

  const handleSetAutoDetectMode = (auto: boolean) => {
    setAutoDetectMode(auto)
    localStorage.setItem("ignite-auto-detect-emotion", auto.toString())
  }

  // Simulated AI emotion detection (demo only)
  const getEmotionFromInput = (text: string) => {
    // Simple keyword-based emotion detection for demo purposes
    const lowerText = text.toLowerCase()

    if (lowerText.includes("happy") || lowerText.includes("excited") || lowerText.includes("great")) {
      return "joyful"
    } else if (lowerText.includes("sad") || lowerText.includes("upset") || lowerText.includes("disappointed")) {
      return "sad"
    } else if (lowerText.includes("tired") || lowerText.includes("exhausted") || lowerText.includes("overwhelmed")) {
      return "burnt out"
    } else if (lowerText.includes("focused") || lowerText.includes("determined")) {
      return "focused"
    } else if (lowerText.includes("creative") || lowerText.includes("inspired")) {
      return "creative"
    }

    // Default response
    return "neutral"
  }

  // Simulated AI emotional state analysis (demo only)
  const analyzeEmotionalState = (data: any) => {
    // This would be a real ML model in production
    // For demo, we'll return pre-defined responses based on simple patterns

    const journalEntries = data.journalEntries || []
    const recentMoods = data.recentMoods || []
    const activityLevel = data.activityLevel || "medium"

    // Demo analysis
    const analysis = {
      dominantEmotion: "balanced",
      emotionalTrend: "stable",
      suggestedActivities: [],
      insightMessage: "",
      emotionalGrowthScore: 75,
    }

    // Simple logic for demo
    if (recentMoods.includes("sad") || recentMoods.includes("tired")) {
      analysis.dominantEmotion = "low energy"
      analysis.emotionalTrend = "declining"
      analysis.suggestedActivities = ["Mindfulness break", "Creative expression", "Connect with peers"]
      analysis.insightMessage =
        "You seem to be experiencing some emotional fatigue. Consider taking a short break or trying a creative activity."
      analysis.emotionalGrowthScore = 65
    } else if (recentMoods.includes("happy") || recentMoods.includes("energetic")) {
      analysis.dominantEmotion = "high energy"
      analysis.emotionalTrend = "improving"
      analysis.suggestedActivities = ["Team leadership", "Challenging project", "Mentor others"]
      analysis.insightMessage =
        "Your positive energy is at a peak! This is a great time to take on leadership opportunities or help others."
      analysis.emotionalGrowthScore = 85
    }

    return analysis
  }

  return (
    <EmotionContext.Provider
      value={{
        currentMode,
        setMode,
        modes: emotionModes,
        autoDetectMode,
        setAutoDetectMode: handleSetAutoDetectMode,
        getEmotionFromInput,
        analyzeEmotionalState,
      }}
    >
      {children}
    </EmotionContext.Provider>
  )
}

export const useEmotion = () => {
  const context = useContext(EmotionContext)
  if (context === undefined) {
    throw new Error("useEmotion must be used within an EmotionProvider")
  }
  return context
}
