// Completion tracking for all 8 steps
const STEP_COMPLETION_KEY = 'prp_step_completion'
const TEST_CHECKLIST_KEY = 'placement_test_checklist'
const FINAL_SUBMISSION_KEY = 'prp_final_submission'

export const STEPS = [
  { id: 'dashboard', name: 'Dashboard Overview', path: '/app' },
  { id: 'analyze', name: 'Analyze JD', path: '/app/analyze' },
  { id: 'results', name: 'View Results', path: '/app/results' },
  { id: 'history', name: 'History Tracking', path: '/app/history' },
  { id: 'practice', name: 'Practice', path: '/app/practice' },
  { id: 'assessments', name: 'Assessments', path: '/app/assessments' },
  { id: 'resources', name: 'Resources', path: '/app/resources' },
  { id: 'profile', name: 'Profile', path: '/app/profile' }
]

export function getStepCompletion() {
  try {
    const stored = localStorage.getItem(STEP_COMPLETION_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error loading step completion:', error)
    return {}
  }
}

export function markStepComplete(stepId) {
  try {
    const completion = getStepCompletion()
    completion[stepId] = true
    localStorage.setItem(STEP_COMPLETION_KEY, JSON.stringify(completion))
    return completion
  } catch (error) {
    console.error('Error saving step completion:', error)
    return {}
  }
}

export function areAllStepsComplete() {
  const completion = getStepCompletion()
  return STEPS.every(step => completion[step.id] === true)
}

export function getCompletedStepsCount() {
  const completion = getStepCompletion()
  return STEPS.filter(step => completion[step.id] === true).length
}

export function areAllTestsPassed() {
  try {
    const stored = localStorage.getItem(TEST_CHECKLIST_KEY)
    if (!stored) return false
    
    const checklist = JSON.parse(stored)
    return Object.keys(checklist).length === 10 && 
           Object.values(checklist).every(Boolean)
  } catch (error) {
    console.error('Error checking tests:', error)
    return false
  }
}

export function getFinalSubmission() {
  try {
    const stored = localStorage.getItem(FINAL_SUBMISSION_KEY)
    return stored ? JSON.parse(stored) : {
      lovableLink: '',
      githubLink: '',
      deployedLink: ''
    }
  } catch (error) {
    console.error('Error loading submission:', error)
    return {
      lovableLink: '',
      githubLink: '',
      deployedLink: ''
    }
  }
}

export function saveFinalSubmission(submission) {
  try {
    localStorage.setItem(FINAL_SUBMISSION_KEY, JSON.stringify(submission))
    return true
  } catch (error) {
    console.error('Error saving submission:', error)
    return false
  }
}

export function areAllLinksProvided() {
  const submission = getFinalSubmission()
  return submission.lovableLink && 
         submission.githubLink && 
         submission.deployedLink
}

export function isProjectShipped() {
  return areAllStepsComplete() && 
         areAllTestsPassed() && 
         areAllLinksProvided()
}

export function getProjectStatus() {
  if (isProjectShipped()) {
    return 'Shipped'
  }
  return 'In Progress'
}
