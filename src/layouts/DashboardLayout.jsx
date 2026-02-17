import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, Code, ClipboardCheck, BookOpen, User, FileSearch, History } from 'lucide-react'

function DashboardLayout() {
  const navItems = [
    { path: '/app', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/app/analyze', label: 'Analyze JD', icon: FileSearch },
    { path: '/app/history', label: 'History', icon: History },
    { path: '/app/practice', label: 'Practice', icon: Code },
    { path: '/app/assessments', label: 'Assessments', icon: ClipboardCheck },
    { path: '/app/resources', label: 'Resources', icon: BookOpen },
    { path: '/app/profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold">Placement Prep</h2>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/app'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Placement Prep</h1>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
            U
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
