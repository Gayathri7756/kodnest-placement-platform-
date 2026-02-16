import { useNavigate } from 'react-router-dom'
import { Code, Video, TrendingUp } from 'lucide-react'

function LandingPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Code,
      title: 'Practice Problems',
      description: 'Solve curated coding challenges tailored for placement preparation'
    },
    {
      icon: Video,
      title: 'Mock Interviews',
      description: 'Simulate real interview scenarios with AI-powered feedback'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics and insights'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Ace Your Placement
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Practice, assess, and prepare for your dream job
          </p>
          <button
            onClick={() => navigate('/app')}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 KodNest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
