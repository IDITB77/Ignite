"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { generateCareerSimPlan } from "@/components/ai-models"
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Code,
  Lightbulb,
  Palette,
  PieChart,
  Sparkles,
  CheckCircle,
  Award,
} from "lucide-react"

// Available career roles
const careerRoles = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    description: "Build user interfaces and interactive web applications",
    icon: <Code className="h-5 w-5" />,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    description: "Create user-centered designs and experiences",
    icon: <Palette className="h-5 w-5" />,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Analyze data and build predictive models",
    icon: <PieChart className="h-5 w-5" />,
    color: "bg-green-500/10 text-green-500",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description: "Define product vision and coordinate development",
    icon: <Lightbulb className="h-5 w-5" />,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    id: "social-entrepreneur",
    title: "Social Entrepreneur",
    description: "Build ventures that address social challenges",
    icon: <Sparkles className="h-5 w-5" />,
    color: "bg-pink-500/10 text-pink-500",
  },
]

export default function CareerSimulatorPage() {
  const { user } = useAuth()
  const [selectedRole, setSelectedRole] = useState("")
  const [simulationStage, setSimulationStage] = useState("select") // select, schedule, task, reflection, summary
  const [careerPlan, setCareerPlan] = useState(null)
  const [currentTask, setCurrentTask] = useState(null)
  const [microTaskResponse, setMicroTaskResponse] = useState("")
  const [emotionalResponse, setEmotionalResponse] = useState("")
  const [selectedOption, setSelectedOption] = useState(-1)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [simulationResults, setSimulationResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Update progress based on simulation stage
  useEffect(() => {
    switch (simulationStage) {
      case "select":
        setSimulationProgress(0)
        break
      case "schedule":
        setSimulationProgress(25)
        break
      case "task":
        setSimulationProgress(50)
        break
      case "reflection":
        setSimulationProgress(75)
        break
      case "summary":
        setSimulationProgress(100)
        break
      default:
        setSimulationProgress(0)
    }
  }, [simulationStage])

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId)
  }

  const startSimulation = () => {
    setIsLoading(true)

    // Get the selected role title
    const role = careerRoles.find((r) => r.id === selectedRole)?.title || "Frontend Developer"

    // Generate career simulation plan
    setTimeout(() => {
      try {
        const plan = generateCareerSimPlan(role) || {
          schedule: [],
          microTask: {
            title: "Sample Task",
            description: "This is a sample task description.",
            requirements: [],
          },
          emotionalChallenge: {
            scenario: "Sample scenario",
            options: [],
            bestResponse: 0,
          },
        }
        setCareerPlan(plan)
        setSimulationStage("schedule")
      } catch (error) {
        console.error("Error generating career plan:", error)
        // Provide a fallback plan
        setCareerPlan({
          schedule: [],
          microTask: {
            title: "Sample Task",
            description: "This is a sample task description.",
            requirements: [],
          },
          emotionalChallenge: {
            scenario: "Sample scenario",
            options: [],
            bestResponse: 0,
          },
        })
        setSimulationStage("schedule")
      } finally {
        setIsLoading(false)
      }
    }, 1500)
  }

  const startMicroTask = () => {
    setCurrentTask(careerPlan.microTask)
    setSimulationStage("task")
  }

  const submitMicroTask = () => {
    setSimulationStage("reflection")
  }

  const submitReflection = () => {
    // Generate simulation results
    const role = careerRoles.find((r) => r.id === selectedRole)

    // Determine career fit based on responses
    let careerFit = "moderate"
    if (selectedOption === careerPlan.emotionalChallenge.bestResponse) {
      careerFit = "strong"
    }

    const results = {
      role: role.title,
      fit: careerFit,
      strengths: ["Problem-solving abilities", "Attention to detail", "Creative thinking"],
      growthAreas: ["Communication skills", "Time management"],
      alternativePaths: [careerRoles.find((r) => r.id !== selectedRole)?.title || "UX Designer", "Technical Writer"],
    }

    setSimulationResults(results)
    setSimulationStage("summary")
  }

  const resetSimulation = () => {
    setSelectedRole("")
    setSimulationStage("select")
    setCareerPlan(null)
    setCurrentTask(null)
    setMicroTaskResponse("")
    setEmotionalResponse("")
    setSelectedOption(-1)
    setSimulationResults(null)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Career Role Simulator</CardTitle>
              <CardDescription>Please log in to use the career simulator</CardDescription>
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
              <h1 className="text-3xl font-bold">AI Career Role Simulator</h1>
              <p className="text-muted-foreground">
                Experience different career paths through simulated, short "roleplays"
              </p>
            </div>
          </div>

          <div className="mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Badge variant={simulationProgress === 100 ? "default" : "outline"} className="mr-2">
                        {simulationProgress}% Complete
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {simulationStage === "select" && "Choose a role"}
                        {simulationStage === "schedule" && "Review schedule"}
                        {simulationStage === "task" && "Complete micro-task"}
                        {simulationStage === "reflection" && "Emotional reflection"}
                        {simulationStage === "summary" && "Simulation complete"}
                      </span>
                    </div>
                    {simulationStage !== "select" && (
                      <Button variant="ghost" size="sm" onClick={resetSimulation}>
                        Start Over
                      </Button>
                    )}
                  </div>
                  <Progress value={simulationProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <AnimatePresence mode="wait">
            {simulationStage === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="mr-2 h-5 w-5 text-primary" />
                      Choose a Career Role
                    </CardTitle>
                    <CardDescription>Select a role you'd like to experience for a day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {careerRoles.map((role) => (
                        <motion.div
                          key={role.id}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 rounded-lg border cursor-pointer ${
                            selectedRole === role.id ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => handleRoleSelect(role.id)}
                        >
                          <div className="flex items-start">
                            <div className={`p-2 rounded-full ${role.color} mr-3`}>{role.icon}</div>
                            <div>
                              <h3 className="font-medium">{role.title}</h3>
                              <p className="text-sm text-muted-foreground">{role.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={startSimulation} disabled={!selectedRole || isLoading}>
                      {isLoading ? (
                        <>
                          <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                          Generating Simulation...
                        </>
                      ) : (
                        "Start Simulation"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {simulationStage === "schedule" && careerPlan && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Your Day as a {careerRoles.find((r) => r.id === selectedRole)?.title}
                    </CardTitle>
                    <CardDescription>Here's what your day would look like in this role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {careerPlan &&
                        careerPlan.schedule &&
                        careerPlan.schedule.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <div className="flex-shrink-0 w-20 text-sm font-medium text-muted-foreground">
                              {item.time}
                            </div>
                            <div className="flex-1 ml-4 p-3 border-l">
                              <h4 className="font-medium">{item.task}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={startMicroTask}>
                      Try a Micro-Task
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {simulationStage === "task" && currentTask && (
              <motion.div
                key="task"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                      {currentTask.title}
                    </CardTitle>
                    <CardDescription>
                      Complete this micro-task as if you were a {careerRoles.find((r) => r.id === selectedRole)?.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="mb-4">{currentTask.description}</p>
                        <div className="space-y-2">
                          {currentTask &&
                            currentTask.requirements &&
                            currentTask.requirements.map((req, index) => (
                              <div key={index} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                <p className="text-sm">{req}</p>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="task-response" className="block text-sm font-medium mb-2">
                          Your Response
                        </label>
                        <Textarea
                          id="task-response"
                          placeholder="Type your response here..."
                          value={microTaskResponse}
                          onChange={(e) => setMicroTaskResponse(e.target.value)}
                          className="min-h-[150px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={submitMicroTask} disabled={microTaskResponse.length < 10}>
                      Submit Response
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {simulationStage === "reflection" && careerPlan && (
              <motion.div
                key="reflection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5 text-primary" />
                      Emotional Intelligence Challenge
                    </CardTitle>
                    <CardDescription>How would you handle this emotional challenge in the role?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 bg-muted rounded-lg">
                        <p>{careerPlan.emotionalChallenge.scenario}</p>
                      </div>

                      <div className="space-y-3">
                        {careerPlan &&
                          careerPlan.emotionalChallenge &&
                          careerPlan.emotionalChallenge.options &&
                          careerPlan.emotionalChallenge.options.map((option, index) => (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                selectedOption === index ? "border-primary bg-primary/5" : ""
                              }`}
                              onClick={() => setSelectedOption(index)}
                            >
                              <p>{option}</p>
                            </div>
                          ))}
                      </div>

                      <div>
                        <label htmlFor="emotional-response" className="block text-sm font-medium mb-2">
                          Additional Thoughts (Optional)
                        </label>
                        <Textarea
                          id="emotional-response"
                          placeholder="Share any additional thoughts on how you'd handle this situation..."
                          value={emotionalResponse}
                          onChange={(e) => setEmotionalResponse(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={submitReflection} disabled={selectedOption === -1}>
                      Complete Simulation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {simulationStage === "summary" && simulationResults && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-primary" />
                      Career Simulation Results
                    </CardTitle>
                    <CardDescription>
                      Your personalized insights from the {simulationResults.role} simulation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                            {careerRoles.find((r) => r.title === simulationResults.role)?.icon || (
                              <Briefcase className="h-8 w-8 text-primary" />
                            )}
                          </div>
                          <h3 className="text-xl font-bold">{simulationResults.role}</h3>
                          <div className="mt-2">
                            <Badge variant={simulationResults.fit === "strong" ? "default" : "outline"}>
                              {simulationResults.fit === "strong" ? "Strong Fit" : "Moderate Fit"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Your Strengths</h4>
                          <ul className="space-y-2">
                            {simulationResults &&
                              simulationResults.strengths &&
                              simulationResults.strengths.map((strength, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                  <span>{strength}</span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Growth Areas</h4>
                          <ul className="space-y-2">
                            {simulationResults &&
                              simulationResults.growthAreas &&
                              simulationResults.growthAreas.map((area, index) => (
                                <li key={index} className="flex items-start">
                                  <Sparkles className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                                  <span>{area}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Alternative Paths to Explore</h4>
                        <div className="flex flex-wrap gap-2">
                          {simulationResults &&
                            simulationResults.alternativePaths &&
                            simulationResults.alternativePaths.map((path, index) => (
                              <Badge key={index} variant="outline" className="bg-background">
                                {path}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={resetSimulation}>
                      Try Another Role
                    </Button>
                    <Button asChild>
                      <a href="/dashboard">Back to Dashboard</a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
