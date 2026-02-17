export function copy7DayPlan(plan) {
  let text = '7-DAY PREPARATION PLAN\n\n'
  plan.forEach(day => {
    text += `${day.day}: ${day.title}\n`
    day.tasks.forEach(task => {
      text += `  • ${task}\n`
    })
    text += '\n'
  })
  return text
}

export function copyRoundChecklist(checklist) {
  let text = 'ROUND-WISE PREPARATION CHECKLIST\n\n'
  checklist.forEach(round => {
    text += `${round.round}\n`
    round.items.forEach(item => {
      text += `  ☐ ${item}\n`
    })
    text += '\n'
  })
  return text
}

export function copyQuestions(questions) {
  let text = '10 LIKELY INTERVIEW QUESTIONS\n\n'
  questions.forEach((question, idx) => {
    text += `${idx + 1}. ${question}\n\n`
  })
  return text
}

export function downloadFullReport(analysis) {
  let text = '═══════════════════════════════════════════════════════\n'
  text += '           PLACEMENT READINESS ANALYSIS REPORT\n'
  text += '═══════════════════════════════════════════════════════\n\n'
  
  text += `Company: ${analysis.company}\n`
  text += `Role: ${analysis.role}\n`
  text += `Date: ${new Date(analysis.createdAt).toLocaleDateString()}\n`
  text += `Readiness Score: ${analysis.currentReadinessScore || analysis.readinessScore}/100\n\n`
  
  text += '───────────────────────────────────────────────────────\n'
  text += 'KEY SKILLS EXTRACTED\n'
  text += '───────────────────────────────────────────────────────\n\n'
  Object.entries(analysis.extractedSkills).forEach(([category, skills]) => {
    text += `${category}:\n`
    skills.forEach(skill => {
      const confidence = analysis.skillConfidenceMap?.[skill] || 'practice'
      const status = confidence === 'know' ? '✓' : '○'
      text += `  ${status} ${skill}\n`
    })
    text += '\n'
  })
  
  text += '───────────────────────────────────────────────────────\n'
  text += 'ROUND-WISE PREPARATION CHECKLIST\n'
  text += '───────────────────────────────────────────────────────\n\n'
  analysis.checklist.forEach(round => {
    text += `${round.round}\n`
    round.items.forEach(item => {
      text += `  ☐ ${item}\n`
    })
    text += '\n'
  })
  
  text += '───────────────────────────────────────────────────────\n'
  text += '7-DAY PREPARATION PLAN\n'
  text += '───────────────────────────────────────────────────────\n\n'
  analysis.plan.forEach(day => {
    text += `${day.day}: ${day.title}\n`
    day.tasks.forEach(task => {
      text += `  • ${task}\n`
    })
    text += '\n'
  })
  
  text += '───────────────────────────────────────────────────────\n'
  text += '10 LIKELY INTERVIEW QUESTIONS\n'
  text += '───────────────────────────────────────────────────────\n\n'
  analysis.questions.forEach((question, idx) => {
    text += `${idx + 1}. ${question}\n\n`
  })
  
  text += '═══════════════════════════════════════════════════════\n'
  text += '                    END OF REPORT\n'
  text += '═══════════════════════════════════════════════════════\n'
  
  // Create and download file
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `placement-analysis-${analysis.company.replace(/\s+/g, '-')}-${Date.now()}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    return Promise.resolve()
  }
}
