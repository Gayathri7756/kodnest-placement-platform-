function CircularProgress({ value, max = 100, size = 200, strokeWidth = 12 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (value / max) * circumference
  const remaining = circumference - progress

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(245, 58%, 51%)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${progress} ${remaining}`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-gray-900">{value}</span>
          <span className="text-gray-500 text-sm">/ {max}</span>
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-700">Readiness Score</p>
    </div>
  )
}

export default CircularProgress
