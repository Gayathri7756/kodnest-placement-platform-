const HISTORY_KEY = 'placement_analysis_history'

export function saveAnalysis(analysis) {
  const history = getHistory()
  const entry = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    skillConfidenceMap: {}, // Initialize empty confidence map
    ...analysis
  }
  history.unshift(entry)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  return entry
}

export function getHistory() {
  const stored = localStorage.getItem(HISTORY_KEY)
  return stored ? JSON.parse(stored) : []
}

export function getAnalysisById(id) {
  const history = getHistory()
  return history.find(item => item.id === id)
}

export function updateAnalysis(id, updates) {
  const history = getHistory()
  const index = history.findIndex(item => item.id === id)
  if (index !== -1) {
    history[index] = { ...history[index], ...updates }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    return history[index]
  }
  return null
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY)
}
