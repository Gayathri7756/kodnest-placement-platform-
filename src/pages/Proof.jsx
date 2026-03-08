import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Copy, ExternalLink, AlertTriangle } from 'lucide-react'
import {
  STEPS,
  getStepCompletion,
  areAllStepsComplete,
  getCompletedStepsCount,
  areAllTestsPassed,
  getFinalSubmission,
  saveFinalSubmission,
  areAllLinksProvided,
  isProjectShipped,
  getProjectStatus
} from '../utils/completionTracker'

function Proof() {
  const [submission, setSubmission] = useState({
    lovableLink: '',
    githubLink: '',
    deployedLink: ''
  })
  const [errors, setErrors] = useState({})
  const [copySuccess, setCopySuccess] = useState(false)
  const [stepCompletion, setStepCompletion] = useState({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const saved = getFinalSubmission()
    setSubmission(saved)
    setStepCompletion(getStepCompletion())
  }

  const validateURL = (url) => {
    if (!url) return false
    try {
      new URL(url)
      return url.startsWith('http://') || url.startsWith('https://')
    } catch {
      return false
    }
  }

  const handleInputChange = (field, value) => {
    const newSubmission = { ...submission, [field]: value }
    setSubmission(newSubmission)
    
    // Validate and save
    const newErrors = { ...errors }
    if (value && !validateURL(value)) {
      newErrors[field] = 'Please enter a valid URL (must start with http:// or https://)'
    } else {
      delete newErrors[field]
    }
    setErrors(newErrors)
    
    // Save to localStorage if valid
    if (!newErrors[field]) {
      saveFinalSubmission(newSubmission)
    }
  }

  const handleCopySubmission = () => {
    const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${submission.lovableLink || '[Not provided]'}
GitHub Repository: ${submission.githubLink || '[Not provided]'}
Live Deployment: ${submission.deployedLink || '[Not provided]'}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`

    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }).catch(err => {
      console.error('Failed to copy:', err)
    })
  }

  const completedSteps = getCompletedStepsCount()
  const allStepsComplete = areAllStepsComplete()
  const allTestsPassed = areAllTestsPassed()
  const allLinksProvided = areAllLinksProvided()
  const shipped = isProjectShipped()
  const status = getProjectStatus()

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Proof of Work</h2>
      <p className="text-gray-600 mb-8">
        Document your journey and submit your final project artifacts.
      </p>

      {/* Project Status Badge */}
      <div className={`rounded-lg p-6 mb-6 ${
        shipped 
          ? 'bg-green-50 border-2 border-green-500' 
          : 'bg-blue-50 border-2 border-blue-400'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              Project Status: {status}
            </h3>
            {shipped ? (
              <p className="text-green-800 font-medium">
                ✓ All requirements met. Project is shipped!
              </p>
            ) : (
              <p className="text-blue-800 font-medium">
                Complete all requirements to achieve "Shipped" status.
              </p>
            )}
          </div>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${
            shipped ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
          }`}>
            {shipped ? '✓' : '...'}
          </div>
        </div>
      </div>

      {/* Completion Message */}
      {shipped && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-lg p-8 mb-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            You built a real product.
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Not a tutorial. Not a clone.<br />
            A structured tool that solves a real problem.<br />
            <strong className="text-purple-900">This is your proof of work.</strong>
          </p>
        </div>
      )}

      {/* Step Completion Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">
          Step Completion Overview ({completedSteps} / {STEPS.length})
        </h3>
        <div className="space-y-2">
          {STEPS.map((step) => {
            const isComplete = stepCompletion[step.id] === true
            return (
              <div
                key={step.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isComplete ? 'bg-green-50' : 'bg-gray-50'
                }`}
              >
                <span className="font-medium text-gray-900">{step.name}</span>
                {isComplete ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
              </div>
            )
          })}
        </div>
        {!allStepsComplete && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded">
            <p className="text-sm text-orange-900">
              <strong>Note:</strong> Visit each page to mark steps as complete.
            </p>
          </div>
        )}
      </div>

      {/* Test Checklist Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-1">Test Checklist</h3>
            <p className="text-sm text-gray-600">
              All 10 test items must pass before shipping
            </p>
          </div>
          {allTestsPassed ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">10 / 10 Passed</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="w-6 h-6" />
              <span className="font-semibold">Incomplete</span>
            </div>
          )}
        </div>
      </div>

      {/* Artifact Inputs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">
          Project Artifacts (Required for Ship Status)
        </h3>
        
        <div className="space-y-4">
          {/* Lovable Project Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lovable Project Link <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={submission.lovableLink}
                onChange={(e) => handleInputChange('lovableLink', e.target.value)}
                placeholder="https://lovable.dev/projects/..."
                className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.lovableLink 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-primary'
                }`}
              />
              {submission.lovableLink && !errors.lovableLink && (
                <a
                  href={submission.lovableLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <ExternalLink className="w-5 h-5 text-gray-600" />
                </a>
              )}
            </div>
            {errors.lovableLink && (
              <p className="text-sm text-red-600 mt-1">{errors.lovableLink}</p>
            )}
          </div>

          {/* GitHub Repository Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub Repository Link <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={submission.githubLink}
                onChange={(e) => handleInputChange('githubLink', e.target.value)}
                placeholder="https://github.com/username/repo"
                className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.githubLink 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-primary'
                }`}
              />
              {submission.githubLink && !errors.githubLink && (
                <a
                  href={submission.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <ExternalLink className="w-5 h-5 text-gray-600" />
                </a>
              )}
            </div>
            {errors.githubLink && (
              <p className="text-sm text-red-600 mt-1">{errors.githubLink}</p>
            )}
          </div>

          {/* Deployed URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deployed URL <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={submission.deployedLink}
                onChange={(e) => handleInputChange('deployedLink', e.target.value)}
                placeholder="https://your-app.vercel.app"
                className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.deployedLink 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-primary'
                }`}
              />
              {submission.deployedLink && !errors.deployedLink && (
                <a
                  href={submission.deployedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <ExternalLink className="w-5 h-5 text-gray-600" />
                </a>
              )}
            </div>
            {errors.deployedLink && (
              <p className="text-sm text-red-600 mt-1">{errors.deployedLink}</p>
            )}
          </div>
        </div>

        {allLinksProvided && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <strong>All links provided!</strong>
            </p>
          </div>
        )}
      </div>

      {/* Copy Final Submission */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Final Submission Export</h3>
        <p className="text-sm text-gray-600 mb-4">
          Copy your formatted submission text to share with instructors or include in your portfolio.
        </p>
        <button
          onClick={handleCopySubmission}
          className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
        >
          <Copy className="w-5 h-5" />
          {copySuccess ? 'Copied!' : 'Copy Final Submission'}
        </button>
      </div>

      {/* Requirements Summary */}
      <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Shipped Status Requirements</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            {allStepsComplete ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <XCircle className="w-4 h-4 text-gray-400" />
            )}
            <span className={allStepsComplete ? 'text-green-900' : 'text-gray-700'}>
              All 8 steps marked completed
            </span>
          </div>
          <div className="flex items-center gap-2">
            {allTestsPassed ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <XCircle className="w-4 h-4 text-gray-400" />
            )}
            <span className={allTestsPassed ? 'text-green-900' : 'text-gray-700'}>
              All 10 checklist items passed
            </span>
          </div>
          <div className="flex items-center gap-2">
            {allLinksProvided ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <XCircle className="w-4 h-4 text-gray-400" />
            )}
            <span className={allLinksProvided ? 'text-green-900' : 'text-gray-700'}>
              All 3 proof links provided
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Proof
