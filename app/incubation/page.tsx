"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageSquare, Sparkles, ThumbsUp, Users, Zap } from "lucide-react"

// Mock team members
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Frontend Developer",
    status: "online",
  },
  {
    id: 2,
    name: "Sam Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "UI/UX Designer",
    status: "online",
  },
  {
    id: 3,
    name: "Jordan Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Backend Developer",
    status: "away",
  },
  {
    id: 4,
    name: "Casey Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Project Manager",
    status: "offline",
  },
  {
    id: 5,
    name: "Riley Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Data Scientist",
    status: "online",
  },
]

// Mock pitches
const pitches = [
  {
    id: 1,
    user: teamMembers[0],
    title: "Eco-Tracker Mobile App",
    description: "An app that helps users track and reduce their carbon footprint",
    duration: "2:30",
    reactions: {
      thumbsUp: 4,
      heart: 2,
      sparkle: 3,
    },
  },
  {
    id: 2,
    user: teamMembers[1],
    title: "Community Resource Sharing Platform",
    description: "A platform for local communities to share resources and skills",
    duration: "3:15",
    reactions: {
      thumbsUp: 3,
      heart: 5,
      sparkle: 2,
    },
  },
]

// Mock AI feedback
const aiFeedback = [
  {
    id: 1,
    title: "UI Improvement",
    description: "Consider using a more accessible color contrast for your buttons",
    type: "suggestion",
  },
  {
    id: 2,
    title: "Code Refactoring",
    description: "Your authentication logic could be simplified by using a custom hook",
    type: "refactor",
  },
  {
    id: 3,
    title: "Performance Boost",
    description: "Implement memoization to prevent unnecessary re-renders",
    type: "optimization",
  },
]

// Mock chat messages
const initialMessages = [
  {
    id: 1,
    user: teamMembers[0],
    message: "Hey team, what do you think about the new design?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    user: teamMembers[1],
    message: "I love it! The color scheme is perfect for our target audience.",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    user: teamMembers[2],
    message: "The backend API is ready to integrate with the new UI components.",
    timestamp: "10:35 AM",
  },
]

export default function IncubationRoom() {
  const [activeTab, setActiveTab] = useState("room")
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [reactions, setReactions] = useState({
    1: { thumbsUp: 4, heart: 2, sparkle: 3 },
    2: { thumbsUp: 3, heart: 5, sparkle: 2 },
  })

  const handleReaction = (pitchId, type) => {
    setReactions((prev) => ({
      ...prev,
      [pitchId]: {
        ...prev[pitchId],
        [type]: prev[pitchId][type] + 1,
      },
    }))
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg = {
      id: messages.length + 1,
      user: teamMembers[0], // Current user
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Live Incubation Room</h1>

      <Tabs defaultValue="room" onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="room">Team Room</TabsTrigger>
          <TabsTrigger value="pitches">Pitch Space</TabsTrigger>
          <TabsTrigger value="ai">AI Coach</TabsTrigger>
        </TabsList>

        <TabsContent value="room" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Team Members */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Team Members
                </CardTitle>
                <CardDescription>Your incubation teammates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: member.id * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                            member.status === "online"
                              ? "bg-green-500"
                              : member.status === "away"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                  Team Chat
                </CardTitle>
                <CardDescription>Collaborate with your team in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col h-[400px]">
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    <AnimatePresence>
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${msg.user.id === 1 ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`flex max-w-[80%] ${msg.user.id === 1 ? "flex-row-reverse" : "flex-row"}`}>
                            <Avatar className={`h-8 w-8 ${msg.user.id === 1 ? "ml-2" : "mr-2"}`}>
                              <AvatarImage src={msg.user.avatar || "/placeholder.svg"} alt={msg.user.name} />
                              <AvatarFallback>{msg.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div
                                className={`rounded-lg px-3 py-2 ${
                                  msg.user.id === 1 ? "bg-primary text-primary-foreground" : "bg-muted"
                                }`}
                              >
                                <p className="text-sm">{msg.message}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {msg.user.name} • {msg.timestamp}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                    <Button type="submit">Send</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pitches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-primary" />
                Project Pitches
              </CardTitle>
              <CardDescription>Share and get feedback on your ideas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {pitches.map((pitch) => (
                  <motion.div
                    key={pitch.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: pitch.id * 0.1 }}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex items-start">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={pitch.user.avatar || "/placeholder.svg"} alt={pitch.user.name} />
                        <AvatarFallback>{pitch.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{pitch.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {pitch.user.name} • {pitch.user.role}
                            </p>
                          </div>
                          <Badge variant="outline">{pitch.duration}</Badge>
                        </div>
                        <p className="mt-2 text-sm">{pitch.description}</p>

                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 flex items-center gap-1"
                              onClick={() => handleReaction(pitch.id, "thumbsUp")}
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span>{reactions[pitch.id].thumbsUp}</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 flex items-center gap-1"
                              onClick={() => handleReaction(pitch.id, "heart")}
                            >
                              <Heart className="h-4 w-4 text-pink-500" />
                              <span>{reactions[pitch.id].heart}</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 flex items-center gap-1"
                              onClick={() => handleReaction(pitch.id, "sparkle")}
                            >
                              <Sparkles className="h-4 w-4 text-yellow-500" />
                              <span>{reactions[pitch.id].sparkle}</span>
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm">
                            Give Feedback
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="flex justify-center mt-6">
                  <Button className="gap-2">
                    <Zap className="h-4 w-4" />
                    Share Your Pitch
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-primary" />
                AI Peer Coach
              </CardTitle>
              <CardDescription>Get gentle refactor advice and suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiFeedback.map((feedback, index) => (
                  <motion.div
                    key={feedback.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start p-4 rounded-lg border"
                  >
                    <div
                      className={`mr-3 p-2 rounded-full ${
                        feedback.type === "suggestion"
                          ? "bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300"
                          : feedback.type === "refactor"
                            ? "bg-purple-100 text-purple-500 dark:bg-purple-900 dark:text-purple-300"
                            : "bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-300"
                      }`}
                    >
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{feedback.title}</h4>
                      <p className="text-sm text-muted-foreground">{feedback.description}</p>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {feedback.type}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="mt-6 p-4 rounded-lg border border-dashed">
                  <div className="text-center space-y-2">
                    <h4 className="font-medium">Upload Your Code for Review</h4>
                    <p className="text-sm text-muted-foreground">Get personalized AI feedback on your code</p>
                    <Button variant="outline" className="mt-2">
                      Upload Code
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
