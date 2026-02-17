import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { extractSkills, generateChecklist, generate7DayPlan, generateQuestions, calculateReadinessScore } from '../utils/skillExtractor'
import { saveAnalysis } from '../utils/historyStorage'
import { AlertCircle } from 'lucide-react'

function Analyze() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    jdText: ''
  })
  const [showWarning, setShowWarning] = useState(false)
  const [error, setError] = useState('')

  const handleJDChange = (e) => {
    const text = e.target.value
    setFormData({ ...formData, jdText: text })
    setError('')
    
    // Show warning if JD is too short but not empty
    if (text.length > 0 && text.length < 200) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.jdText.trim()) {
      setError('Job description is required')
      return
    }

    if (formData.jdText.trim().length < 200) {
      setError('Job description is too short. Please paste the full JD for accurate analysis.')
      return
    }

    // Extract skills and generate analysis
    const extractedSkills = extractSkills(formData.jdText)
    const checklist = generateChecklist(extractedSkills)
    const plan = generate7DayPlan(extractedSkills)
    const questions = generateQuestions(extractedSkills)
    const baseScore = calculateReadinessScore(
      formData.jdText,
      formData.company,
      formData.role,
      extractedSkills
    )

    // Create standardized analysis entry
    const analysis = {
      company: formData.company.trim() || 'Not specified',
      role: formData.role.trim() || 'Not specified',
      jdText: formData.jdText,
      extractedSkills,
      checklist,
      plan7Days: plan,
      questions,
      baseScore,
      readinessScore: baseScore, // For backward compatibility
      skillConfidenceMap: {},
      finalScore: baseScore,
      updatedAt: new Date().toISOString()
    }

    const saved = saveAnalysis(analysis)
    
    // Navigate to results with the analysis ID
    navigate(`/app/results?id=${saved.id}`)
  }

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold mb-6">Analyze Job Description</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name (Optional)
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Google, Microsoft, Amazon"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role (Optional)
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Software Engineer, Full Stack Developer, Data Analyst"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.jdText}
                onChange={handleJDChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={12}
                placeholder="Paste the complete job description here... (minimum 200 characters)"
                required
              />
              <div className="flex items-center justify-between mt-2">
                <p className={`text-sm ${
                  formData.jdText.length < 200 && formData.jdText.length > 0
                    ? 'text-orange-600 font-medium'
                    : 'text-gray-500'
                }`}>
                  {formData.jdText.length} characters
                  {formData.jdText.length < 200 && formData.jdText.length > 0 && 
                    ` (${200 - formData.jdText.length} more needed)`
                  }
                </p>
              </div>
              
              {showWarning && (
                <div className="mt-3 p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-orange-900">
                        This JD is too short to analyze deeply.
                      </p>
                      <p className="text-sm text-orange-800 mt-1">
                        Paste the full job description for better output and more accurate skill extraction.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-400 rounded">
                  <p className="text-sm font-medium text-red-900">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Analyze Job Description
        </button>
      </form>
    </div>
  )
}

export default Analyze
