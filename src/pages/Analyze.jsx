import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { extractSkills, generateChecklist, generate7DayPlan, generateQuestions, calculateReadinessScore } from '../utils/skillExtractor'
import { saveAnalysis } from '../utils/historyStorage'

function Analyze() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    jdText: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.jdText.trim()) {
      alert('Please enter a job description')
      return
    }

    // Extract skills and generate analysis
    const extractedSkills = extractSkills(formData.jdText)
    const checklist = generateChecklist(extractedSkills)
    const plan = generate7DayPlan(extractedSkills)
    const questions = generateQuestions(extractedSkills)
    const readinessScore = calculateReadinessScore(
      formData.jdText,
      formData.company,
      formData.role,
      extractedSkills
    )

    // Save to history
    const analysis = {
      company: formData.company || 'Not specified',
      role: formData.role || 'Not specified',
      jdText: formData.jdText,
      extractedSkills,
      checklist,
      plan,
      questions,
      readinessScore
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
                placeholder="e.g., Software Engineer, Full Stack Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.jdText}
                onChange={(e) => setFormData({ ...formData, jdText: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={12}
                placeholder="Paste the complete job description here..."
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.jdText.length} characters
              </p>
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
