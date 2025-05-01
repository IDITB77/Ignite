"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { analyzeTeamMatch } from "@/components/ai-models"
import { useAuth } from "@/components/auth-provider"
import { ArrowLeft, Brain, Calendar, Check, Filter, MessageSquare, Plus, Search, Star, Users, Zap } from "lucide-react"

// Mock team data
const teamData = [
  {
    id: "team1",
    name: "CodeCrafters",
    description: "Building innovative web applications with cutting-edge technologies",
    members: [
      {
        id: "user1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Frontend Developer",
        skills: ["React", "TypeScript", "UI/UX"],
      },
      {
        id: "user2",
        name: "Sam Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "UI/UX Designer",
        skills: ["Figma", "Design Systems", "User Research"],
      },
      {
        id: "user3",
        name: "Jordan Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Backend Developer",
        skills: ["Node.js", "MongoDB", "API Design"],
      },
    ],
    projects: ["Eco-Tracker", "Community Marketplace"],
    openRoles: ["Data Scientist", "DevOps Engineer"],
    tags: ["Web Development", "Full Stack", "Design"],
    synergy: 92,
  },
  {
    id: "team2",
    name: "DataDreamers",
    description: "Transforming data into actionable insights through AI and visualization",
    members: [
      {
        id: "user4",
        name: "Casey Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Data Scientist",
        skills: ["Python", "Machine Learning", "Data Visualization"],
      },
      {
        id: "user5",
        name: "Riley Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "ML Engineer",
        skills: ["TensorFlow", "PyTorch", "NLP"],
      },
    ],
    projects: ["Fraud Detection System", "Predictive Analytics Dashboard"],
    openRoles: ["Frontend Developer", "UI/UX Designer", "Data Engineer"],
    tags: ["AI/ML", "Data Science", "Analytics"],
    synergy: 88,
  },
  {
    id: "team3",
    name: "ImpactMakers",
    description: "Creating technology solutions for social and environmental challenges",
    members: [
      {
        id: "user6",
        name: "Taylor Wong",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Product Manager",
        skills: ["Strategy", "User Stories", "Roadmapping"],
      },
      {
        id: "user7",
        name: "Jamie Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Full Stack Developer",
        skills: ["React", "Node.js", "MongoDB"],
      },
      {
        id: "user8",
        name: "Morgan Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "UX Researcher",
        skills: ["User Testing", "Interviews", "Accessibility"],
      },
      {
        id: "user9",
        name: "Drew Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Mobile Developer",
        skills: ["React Native", "Flutter", "iOS/Android"],
      },
    ],
    projects: ["Disaster Response App", "Community Resource Platform"],
    openRoles: ["DevOps Engineer"],
    tags: ["Social Impact", "Sustainability", "Mobile"],
    synergy: 95,
  },
  {
    id: "team4",
    name: "EdTech Innovators",
    description: "Revolutionizing education through accessible and engaging technology",
    members: [
      {
        id: "user10",
        name: "Avery Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Education Specialist",
        skills: ["Curriculum Design", "Learning Science", "Assessment"],
      },
      {
        id: "user11",
        name: "Cameron Lopez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Frontend Developer",
        skills: ["React", "JavaScript", "Accessibility"],
      },
    ],
    projects: ["Interactive Learning Platform", "Skill Assessment Tool"],
    openRoles: ["Backend Developer", "UI/UX Designer", "Content Creator"],
    tags: ["Education", "Accessibility", "Interactive"],
    synergy: 87,
  },
]

// Mock hackathon data
const hackathonData = [
  {
    id: "hack1",
    name: "Climate Tech Hackathon",
    description: "Build innovative solutions to address climate change challenges",
    startDate: "2025-06-15",
    endDate: "2025-06-17",
    prizes: ["$5,000 Grand Prize", "Cloud Credits", "Mentorship Opportunities"],
    participants: 120,
    teams: 28,
    registrationOpen: true,
    tags: ["Climate", "Sustainability", "Social Impact"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "hack2",
    name: "AI for Accessibility",
    description: "Create AI-powered tools to improve digital accessibility for all",
    startDate: "2025-07-10",
    endDate: "2025-07-12",
    prizes: ["$3,000 Grand Prize", "Hardware Kits", "Incubation Support"],
    participants: 85,
    teams: 22,
    registrationOpen: true,
    tags: ["AI", "Accessibility", "Inclusion"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "hack3",
    name: "FinTech Innovation Challenge",
    description: "Reimagine financial services for the digital age",
    startDate: "2025-08-05",
    endDate: "2025-08-07",
    prizes: ["$7,500 Grand Prize", "Investor Meetings", "Accelerator Program"],
    participants: 150,
    teams: 35,
    registrationOpen: false,
    tags: ["FinTech", "Blockchain", "Financial Inclusion"],
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function TeamsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("discover")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [teamMatches, setTeamMatches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showTeamForm, setShowTeamForm] = useState(false)
  const [newTeam, setNewTeam] = useState({
    name: "",
    description: "",
    tags: "",
    openRoles: "",
  })

  // Get AI team matches on component mount
  useEffect(() => {
    if (user) {
      setIsLoading(true)
      // Simulate API call delay
      setTimeout(() => {
        const matches = analyzeTeamMatch(user)
        setTeamMatches(matches)
        setIsLoading(false)
      }, 1000)
    }
  }, [user])

  const handleCreateTeam = (e) => {
    e.preventDefault()
    // In a real app, this would send data to the backend
    // For demo, we'll just show a success message and reset the form
    alert("Team created successfully! In a real app, this would create a new team.")
    setNewTeam({
      name: "",
      description: "",
      tags: "",
      openRoles: "",
    })
    setShowTeamForm(false)
  }

  const filteredTeams = teamData.filter((team) => {
    const matchesSearch =
      searchQuery === "" ||
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => team.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  // Get all unique tags from team data
  const allTags = Array.from(new Set(teamData.flatMap((team) => team.tags)))

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
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
            <CardTitle>Teams & Hackathons</CardTitle>
            <CardDescription>Please log in to access team features</CardDescription>
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
          <h1 className="text-3xl font-bold">Teams & Hackathons</h1>
        </div>
        <Button onClick={() => setShowTeamForm(!showTeamForm)}>
          <Plus className="mr-2 h-4 w-4" />
          {showTeamForm ? "Cancel" : "Create Team"}
        </Button>
      </div>

      {showTeamForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Create a New Team</CardTitle>
              <CardDescription>Form a team to collaborate on projects and hackathons</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTeam} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="team-name" className="text-sm font-medium">
                    Team Name
                  </label>
                  <Input
                    id="team-name"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    placeholder="Enter team name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="team-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="team-description"
                    value={newTeam.description}
                    onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                    placeholder="Describe your team's mission and focus"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="team-tags" className="text-sm font-medium">
                      Tags (comma separated)
                    </label>
                    <Input
                      id="team-tags"
                      value={newTeam.tags}
                      onChange={(e) => setNewTeam({ ...newTeam, tags: e.target.value })}
                      placeholder="Web Development, AI, Design"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="team-roles" className="text-sm font-medium">
                      Open Roles (comma separated)
                    </label>
                    <Input
                      id="team-roles"
                      value={newTeam.openRoles}
                      onChange={(e) => setNewTeam({ ...newTeam, openRoles: e.target.value })}
                      placeholder="Frontend Developer, UX Designer"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Create Team</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Tabs defaultValue="discover" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="discover">Discover Teams</TabsTrigger>
          <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
          <TabsTrigger value="matches">AI Team Matches</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teams by name, description, or tags"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Filter by tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTeams.map((team) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          <Users className="mr-2 h-5 w-5 text-primary" />
                          {team.name}
                        </CardTitle>
                        <CardDescription className="mt-1">{team.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="flex items-center">
                        <Zap className="mr-1 h-3 w-3 text-yellow-500" />
                        {team.synergy}% Synergy
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Team Members</h4>
                      <div className="flex -space-x-2 overflow-hidden">
                        {team.members.map((member) => (
                          <Avatar key={member.id} className="border-2 border-background">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {team.openRoles.length > 0 && (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border-2 border-background text-xs font-medium">
                            +{team.openRoles.length}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Projects</h4>
                      <div className="flex flex-wrap gap-2">
                        {team.projects.map((project) => (
                          <Badge key={project} variant="secondary">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {team.openRoles.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Open Roles</h4>
                        <div className="flex flex-wrap gap-2">
                          {team.openRoles.map((role) => (
                            <Badge key={role} variant="outline" className="bg-primary/5">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {team.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Team
                    </Button>
                    <Button size="sm">{team.openRoles.length > 0 ? "Apply to Join" : "Request to Collaborate"}</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hackathons" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hackathonData.map((hackathon) => (
              <motion.div
                key={hackathon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full overflow-hidden">
                  <div className="h-48 relative">
                    <img
                      src={hackathon.image || "/placeholder.svg"}
                      alt={hackathon.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant={hackathon.registrationOpen ? "default" : "secondary"}>
                        {hackathon.registrationOpen ? "Registration Open" : "Registration Closed"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{hackathon.name}</CardTitle>
                    <CardDescription>{hackathon.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
                          {new Date(hackathon.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{hackathon.teams} Teams</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Prizes</h4>
                      <ul className="text-sm space-y-1">
                        {hackathon.prizes.map((prize, index) => (
                          <li key={index} className="flex items-center">
                            <Star className="mr-2 h-3 w-3 text-yellow-500" />
                            {prize}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {hackathon.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Users className="mr-2 h-4 w-4" />
                      Find Team
                    </Button>
                    <Button size="sm" disabled={!hackathon.registrationOpen}>
                      {hackathon.registrationOpen ? "Register Now" : "Registration Closed"}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-primary" />
                AI Team Matching
              </CardTitle>
              <CardDescription>
                Our AI analyzes your skills, personality, and working style to find your ideal teammates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="mt-4 text-muted-foreground">Analyzing your profile and finding matches...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {teamMatches.map((match, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="h-full">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{match.name}</CardTitle>
                              <Badge variant="outline" className="flex items-center">
                                <Zap className="mr-1 h-3 w-3 text-yellow-500" />
                                {match.synergy}% Match
                              </Badge>
                            </div>
                            <CardDescription>{match.role}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                                <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{match.mbti}</p>
                                <p className="text-xs text-muted-foreground">{match.workingVibe}</p>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-2">Skills</h4>
                              <div className="flex flex-wrap gap-2">
                                {match.skills.map((skill) => (
                                  <Badge key={skill} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="pt-2">
                              <Progress value={match.synergy} className="h-2" />
                              <div className="flex justify-between text-xs mt-1">
                                <span>Compatibility</span>
                                <span>{match.synergy}%</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Connect
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Brain className="mr-2 h-5 w-5 text-primary" />
                      Why These Matches?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our AI analyzed your profile and found these potential teammates based on:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                        <span>Complementary skill sets that fill gaps in your expertise</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                        <span>Compatible personality types and working styles</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                        <span>Shared interests in similar project domains</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                        <span>Previous successful collaboration patterns</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
