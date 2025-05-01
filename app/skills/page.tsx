"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { ArrowLeft, Brain, Code, Heart, Info, MessageSquare, Zap } from "lucide-react"
import Navbar from "@/components/navbar"

// Enhanced skill data with more details
const technicalSkills = [
  {
    id: "html",
    name: "HTML",
    level: 8,
    xp: 800,
    nextLevelXp: 1000,
    icon: <Code className="h-5 w-5" />,
    description: "Structure and semantics of web pages",
    longDescription:
      "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and content of web pages.",
    children: ["css"],
    position: { x: 50, y: 50 },
    resources: [
      { name: "MDN Web Docs - HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "W3Schools HTML Tutorial", url: "https://www.w3schools.com/html/" },
      { name: "HTML5 Specification", url: "https://html.spec.whatwg.org/" },
    ],
    projects: [
      { name: "Personal Portfolio", difficulty: "Beginner" },
      { name: "Semantic Blog Layout", difficulty: "Intermediate" },
    ],
    relatedSkills: ["Accessibility", "SEO", "Web Standards"],
    masteryLevels: [
      { level: 1, description: "Basic understanding of HTML tags and document structure" },
      { level: 3, description: "Comfortable with semantic HTML and forms" },
      { level: 5, description: "Advanced knowledge of HTML5 features and APIs" },
      { level: 8, description: "Expert-level understanding of HTML specifications and best practices" },
      { level: 10, description: "Mastery of HTML optimization, accessibility, and advanced techniques" },
    ],
  },
  {
    id: "css",
    name: "CSS",
    level: 7,
    xp: 700,
    nextLevelXp: 1000,
    icon: <Code className="h-5 w-5" />,
    description: "Styling and layout of web pages",
    longDescription:
      "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML. CSS is designed to enable the separation of presentation and content.",
    children: ["javascript"],
    position: { x: 150, y: 50 },
    resources: [
      { name: "MDN Web Docs - CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "CSS-Tricks", url: "https://css-tricks.com/" },
      { name: "Learn CSS", url: "https://web.dev/learn/css/" },
    ],
    projects: [
      { name: "Responsive Landing Page", difficulty: "Beginner" },
      { name: "CSS Animation Gallery", difficulty: "Intermediate" },
      { name: "Complex Layout System", difficulty: "Advanced" },
    ],
    relatedSkills: ["Design", "Animation", "Responsive Design", "Sass/SCSS"],
    masteryLevels: [
      { level: 1, description: "Basic styling and selectors" },
      { level: 3, description: "Layout techniques and responsive design" },
      { level: 5, description: "Advanced selectors and animations" },
      { level: 7, description: "Complex layouts, CSS architecture, and optimization" },
      { level: 10, description: "Mastery of CSS frameworks, preprocessors, and cutting-edge features" },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    level: 6,
    xp: 600,
    nextLevelXp: 1000,
    icon: <Code className="h-5 w-5" />,
    description: "Programming language for web interactivity",
    longDescription:
      "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. JavaScript enables interactive web pages and is an essential part of web applications.",
    children: ["react"],
    position: { x: 250, y: 50 },
    resources: [
      { name: "MDN Web Docs - JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "JavaScript.info", url: "https://javascript.info/" },
      { name: "Eloquent JavaScript", url: "https://eloquentjavascript.net/" },
    ],
    projects: [
      { name: "Interactive Form Validation", difficulty: "Beginner" },
      { name: "Todo Application", difficulty: "Intermediate" },
      { name: "Real-time Data Dashboard", difficulty: "Advanced" },
    ],
    relatedSkills: ["ES6+", "DOM Manipulation", "Asynchronous Programming", "TypeScript"],
    masteryLevels: [
      { level: 1, description: "Basic syntax and simple scripts" },
      { level: 3, description: "DOM manipulation and event handling" },
      { level: 6, description: "Advanced concepts like closures, prototypes, and async programming" },
      { level: 8, description: "Complex application architecture and performance optimization" },
      { level: 10, description: "Expert-level JavaScript engineering and framework development" },
    ],
  },
  {
    id: "react",
    name: "React",
    level: 5,
    xp: 500,
    nextLevelXp: 1000,
    icon: <Code className="h-5 w-5" />,
    description: "Library for building user interfaces",
    longDescription:
      "React is a JavaScript library for building user interfaces, particularly single-page applications. It's used for handling the view layer and allows you to create reusable UI components.",
    children: ["fullstack"],
    position: { x: 350, y: 50 },
    resources: [
      { name: "React Documentation", url: "https://reactjs.org/docs/getting-started.html" },
      { name: "React Patterns", url: "https://reactpatterns.com/" },
      { name: "React Hooks", url: "https://reactjs.org/docs/hooks-intro.html" },
    ],
    projects: [
      { name: "Personal Portfolio in React", difficulty: "Beginner" },
      { name: "E-commerce Product Page", difficulty: "Intermediate" },
      { name: "Full-featured SPA with Authentication", difficulty: "Advanced" },
    ],
    relatedSkills: ["Redux", "React Router", "Next.js", "React Native"],
    masteryLevels: [
      { level: 1, description: "Basic components and props" },
      { level: 3, description: "State management and lifecycle methods" },
      { level: 5, description: "Hooks, context, and performance optimization" },
      { level: 8, description: "Advanced patterns, custom hooks, and complex state management" },
      { level: 10, description: "Expert-level React architecture and framework development" },
    ],
  },
  {
    id: "fullstack",
    name: "Full Stack",
    level: 3,
    xp: 300,
    nextLevelXp: 1000,
    icon: <Code className="h-5 w-5" />,
    description: "End-to-end web development",
    longDescription:
      "Full Stack development involves working with both the front-end and back-end of web applications. It encompasses everything from the user interface to the server, database, and APIs.",
    children: [],
    position: { x: 450, y: 50 },
    resources: [
      { name: "The Odin Project", url: "https://www.theodinproject.com/" },
      { name: "Full Stack Open", url: "https://fullstackopen.com/en/" },
      { name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/" },
    ],
    projects: [
      { name: "CRUD Application", difficulty: "Intermediate" },
      { name: "Social Media Platform", difficulty: "Advanced" },
      { name: "E-commerce Website", difficulty: "Advanced" },
    ],
    relatedSkills: ["Database Design", "API Development", "Authentication", "Deployment"],
    masteryLevels: [
      { level: 1, description: "Basic understanding of front-end and back-end concepts" },
      { level: 3, description: "Building simple full-stack applications with guidance" },
      { level: 5, description: "Independent development of full-stack applications" },
      { level: 8, description: "Advanced architecture, scalability, and performance optimization" },
      { level: 10, description: "Expert-level full-stack engineering and system design" },
    ],
  },
  {
    id: "node",
    name: "Node.js",
    level: 4,
    xp: 400,
    nextLevelXp: 1000,
    icon: <Code className="h-5 w-5" />,
    description: "JavaScript runtime for server-side development",
    longDescription:
      "Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. It allows developers to use JavaScript for server-side scripting.",
    children: [],
    position: { x: 550, y: 100 },
    resources: [
      { name: "Node.js Documentation", url: "https://nodejs.org/en/docs/" },
      { name: "Node.js Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices" },
      { name: "Express.js Documentation", url: "https://expressjs.com/" },
    ],
    projects: [
      { name: "RESTful API", difficulty: "Beginner" },
      { name: "Real-time Chat Application", difficulty: "Intermediate" },
      { name: "Microservices Architecture", difficulty: "Advanced" },
    ],
    relatedSkills: ["Express.js", "MongoDB", "API Design", "WebSockets"],
    masteryLevels: [
      { level: 1, description: "Basic Node.js concepts and simple scripts" },
      { level: 3, description: "Building APIs with Express.js" },
      { level: 4, description: "Working with databases and authentication" },
      { level: 7, description: "Advanced patterns, performance, and security" },
      { level: 10, description: "Expert-level Node.js architecture and scaling" },
    ],
  },
  {
    id: "python",
    name: "Python",
    level: 2,
    xp: 200,
    nextLevelXp: 1000,
    icon: <Code className="h-5 w-5" />,
    description: "Versatile programming language for various applications",
    longDescription:
      "Python is an interpreted, high-level, general-purpose programming language. Its design philosophy emphasizes code readability with its use of significant whitespace.",
    children: [],
    position: { x: 650, y: 150 },
    resources: [
      { name: "Python Documentation", url: "https://docs.python.org/3/" },
      { name: "Real Python", url: "https://realpython.com/" },
      { name: "Python Crash Course", url: "https://ehmatthes.github.io/pcc/" },
    ],
    projects: [
      { name: "Data Analysis Script", difficulty: "Beginner" },
      { name: "Web Scraper", difficulty: "Intermediate" },
      { name: "Machine Learning Model", difficulty: "Advanced" },
    ],
    relatedSkills: ["Data Science", "Machine Learning", "Web Development", "Automation"],
    masteryLevels: [
      { level: 1, description: "Basic syntax and simple scripts" },
      { level: 2, description: "Working with libraries and data structures" },
      { level: 5, description: "Building applications and working with frameworks" },
      { level: 8, description: "Advanced Python concepts and optimization" },
      { level: 10, description: "Expert-level Python engineering and architecture" },
    ],
  },
]

const softSkills = [
  {
    id: "leadership",
    name: "Leadership",
    level: 4,
    xp: 400,
    nextLevelXp: 1000,
    icon: <Brain className="h-5 w-5" />,
    description: "Guiding and inspiring others",
    longDescription:
      "Leadership involves guiding, motivating, and inspiring others to achieve common goals. It includes decision-making, delegation, and creating a positive team environment.",
    resources: [
      { name: "Leadership Essentials", url: "#" },
      { name: "Team Management Principles", url: "#" },
    ],
    projects: [
      { name: "Team Project Leadership", difficulty: "Intermediate" },
      { name: "Mentoring Program", difficulty: "Advanced" },
    ],
    masteryLevels: [
      { level: 1, description: "Basic understanding of leadership principles" },
      { level: 4, description: "Effective team leadership in small groups" },
      { level: 7, description: "Strategic leadership and vision setting" },
      { level: 10, description: "Transformational leadership and organizational impact" },
    ],
  },
  {
    id: "empathy",
    name: "Empathy",
    level: 6,
    xp: 600,
    nextLevelXp: 1000,
    icon: <Heart className="h-5 w-5" />,
    description: "Understanding others' feelings and perspectives",
    longDescription:
      "Empathy is the ability to understand and share the feelings of another person. In a professional context, it involves recognizing others' perspectives, needs, and emotions.",
    resources: [
      { name: "Developing Emotional Intelligence", url: "#" },
      { name: "Empathetic Communication", url: "#" },
    ],
    projects: [
      { name: "User Research Study", difficulty: "Beginner" },
      { name: "Inclusive Design Project", difficulty: "Intermediate" },
    ],
    masteryLevels: [
      { level: 1, description: "Basic awareness of others' emotions" },
      { level: 6, description: "Active empathetic listening and response" },
      { level: 8, description: "Deep understanding of diverse perspectives" },
      { level: 10, description: "Transformative empathy that drives positive change" },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    level: 5,
    xp: 500,
    nextLevelXp: 1000,
    icon: <MessageSquare className="h-5 w-5" />,
    description: "Clearly conveying ideas and information",
    longDescription:
      "Communication involves effectively expressing ideas and information verbally and in writing. It includes active listening, clear articulation, and adapting your message to different audiences.",
    resources: [
      { name: "Effective Technical Communication", url: "#" },
      { name: "Public Speaking Fundamentals", url: "#" },
    ],
    projects: [
      { name: "Technical Documentation", difficulty: "Beginner" },
      { name: "Presentation Workshop", difficulty: "Intermediate" },
    ],
    masteryLevels: [
      { level: 1, description: "Basic verbal and written communication" },
      { level: 5, description: "Clear and effective communication in various contexts" },
      { level: 8, description: "Strategic communication and persuasion" },
      { level: 10, description: "Masterful communication that inspires and transforms" },
    ],
  },
  {
    id: "problemSolving",
    name: "Problem Solving",
    level: 7,
    xp: 700,
    nextLevelXp: 1000,
    icon: <Brain className="h-5 w-5" />,
    description: "Finding effective solutions to challenges",
    longDescription:
      "Problem solving is the process of identifying issues, analyzing them, and implementing effective solutions. It involves critical thinking, creativity, and analytical skills.",
    resources: [
      { name: "Critical Thinking Techniques", url: "#" },
      { name: "Structured Problem Solving", url: "#" },
    ],
    projects: [
      { name: "Debugging Challenge", difficulty: "Intermediate" },
      { name: "System Optimization", difficulty: "Advanced" },
    ],
    masteryLevels: [
      { level: 1, description: "Basic problem identification" },
      { level: 4, description: "Systematic problem analysis" },
      { level: 7, description: "Creative and effective solution development" },
      { level: 10, description: "Expert problem solving in complex domains" },
    ],
  },
]

// Achievements data
const achievements = [
  {
    id: 1,
    name: "HTML Master",
    description: "Reached level 8 in HTML",
    icon: <Badge className="h-8 w-8 bg-yellow-500" />,
    unlocked: true,
    unlockedAt: "2025-03-15",
    xpAwarded: 200,
  },
  {
    id: 2,
    name: "CSS Stylist",
    description: "Reached level 7 in CSS",
    icon: <Badge className="h-8 w-8 bg-blue-500" />,
    unlocked: true,
    unlockedAt: "2025-03-28",
    xpAwarded: 150,
  },
  {
    id: 3,
    name: "JavaScript Wizard",
    description: "Reached level 10 in JavaScript",
    icon: <Badge className="h-8 w-8 bg-yellow-600" />,
    unlocked: false,
    requirements: "Reach level 10 in JavaScript",
    xpReward: 500,
  },
  {
    id: 4,
    name: "React Developer",
    description: "Built 5 React applications",
    icon: <Badge className="h-8 w-8 bg-blue-600" />,
    unlocked: false,
    requirements: "Complete 5 React projects",
    progress: "2/5 completed",
    xpReward: 300,
  },
  {
    id: 5,
    name: "Team Player",
    description: "Collaborated on 3 group projects",
    icon: <Badge className="h-8 w-8 bg-green-500" />,
    unlocked: true,
    unlockedAt: "2025-04-10",
    xpAwarded: 250,
  },
  {
    id: 6,
    name: "Bug Hunter",
    description: "Found and fixed 10 critical bugs",
    icon: <Badge className="h-8 w-8 bg-red-500" />,
    unlocked: false,
    requirements: "Find and fix 10 critical bugs",
    progress: "4/10 completed",
    xpReward: 400,
  },
  {
    id: 7,
    name: "Accessibility Advocate",
    description: "Implemented WCAG standards in 3 projects",
    icon: <Badge className="h-8 w-8 bg-purple-500" />,
    unlocked: false,
    requirements: "Implement WCAG standards in 3 projects",
    progress: "1/3 completed",
    xpReward: 350,
  },
  {
    id: 8,
    name: "Performance Guru",
    description: "Optimized 5 applications for speed",
    icon: <Badge className="h-8 w-8 bg-orange-500" />,
    unlocked: false,
    requirements: "Optimize 5 applications for speed",
    progress: "2/5 completed",
    xpReward: 400,
  },
]

// Learning paths
const learningPaths = [
  {
    id: "frontend",
    name: "Frontend Developer",
    description: "Master the art of creating beautiful, interactive user interfaces",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    projects: [
      { name: "Personal Portfolio", completed: true },
      { name: "Interactive Dashboard", completed: false },
      { name: "E-commerce Frontend", completed: false },
    ],
    progress: 35,
    estimatedTime: "4 months",
  },
  {
    id: "fullstack",
    name: "Full Stack Developer",
    description: "Develop end-to-end web applications with frontend and backend expertise",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    projects: [
      { name: "Blog Platform", completed: false },
      { name: "Social Media App", completed: false },
      { name: "E-commerce Website", completed: false },
    ],
    progress: 20,
    estimatedTime: "6 months",
  },
  {
    id: "datascience",
    name: "Data Science",
    description: "Learn to analyze and visualize data to extract meaningful insights",
    skills: ["Python", "Statistics", "Machine Learning", "Data Visualization"],
    projects: [
      { name: "Data Analysis Report", completed: false },
      { name: "Predictive Model", completed: false },
      { name: "Interactive Dashboard", completed: false },
    ],
    progress: 10,
    estimatedTime: "8 months",
  },
]

export default function SkillsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("technical")
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [showSkillDialog, setShowSkillDialog] = useState(false)
  const [showAchievementDialog, setShowAchievementDialog] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState(null)
  const [showPathDialog, setShowPathDialog] = useState(false)
  const [selectedPath, setSelectedPath] = useState(null)

  // Handle skill click
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill)
    setShowSkillDialog(true)
  }

  // Handle achievement click
  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement)
    setShowAchievementDialog(true)
  }

  // Handle learning path click
  const handlePathClick = (path) => {
    setSelectedPath(path)
    setShowPathDialog(true)
  }

  // Handle practice skill
  const handlePracticeSkill = (skill) => {
    toast({
      title: `Practice ${skill.name}`,
      description: `Starting a practice session for ${skill.name}. This will help you level up faster!`,
    })
    // In a real app, this would navigate to a practice session or tutorial
  }

  // Handle enroll in learning path
  const handleEnrollPath = (path) => {
    toast({
      title: `Enrolled in ${path.name}`,
      description: `You've successfully enrolled in the ${path.name} learning path!`,
    })
    setShowPathDialog(false)
    // In a real app, this would update the user's enrolled paths
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 pt-16 pb-8">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center mb-6">
              <Button variant="outline" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>RPG Skill Dashboard</CardTitle>
                <CardDescription>Please log in to view your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => router.push("/login")}>Log In</Button>
              </CardContent>
            </Card>
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
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Button variant="outline" size="sm" onClick={() => router.back()} className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <h1 className="text-3xl font-bold">RPG Skill Dashboard</h1>
            </div>
          </div>

          <Tabs defaultValue="technical" onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="technical">Technical Skills</TabsTrigger>
              <TabsTrigger value="soft">Soft Skills</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            </TabsList>

            <TabsContent value="technical" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="mr-2 h-5 w-5 text-primary" />
                    Technical Skill Tree
                  </CardTitle>
                  <CardDescription>Your progress in technical skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-[400px] border rounded-lg p-4 overflow-hidden">
                    <SkillTree skills={technicalSkills} onSkillClick={handleSkillClick} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Details</CardTitle>
                  <CardDescription>Your current technical skills and progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {technicalSkills.map((skill) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="mr-2 bg-primary/10 p-1.5 rounded-full">{skill.icon}</div>
                            <div>
                              <h4 className="font-medium">{skill.name}</h4>
                              <p className="text-xs text-muted-foreground">{skill.description}</p>
                            </div>
                          </div>
                          <Badge variant="outline">Level {skill.level}</Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>
                              XP: {skill.xp}/{skill.nextLevelXp}
                            </span>
                            <span>{Math.round((skill.xp / skill.nextLevelXp) * 100)}%</span>
                          </div>
                          <Progress value={(skill.xp / skill.nextLevelXp) * 100} className="h-2" />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => handleSkillClick(skill)}
                          >
                            Details
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => handlePracticeSkill(skill)}
                          >
                            Practice
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="soft" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-pink-500" />
                    Soft Skills
                  </CardTitle>
                  <CardDescription>Your progress in soft skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {softSkills.map((skill) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="mr-2 bg-primary/10 p-1.5 rounded-full">{skill.icon}</div>
                            <div>
                              <h4 className="font-medium">{skill.name}</h4>
                              <p className="text-xs text-muted-foreground">{skill.description}</p>
                            </div>
                          </div>
                          <Badge variant="outline">Level {skill.level}</Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>
                              XP: {skill.xp}/{skill.nextLevelXp}
                            </span>
                            <span>{Math.round((skill.xp / skill.nextLevelXp) * 100)}%</span>
                          </div>
                          <Progress value={(skill.xp / skill.nextLevelXp) * 100} className="h-2" />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => handleSkillClick(skill)}
                          >
                            Details
                          </Button>
                          <Button variant="default" size="sm" className="h-7 px-2 text-xs">
                            Reflect
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                    Achievements
                  </CardTitle>
                  <CardDescription>Badges and milestones you've reached</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: achievement.id * 0.05 }}
                        className={`flex items-center p-4 rounded-lg border cursor-pointer hover:border-primary/50 transition-colors ${!achievement.unlocked ? "opacity-50" : ""}`}
                        onClick={() => handleAchievementClick(achievement)}
                      >
                        <div className="mr-4 flex-shrink-0">{achievement.icon}</div>
                        <div>
                          <h4 className="font-medium">{achievement.name}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          {achievement.unlocked ? (
                            <p className="text-xs text-muted-foreground mt-1">Unlocked on {achievement.unlockedAt}</p>
                          ) : (
                            achievement.progress && (
                              <p className="text-xs text-muted-foreground mt-1">Progress: {achievement.progress}</p>
                            )
                          )}
                        </div>
                        {achievement.unlocked ? (
                          <Badge className="ml-auto" variant="secondary">
                            Unlocked
                          </Badge>
                        ) : (
                          <Badge className="ml-auto" variant="outline">
                            Locked
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="paths" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-primary" />
                    Learning Paths
                  </CardTitle>
                  <CardDescription>Structured learning journeys to master specific roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {learningPaths.map((path) => (
                      <motion.div
                        key={path.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border rounded-lg overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => handlePathClick(path)}
                      >
                        <div className="p-4">
                          <h3 className="font-medium text-lg">{path.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{path.description}</p>

                          <div className="mt-4">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{path.progress}%</span>
                            </div>
                            <Progress value={path.progress} className="h-2" />
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {path.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                            {path.skills.length > 3 && <Badge variant="outline">+{path.skills.length - 3} more</Badge>}
                          </div>

                          <div className="mt-4 flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Est. time: {path.estimatedTime}</span>
                            <Button size="sm">View Path</Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Skill Detail Dialog */}
      <Dialog open={showSkillDialog} onOpenChange={setShowSkillDialog}>
        <DialogContent className="max-w-2xl">
          {selectedSkill && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <div className="mr-2 bg-primary/10 p-1.5 rounded-full">{selectedSkill.icon}</div>
                  {selectedSkill.name} - Level {selectedSkill.level}
                </DialogTitle>
                <DialogDescription>{selectedSkill.longDescription}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Progress</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>
                        XP: {selectedSkill.xp}/{selectedSkill.nextLevelXp}
                      </span>
                      <span>{Math.round((selectedSkill.xp / selectedSkill.nextLevelXp) * 100)}%</span>
                    </div>
                    <Progress value={(selectedSkill.xp / selectedSkill.nextLevelXp) * 100} className="h-2" />
                  </div>
                </div>

                {selectedSkill.masteryLevels && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Mastery Levels</h4>
                    <div className="space-y-2">
                      {selectedSkill.masteryLevels.map((mastery, index) => (
                        <div
                          key={index}
                          className={`p-2 rounded-md border ${
                            mastery.level <= selectedSkill.level ? "bg-primary/10 border-primary/20" : "bg-muted/50"
                          }`}
                        >
                          <div className="flex items-center">
                            <Badge
                              variant={mastery.level <= selectedSkill.level ? "default" : "outline"}
                              className="mr-2"
                            >
                              Level {mastery.level}
                            </Badge>
                            <span className="text-sm">{mastery.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSkill.resources && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Learning Resources</h4>
                    <div className="space-y-2">
                      {selectedSkill.resources.map((resource, index) => (
                        <div key={index} className="flex items-center">
                          <Info className="h-4 w-4 mr-2 text-primary" />
                          <a href={resource.url} className="text-sm text-primary hover:underline">
                            {resource.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSkill.projects && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recommended Projects</h4>
                    <div className="space-y-2">
                      {selectedSkill.projects.map((project, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-md border">
                          <span className="text-sm">{project.name}</span>
                          <Badge variant="outline">{project.difficulty}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSkill.relatedSkills && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Related Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.relatedSkills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowSkillDialog(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handlePracticeSkill(selectedSkill)
                    setShowSkillDialog(false)
                  }}
                >
                  Practice This Skill
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Achievement Detail Dialog */}
      <Dialog open={showAchievementDialog} onOpenChange={setShowAchievementDialog}>
        <DialogContent>
          {selectedAchievement && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <div className="mr-2">{selectedAchievement.icon}</div>
                  {selectedAchievement.name}
                </DialogTitle>
                <DialogDescription>{selectedAchievement.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {selectedAchievement.unlocked ? (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-md p-4">
                    <h4 className="font-medium text-green-600 dark:text-green-400 flex items-center">
                      <Zap className="h-4 w-4 mr-2" />
                      Achievement Unlocked!
                    </h4>
                    <p className="text-sm mt-1">You unlocked this achievement on {selectedAchievement.unlockedAt}</p>
                    <p className="text-sm mt-2">XP Awarded: {selectedAchievement.xpAwarded}</p>
                  </div>
                ) : (
                  <div className="bg-muted rounded-md p-4">
                    <h4 className="font-medium">Requirements to Unlock</h4>
                    <p className="text-sm mt-1">{selectedAchievement.requirements}</p>
                    {selectedAchievement.progress && (
                      <p className="text-sm mt-2">Current Progress: {selectedAchievement.progress}</p>
                    )}
                    <p className="text-sm mt-2">XP Reward: {selectedAchievement.xpReward}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={() => setShowAchievementDialog(false)}>
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Learning Path Detail Dialog */}
      <Dialog open={showPathDialog} onOpenChange={setShowPathDialog}>
        <DialogContent className="max-w-2xl">
          {selectedPath && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPath.name}</DialogTitle>
                <DialogDescription>{selectedPath.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Progress</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Completion: {selectedPath.progress}%</span>
                      <span>Est. time: {selectedPath.estimatedTime}</span>
                    </div>
                    <Progress value={selectedPath.progress} className="h-2" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPath.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Projects</h4>
                  <div className="space-y-2">
                    {selectedPath.projects.map((project, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md border">
                        <span className="text-sm">{project.name}</span>
                        {project.completed ? (
                          <Badge variant="secondary">Completed</Badge>
                        ) : (
                          <Badge variant="outline">Not Started</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowPathDialog(false)}>
                  Close
                </Button>
                <Button onClick={() => handleEnrollPath(selectedPath)}>Enroll in Path</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function SkillTree({ skills, onSkillClick }) {
  return (
    <div className="relative w-full h-full">
      {/* Draw connections between skills */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {skills.map((skill) =>
          skill.children?.map((childId) => {
            const childSkill = skills.find((s) => s.id === childId)
            if (childSkill) {
              return (
                <motion.line
                  key={`${skill.id}-${childId}`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  x1={skill.position.x + 40}
                  y1={skill.position.y + 40}
                  x2={childSkill.position.x + 40}
                  y2={childSkill.position.y + 40}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="text-primary/50"
                />
              )
            }
            return null
          }),
        )}
      </svg>

      {/* Render skill nodes */}
      {skills.map((skill) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute cursor-pointer"
          style={{ left: skill.position.x, top: skill.position.y }}
          onClick={() => onSkillClick(skill)}
        >
          <div
            className={`flex items-center justify-center w-20 h-20 rounded-full border-2 ${
              skill.level >= 7
                ? "border-yellow-500 bg-yellow-500/10"
                : skill.level >= 5
                  ? "border-blue-500 bg-blue-500/10"
                  : skill.level >= 3
                    ? "border-green-500 bg-green-500/10"
                    : "border-gray-500 bg-gray-500/10"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="mb-1">{skill.icon}</div>
              <div className="text-xs font-medium">{skill.name}</div>
              <div className="text-xs">Lvl {skill.level}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
