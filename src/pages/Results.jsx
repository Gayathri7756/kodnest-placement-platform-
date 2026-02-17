import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getAnalysisById } from '../utils/historyStorage'
import { CheckCircle, Calendar, Target, HelpCircle, ArrowLeft } from 'lucide-react'

function Results() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      const data = getAnalysisById(id)
      if (data) {
        setAnalysis(data)
      } else {
        navigate('/app/analyze')
      }
    } else {
      navigate('/app/analyze')
    }
  }, [searchParams, navigate])

  if (!analysis) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-6xl">
      <button
        onClick={() => navigate('/app/analyze')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Analyze
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Analysis Results</h2>
        <div className="flex gap-4 text-sm text-gray-600">
          <span><strong>Company:</strong> {analysis.company}</span>
          <span><strong>Role:</strong> {analysis.role}</span>
          <span><strong>Date:</strong> {new Date(analysis.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Readiness Score */}
      <div className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg p-8 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Readiness Score</h3>
            <p className="text-white/80">Based on JD analysis and profile completeness</p>
          </div>
          <div className="text-6xl font-bold">{analysis.readinessScore}</div>
        </div>
      </div>

      {/* Extracted Skills */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Key Skills Extracted
        </h3>
        <div className="space-y-4">
          {Object.entries(analysis.extractedSkills).map(([category, skills]) => (
            <div key={category}>
              <h4 className="font-medium text-gray-700 mb-2">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Round-wise Checklist */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          Round-wise Preparation Checklist
        </h3>
        <div className="space-y-6">
          {analysis.checklist.map((round, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-gray-900 mb-3">{round.round}</h4>
              <ul className="space-y-2">
                {round.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Plan */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          7-Day Preparation Plan
        </h3>
        <div className="space-y-4">
          {analysis.plan.map((day, idx) => (
            <div key={idx} className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold text-gray-900 mb-1">
                {day.day}: {day.title}
              </h4>
              <ul className="space-y-1">
                {day.tasks.map((task, taskIdx) => (
                  <li key={taskIdx} className="text-sm text-gray-600">
                    • {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Likely Interview Questions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          10 Likely Interview Questions
        </h3>
        <div className="space-y-3">
          {analysis.questions.map((question, idx) => (
            <div key={idx} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                {idx + 1}
              </span>
              <p className="text-gray-700">{question}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate('/app/history')}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          View History
        </button>
        <button
          onClick={() => navigate('/app/analyze')}
          className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Analyze Another JD
        </button>
      </div>
    </div>
  )
}

export default Results
