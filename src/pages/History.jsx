import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getHistory, clearHistory } from '../utils/historyStorage'
import { Calendar, Briefcase, TrendingUp, Trash2 } from 'lucide-react'

function History() {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    setHistory(getHistory())
  }

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearHistory()
      loadHistory()
    }
  }

  const handleViewAnalysis = (id) => {
    navigate(`/app/results?id=${id}`)
  }

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Analysis History</h2>
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 px-4 py-2 border border-red-600 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis History</h3>
          <p className="text-gray-600 mb-6">Start by analyzing a job description to see your history here.</p>
          <button
            onClick={() => navigate('/app/analyze')}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Analyze Job Description
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => handleViewAnalysis(item.id)}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:border-primary hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{item.company}</h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {item.role}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {Object.keys(item.extractedSkills).length} skill categories
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {Object.entries(item.extractedSkills).slice(0, 3).map(([category, skills]) => (
                      <span key={category} className="text-xs text-gray-600">
                        {category}: {skills.slice(0, 2).join(', ')}
                        {skills.length > 2 && ` +${skills.length - 2}`}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-3xl font-bold text-primary">
                      {item.currentReadinessScore || item.readinessScore}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">Readiness Score</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default History
