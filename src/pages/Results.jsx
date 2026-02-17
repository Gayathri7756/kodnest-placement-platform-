import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getAnalysisById, updateAnalysis } from '../utils/historyStorage'
import { copy7DayPlan, copyRoundChecklist, copyQuestions, downloadFullReport, copyToClipboard } from '../utils/exportUtils'
import { CheckCircle, Calendar, Target, HelpCircle, ArrowLeft, Download, Copy, Check, AlertCircle } from 'lucide-react'

function Results() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [currentScore, setCurrentScore] = useState(0)
  const [copiedItem, setCopiedItem] = useState(null)

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      const data = getAnalysisById(id)
      if (data) {
        // Initialize skillConfidenceMap if not exists
        if (!data.skillConfidenceMap) {
          data.skillConfidenceMap = {}
        }
        setAnalysis(data)
        setCurrentScore(data.currentReadinessScore || data.readinessScore)
      } else {
        navigate('/app/analyze')
      }
    } else {
      navigate('/app/analyze')
    }
  }, [searchParams, navigate])

  const handleSkillToggle = (skill) => {
    if (!analysis) return

    const currentConfidence = analysis.skillConfidenceMap[skill] || 'practice'
    const newConfidence = currentConfidence === 'practice' ? 'know' : 'practice'
    
    // Update confidence map
    const updatedConfidenceMap = {
      ...analysis.skillConfidenceMap,
      [skill]: newConfidence
    }

    // Calculate new score
    const baseScore = analysis.readinessScore
    let scoreAdjustment = 0
    
    Object.values(updatedConfidenceMap).forEach(confidence => {
      if (confidence === 'know') {
        scoreAdjustment += 2
      } else if (confidence === 'practice') {
        scoreAdjustment -= 2
      }
    })

    const newScore = Math.max(0, Math.min(100, baseScore + scoreAdjustment))

    // Update analysis
    const updatedAnalysis = {
      ...analysis,
      skillConfidenceMap: updatedConfidenceMap,
      currentReadinessScore: newScore
    }

    setAnalysis(updatedAnalysis)
    setCurrentScore(newScore)

    // Persist to localStorage
    updateAnalysis(analysis.id, {
      skillConfidenceMap: updatedConfidenceMap,
      currentReadinessScore: newScore
    })
  }

  const handleCopy = async (type) => {
    let text = ''
    
    switch(type) {
      case 'plan':
        text = copy7DayPlan(analysis.plan)
        break
      case 'checklist':
        text = copyRoundChecklist(analysis.checklist)
        break
      case 'questions':
        text = copyQuestions(analysis.questions)
        break
    }

    try {
      await copyToClipboard(text)
      setCopiedItem(type)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      alert('Failed to copy to clipboard')
    }
  }

  const handleDownload = () => {
    downloadFullReport(analysis)
  }

  const getWeakSkills = () => {
    if (!analysis) return []
    const weak = []
    Object.entries(analysis.skillConfidenceMap).forEach(([skill, confidence]) => {
      if (confidence === 'practice') {
        weak.push(skill)
      }
    })
    return weak.slice(0, 3)
  }

  if (!analysis) {
    return <div>Loading...</div>
  }

  const weakSkills = getWeakSkills()

  return (
    <div className="max-w-6xl">
      <button
        onClick={() => navigate('/app/history')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to History
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
            <p className="text-white/80">Updates in real-time based on your skill confidence</p>
          </div>
          <div className="text-6xl font-bold">{currentScore}</div>
        </div>
      </div>

      {/* Extracted Skills with Toggle */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Key Skills Extracted - Self Assessment
        </h3>
        <p className="text-sm text-gray-600 mb-4">Toggle each skill to indicate your confidence level. This will update your readiness score.</p>
        <div className="space-y-4">
          {Object.entries(analysis.extractedSkills).map(([category, skills]) => (
            <div key={category}>
              <h4 className="font-medium text-gray-700 mb-2">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => {
                  const confidence = analysis.skillConfidenceMap[skill] || 'practice'
                  const isKnown = confidence === 'know'
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isKnown
                          ? 'bg-green-100 text-green-700 border-2 border-green-500'
                          : 'bg-orange-50 text-orange-700 border-2 border-orange-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isKnown ? (
                          <>
                            <Check className="w-4 h-4" />
                            {skill} - I know this
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4" />
                            {skill} - Need practice
                          </>
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Tools */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Export Tools</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => handleCopy('plan')}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {copiedItem === 'plan' ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy 7-Day Plan</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => handleCopy('checklist')}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {copiedItem === 'checklist' ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Checklist</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => handleCopy('questions')}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {copiedItem === 'questions' ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Questions</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download as TXT</span>
          </button>
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

      {/* Action Next Box */}
      {weakSkills.length > 0 && (
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-orange-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Action Next
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-orange-800 font-medium mb-2">Top skills needing practice:</p>
              <div className="flex flex-wrap gap-2">
                {weakSkills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-orange-200 text-orange-900 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-orange-300">
              <p className="text-orange-900 font-semibold text-lg">
                💡 Suggested Action: Start Day 1 plan now.
              </p>
              <p className="text-orange-800 text-sm mt-1">
                Focus on building fundamentals and addressing your weak areas first.
              </p>
            </div>
          </div>
        </div>
      )}

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
