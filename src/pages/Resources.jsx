import { useEffect } from 'react'
import { markStepComplete } from '../utils/completionTracker'

function Resources() {
  useEffect(() => {
    markStepComplete('resources')
  }, [])
  
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Resources</h2>
      <p className="text-gray-600">Access study materials, guides, and helpful resources for placement preparation.</p>
    </div>
  )
}

export default Resources
