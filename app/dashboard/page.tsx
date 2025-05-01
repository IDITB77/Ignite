"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import Navbar from "@/components/navbar"
import { Brain, Calendar, Heart, Lightbulb, Users, Star, BookOpen, Trophy, Clock } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock AI suggestions
const aiSuggestions = [
  {
    id: 1,
    title: "Learn TypeScript",
    description: "Based on your JavaScript skills, TypeScript would be a great next step.",
    icon: <Brain className="h-5 w-5" />,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: 2,
    title: "Try a short mental wellness break",
    description: "You've been coding for 3 hours. A 10-minute mindfulness session could help refresh your mind.",
    icon: <Heart className="h-5 w-5" />,
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    id: 3,
    title: "Join a social impact micro-project",
    description: "There's a new HealthTech project that matches your skills and interests.",
    icon: <Users className="h-5 w-5" />,
    color: "bg-purple-500/10 text-purple-500",
  },
]

// Mock projects
const projects = [
  {
    id: 1,
    title: "HealthTech App",
    description: "A mobile app to help people track their medication and appointments.",
    tags: ["React Native", "Health", "Social Impact"],
    difficulty: "Medium",
    duration: "2 weeks",
    emotionalLoad: "Focused",
    emotionalIcon: "⚡",
    icon: <Lightbulb className="h-5 w-5" />,
    color: "bg-green-500/10 text-green-500",
  },
  {
    id: 2,
    title: "Eco Tracker",
    description: "A web app to help people reduce their carbon footprint.",
    tags: ["React", "Environment", "Data Viz"],
    difficulty: "Easy",
    duration: "1 week",
    emotionalLoad: "Chill",
    emotionalIcon: "🧠",
    icon: <Lightbulb className="h-5 w-5" />,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: 3,
    title: "Community Marketplace",
    description: "A platform for local communities to share resources and skills.",
    tags: ["Full Stack", "Community", "Marketplace"],
    difficulty: "Hard",
    duration: "4 weeks",
    emotionalLoad: "Intense",
    emotionalIcon: "🎯",
    icon: <Lightbulb className="h-5 w-5" />,
    color: "bg-purple-500/10 text-purple-500",
  },
]

// Mock upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Team Hackathon",
    date: "Tomorrow, 10:00 AM",
    type: "event",
  },
  {
    id: 2,
    title: "Mentor Session with Priya",
    date: "Wed, 3:00 PM",
    type: "meeting",
  },
  {
    id: 3,
    title: "Project Submission Deadline",
    date: "Fri, 11:59 PM",
    type: "deadline",
  },
]

export default function Dashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [progress, setProgress] = useState(0)
  const [emotionalProgress, setEmotionalProgress] = useState(0)
  const [showEmoji, setShowEmoji] = useState(false)

  useEffect(() => {
    // Animate progress bars
    const timer = setTimeout(() => {
      setProgress(user ? (user.xp / user.nextLevelXp) * 100 : 80)
      setEmotionalProgress(user ? (user.emotionalXp / user.nextLevelXp) * 100 : 60)
    }, 500)

    // Show emoji nudge after a delay
    const emojiTimer = setTimeout(() => {
      setShowEmoji(true)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearTimeout(emojiTimer)
    }
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
            <Link href="/login">
              <Button>Go to Login</Button>
            </Link>
          </div>
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
              <h1 className="text-3xl font-bold">Your Growth Universe</h1>
              <p className="text-muted-foreground">Welcome back, {user.name}! Here's your personalized dashboard.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                <span>April 30, 2025</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-1"
            >
              <Card className="overflow-hidden border-2 border-primary/10">
                <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 h-16" />
                <CardContent className="pt-0 -mt-8">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20 border-4 border-background">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold mt-2">{user.name}</h2>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>Level {user.level}</span>
                    </div>

                    <div className="w-full mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>XP Progress</span>
                        <span>
                          {user.xp}/{user.nextLevelXp}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="w-full mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Emotional Intelligence</span>
                        <span>
                          {user.emotionalXp}/{user.nextLevelXp}
                        </span>
                      </div>
                      <Progress value={emotionalProgress} className="h-2 bg-pink-100 dark:bg-pink-900">
                        <div className="h-full bg-pink-500" style={{ width: `${emotionalProgress}%` }} />
                      </Progress>
                    </div>

                    <div className="grid grid-cols-3 gap-2 w-full mt-6">
                      <div className="flex flex-col items-center p-2 bg-primary/5 rounded-lg">
                        <BookOpen className="h-5 w-5 text-primary mb-1" />
                        <span className="text-xs font-medium">12</span>
                        <span className="text-xs text-muted-foreground">Skills</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-primary/5 rounded-lg">
                        <Trophy className="h-5 w-5 text-amber-500 mb-1" />
                        <span className="text-xs font-medium">8</span>
                        <span className="text-xs text-muted-foreground">Badges</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-primary/5 rounded-lg">
                        <Clock className="h-5 w-5 text-blue-500 mb-1" />
                        <span className="text-xs font-medium">42h</span>
                        <span className="text-xs text-muted-foreground">Time</span>
                      </div>
                    </div>

                    <div className="w-full mt-6">
                      <Link href="/career-simulator">
                        <Button className="w-full" size="sm">
                          Career Simulator
                        </Button>
                      </Link>
                      <Link href="/time-capsule">
                        <Button variant="outline" className="w-full mt-2" size="sm">
                          Time Capsule
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-6">
              {/* AI Suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-xl font-bold mb-4">AI-Powered Suggestions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aiSuggestions.map((suggestion) => (
                    <Card key={suggestion.id} className="overflow-hidden border-2 border-primary/10">
                      <CardContent className="p-4">
                        <div
                          className={`rounded-full p-2 w-10 h-10 flex items-center justify-center mb-3 ${suggestion.color}`}
                        >
                          {suggestion.icon}
                        </div>
                        <h3 className="font-medium">{suggestion.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Projects & Events */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Tabs defaultValue="projects" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="events">Upcoming Events</TabsTrigger>
                  </TabsList>

                  <TabsContent value="projects" className="space-y-4">
                    {projects.map((project) => (
                      <Card key={project.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div
                                className={`rounded-full p-2 w-10 h-10 flex items-center justify-center mb-3 ${project.color}`}
                              >
                                {project.icon}
                              </div>
                              <h3 className="font-medium">{project.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{project.description}</p>

                              <div className="flex flex-wrap gap-2 mt-3">
                                {project.tags.map((tag, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="flex items-center gap-1 text-sm">
                                <span className="text-lg">{project.emotionalIcon}</span>
                                <span>{project.emotionalLoad}</span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {project.difficulty} • {project.duration}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end mt-4">
                            <Button size="sm">View Project</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="events" className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{event.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                            </div>

                            <Badge
                              variant={
                                event.type === "event"
                                  ? "default"
                                  : event.type === "meeting"
                                    ? "outline"
                                    : "destructive"
                              }
                            >
                              {event.type}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </motion.div>

              {/* Journal Entry Prompt */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="overflow-hidden border-2 border-primary/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Daily Reflection</h3>
                      {showEmoji && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 10 }}
                          className="text-xl"
                        >
                          ✨
                        </motion.div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      How are you feeling about your learning journey today?
                    </p>
                    <Link href="/journal">
                      <Button className="w-full">Open Journal</Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
