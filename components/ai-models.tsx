"use client"

// This file contains simulated AI models for demo purposes
// In a real application, these would be API calls to actual ML models

// Simulated AI career simulation generator
export function generateCareerSimPlan(role: string) {
  // Pre-defined career simulation plans
  const careerPlans = {
    "Frontend Developer": {
      schedule: [
        { time: "9:00 AM", task: "Team standup meeting", description: "Discuss progress and blockers with the team" },
        { time: "10:00 AM", task: "Code review", description: "Review pull requests from teammates" },
        { time: "11:00 AM", task: "Development work", description: "Implement new features for the dashboard" },
        { time: "1:00 PM", task: "Lunch break", description: "Take time to recharge" },
        { time: "2:00 PM", task: "Bug fixing", description: "Address reported issues in the application" },
        { time: "3:30 PM", task: "Client demo", description: "Present new features to stakeholders" },
        { time: "4:30 PM", task: "Planning", description: "Plan tasks for the next day" },
      ],
      microTask: {
        title: "Fix a UI Bug",
        description: "There's a button that doesn't align properly on mobile. How would you fix it?",
        options: [
          "Add custom CSS for mobile breakpoints",
          "Use a responsive framework like Tailwind",
          "Restructure the component hierarchy",
        ],
      },
      emotionalChallenge: {
        scenario: "Your pull request received critical feedback. How do you respond?",
        options: [
          "Defend your approach firmly",
          "Thank the reviewer and address the concerns",
          "Feel discouraged but make the changes anyway",
        ],
        bestResponse: 1,
      },
    },
    "UX Designer": {
      schedule: [
        { time: "9:00 AM", task: "Design team sync", description: "Align on design system updates" },
        { time: "10:00 AM", task: "User research", description: "Analyze user feedback and behavior data" },
        { time: "11:30 AM", task: "Wireframing", description: "Create wireframes for new feature" },
        { time: "1:00 PM", task: "Lunch break", description: "Take time to recharge" },
        { time: "2:00 PM", task: "Stakeholder meeting", description: "Present design concepts to product team" },
        { time: "3:30 PM", task: "Prototyping", description: "Create interactive prototype in Figma" },
        { time: "5:00 PM", task: "Design critique", description: "Get feedback from other designers" },
      ],
      microTask: {
        title: "Improve User Flow",
        description: "Users are dropping off during the onboarding process. How would you improve it?",
        options: [
          "Add more visual cues and progress indicators",
          "Reduce the number of steps in the flow",
          "Conduct user interviews to identify pain points",
        ],
      },
      emotionalChallenge: {
        scenario: "The development team says your design is too complex to implement. How do you respond?",
        options: [
          "Insist that user experience shouldn't be compromised",
          "Work with developers to find a middle ground",
          "Completely redesign based on technical constraints",
        ],
        bestResponse: 1,
      },
    },
    "Data Scientist": {
      schedule: [
        { time: "9:00 AM", task: "Data review", description: "Check overnight model performance" },
        { time: "10:00 AM", task: "Feature engineering", description: "Develop new features for recommendation model" },
        { time: "11:30 AM", task: "Experimentation", description: "Run A/B tests on algorithm variants" },
        { time: "1:00 PM", task: "Lunch break", description: "Take time to recharge" },
        { time: "2:00 PM", task: "Cross-functional meeting", description: "Explain findings to product team" },
        { time: "3:30 PM", task: "Model training", description: "Train and validate improved models" },
        { time: "5:00 PM", task: "Documentation", description: "Document methodology and results" },
      ],
      microTask: {
        title: "Interpret Model Results",
        description: "Your model shows unexpected behavior. How would you debug it?",
        options: [
          "Check for data quality issues",
          "Review feature importance and correlations",
          "Test simpler models to establish baselines",
        ],
      },
      emotionalChallenge: {
        scenario:
          "Non-technical stakeholders don't understand why your model makes certain predictions. How do you handle this?",
        options: [
          "Use technical jargon to assert your expertise",
          "Create visualizations to explain model behavior",
          "Simplify the model even if it reduces accuracy",
        ],
        bestResponse: 1,
      },
    },
    "Product Manager": {
      schedule: [
        { time: "9:00 AM", task: "Team standup", description: "Check progress on sprint goals" },
        { time: "10:00 AM", task: "Customer interviews", description: "Gather feedback on recent features" },
        { time: "11:30 AM", task: "Roadmap planning", description: "Prioritize features for next quarter" },
        { time: "1:00 PM", task: "Lunch break", description: "Take time to recharge" },
        { time: "2:00 PM", task: "Stakeholder meeting", description: "Update executives on product progress" },
        { time: "3:30 PM", task: "Feature specification", description: "Write detailed specs for engineering team" },
        { time: "5:00 PM", task: "Analytics review", description: "Analyze product metrics and user behavior" },
      ],
      microTask: {
        title: "Prioritize Features",
        description: "You have limited resources. Which feature would you prioritize and why?",
        options: [
          "High-impact feature requested by a few enterprise customers",
          "Medium-impact feature requested by many users",
          "Low-effort feature that improves existing functionality",
        ],
      },
      emotionalChallenge: {
        scenario: "Your team is behind schedule and a key stakeholder is pressuring you. How do you respond?",
        options: [
          "Push the team harder to meet the deadline",
          "Negotiate scope reduction while maintaining core value",
          "Blame engineering for the delays",
        ],
        bestResponse: 1,
      },
    },
    "Social Entrepreneur": {
      schedule: [
        { time: "9:00 AM", task: "Impact metrics review", description: "Analyze social impact data" },
        { time: "10:00 AM", task: "Community outreach", description: "Meet with community representatives" },
        { time: "11:30 AM", task: "Grant writing", description: "Work on funding proposal" },
        { time: "1:00 PM", task: "Lunch break", description: "Take time to recharge" },
        { time: "2:00 PM", task: "Team alignment", description: "Ensure team is aligned on mission and values" },
        { time: "3:30 PM", task: "Partnership development", description: "Meet with potential corporate partner" },
        { time: "5:00 PM", task: "Reflection", description: "Journal about day's learnings and challenges" },
      ],
      microTask: {
        title: "Solve a Resource Challenge",
        description: "Your initiative needs more volunteers. How would you recruit them?",
        options: [
          "Launch a social media campaign highlighting impact stories",
          "Partner with local universities for service-learning credits",
          "Redesign volunteer roles to require less time commitment",
        ],
      },
      emotionalChallenge: {
        scenario:
          "A funder wants you to pivot your approach in a way that might dilute your mission. How do you respond?",
        options: [
          "Reject the funding to maintain mission integrity",
          "Find a compromise that preserves core values while meeting funder needs",
          "Pivot completely to secure the funding",
        ],
        bestResponse: 1,
      },
    },
  }

  // Return the plan for the requested role, or a default one if not found
  return careerPlans[role] || careerPlans["Frontend Developer"]
}

// Simulated AI magic box item generator
export function suggestMagicBoxItem(userData: any) {
  const items = [
    {
      type: "mindfulness",
      title: "🌿 Mindfulness Mission",
      description: "Take 5 minutes to journal about something you're grateful for today.",
      xpReward: 50,
    },
    {
      type: "creative",
      title: "🎨 Creative Challenge",
      description: "Design a logo for your dream app or project in 15 minutes.",
      xpReward: 75,
    },
    {
      type: "social",
      title: "👋 Connection Quest",
      description: "Reach out to someone in the community whose work you admire.",
      xpReward: 60,
    },
    {
      type: "technical",
      title: "💻 Code Sprint",
      description: "Solve this quick coding challenge in under 10 minutes.",
      xpReward: 80,
      challenge: "Create a function that reverses a string without using built-in reverse methods.",
    },
    {
      type: "leadership",
      title: "🚀 Leadership Moment",
      description: "Give constructive feedback to help someone improve their project.",
      xpReward: 70,
    },
    {
      type: "reflection",
      title: "🔍 Reflection Point",
      description: "What's one thing you learned this week that surprised you?",
      xpReward: 45,
    },
    {
      type: "teamwork",
      title: "🤝 Team Builder",
      description: "Suggest a solution to a problem someone posted in the community.",
      xpReward: 65,
    },
  ]

  // In a real app, we would use the userData to personalize the suggestion
  // For demo, we'll just return a random item
  const randomIndex = Math.floor(Math.random() * items.length)
  return items[randomIndex]
}

// Simulated AI team matcher
export function analyzeTeamMatch(userData: any) {
  // In a real app, this would use ML to match based on skills, personality, etc.
  // For demo, we'll return pre-defined matches

  const teamMatches = [
    {
      name: "Zara",
      role: "UX Dreamer",
      avatar: "/placeholder.svg?height=50&width=50",
      mbti: "INFJ",
      skills: ["UI Design", "User Research", "Prototyping"],
      workingVibe: "Thoughtful Planner",
      synergy: 97,
    },
    {
      name: "Arun",
      role: "Fast Builder",
      avatar: "/placeholder.svg?height=50&width=50",
      mbti: "ENTP",
      skills: ["React", "Node.js", "MongoDB"],
      workingVibe: "Energetic Coder",
      synergy: 92,
    },
    {
      name: "Mei",
      role: "Data Wizard",
      avatar: "/placeholder.svg?height=50&width=50",
      mbti: "INTJ",
      skills: ["Data Analysis", "Python", "Visualization"],
      workingVibe: "Deep Thinker",
      synergy: 88,
    },
    {
      name: "Jamal",
      role: "Community Connector",
      avatar: "/placeholder.svg?height=50&width=50",
      mbti: "ESFJ",
      skills: ["Project Management", "Communication", "Marketing"],
      workingVibe: "Team Harmonizer",
      synergy: 94,
    },
  ]

  // For demo, return top 3 matches
  return teamMatches.slice(0, 3)
}

// Simulated AI puzzle quest analyzer
export function analyzePuzzleResponse(scenario: string, response: number) {
  const puzzleScenarios = {
    team_ghosting: {
      scenario: "Your hackathon team loses interest midway. What do you do?",
      responses: [
        {
          text: "Push harder and set stricter deadlines",
          analysis:
            "This approach might create pressure and resistance. While showing determination, it could damage team morale.",
          skillsGained: ["Determination"],
          skillsNeeded: ["Empathy", "Flexibility"],
          score: 5,
        },
        {
          text: "Host a fun check-in call to rebuild motivation",
          analysis:
            "Great choice! You recognized the human element of teamwork. Reconnecting on a personal level often reignites shared purpose.",
          skillsGained: ["Empathy", "Leadership", "Team Building"],
          skillsNeeded: [],
          score: 9,
        },
        {
          text: "Take a break and talk through everyone's concerns",
          analysis:
            "Good approach that shows emotional intelligence. Taking time to address concerns demonstrates that you value team wellbeing.",
          skillsGained: ["Emotional Intelligence", "Communication"],
          skillsNeeded: ["Time Management"],
          score: 8,
        },
      ],
    },
    feedback_handling: {
      scenario: "You receive harsh feedback on your project presentation. How do you respond?",
      responses: [
        {
          text: "Defend your work and explain why the criticism is wrong",
          analysis:
            "This defensive stance might prevent you from gaining valuable insights. Growth often comes from considering different perspectives.",
          skillsGained: ["Conviction"],
          skillsNeeded: ["Openness", "Growth Mindset"],
          score: 4,
        },
        {
          text: "Thank them for the feedback and ask clarifying questions",
          analysis:
            "Excellent choice! You're showing maturity and a growth mindset. Seeking to understand criticism helps you improve.",
          skillsGained: ["Growth Mindset", "Emotional Intelligence", "Communication"],
          skillsNeeded: [],
          score: 10,
        },
        {
          text: "Silently accept the feedback but feel discouraged",
          analysis:
            "While it's good to receive feedback without argument, not engaging constructively misses an opportunity for dialogue and growth.",
          skillsGained: ["Humility"],
          skillsNeeded: ["Self-advocacy", "Resilience"],
          score: 6,
        },
      ],
    },
    resource_conflict: {
      scenario: "Two team members both need your help during a critical deadline. How do you handle it?",
      responses: [
        {
          text: "Help the person whose work is more critical to the project",
          analysis:
            "This shows good prioritization skills, but consider whether you could briefly check in with both to assess urgency.",
          skillsGained: ["Decision Making", "Prioritization"],
          skillsNeeded: ["Communication"],
          score: 7,
        },
        {
          text: "Quickly assess both needs and create a plan to help both",
          analysis:
            "Excellent! This balanced approach shows leadership and problem-solving. You're finding ways to support everyone while respecting constraints.",
          skillsGained: ["Leadership", "Time Management", "Problem Solving"],
          skillsNeeded: [],
          score: 9,
        },
        {
          text: "Ask another team member to help one of them",
          analysis:
            "Good delegation skills! Recognizing when to involve others shows team awareness, though make sure to follow up later.",
          skillsGained: ["Delegation", "Team Awareness"],
          skillsNeeded: ["Follow-through"],
          score: 8,
        },
      ],
    },
  }

  // Get the scenario data
  const scenarioData = puzzleScenarios[scenario] || puzzleScenarios.team_ghosting

  // Return the analysis for the selected response
  return scenarioData.responses[response] || scenarioData.responses[0]
}

// Simulated festival theme generator
export function getCurrentFestivalTheme() {
  // In a real app, this would check the current date and return the appropriate theme
  // For demo, we'll rotate through themes

  const themes = [
    {
      name: "Holi",
      description: "Festival of Colors",
      uiTheme: {
        primaryColor: "hsl(280, 87%, 65%)", // Purple
        secondaryColor: "hsl(47, 100%, 68%)", // Yellow
        particleEffect: "confetti",
      },
      challenge: {
        title: "Color Your Code Challenge",
        description: "Create the most visually appealing UI component using at least 5 colors.",
        reward: "Rainbow Coder Badge",
      },
    },
    {
      name: "Diwali",
      description: "Festival of Lights",
      uiTheme: {
        primaryColor: "hsl(45, 100%, 60%)", // Gold
        secondaryColor: "hsl(25, 100%, 50%)", // Orange
        particleEffect: "sparkles",
      },
      challenge: {
        title: "Ignite Ideas That Light Lives",
        description: "Pitch an app idea that could bring light to someone's life.",
        reward: "Idea Illuminator Badge",
      },
    },
    {
      name: "Mental Health Month",
      description: "Focus on Wellbeing",
      uiTheme: {
        primaryColor: "hsl(160, 100%, 40%)", // Teal
        secondaryColor: "hsl(190, 90%, 80%)", // Light Blue
        particleEffect: "gentle-waves",
      },
      challenge: {
        title: "Mindful Code Challenge",
        description: "Create a small app feature that promotes mental wellbeing.",
        reward: "Wellness Advocate Badge",
      },
    },
  ]

  // For demo, return a random theme
  const randomIndex = Math.floor(Math.random() * themes.length)
  return themes[randomIndex]
}
