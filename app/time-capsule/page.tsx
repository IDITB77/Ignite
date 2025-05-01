"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Gift, Hourglass, Sparkles } from "lucide-react"
import { format, addDays, addMonths } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

// Demo time capsules
const demoTimeCapsules = [
  {
    id: "tc1",
    message:
      "Dear Future Me, I hope you've mastered React hooks by now! I'm currently struggling with useEffect, but I'm determined to understand it fully. Remember how excited you were when you first created a component that actually worked?",
    createdAt: "2025-03-15",
    openAt: "2025-05-15",
    opened: true,
  },
  {
    id: "tc2",
    message:
      "I just joined the HealthTech project team. I'm nervous but excited! I hope by the time you read this, we've built something meaningful that helps people. Stay true to your values and keep learning!",
    createdAt: "2025-04-01",
    openAt: "2025-07-01",
    opened: false,
  },
  {
    id: "tc3",
    message:
      "Today I had my first mentoring session with Priya. She gave me great advice about balancing technical skills with emotional intelligence. I want to be a leader like her someday. Future me, have you taken on any leadership roles yet?",
    createdAt: "2025-04-20",
    openAt: "2025-10-20",
    opened: false,
  },
]

export default function TimeCapsulePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [message, setMessage] = useState("")
  const [unlockTime, setUnlockTime] = useState("30days")
  const [activeTab, setActiveTab] = useState("create")
  const [openingCapsule, setOpeningCapsule] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [timeCapsules, setTimeCapsules] = useState(demoTimeCapsules)

  const handleCreateCapsule = () => {
    if (!message.trim()) return

    // Calculate unlock date based on selection
    let openAt = new Date()
    switch (unlockTime) {
      case "7days":
        openAt = addDays(openAt, 7)
        break
      case "30days":
        openAt = addDays(openAt, 30)
        break
      case "3months":
        openAt = addMonths(openAt, 3)
        break
      case "6months":
        openAt = addMonths(openAt, 6)
        break
      default:
        openAt = addDays(openAt, 30)
    }

    // Create new time capsule
    const newCapsule = {
      id: `tc${Date.now()}`,
      message,
      createdAt: format(new Date(), "yyyy-MM-dd"),
      openAt: format(openAt, "yyyy-MM-dd"),
      opened: false,
    }

    // Add to time capsules
    setTimeCapsules([newCapsule, ...timeCapsules])

    // Show toast
    toast({
      title: "Time Capsule Created!",
      description: `Your message will be available on ${format(openAt, "MMMM d, yyyy")}`,
    })

    // Reset form
    setMessage("")

    // Switch to view tab
    setActiveTab("view")
  }

  const handleOpenCapsule = (id: string) => {
    setOpeningCapsule(id)

    // Simulate opening animation
    setTimeout(() => {
      // Mark capsule as opened
      setTimeCapsules(timeCapsules.map((capsule) => (capsule.id === id ? { ...capsule, opened: true } : capsule)))

      setShowConfetti(true)

      // Hide confetti after a few seconds
      setTimeout(() => {
        setShowConfetti(false)
        setOpeningCapsule(null)
      }, 5000)
    }, 2000)
  }

  // For demo purposes, we'll allow opening any capsule
  const canOpenForDemo = true

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Time Capsule</CardTitle>
              <CardDescription>Please log in to use the time capsule feature</CardDescription>
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

      {/* Confetti effect when opening a capsule */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              initial={{
                top: "50%",
                left: "50%",
                scale: 0,
              }}
              animate={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                scale: [0, 1, 0],
                backgroundColor: ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                ease: "easeOut",
                delay: Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      )}

      <div className="flex-1 pt-16 pb-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Time Capsule & Future Self Messages</h1>
              <p className="text-muted-foreground">
                Send messages to your future self and reflect on your growth journey
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="create">Create Capsule</TabsTrigger>
                  <TabsTrigger value="view">View Capsules</TabsTrigger>
                </TabsList>

                <TabsContent value="create">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Gift className="mr-2 h-5 w-5 text-primary" />
                        Message to Future You
                      </CardTitle>
                      <CardDescription>
                        Write a message that your future self will read. What do you hope to achieve? What do you want
                        to remember?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="message">Your message:</Label>
                        <Textarea
                          id="message"
                          placeholder="Dear Future Me..."
                          className="min-h-[200px] mt-2"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="unlock-time">When should it be opened?</Label>
                        <Select value={unlockTime} onValueChange={setUnlockTime}>
                          <SelectTrigger id="unlock-time" className="mt-2">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7days">In 1 week</SelectItem>
                            <SelectItem value="30days">In 30 days</SelectItem>
                            <SelectItem value="3months">In 3 months</SelectItem>
                            <SelectItem value="6months">In 6 months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setMessage("")}>
                        Clear
                      </Button>
                      <Button onClick={handleCreateCapsule} disabled={!message.trim()}>
                        <Gift className="mr-2 h-4 w-4" />
                        Create Time Capsule
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="view">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Hourglass className="mr-2 h-5 w-5 text-primary" />
                        Your Time Capsules
                      </CardTitle>
                      <CardDescription>Messages from your past self to your future self</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <AnimatePresence>
                          {timeCapsules.length > 0 ? (
                            timeCapsules.map((capsule) => (
                              <motion.div
                                key={capsule.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`border rounded-lg p-4 ${
                                  capsule.opened ? "bg-muted/30" : ""
                                } ${openingCapsule === capsule.id ? "border-primary" : ""}`}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center">
                                    <Badge variant="outline" className="mr-2">
                                      Created: {capsule.createdAt}
                                    </Badge>
                                    <Badge variant={capsule.opened ? "secondary" : "default"}>
                                      {capsule.opened ? "Opened" : `Opens: ${capsule.openAt}`}
                                    </Badge>
                                  </div>
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                </div>

                                {capsule.opened ? (
                                  <div className="mt-4">
                                    <div className="bg-card p-4 rounded-md border mb-4">
                                      <p className="italic">{capsule.message}</p>
                                    </div>
                                    <div className="bg-primary/5 p-3 rounded-md">
                                      <h4 className="font-medium mb-1">Reflection Prompt</h4>
                                      <p className="text-sm text-muted-foreground">
                                        Looking back at this message, what has changed? What has stayed the same? How
                                        have you grown?
                                      </p>
                                      <Textarea placeholder="Write your reflection here..." className="mt-3" />
                                      <Button size="sm" className="mt-3">
                                        Save Reflection
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="mt-4 text-center">
                                    <div className="bg-muted p-8 rounded-md flex flex-col items-center justify-center">
                                      <Gift className="h-12 w-12 text-muted-foreground mb-2" />
                                      <h3 className="text-lg font-medium">Time Capsule Sealed</h3>
                                      <p className="text-sm text-muted-foreground mb-4">
                                        This message will be available on {capsule.openAt}
                                      </p>
                                      {openingCapsule === capsule.id ? (
                                        <div className="flex items-center">
                                          <Sparkles className="h-5 w-5 text-primary animate-pulse mr-2" />
                                          <span>Opening capsule...</span>
                                        </div>
                                      ) : (
                                        <Button
                                          variant="outline"
                                          onClick={() => handleOpenCapsule(capsule.id)}
                                          disabled={!canOpenForDemo}
                                        >
                                          Open Now (Demo)
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            ))
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">No time capsules yet. Create your first one!</p>
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
                    <Sparkles className="mr-2 h-5 w-5 text-primary" />
                    About Time Capsules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <h4 className="font-medium mb-1">Build Self-Awareness</h4>
                      <p className="text-sm text-muted-foreground">
                        Time capsules help you track your growth journey and reflect on how your perspectives change
                        over time.
                      </p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <h4 className="font-medium mb-1">Set Intentions</h4>
                      <p className="text-sm text-muted-foreground">
                        Writing to your future self helps clarify your goals and aspirations, making them more concrete.
                      </p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <h4 className="font-medium mb-1">Celebrate Progress</h4>
                      <p className="text-sm text-muted-foreground">
                        When you open a time capsule, you can see how far you've come and celebrate your achievements.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="mr-2 h-5 w-5 text-primary" />
                    Suggested Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      What are you learning right now?
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      What challenges are you facing?
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      What are your current goals?
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      What makes you happy these days?
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      What advice would you give to your future self?
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
