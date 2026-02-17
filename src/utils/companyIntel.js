// Known enterprise companies
const ENTERPRISE_COMPANIES = [
  'amazon', 'google', 'microsoft', 'apple', 'meta', 'facebook',
  'netflix', 'uber', 'airbnb', 'salesforce', 'oracle', 'ibm',
  'infosys', 'tcs', 'wipro', 'cognizant', 'accenture', 'deloitte',
  'capgemini', 'hcl', 'tech mahindra', 'ltimindtree', 'persistent',
  'adobe', 'intel', 'nvidia', 'cisco', 'vmware', 'sap', 'dell',
  'hp', 'jpmorgan', 'goldman sachs', 'morgan stanley', 'wells fargo',
  'bank of america', 'citigroup', 'walmart', 'target', 'paypal',
  'visa', 'mastercard', 'american express', 'flipkart', 'paytm',
  'swiggy', 'zomato', 'ola', 'phonepe', 'razorpay'
]

const MID_SIZE_COMPANIES = [
  'freshworks', 'zoho', 'postman', 'browserstack', 'chargebee',
  'clevertap', 'druva', 'hashedin', 'thoughtworks', 'publicis sapient',
  'nagarro', 'epam', 'globant', 'endurance', 'mu sigma'
]

export function generateCompanyIntel(companyName, skills) {
  const lowerCompany = companyName.toLowerCase().trim()
  
  // Determine company size
  let size = 'Startup'
  let sizeCategory = 'startup'
  
  if (ENTERPRISE_COMPANIES.some(c => lowerCompany.includes(c))) {
    size = 'Enterprise (2000+)'
    sizeCategory = 'enterprise'
  } else if (MID_SIZE_COMPANIES.some(c => lowerCompany.includes(c))) {
    size = 'Mid-size (200-2000)'
    sizeCategory = 'midsize'
  } else {
    size = 'Startup (<200)'
    sizeCategory = 'startup'
  }
  
  // Infer industry
  let industry = 'Technology Services'
  
  if (lowerCompany.includes('bank') || lowerCompany.includes('finance') || 
      lowerCompany.includes('capital') || lowerCompany.includes('jpmorgan') ||
      lowerCompany.includes('goldman') || lowerCompany.includes('morgan stanley')) {
    industry = 'Financial Services'
  } else if (lowerCompany.includes('health') || lowerCompany.includes('medical') ||
             lowerCompany.includes('pharma')) {
    industry = 'Healthcare & Life Sciences'
  } else if (lowerCompany.includes('retail') || lowerCompany.includes('ecommerce') ||
             lowerCompany.includes('amazon') || lowerCompany.includes('flipkart') ||
             lowerCompany.includes('walmart')) {
    industry = 'E-commerce & Retail'
  } else if (lowerCompany.includes('food') || lowerCompany.includes('swiggy') ||
             lowerCompany.includes('zomato') || lowerCompany.includes('uber')) {
    industry = 'Food & Transportation Tech'
  } else if (lowerCompany.includes('payment') || lowerCompany.includes('pay') ||
             lowerCompany.includes('razorpay') || lowerCompany.includes('paytm')) {
    industry = 'Fintech & Payments'
  }
  
  // Determine hiring focus
  let hiringFocus = ''
  
  if (sizeCategory === 'enterprise') {
    hiringFocus = 'Structured DSA + Core Fundamentals. Emphasis on algorithmic thinking, system design basics, and strong CS fundamentals. Multi-round process with standardized evaluation.'
  } else if (sizeCategory === 'midsize') {
    hiringFocus = 'Balanced approach: DSA fundamentals + practical coding. Focus on problem-solving ability and technology stack proficiency. Moderate process complexity.'
  } else {
    hiringFocus = 'Practical problem solving + Stack depth. Focus on hands-on coding, project experience, and ability to ship features quickly. Streamlined hiring process.'
  }
  
  return {
    name: companyName,
    industry,
    size,
    sizeCategory,
    hiringFocus
  }
}

export function generateRoundMapping(companyIntel, skills, role = '') {
  const { sizeCategory } = companyIntel
  const lowerRole = role.toLowerCase()
  
  const hasDSA = skills['Core CS'] && skills['Core CS'].some(s => 
    s.toLowerCase().includes('dsa') || s.toLowerCase().includes('algorithm')
  )
  const hasWeb = skills['Web'] && skills['Web'].length > 0
  const hasAIML = skills['AI/ML'] && skills['AI/ML'].length > 0
  const hasData = skills['Data'] && skills['Data'].length > 0
  
  // Check if role is data-focused
  const isDataRole = lowerRole.includes('data analyst') || 
                     lowerRole.includes('data scientist') || 
                     lowerRole.includes('business analyst') ||
                     lowerRole.includes('analytics')
  
  // Check if role is AI/ML focused
  const isAIMLRole = lowerRole.includes('ml') || 
                     lowerRole.includes('machine learning') ||
                     lowerRole.includes('ai engineer') ||
                     lowerRole.includes('data scientist')
  
  // Check if role is design/product focused
  const isDesignRole = lowerRole.includes('designer') || 
                       lowerRole.includes('product') ||
                       lowerRole.includes('ux') ||
                       lowerRole.includes('ui')
  
  let rounds = []
  
  // Data Analyst/Scientist specific rounds
  if (isDataRole) {
    if (sizeCategory === 'enterprise') {
      rounds = [
        {
          round: 'Round 1',
          title: 'SQL + Analytics Assessment',
          description: 'SQL queries + Data interpretation + Statistics MCQs',
          why: 'Tests fundamental data manipulation skills. Evaluates ability to extract insights from data using SQL and basic statistical knowledge.',
          duration: '60-90 min'
        },
        {
          round: 'Round 2',
          title: 'Technical Interview - Data Analysis',
          description: 'Case study + SQL deep-dive + Python/Excel',
          why: 'Assesses problem-solving with real business scenarios. Tests proficiency in data tools and ability to derive actionable insights.',
          duration: '45-60 min'
        },
        {
          round: 'Round 3',
          title: 'Business Case Discussion',
          description: 'Metrics definition + Dashboard design + Stakeholder communication',
          why: 'Evaluates business acumen and communication skills. Tests ability to translate data insights into business recommendations.',
          duration: '45-60 min'
        },
        {
          round: 'Round 4',
          title: 'HR & Behavioral',
          description: 'Culture fit + Behavioral questions + Compensation',
          why: 'Assesses soft skills, team fit, and motivation. Discusses expectations, career goals, and finalizes offer details.',
          duration: '30-45 min'
        }
      ]
    } else if (sizeCategory === 'midsize') {
      rounds = [
        {
          round: 'Round 1',
          title: 'SQL + Analytics Test',
          description: 'SQL queries + Data interpretation + Basic statistics',
          why: 'Initial assessment of data manipulation and analytical thinking skills.',
          duration: '45-60 min'
        },
        {
          round: 'Round 2',
          title: 'Technical + Case Study',
          description: 'Live SQL + Business problem solving + Tool proficiency',
          why: 'Deep-dive into technical skills and business understanding. Tests practical application of analytics.',
          duration: '60 min'
        },
        {
          round: 'Round 3',
          title: 'Managerial Round',
          description: 'Past projects + Stakeholder management + Team fit',
          why: 'Evaluates experience and ability to work cross-functionally. Assesses communication and collaboration skills.',
          duration: '45 min'
        }
      ]
    } else {
      // Startup
      rounds = [
        {
          round: 'Round 1',
          title: 'Practical Analytics Challenge',
          description: 'Real dataset analysis + SQL + Visualization',
          why: 'Startups need analysts who can deliver insights quickly. Tests hands-on ability with real-world messy data.',
          duration: '60-90 min'
        },
        {
          round: 'Round 2',
          title: 'Technical Discussion',
          description: 'Analysis review + Metrics discussion + Tool stack',
          why: 'Evaluates analytical approach and business thinking. Discusses trade-offs and methodology choices.',
          duration: '45-60 min'
        },
        {
          round: 'Round 3',
          title: 'Founder/Culture Fit',
          description: 'Vision alignment + Learning mindset + Impact focus',
          why: 'Startups need self-driven analysts who can wear multiple hats. Assesses adaptability and ownership mentality.',
          duration: '30-45 min'
        }
      ]
    }
    return rounds
  }
  
  // AI/ML Engineer specific rounds
  if (isAIMLRole) {
    if (sizeCategory === 'enterprise') {
      rounds = [
        {
          round: 'Round 1',
          title: 'ML Fundamentals Assessment',
          description: 'ML algorithms + Statistics + Python coding',
          why: 'Tests foundational ML knowledge and programming skills. Covers supervised/unsupervised learning, model evaluation.',
          duration: '60-90 min'
        },
        {
          round: 'Round 2',
          title: 'ML System Design',
          description: 'Model architecture + Feature engineering + Deployment',
          why: 'Evaluates ability to design end-to-end ML systems. Tests understanding of ML pipeline and production considerations.',
          duration: '60 min'
        },
        {
          round: 'Round 3',
          title: 'Technical Deep-Dive',
          description: 'Past ML projects + Model optimization + Research discussion',
          why: 'Assesses depth of ML experience and problem-solving approach. Discusses challenges faced and solutions implemented.',
          duration: '45-60 min'
        },
        {
          round: 'Round 4',
          title: 'HR & Behavioral',
          description: 'Culture fit + Team collaboration + Offer discussion',
          why: 'Evaluates soft skills and team dynamics. Finalizes expectations and compensation.',
          duration: '30-45 min'
        }
      ]
    } else {
      rounds = [
        {
          round: 'Round 1',
          title: 'ML Coding Challenge',
          description: 'Build ML model + Feature engineering + Evaluation',
          why: 'Tests practical ML implementation skills. Evaluates ability to work with real datasets and deliver results.',
          duration: '90-120 min'
        },
        {
          round: 'Round 2',
          title: 'Technical Discussion',
          description: 'Model review + Architecture decisions + ML stack',
          why: 'Deep-dive into ML approach and technical choices. Discusses model performance and optimization strategies.',
          duration: '60 min'
        },
        {
          round: 'Round 3',
          title: 'Team & Culture Fit',
          description: 'Research interests + Learning approach + Vision alignment',
          why: 'Assesses passion for ML and continuous learning mindset. Evaluates fit with team and company goals.',
          duration: '45 min'
        }
      ]
    }
    return rounds
  }
  
  // Design/Product roles
  if (isDesignRole) {
    rounds = [
      {
        round: 'Round 1',
        title: 'Portfolio Review',
        description: 'Design portfolio + Case studies + Design process',
        why: 'Evaluates design thinking and past work quality. Assesses ability to articulate design decisions.',
        duration: '45-60 min'
      },
      {
        round: 'Round 2',
        title: 'Design Challenge',
        description: 'Live design task + User research + Prototyping',
        why: 'Tests practical design skills and problem-solving approach. Evaluates user-centric thinking.',
        duration: '60-90 min'
      },
      {
        round: 'Round 3',
        title: 'Team Collaboration',
        description: 'Cross-functional work + Feedback handling + Culture fit',
        why: 'Assesses ability to work with engineers and PMs. Evaluates communication and collaboration skills.',
        duration: '45 min'
      }
    ]
    return rounds
  }
  
  // Default: Software Engineering rounds (existing logic)
  if (sizeCategory === 'enterprise') {
    rounds = [
      {
        round: 'Round 1',
        title: 'Online Assessment',
        description: 'DSA problems + Aptitude + MCQs',
        why: 'Filters candidates at scale. Tests fundamental problem-solving and CS knowledge. Typically 60-90 minutes with 2-3 coding problems.',
        duration: '60-90 min'
      },
      {
        round: 'Round 2',
        title: 'Technical Interview - DSA',
        description: 'Live coding + Data structures & Algorithms',
        why: 'Evaluates coding ability under pressure. Interviewers assess approach, optimization, and communication. Focus on arrays, trees, graphs, DP.',
        duration: '45-60 min'
      },
      {
        round: 'Round 3',
        title: 'Technical Interview - System Design',
        description: hasAIML ? 'ML System Design + Projects' : 'System Design + Core CS + Projects',
        why: 'Tests architectural thinking and scalability concepts. For freshers, focuses on basic design principles and project deep-dive.',
        duration: '45-60 min'
      },
      {
        round: 'Round 4',
        title: 'HR & Behavioral',
        description: 'Culture fit + Behavioral questions + Compensation',
        why: 'Assesses soft skills, team fit, and motivation. Discusses expectations, career goals, and finalizes offer details.',
        duration: '30-45 min'
      }
    ]
  } else if (sizeCategory === 'midsize') {
    rounds = [
      {
        round: 'Round 1',
        title: 'Screening Round',
        description: hasDSA ? 'DSA + Aptitude' : 'Practical Coding + Technical MCQs',
        why: 'Initial filter to assess baseline technical skills. Mix of problem-solving and domain knowledge.',
        duration: '45-60 min'
      },
      {
        round: 'Round 2',
        title: 'Technical Interview',
        description: hasWeb ? 'Live coding + Stack-specific questions' : 'DSA + Core CS concepts',
        why: 'Deep-dive into technical skills. Tests both theoretical knowledge and practical coding ability.',
        duration: '60 min'
      },
      {
        round: 'Round 3',
        title: 'Technical + Managerial',
        description: 'Project discussion + Problem-solving + Team fit',
        why: 'Evaluates project experience and ability to work in teams. Assesses learning attitude and adaptability.',
        duration: '45 min'
      }
    ]
  } else {
    // Startup
    rounds = [
      {
        round: 'Round 1',
        title: 'Practical Coding Challenge',
        description: hasWeb ? 'Build a feature or fix bugs' : 'Solve real-world problems',
        why: 'Startups need people who can ship code fast. Tests hands-on ability and familiarity with modern tools.',
        duration: '60-90 min'
      },
      {
        round: 'Round 2',
        title: 'Technical Discussion',
        description: 'Code review + Architecture discussion + Stack knowledge',
        why: 'Evaluates code quality, design decisions, and depth of understanding. Discusses trade-offs and best practices.',
        duration: '45-60 min'
      },
      {
        round: 'Round 3',
        title: 'Founder/Culture Fit',
        description: 'Vision alignment + Learning mindset + Ownership',
        why: 'Startups need self-driven individuals who align with company vision. Assesses hustle, adaptability, and passion.',
        duration: '30-45 min'
      }
    ]
  }
  
  return rounds
}
