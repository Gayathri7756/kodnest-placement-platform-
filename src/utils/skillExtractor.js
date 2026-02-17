// Skill categories and keywords
const SKILL_CATEGORIES = {
  'Core CS': ['dsa', 'data structures', 'algorithms', 'oop', 'object oriented', 'dbms', 'database', 'os', 'operating system', 'networks', 'networking', 'computer networks'],
  'Languages': ['java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'golang', 'go lang', 'ruby', 'php', 'swift', 'kotlin', 'rust', 'scala'],
  'Web': ['react', 'reactjs', 'next.js', 'nextjs', 'node.js', 'nodejs', 'express', 'expressjs', 'rest', 'restful', 'api', 'graphql', 'vue', 'angular', 'html', 'css', 'django', 'flask', 'spring boot'],
  'Data': ['sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'nosql', 'database', 'pandas', 'numpy'],
  'AI/ML': ['machine learning', 'deep learning', 'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'nlp', 'natural language processing', 'computer vision', 'neural network', 'ai', 'ml', 'data science'],
  'Cloud/DevOps': ['aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'jenkins', 'linux', 'devops', 'terraform', 'ansible'],
  'Testing': ['selenium', 'cypress', 'playwright', 'junit', 'pytest', 'testing', 'test automation', 'jest']
}

export function extractSkills(jdText) {
  const lowerText = jdText.toLowerCase()
  const extracted = {}
  
  Object.keys(SKILL_CATEGORIES).forEach(category => {
    const found = []
    SKILL_CATEGORIES[category].forEach(keyword => {
      if (lowerText.includes(keyword)) {
        // Normalize the keyword for display
        const displayName = keyword.charAt(0).toUpperCase() + keyword.slice(1)
        if (!found.includes(displayName)) {
          found.push(displayName)
        }
      }
    })
    if (found.length > 0) {
      extracted[category] = [...new Set(found)]
    }
  })
  
  // If nothing found, add general stack
  if (Object.keys(extracted).length === 0) {
    extracted['General'] = ['Problem Solving', 'Communication', 'Aptitude']
  }
  
  return extracted
}

export function generateChecklist(skills) {
  const rounds = []
  
  // Round 1: Aptitude / Basics
  rounds.push({
    round: 'Round 1: Aptitude & Basics',
    items: [
      'Practice quantitative aptitude (numbers, percentages, ratios)',
      'Solve logical reasoning puzzles',
      'Review verbal ability and comprehension',
      'Practice time management for MCQ tests',
      'Take 2-3 mock aptitude tests'
    ]
  })
  
  // Round 2: DSA + Core CS
  const round2Items = [
    'Review arrays, strings, and linked lists',
    'Practice sorting and searching algorithms',
    'Understand time and space complexity'
  ]
  
  if (skills['Core CS']) {
    if (skills['Core CS'].some(s => s.toLowerCase().includes('oop'))) {
      round2Items.push('Review OOP concepts: inheritance, polymorphism, encapsulation')
    }
    if (skills['Core CS'].some(s => s.toLowerCase().includes('dbms') || s.toLowerCase().includes('database'))) {
      round2Items.push('Study DBMS: normalization, ACID properties, indexing')
    }
    if (skills['Core CS'].some(s => s.toLowerCase().includes('os'))) {
      round2Items.push('Review OS concepts: processes, threads, memory management')
    }
  }
  
  round2Items.push('Solve 10-15 medium-level DSA problems')
  
  rounds.push({
    round: 'Round 2: DSA & Core CS',
    items: round2Items
  })
  
  // Round 3: Technical Interview
  const round3Items = []
  
  if (skills['Languages']) {
    round3Items.push(`Master ${skills['Languages'].slice(0, 2).join(' and ')} syntax and best practices`)
  }
  
  if (skills['Web']) {
    round3Items.push('Build a small project showcasing web development skills')
    if (skills['Web'].some(s => s.toLowerCase().includes('react'))) {
      round3Items.push('Understand React hooks, state management, and component lifecycle')
    }
    if (skills['Web'].some(s => s.toLowerCase().includes('node'))) {
      round3Items.push('Review Node.js: async/await, middleware, REST API design')
    }
  }
  
  if (skills['Data']) {
    round3Items.push('Practice writing SQL queries: joins, subqueries, aggregations')
  }
  
  if (skills['Cloud/DevOps']) {
    round3Items.push('Understand basic cloud concepts and deployment workflows')
  }
  
  round3Items.push('Prepare to explain your projects in detail')
  round3Items.push('Review system design basics (if applicable)')
  
  rounds.push({
    round: 'Round 3: Technical Interview',
    items: round3Items
  })
  
  // Round 4: HR / Managerial
  rounds.push({
    round: 'Round 4: HR & Behavioral',
    items: [
      'Prepare your introduction (30-60 seconds)',
      'Practice STAR method for behavioral questions',
      'Research the company culture and values',
      'Prepare questions to ask the interviewer',
      'Review your strengths, weaknesses, and career goals',
      'Practice common HR questions (why this company, why this role)'
    ]
  })
  
  return rounds
}

export function generate7DayPlan(skills) {
  const plan = []
  
  plan.push({
    day: 'Day 1-2',
    title: 'Basics & Core CS',
    tasks: [
      'Review fundamental CS concepts',
      skills['Core CS'] ? 'Focus on OOP, DBMS, OS, Networks' : 'Study problem-solving fundamentals',
      'Practice 5 easy DSA problems',
      'Take one aptitude mock test'
    ]
  })
  
  plan.push({
    day: 'Day 3-4',
    title: 'DSA & Coding Practice',
    tasks: [
      'Solve 10-12 medium DSA problems',
      'Focus on arrays, strings, trees, graphs',
      skills['Languages'] ? `Practice coding in ${skills['Languages'][0]}` : 'Practice in your preferred language',
      'Review time complexity optimization'
    ]
  })
  
  const day5Tasks = ['Align resume with job requirements', 'Prepare project explanations']
  
  if (skills['Web']) {
    day5Tasks.push('Review web development concepts')
    if (skills['Web'].some(s => s.toLowerCase().includes('react'))) {
      day5Tasks.push('Revise React fundamentals and hooks')
    }
  }
  
  if (skills['Data']) {
    day5Tasks.push('Practice SQL queries and database design')
  }
  
  plan.push({
    day: 'Day 5',
    title: 'Project & Resume Alignment',
    tasks: day5Tasks
  })
  
  plan.push({
    day: 'Day 6',
    title: 'Mock Interviews',
    tasks: [
      'Take a full mock technical interview',
      'Practice explaining your approach out loud',
      'Review common behavioral questions',
      'Get feedback and identify weak areas'
    ]
  })
  
  plan.push({
    day: 'Day 7',
    title: 'Revision & Final Prep',
    tasks: [
      'Revise weak areas identified in mocks',
      'Quick review of all key concepts',
      'Practice your introduction and common questions',
      'Get good rest and stay confident'
    ]
  })
  
  return plan
}

export function generateQuestions(skills) {
  const questions = []
  
  // Always include some general questions
  questions.push('Tell me about yourself and your background.')
  questions.push('What are your strengths and weaknesses?')
  
  // DSA questions
  if (skills['Core CS']) {
    questions.push('Explain the difference between stack and queue. When would you use each?')
    questions.push('How would you optimize search in sorted data?')
    questions.push('Explain OOP principles with real-world examples.')
  }
  
  // Database questions
  if (skills['Data']) {
    questions.push('Explain database indexing and when it helps performance.')
    questions.push('What is the difference between SQL and NoSQL databases?')
    questions.push('How do you handle database transactions and ensure ACID properties?')
  }
  
  // Web development questions
  if (skills['Web']) {
    if (skills['Web'].some(s => s.toLowerCase().includes('react'))) {
      questions.push('Explain React state management options and when to use each.')
      questions.push('What are React hooks and how do they improve functional components?')
    }
    if (skills['Web'].some(s => s.toLowerCase().includes('node'))) {
      questions.push('How does Node.js handle asynchronous operations?')
    }
    questions.push('Explain RESTful API design principles.')
  }
  
  // Language-specific questions
  if (skills['Languages']) {
    const lang = skills['Languages'][0].toLowerCase()
    if (lang.includes('java')) {
      questions.push('Explain Java memory management and garbage collection.')
    } else if (lang.includes('python')) {
      questions.push('What are Python decorators and how do you use them?')
    } else if (lang.includes('javascript')) {
      questions.push('Explain closures and scope in JavaScript.')
    }
  }
  
  // Cloud/DevOps questions
  if (skills['Cloud/DevOps']) {
    questions.push('Explain the benefits of containerization with Docker.')
    questions.push('What is CI/CD and why is it important?')
  }
  
  // Fill remaining slots with general questions
  while (questions.length < 10) {
    const general = [
      'Describe a challenging project you worked on and how you solved it.',
      'How do you stay updated with new technologies?',
      'Explain a time when you had to debug a difficult issue.',
      'What interests you about this role and company?',
      'Where do you see yourself in 3-5 years?'
    ]
    const remaining = general.filter(q => !questions.includes(q))
    if (remaining.length > 0) {
      questions.push(remaining[0])
    } else {
      break
    }
  }
  
  return questions.slice(0, 10)
}

export function calculateReadinessScore(jdText, company, role, skills) {
  let score = 25 // Lower base score
  
  const lowerRole = role.toLowerCase()
  const lowerJD = jdText.toLowerCase()
  
  // Check role-skill alignment
  let roleSkillMatch = 0
  let requiredSkillsPresent = 0
  let totalRequiredSkills = 0
  
  // AI/ML Engineer - needs AI/ML specific skills
  if (lowerRole.includes('ai') || lowerRole.includes('ml') || lowerRole.includes('machine learning')) {
    totalRequiredSkills = 5
    const aiSkills = ['python', 'tensorflow', 'pytorch', 'machine learning', 'deep learning', 'ai', 'ml', 'neural network', 'nlp', 'computer vision']
    aiSkills.forEach(skill => {
      if (lowerJD.includes(skill)) requiredSkillsPresent++
    })
    roleSkillMatch = Math.floor((requiredSkillsPresent / totalRequiredSkills) * 30)
  }
  // Data Scientist/Analyst
  else if (lowerRole.includes('data scientist') || lowerRole.includes('data analyst')) {
    totalRequiredSkills = 5
    const dataSkills = ['python', 'sql', 'pandas', 'numpy', 'statistics', 'data analysis', 'visualization', 'tableau', 'power bi']
    dataSkills.forEach(skill => {
      if (lowerJD.includes(skill)) requiredSkillsPresent++
    })
    roleSkillMatch = Math.floor((requiredSkillsPresent / totalRequiredSkills) * 30)
  }
  // Full Stack/Web Developer
  else if (lowerRole.includes('full stack') || lowerRole.includes('web developer') || lowerRole.includes('frontend') || lowerRole.includes('backend')) {
    totalRequiredSkills = 4
    const webSkills = ['react', 'node', 'javascript', 'typescript', 'html', 'css', 'api', 'rest']
    webSkills.forEach(skill => {
      if (lowerJD.includes(skill)) requiredSkillsPresent++
    })
    roleSkillMatch = Math.floor((requiredSkillsPresent / totalRequiredSkills) * 30)
  }
  // DevOps Engineer
  else if (lowerRole.includes('devops') || lowerRole.includes('sre')) {
    totalRequiredSkills = 4
    const devopsSkills = ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'jenkins', 'linux', 'terraform']
    devopsSkills.forEach(skill => {
      if (lowerJD.includes(skill)) requiredSkillsPresent++
    })
    roleSkillMatch = Math.floor((requiredSkillsPresent / totalRequiredSkills) * 30)
  }
  // Generic Software Engineer
  else {
    totalRequiredSkills = 4
    const genericSkills = ['dsa', 'algorithms', 'data structures', 'oop', 'programming', 'coding']
    genericSkills.forEach(skill => {
      if (lowerJD.includes(skill)) requiredSkillsPresent++
    })
    roleSkillMatch = Math.floor((requiredSkillsPresent / totalRequiredSkills) * 30)
  }
  
  score += roleSkillMatch
  
  // +5 per category detected (max 25)
  const categoryCount = Object.keys(skills).length
  score += Math.min(categoryCount * 5, 25)
  
  // +5 if company provided
  if (company && company.trim().length > 0 && company !== 'Not specified') {
    score += 5
  }
  
  // +5 if role provided
  if (role && role.trim().length > 0 && role !== 'Not specified') {
    score += 5
  }
  
  // +10 if JD is detailed (> 800 chars)
  if (jdText.length > 800) {
    score += 10
  }
  
  // Penalty if role-skill mismatch is severe
  if (totalRequiredSkills > 0 && requiredSkillsPresent === 0) {
    score = Math.max(score - 20, 20) // Significant penalty for complete mismatch
  }
  
  // Cap at 100
  return Math.min(score, 100)
}
