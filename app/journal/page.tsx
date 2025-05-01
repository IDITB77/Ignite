"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { useEmotion } from "@/components/emotion-provider"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Book, Brain, Calendar, Clock, Sparkles } from "lucide-react"

// Emotion emojis for the selector
const emotionEmojis = [
  { emoji: "😐", mood: "neutral", label: "Neutral" },
  { emoji: "😊", mood: "happy", label: "Happy" },
  { emoji: "😩", mood: "tired", label: "Tired" },
  { emoji: "🤩", mood: "energetic", label: "Energetic" },
  { emoji: "🧠", mood: "focused", label: "Focused" },
]

export default function JournalPage() {
  const { user, updateUserJournal, updateUserMood } = useAuth()
  const { getEmotionFromInput, analyzeEmotionalState } = useEmotion()
  const [journalEntry, setJournalEntry] = useState("")
  const [selectedMood, setSelectedMood] = useState("neutral")
  const [aiAnalysis, setAiAnalysis] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [emotionData, setEmotionData] = useState([])
  const [activeTab, setActiveTab] = useState("write")

  useEffect(() => {
    if (user?.journal) {
      // Generate emotion data for the chart
      const data = generateEmotionData(user.journal)
      setEmotionData(data)
    }
  }, [user?.journal])

  // Generate mock emotion data for the chart
  const generateEmotionData = (journal) => {
    const moodValues = {
      happy: 80,
      energetic: 90,
      neutral: 50,
      tired: 30,
      sad: 20,
      focused: 70,
    }

    // Start with some base data points
    const baseData = [
      { date: "Apr 24", confidence: 65, wellbeing: 70 },
      { date: "Apr 25", confidence: 60, wellbeing: 65 },
      { date: "Apr 26", confidence: 70, wellbeing: 60 },
      { date: "Apr 27", confidence: 75, wellbeing: 75 },
    ]

    // Add data points from journal entries
    const journalData = journal.map((entry, index) => {
      const moodValue = moodValues[entry.mood] || 50
      const confidenceVariation = Math.random() * 10 - 5 // Random variation between -5 and 5
      const wellbeingVariation = Math.random() * 10 - 5

      return {
        date: entry.date.slice(5), // Format as "MM-DD"
        confidence: Math.min(100, Math.max(0, moodValue + confidenceVariation)),
        wellbeing: Math.min(100, Math.max(0, moodValue + wellbeingVariation)),
      }
    })

    // Combine and sort by date
    return [...baseData, ...journalData].slice(-14) // Last 14 days
  }

  const handleJournalSubmit = () => {
    if (!journalEntry.trim()) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const detectedEmotion = getEmotionFromInput(journalEntry)

      let aiInsight = ""
      switch (detectedEmotion) {
        case "joyful":
          aiInsight =
            "Your positive energy is contagious! This is a great time to take on leadership opportunities or mentor others."
          break
        case "sad":
          aiInsight =
            "It's okay to have challenging days. Consider taking a short wellness break or connecting with supportive peers."
          break
        case "burnt out":
          aiInsight =
            "I notice signs of burnout. Consider a wellness mission and breaking your tasks into smaller, manageable chunks."
          break
        case "focused":
          aiInsight = "You're in a great flow state! This is an ideal time for deep work on complex problems."
          break
        case "creative":
          aiInsight = "Your creative energy is high! Consider brainstorming new ideas or working on design challenges."
          break
        default:
          aiInsight =
            "Reflecting regularly helps build self-awareness. Consider setting specific goals for tomorrow based on today's experiences."
      }

      setAiAnalysis(aiInsight)

      // Create new journal entry
      const newEntry = {
        date: new Date().toISOString().split("T")[0],
        content: journalEntry,
        mood: selectedMood,
        aiInsight,
      }

      // Update user's journal
      updateUserJournal(newEntry)

      // Update user's current mood
      updateUserMood(selectedMood)

      // Reset form
      setJournalEntry("")
      setIsAnalyzing(false)

      // Switch to history tab to show the new entry
      setActiveTab("history")
    }, 1500)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Journal Assistant</CardTitle>
              <CardDescription>Please log in to use the journal feature</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <a href="/login">Log In</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-16 pb-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Emotion+AI Journal Assistant</h1>
              <p className="text-muted-foreground">Reflect on your journey with AI-powered insights</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="write">Write Journal</TabsTrigger>
                  <TabsTrigger value="history">Journal History</TabsTrigger>
                </TabsList>

                <TabsContent value="write">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Book className="mr-2 h-5 w-5 text-primary" />
                        Today's Reflection
                      </CardTitle>
                      <CardDescription>
                        How are you feeling today? Your AI assistant will provide personalized insights.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Select your mood:</label>
                        <div className="flex flex-wrap gap-3">
                          {emotionEmojis.map((item) => (
                            <Button
                              key={item.mood}
                              variant={selectedMood === item.mood ? "default" : "outline"}
                              className="h-12 w-12 rounded-full p-0 text-2xl"
                              onClick={() => setSelectedMood(item.mood)}
                            >
                              {item.emoji}
                              <span className="sr-only">{item.label}</span>
                            </Button>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Current mood: {emotionEmojis.find((e) => e.mood === selectedMood)?.label}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Write your journal entry:</label>
                        <Textarea
                          placeholder="How was your day? What did you learn? What challenges did you face?"
                          className="min-h-[200px]"
                          value={journalEntry}
                          onChange={(e) => setJournalEntry(e.target.value)}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setJournalEntry("")}>
                        Clear
                      </Button>
                      <Button onClick={handleJournalSubmit} disabled={!journalEntry.trim() || isAnalyzing}>
                        {isAnalyzing ? (
                          <>
                            <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                            Analyzing...
                          </>
                        ) : (
                          "Save & Analyze"
                        )}
                      </Button>
                    </CardFooter>
                  </Card>

                  {aiAnalysis && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-6"
                    >
                      <Card className="border-primary/50">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Brain className="mr-2 h-5 w-5 text-primary" />
                            AI Assistant Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{aiAnalysis}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </TabsContent>

                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-primary" />
                        Your Journal History
                      </CardTitle>
                      <CardDescription>Review your past reflections and AI insights</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <AnimatePresence>
                          {user.journal && user.journal.length > 0 ? (
                            user.journal.map((entry, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="border rounded-lg p-4"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center">
                                    <Badge variant="outline" className="mr-2">
                                      {entry.date}
                                    </Badge>
                                    <Badge>
                                      {emotionEmojis.find((e) => e.mood === entry.mood)?.emoji || "😐"}{" "}
                                      {emotionEmojis.find((e) => e.mood === entry.mood)?.label || "Neutral"}
                                    </Badge>
                                  </div>
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="mb-4">{entry.content}</p>
                                <div className="bg-primary/5 p-3 rounded-md">
                                  <div className="flex items-start">
                                    <Avatar className="h-8 w-8 mr-2">
                                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                                      <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="text-sm font-medium">AI Assistant</p>
                                      <p className="text-sm text-muted-foreground">{entry.aiInsight}</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">No journal entries yet. Start writing today!</p>
                            </div>
                          )}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-primary" />
                    Emotion Graph
                  </CardTitle>
                  <CardDescription>Track your emotional wellbeing over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={emotionData}>
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} hide />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="confidence"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="Confidence"
                        />
                        <Line
                          type="monotone"
                          dataKey="wellbeing"
                          stroke="hsl(var(--secondary))"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="Wellbeing"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mr-2" />
                      <span className="text-sm">Confidence</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-secondary mr-2" />
                      <span className="text-sm">Wellbeing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-primary" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <h4 className="font-medium mb-1">Emotional Patterns</h4>
                      <p className="text-sm text-muted-foreground">
                        You tend to feel more energetic in the mornings. Consider scheduling creative tasks during this
                        time.
                      </p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <h4 className="font-medium mb-1">Growth Opportunity</h4>
                      <p className="text-sm text-muted-foreground">
                        Your journal entries show strong technical reflection but could benefit from more emotional
                        awareness.
                      </p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <h4 className="font-medium mb-1">Suggested Focus</h4>
                      <p className="text-sm text-muted-foreground">
                        Based on your recent entries, consider exploring team collaboration skills.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
