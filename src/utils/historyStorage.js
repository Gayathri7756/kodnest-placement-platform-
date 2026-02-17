const HISTORY_KEY = 'placement_analysis_history'

// Standardized schema for analysis entry
function createStandardizedEntry(analysis) {
  return {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    company: analysis.company || '',
    role: analysis.role || '',
    jdText: analysis.jdText || '',
    extractedSkills: analysis.extractedSkills || {},
    checklist: analysis.checklist || [],
    plan7Days: analysis.plan7Days || analysis.plan || [],
    questions: analysis.questions || [],
    baseScore: analysis.baseScore || analysis.readinessScore || 0,
    readinessScore: analysis.baseScore || analysis.readinessScore || 0, // For backward compatibility
    skillConfidenceMap: analysis.skillConfidenceMap || {},
    finalScore: analysis.finalScore || analysis.baseScore || analysis.readinessScore || 0,
    currentReadinessScore: analysis.finalScore || analysis.baseScore || analysis.readinessScore || 0, // For backward compatibility
    updatedAt: analysis.updatedAt || new Date().toISOString(),
    companyIntel: analysis.companyIntel || null,
    roundMapping: analysis.roundMapping || []
  }
}

export function saveAnalysis(analysis) {
  try {
    const history = getHistory()
    const entry = createStandardizedEntry(analysis)
    history.unshift(entry)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    return entry
  } catch (error) {
    console.error('Error saving analysis:', error)
    throw new Error('Failed to save analysis')
  }
}

export function getHistory() {
  try {
    const stored = localStorage.getItem(HISTORY_KEY)
    if (!stored) return []
    
    const history = JSON.parse(stored)
    
    // Filter out corrupted entries
    const validHistory = history.filter(entry => {
      try {
        // Validate required fields
        return entry.id && 
               entry.createdAt && 
               typeof entry.jdText === 'string' &&
               typeof entry.extractedSkills === 'object'
      } catch {
        return false
      }
    })
    
    // If some entries were filtered out, update localStorage
    if (validHistory.length !== history.length) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(validHistory))
    }
    
    return validHistory
  } catch (error) {
    console.error('Error loading history:', error)
    // Return empty array if localStorage is corrupted
    return []
  }
}

export function getAnalysisById(id) {
  try {
    const history = getHistory()
    const entry = history.find(item => item.id === id)
    
    if (!entry) return null
    
    // Ensure entry has all required fields
    return createStandardizedEntry(entry)
  } catch (error) {
    console.error('Error loading analysis:', error)
    return null
  }
}

export function updateAnalysis(id, updates) {
  try {
    const history = getHistory()
    const index = history.findIndex(item => item.id === id)
    
    if (index !== -1) {
      history[index] = {
        ...history[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
      return history[index]
    }
    return null
  } catch (error) {
    console.error('Error updating analysis:', error)
    return null
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY)
  } catch (error) {
    console.error('Error clearing history:', error)
  }
}
