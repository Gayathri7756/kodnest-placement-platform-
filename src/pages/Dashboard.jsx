import { Calendar, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import CircularProgress from '../components/CircularProgress'
import SkillRadarChart from '../components/SkillRadarChart'
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card'

function Dashboard() {
  const navigate = useNavigate()
  const [showCompletionState, setShowCompletionState] = React.useState(false)
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const activeDays = [true, true, false, true, true, false, false]

  const upcomingAssessments = [
    { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
    { title: 'System Design Review', time: 'Wed, 2:00 PM' },
    { title: 'HR Interview Prep', time: 'Friday, 11:00 AM' },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <button
          onClick={() => setShowCompletionState(!showCompletionState)}
          className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
        >
          {showCompletionState ? 'Show In Progress' : 'Test: All Complete'}
        </button>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Overall Readiness */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center py-4">
            <CircularProgress value={72} max={100} />
          </CardContent>
        </Card>

        {/* Skill Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillRadarChart />
          </CardContent>
        </Card>

        {/* Continue Practice */}
        <Card>
          <CardHeader>
            <CardTitle>Continue Practice</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Toggle between states using the button above */}
            {(() => {
              const hasIncompleteTopic = !showCompletionState
              const currentTopic = 'Dynamic Programming'
              const completed = 3
              const total = 10

              if (!hasIncompleteTopic) {
                return (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">All Topics Complete!</h4>
                    <p className="text-sm text-gray-600 mb-4">Great job! Consider reviewing previous topics or starting advanced challenges.</p>
                    <button 
                      onClick={() => navigate('/app/practice')}
                      className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Review Topics
                    </button>
                  </div>
                )
              }

              return (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{currentTopic}</h4>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(completed / total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{completed}/{total}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/app/practice')}
                    className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Continue
                  </button>
                </div>
              )
            })()}
          </CardContent>
        </Card>

        {/* Weekly Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Problems Solved</span>
                  <span className="font-semibold text-gray-900">12/20 this week</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: '60%' }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between pt-2">
                {weekDays.map((day, index) => (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                        activeDays[index] 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {day.charAt(0)}
                    </div>
                    <span className="text-xs text-gray-500">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Assessments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAssessments.map((assessment, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{assessment.title}</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{assessment.time}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-primary hover:text-primary/80 font-medium text-sm">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
