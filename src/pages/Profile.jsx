import { useEffect } from 'react'
import { markStepComplete } from '../utils/completionTracker'

function Profile() {
  useEffect(() => {
    markStepComplete('profile')
  }, [])
  
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Profile</h2>
      <p className="text-gray-600">Manage your account settings and view your progress history.</p>
    </div>
  )
}

export default Profile
