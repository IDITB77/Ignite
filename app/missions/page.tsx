"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"
import { analyzePuzzleResponse } from "@/components/ai-models"
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  Clock,
  Code,
  Filter,
  Heart,
  Lightbulb,
  Search,
  Shield,
  Trophy,
} from "lucide-react"

// Mock mission data
const missions = [
  {
    id: "mission1",
    title: "Build a Fraud Detection System",
    description: "Create a machine learning model to detect fraudulent transactions",
    category: "AI/ML",
    difficulty: "Advanced",
    xpReward: 500,
    duration: "2 weeks",
    skills: ["Python", "Machine Learning", "Data Analysis"],
    status: "available",
    completionRate: 22,
    mentors: [
      {
        id: "mentor1",
        name: "Dr. Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        expertise: "Machine Learning",
      },
    ],
  },
  {
    id: "mission2",
    title: "Accessibility-First Web App",
    description: "Build a web application with a focus on accessibility for all users",
    category: "Web Development",
    difficulty: "Intermediate",
    xpReward: 350,
    duration: "1 week",
    skills: ["HTML/CSS", "JavaScript", "ARIA", "Screen Reader Testing"],
    status: "available",
    completionRate: 45,
    mentors: [
      {
        id: "mentor2",
        name: "Miguel Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        expertise: "Web Accessibility",
      },
    ],
  },
  {
    id: "mission3",
    title: "Bug Hunting Challenge",
    description: "Find and fix bugs in a complex codebase to improve application stability",
    category: "Debugging",
    difficulty: "Intermediate",
    xpReward: 300,
    duration: "3 days",
    skills: ["Debugging", "Problem Solving", "Code Review"],
    status: "available",
    completionRate: 68,
    mentors: [
      {
        id: "mentor3",
        name: "Priya Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        expertise: "Software Testing",
      },
    ],
  },
  {
    id: "mission4",
    title: "Community Marketplace App",
    description: "Create a platform for local communities to share resources and skills",
    category: "Full Stack",
    difficulty: "Advanced",
    xpReward: 600,
    duration: "3 weeks",
    skills: ["React", "Node.js", "MongoDB", "API Design"],
    status: "available",
    completionRate: 15,
    mentors: [
      {
        id: "mentor4",
        name: "James Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        expertise: "Full Stack Development",
      },
    ],
  },
  {
    id: "mission5",
    title: "Emotional Intelligence Quiz",
    description: "Design and implement an interactive quiz to assess emotional intelligence",
    category: "UI/UX",
    difficulty: "Beginner",
    xpReward: 200,
    duration: "4 days",
    skills: ["UI Design", "JavaScript", "Psychology"],
    status: "available",
    completionRate: 78,
    mentors: [
      {
        id: "mentor5",
        name: "Dr. Aisha Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        expertise: "Psychology & UX",
      },
    ],
  },
  {
    id: "mission6",
    title: "Fraud Email Detector",
    description: "Build an AI model to detect phishing and fraudulent emails",
    category: "AI/ML",
    difficulty: "Advanced",
    xpReward: 450,
    duration: "10 days",
    skills: ["NLP", "Python", "Machine Learning", "Security"],
    status: "available",
    completionRate: 32,
    mentors: [
      {
        id: "mentor6",
        name: "Dr. Marcus Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        expertise: "Cybersecurity & ML",
      },
    ],
  },
]

// Mock puzzle quest data
const puzzleQuests = [
  {
    id: "puzzle1",
    title: "Team Ghosting Scenario",
    description: "Your hackathon team loses interest midway. What do you do?",
    category: "Team Dynamics",
    xpReward: 100,
    emotionalXpReward: 150,
    options: [
      "Push harder and set stricter deadlines",
      "Host a fun check-in call to rebuild motivation",
      "Take a break and talk through everyone's concerns",
    ],
    scenario: "team_ghosting",
  },
  {
    id: "puzzle2",
    title: "Feedback Handling Challenge",
    description: "You receive harsh feedback on your project presentation. How do you respond?",
    category: "Communication",
    xpReward: 120,
    emotionalXpReward: 180,
    options: [
      "Defend your work and explain why the criticism is wrong",
      "Thank them for the feedback and ask clarifying questions",
      "Silently accept the feedback but feel discouraged",
    ],
    scenario: "feedback_handling",
  },
  {
    id: "puzzle3",
    title: "Resource Conflict Resolution",
    description: "Two team members both need your help during a critical deadline. How do you handle it?",
    category: "Leadership",
    xpReward: 150,
    emotionalXpReward: 120,
    options: [
      "Help the person whose work is more critical to the project",
      "Quickly assess both needs and create a plan to help both",
      "Ask another team member to help one of them",
    ],
    scenario: "resource_conflict",
  },
]

// Mock bug hunting challenge data
const bugHuntingData = {
  id: "bug1",
  title: "Find the Bug: Authentication System",
  description: "This authentication system has a critical security vulnerability. Can you find it?",
  language: "JavaScript",
  difficulty: "Intermediate",
  xpReward: 250,
  code: `
// User authentication function
function authenticateUser(username, password) {
  // Get user from database
  const user = getUserFromDatabase(username);
  
  // Check if user exists
  if (!user) {
    return { success: false, message: "User not found" };
  }
  
  // Compare passwords
  if (password == user.password) {  // BUG: Using == instead of === for comparison
    // Generate session token
    const token = generateToken(user);
    return { success: true, token: token };
  }
  
  return { success: false, message: "Invalid password" };
}

// Password reset function
function resetPassword(email) {
  // Get user from database
  const user = getUserByEmail(email);
  
  if (!user) {
    return { success: false, message: "Email not found" };
  }
  
  // Generate temporary password
  const tempPassword = Math.random().toString(36).slice(-8);
  
  // Update user password in database
  user.password = tempPassword;  // BUG: Not hashing the password before storing
  updateUserInDatabase(user);
  
  // Send email with temporary password
  sendPasswordResetEmail(email, tempPassword);  // BUG: Sending plain text password via email
  
  return { success: true, message: "Password reset email sent" };
}
  `,
  hints: [
    "Think about secure comparison operators",
    "Consider password storage best practices",
    "Review how sensitive information is transmitted",
  ],
  solution: [
    "Use === instead of == for password comparison to avoid type coercion vulnerabilities",
    "Hash passwords before storing them in the database",
    "Never send plain text passwords via email",
  ],
}

// Mock fraud email detection data
const fraudEmailData = {
  title: "Fraud Email Detection Challenge",
  description: "Analyze these emails and identify which ones are potentially fraudulent",
  emails: [
    {
      id: "email1",
      subject: "Your Account Has Been Compromised",
      sender: "security@bankofamerica-secure.com",
      content:
        "Dear Customer, We have detected suspicious activity on your account. Please click the link below to verify your identity and secure your account immediately. Failure to do so will result in account suspension.",
      isFraudulent: true,
      flags: ["Suspicious domain", "Creates urgency", "Asks for immediate action", "Generic greeting"],
    },
    {
      id: "email2",
      subject: "Team Meeting Rescheduled",
      sender: "alex.johnson@company.com",
      content:
        "Hi everyone, Just a quick note that our weekly team meeting has been moved from 2pm to 3pm tomorrow to accommodate the client call. Please update your calendars. Thanks, Alex",
      isFraudulent: false,
      flags: [],
    },
    {
      id: "email3",
      subject: "Your Prize Winning Notification",
      sender: "claims@international-lottery.org",
      content:
        "Congratulations! Your email address has won $5,000,000 in the International Lottery. To claim your prize, please send us your full name, address, and bank details for verification purposes.",
      isFraudulent: true,
      flags: ["Unexpected prize", "Requests financial information", "Too good to be true", "Unknown sender"],
    },
    {
      id: "email4",
      subject: "Invoice #INV-2023-04-15",
      sender: "billing@adobe.com",
      content:
        "Dear Customer, Please find attached your invoice #INV-2023-04-15 for your recent Adobe Creative Cloud subscription renewal. If you have any questions about this invoice, please contact our customer support team.",
      isFraudulent: false,
      flags: [],
    },
    {
      id: "email5",
      subject: "Urgent: Action Required for Your PayPal Account",
      sender: "service@paypa1-secure.com",
      content:
        "We've noticed some unusual activity in your PayPal account. Your account has been limited until we hear from you. To restore your account access, click below to confirm your information.",
      isFraudulent: true,
      flags: ["Misspelled domain (paypa1)", "Creates urgency", "Vague about the issue", "Asks for immediate action"],
    },
  ],
}

export default function MissionsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("missions")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [activePuzzle, setActivePuzzle] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [puzzleResult, setPuzzleResult] = useState(null)
  const [showBugHunt, setShowBugHunt] = useState(false)
  const [bugSolution, setBugSolution] = useState("")
  const [showBugSolution, setShowBugSolution] = useState(false)
  const [showFraudDetection, setShowFraudDetection] = useState(false)
  const [emailAnalysis, setEmailAnalysis] = useState({})
  const [showEmailResults, setShowEmailResults] = useState(false)

  // Get all unique categories from mission data
  const allCategories = Array.from(new Set(missions.map((mission) => mission.category)))

  // Get all unique difficulties from mission data
  const allDifficulties = Array.from(new Set(missions.map((mission) => mission.difficulty)))

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const toggleDifficulty = (difficulty) => {
    if (selectedDifficulty.includes(difficulty)) {
      setSelectedDifficulty(selectedDifficulty.filter((d) => d !== difficulty))
    } else {
      setSelectedDifficulty([...selectedDifficulty, difficulty])
    }
  }

  const filteredMissions = missions.filter((mission) => {
    const matchesSearch =
      searchQuery === "" ||
      mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(mission.category)

    const matchesDifficulty = selectedDifficulty.length === 0 || selectedDifficulty.includes(mission.difficulty)

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const handleStartPuzzle = (puzzle) => {
    setActivePuzzle(puzzle)
    setSelectedOption(null)
    setPuzzleResult(null)
  }

  const handleSubmitPuzzleAnswer = () => {
    if (selectedOption === null) return

    // Get analysis from AI model
    const result = analyzePuzzleResponse(activePuzzle.scenario, selectedOption)
    setPuzzleResult(result)
  }

  const handleSubmitBugSolution = () => {
    // In a real app, this would validate the solution against expected answers
    setShowBugSolution(true)
  }

  const handleEmailAnalysis = (emailId, isFraudulent) => {
    setEmailAnalysis((prev) => ({
      ...prev,
      [emailId]: isFraudulent,
    }))
  }

  const handleSubmitEmailAnalysis = () => {
    // In a real app, this would validate the analysis against correct answers
    setShowEmailResults(true)
  }

  if (!user) {
    return (
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Missions & Challenges</CardTitle>
            <CardDescription>Please log in to access mission features</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/login">Log In</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="sm" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Missions & Challenges</h1>
        </div>
      </div>

      <Tabs defaultValue="missions" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="missions">Skill Missions</TabsTrigger>
          <TabsTrigger value="puzzles">AI Puzzle Quests</TabsTrigger>
          <TabsTrigger value="special">Special Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="missions" className="space-y-6">
          {!activePuzzle && (
            <>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search missions by title, description, or skills"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Filters:</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm font-medium mr-2">Categories:</span>
                {allCategories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm font-medium mr-2">Difficulty:</span>
                {allDifficulties.map((difficulty) => (
                  <Badge
                    key={difficulty}
                    variant={selectedDifficulty.includes(difficulty) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      difficulty === "Beginner"
                        ? "border-green-500 text-green-500"
                        : difficulty === "Intermediate"
                          ? "border-yellow-500 text-yellow-500"
                          : "border-red-500 text-red-500"
                    }`}
                    onClick={() => toggleDifficulty(difficulty)}
                  >
                    {difficulty}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMissions.map((mission) => (
                  <motion.div
                    key={mission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{mission.title}</CardTitle>
                          <Badge
                            variant="outline"
                            className={`
                              ${mission.difficulty === "Beginner" ? "border-green-500 text-green-500" : ""}
                              ${mission.difficulty === "Intermediate" ? "border-yellow-500 text-yellow-500" : ""}
                              ${mission.difficulty === "Advanced" ? "border-red-500 text-red-500" : ""}
                            `}
                          >
                            {mission.difficulty}
                          </Badge>
                        </div>
                        <CardDescription>{mission.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Trophy className="mr-2 h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{mission.xpReward} XP</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{mission.duration}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {mission.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Mentor</h4>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={mission.mentors[0].avatar || "/placeholder.svg"}
                                alt={mission.mentors[0].name}
                              />
                              <AvatarFallback>{mission.mentors[0].name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{mission.mentors[0].name}</p>
                              <p className="text-xs text-muted-foreground">{mission.mentors[0].expertise}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Completion Rate</span>
                            <span>{mission.completionRate}%</span>
                          </div>
                          <Progress value={mission.completionRate} className="h-2" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          Start Mission
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="puzzles" className="space-y-6">
          {!activePuzzle ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {puzzleQuests.map((puzzle) => (
                <motion.div
                  key={puzzle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Brain className="mr-2 h-5 w-5 text-primary" />
                        {puzzle.title}
                      </CardTitle>
                      <CardDescription>{puzzle.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{puzzle.category}</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Trophy className="mr-2 h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{puzzle.xpReward} XP</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="mr-2 h-4 w-4 text-pink-500" />
                          <span className="text-sm font-medium">{puzzle.emotionalXpReward} EQ XP</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => handleStartPuzzle(puzzle)}>
                        Start Puzzle Quest
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-primary" />
                    {activePuzzle.title}
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setActivePuzzle(null)}>
                    Back to Puzzles
                  </Button>
                </div>
                <CardDescription>{activePuzzle.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!puzzleResult ? (
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Choose your approach:</h3>
                      <div className="space-y-3">
                        {activePuzzle.options.map((option, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedOption === index ? "border-primary bg-primary/10" : "hover:border-primary/50"
                            }`}
                            onClick={() => setSelectedOption(index)}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                                  selectedOption === index ? "border-primary" : ""
                                }`}
                              >
                                {selectedOption === index && <Check className="h-3 w-3 text-primary" />}
                              </div>
                              <span>{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSubmitPuzzleAnswer} disabled={selectedOption === null}>
                        Submit Answer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Brain className="mr-2 h-5 w-5 text-primary" />
                        AI Analysis
                      </h3>
                      <p className="text-sm">{puzzleResult.analysis}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2 flex items-center">
                          <Trophy className="mr-2 h-5 w-5 text-green-500" />
                          Skills Gained
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {puzzleResult.skillsGained.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-green-500/10 text-green-500">
                              +{skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {puzzleResult.skillsNeeded.length > 0 && (
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2 flex items-center">
                            <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                            Skills to Develop
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {puzzleResult.skillsNeeded.map((skill, index) => (
                              <Badge key={index} variant="outline" className="bg-yellow-500/10 text-yellow-500">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Your Approach Score</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <Progress value={puzzleResult.score * 10} className="h-2" />
                        </div>
                        <div className="text-lg font-bold">{puzzleResult.score}/10</div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setActivePuzzle(null)}>
                        Back to Puzzles
                      </Button>
                      <Button
                        onClick={() => {
                          setPuzzleResult(null)
                          setSelectedOption(null)
                        }}
                      >
                        Try Another Approach
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="special" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bug Hunting Challenge */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5 text-primary" />
                  Bug Hunting Challenge
                </CardTitle>
                <CardDescription>Find and fix security vulnerabilities in code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Security</Badge>
                  <div className="flex items-center">
                    <Trophy className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">250 XP</span>
                  </div>
                </div>
                <p className="text-sm">
                  Test your debugging skills by identifying security vulnerabilities in authentication code. This
                  challenge will help you develop a security-first mindset.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setShowBugHunt(true)}>
                  Start Challenge
                </Button>
              </CardFooter>
            </Card>

            {/* Fraud Email Detection */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Fraud Email Detection
                </CardTitle>
                <CardDescription>Train your eye to spot phishing and fraudulent emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Cybersecurity</Badge>
                  <div className="flex items-center">
                    <Trophy className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">200 XP</span>
                  </div>
                </div>
                <p className="text-sm">
                  Learn to identify the telltale signs of phishing and fraudulent emails. This practical challenge will
                  help you protect yourself and others from common cyber threats.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setShowFraudDetection(true)}>
                  Start Challenge
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Bug Hunting Modal */}
          {showBugHunt && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Code className="mr-2 h-5 w-5 text-primary" />
                    {bugHuntingData.title}
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowBugHunt(false)}>
                    Close Challenge
                  </Button>
                </div>
                <CardDescription>{bugHuntingData.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-lg overflow-auto max-h-96">
                  <pre className="text-sm">
                    <code>{bugHuntingData.code}</code>
                  </pre>
                </div>

                {!showBugSolution ? (
                  <>
                    <div className="space-y-4">
                      <h3 className="font-medium">Identify the security vulnerabilities:</h3>
                      <Textarea
                        placeholder="Describe the security issues you've found and how to fix them..."
                        className="min-h-[150px]"
                        value={bugSolution}
                        onChange={(e) => setBugSolution(e.target.value)}
                      />

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <h4 className="font-medium flex items-center mb-2">
                          <Lightbulb className="mr-2 h-4 w-4 text-yellow-500" />
                          Need a hint?
                        </h4>
                        <div className="space-y-2">
                          {bugHuntingData.hints.map((hint, index) => (
                            <p key={index} className="text-sm">
                              {hint}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSubmitBugSolution} disabled={!bugSolution.trim()}>
                        Submit Solution
                      </Button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Security Vulnerabilities Found:</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        {bugHuntingData.solution.map((item, index) => (
                          <li key={index} className="text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Your Solution:</h3>
                      <p className="text-sm whitespace-pre-wrap">{bugSolution}</p>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setShowBugHunt(false)}>
                        Close Challenge
                      </Button>
                      <Button
                        onClick={() => {
                          setShowBugSolution(false)
                          setBugSolution("")
                        }}
                      >
                        Try Again
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Fraud Email Detection Modal */}
          {showFraudDetection && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-primary" />
                    {fraudEmailData.title}
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowFraudDetection(false)}>
                    Close Challenge
                  </Button>
                </div>
                <CardDescription>{fraudEmailData.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!showEmailResults ? (
                  <>
                    <div className="space-y-6">
                      {fraudEmailData.emails.map((email) => (
                        <Card key={email.id} className="border border-muted">
                          <CardHeader className="bg-muted/30">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{email.subject}</p>
                                <p className="text-sm text-muted-foreground">From: {email.sender}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant={emailAnalysis[email.id] === true ? "destructive" : "outline"}
                                  onClick={() => handleEmailAnalysis(email.id, true)}
                                >
                                  Fraudulent
                                </Button>
                                <Button
                                  size="sm"
                                  variant={emailAnalysis[email.id] === false ? "default" : "outline"}
                                  onClick={() => handleEmailAnalysis(email.id, false)}
                                >
                                  Legitimate
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <p className="text-sm">{email.content}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleSubmitEmailAnalysis}
                        disabled={Object.keys(emailAnalysis).length < fraudEmailData.emails.length}
                      >
                        Submit Analysis
                      </Button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h3 className="font-medium mb-4">Analysis Results:</h3>

                      <div className="space-y-4">
                        {fraudEmailData.emails.map((email) => {
                          const isCorrect = emailAnalysis[email.id] === email.isFraudulent
                          return (
                            <div key={email.id} className="flex items-center gap-3">
                              <div
                                className={`p-1 rounded-full ${isCorrect ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                              >
                                {isCorrect ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <span className="inline-block h-4 w-4 text-center font-bold">✗</span>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{email.subject}</p>
                                <p className="text-xs text-muted-foreground">From: {email.sender}</p>
                              </div>
                              <Badge variant={email.isFraudulent ? "destructive" : "default"}>
                                {email.isFraudulent ? "Fraudulent" : "Legitimate"}
                              </Badge>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {fraudEmailData.emails
                      .filter((email) => email.isFraudulent)
                      .map((email) => (
                        <div key={email.id} className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">{email.subject} - Warning Signs:</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {email.flags.map((flag, index) => (
                              <li key={index} className="text-sm">
                                {flag}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setShowFraudDetection(false)}>
                        Close Challenge
                      </Button>
                      <Button
                        onClick={() => {
                          setShowEmailResults(false)
                          setEmailAnalysis({})
                        }}
                      >
                        Try Again
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
