import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, AlertTriangle, RefreshCw, Lock, Unlock } from 'lucide-react'

const TEST_CHECKLIST_KEY = 'placement_test_checklist'

const TEST_ITEMS = [
  {
    id: 'jd-required',
    label: 'JD required validation works',
    hint: 'Go to Analyze page, try to submit without entering any JD. Should show error message.'
  },
  {
    id: 'short-jd-warning',
    label: 'Short JD warning shows for <200 chars',
    hint: 'Enter less than 200 characters in JD field. Should show orange warning message.'
  },
  {
    id: 'skills-extraction',
    label: 'Skills extraction groups correctly',
    hint: 'Analyze a JD with React, Python, SQL. Check if skills are grouped by category (Web, Languages, Data).'
  },
  {
    id: 'round-mapping',
    label: 'Round mapping changes based on company + skills',
    hint: 'Test with "Amazon" + "Software Engineer" vs "Startup" + "Data Analyst". Rounds should differ.'
  },
  {
    id: 'score-deterministic',
    label: 'Score calculation is deterministic',
    hint: 'Analyze same JD twice. Should get same base score both times.'
  },
  {
    id: 'skill-toggles',
    label: 'Skill toggles update score live',
    hint: 'On Results page, toggle a skill from "Need practice" to "I know this". Score should increase by 2.'
  },
  {
    id: 'persist-refresh',
    label: 'Changes persist after refresh',
    hint: 'Toggle skills, note the score, refresh page. Score should remain the same.'
  },
  {
    id: 'history-works',
    label: 'History saves and loads correctly',
    hint: 'Analyze a JD, go to History, click the entry. Should load full analysis with all data.'
  },
  {
    id: 'export-buttons',
    label: 'Export buttons copy correct content',
    hint: 'Click "Copy 7-Day Plan" button. Paste in notepad. Should contain the plan text.'
  },
  {
    id: 'no-console-errors',
    label: 'No console errors on core pages',
    hint: 'Open DevTools Console. Visit Landing, Dashboard, Analyze, Results, History. Should have zero errors.'
  }
]

function Testing() {
  const navigate = useNavigate()
  const [checklist, setChecklist] = useState({})
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  useEffect(() => {
    loadChecklist()
  }, [])

  const loadChecklist = () => {
    try {
      const stored = localStorage.getItem(TEST_CHECKLIST_KEY)
      if (stored) {
        setChecklist(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading checklist:', error)
    }
  }

  const saveChecklist = (newChecklist) => {
    try {
      localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(newChecklist))
      setChecklist(newChecklist)
    } catch (error) {
      console.error('Error saving checklist:', error)
    }
  }

  const handleToggle = (id) => {
    const newChecklist = {
      ...checklist,
      [id]: !checklist[id]
    }
    saveChecklist(newChecklist)
  }

  const handleReset = () => {
    saveChecklist({})
    setShowResetConfirm(false)
  }

  const passedCount = Object.values(checklist).filter(Boolean).length
  const totalCount = TEST_ITEMS.length
  const allPassed = passedCount === totalCount

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Test & Debug Checklist</h2>
      <p className="text-gray-600 mb-8">
        Verify all features work correctly before shipping. Testing isn't optional—it's how you replace luck with confidence.
      </p>

      {/* Summary Card */}
      <div className={`rounded-lg p-6 mb-6 ${
        allPassed 
          ? 'bg-green-50 border-2 border-green-500' 
          : 'bg-orange-50 border-2 border-orange-400'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {allPassed ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            )}
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Tests Passed: {passedCount} / {totalCount}
              </h3>
              {allPassed ? (
                <p className="text-green-800 font-medium">
                  ✓ All tests passed! Ready to ship.
                </p>
              ) : (
                <p className="text-orange-800 font-medium">
                  ⚠ Fix issues before shipping.
                </p>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Checklist
          </button>
        </div>

        {!allPassed && (
          <div className="mt-4 p-4 bg-white rounded border border-orange-300">
            <p className="text-sm text-orange-900">
              <strong>Remaining:</strong> {totalCount - passedCount} test{totalCount - passedCount !== 1 ? 's' : ''} to complete
            </p>
          </div>
        )}
      </div>

      {/* Reset Confirmation */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold mb-2">Reset Checklist?</h3>
            <p className="text-gray-600 mb-6">
              This will uncheck all items. You'll need to test everything again.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checklist Items */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Test Items</h3>
        <div className="space-y-4">
          {TEST_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                checklist[item.id]
                  ? 'bg-green-50 border-green-500'
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist[item.id] || false}
                  onChange={() => handleToggle(item.id)}
                  className="w-5 h-5 mt-0.5 cursor-pointer accent-green-600"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">
                      Test {index + 1}
                    </span>
                    {checklist[item.id] && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <p className="font-semibold text-gray-900 mt-1">
                    {item.label}
                  </p>
                  <details className="mt-2">
                    <summary className="text-sm text-primary cursor-pointer hover:underline">
                      How to test
                    </summary>
                    <p className="text-sm text-gray-600 mt-2 pl-4 border-l-2 border-primary">
                      {item.hint}
                    </p>
                  </details>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Ship Button */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Ready to Ship?</h3>
            <p className="text-gray-600">
              {allPassed 
                ? 'All tests passed. You can proceed to deployment.'
                : 'Complete all tests before shipping to production.'
              }
            </p>
          </div>
          
          <button
            onClick={() => allPassed && navigate('/app/ship')}
            disabled={!allPassed}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              allPassed
                ? 'bg-primary hover:bg-primary/90 text-white cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {allPassed ? (
              <>
                <Unlock className="w-5 h-5" />
                Proceed to Ship
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Locked
              </>
            )}
          </button>
        </div>
      </div>

      {/* Testing Philosophy */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Why Testing Matters</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• <strong>Happy path testing isn't enough.</strong> Real users don't follow your script.</p>
          <p>• <strong>Edge cases reveal character.</strong> How your app handles errors defines quality.</p>
          <p>• <strong>Persistence is critical.</strong> Data must survive refreshes and browser restarts.</p>
          <p>• <strong>Console errors are bugs.</strong> Zero errors should be your standard.</p>
          <p className="pt-2 italic text-gray-600">
            "Confidence comes from proof. Testing is how you replace luck with certainty."
          </p>
        </div>
      </div>
    </div>
  )
}

export default Testing
