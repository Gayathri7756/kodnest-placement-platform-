import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Rocket, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react'

const TEST_CHECKLIST_KEY = 'placement_test_checklist'

function Ship() {
  const navigate = useNavigate()
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    checkTestCompletion()
  }, [])

  const checkTestCompletion = () => {
    try {
      const stored = localStorage.getItem(TEST_CHECKLIST_KEY)
      if (stored) {
        const checklist = JSON.parse(stored)
        const allPassed = Object.keys(checklist).length === 10 && 
                         Object.values(checklist).every(Boolean)
        setIsUnlocked(allPassed)
      }
      setChecking(false)
    } catch (error) {
      console.error('Error checking tests:', error)
      setChecking(false)
    }
  }

  if (checking) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Checking test completion...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isUnlocked) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-8 text-center">
          <AlertTriangle className="w-16 h-16 text-orange-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Ship Locked
          </h2>
          <p className="text-gray-700 mb-6">
            You must complete all 10 tests before shipping to production.
          </p>
          <button
            onClick={() => navigate('/app/testing')}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Test Checklist
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Ready to Ship! 🎉
            </h2>
            <p className="text-green-800">
              All tests passed. Your platform is production-ready.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Rocket className="w-6 h-6 text-primary" />
          Deployment Options
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
            <h4 className="font-semibold text-gray-900 mb-2">GitHub Pages</h4>
            <p className="text-sm text-gray-600 mb-3">
              Already configured and deployed. Your app is live at:
            </p>
            <a
              href="https://gayathri7756.github.io/kodnest-placement-platform-/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              View Live Site
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
            <h4 className="font-semibold text-gray-900 mb-2">Vercel</h4>
            <p className="text-sm text-gray-600 mb-3">
              Connected to your GitHub repository. Auto-deploys on push.
            </p>
            <p className="text-sm text-gray-500">
              Check your Vercel dashboard for deployment status.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Post-Deployment Checklist</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" />
            <span>Verify live site loads correctly</span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" />
            <span>Test core user flows on production</span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" />
            <span>Check mobile responsiveness</span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" />
            <span>Monitor console for errors</span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" />
            <span>Share with test users for feedback</span>
          </label>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Remember:</strong> Shipping is not the end—it's the beginning. Monitor user feedback, 
          fix bugs quickly, and iterate based on real usage patterns.
        </p>
      </div>
    </div>
  )
}

export default Ship
