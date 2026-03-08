# Quick Reference - Testing & Ship Features

## 🚀 Quick Start

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open browser:**
   ```
   http://localhost:5173
   ```

3. **Navigate to Testing:**
   - Click "Get Started"
   - Click "Testing" in sidebar

4. **Complete checklist:**
   - Check all 10 items
   - Click "Proceed to Ship"

5. **Verify Ship unlocked:**
   - Should see green success banner
   - Deployment links visible

---

## 📍 Routes

| Page | URL | Status |
|------|-----|--------|
| Testing | `/app/testing` | ✅ Active |
| Ship | `/app/ship` | 🔒 Locked until tests pass |

---

## 🔑 localStorage Key

**Key:** `placement_test_checklist`

**Check in DevTools:**
1. F12 → Application tab
2. Local Storage → http://localhost:5173
3. Find: `placement_test_checklist`

**Manual unlock (for testing):**
```javascript
// Paste in browser console
localStorage.setItem('placement_test_checklist', JSON.stringify({
  'jd-required': true,
  'short-jd-warning': true,
  'skills-extraction': true,
  'round-mapping': true,
  'score-deterministic': true,
  'skill-toggles': true,
  'persist-refresh': true,
  'history-works': true,
  'export-buttons': true,
  'no-console-errors': true
}));
// Refresh page
```

**Manual lock (reset):**
```javascript
localStorage.removeItem('placement_test_checklist');
// Refresh page
```

---

## ✅ 10 Test Items

1. ✓ JD required validation works
2. ✓ Short JD warning shows for <200 chars
3. ✓ Skills extraction groups correctly
4. ✓ Round mapping changes based on company + skills
5. ✓ Score calculation is deterministic
6. ✓ Skill toggles update score live
7. ✓ Changes persist after refresh
8. ✓ History saves and loads correctly
9. ✓ Export buttons copy correct content
10. ✓ No console errors on core pages

---

## 🎯 Expected Behavior

### When 0-9 tests checked:
- Counter shows "Tests Passed: X / 10"
- Orange warning: "⚠ Fix issues before shipping"
- "Proceed to Ship" button is LOCKED (gray, disabled)
- Ship page shows lock screen if accessed directly

### When all 10 tests checked:
- Counter shows "Tests Passed: 10 / 10"
- Green success: "✓ All tests passed! Ready to ship"
- "Proceed to Ship" button is UNLOCKED (blue, enabled)
- Ship page shows success screen with deployment info

---

## 🐛 Troubleshooting

### Issue: Checkboxes don't persist
**Solution:** Check if localStorage is enabled in browser

### Issue: Ship always locked
**Solution:** 
1. Open DevTools console
2. Run: `JSON.parse(localStorage.getItem('placement_test_checklist'))`
3. Verify all 10 keys exist and all are `true`

### Issue: Counter stuck
**Solution:** Hard refresh (Ctrl+Shift+R)

### Issue: Console errors
**Solution:** Check which page has errors, report specific error message

---

## 📦 Files to Review

- `src/pages/Testing.jsx` - Main checklist logic
- `src/pages/Ship.jsx` - Lock/unlock logic
- `src/App.jsx` - Routes
- `src/layouts/DashboardLayout.jsx` - Navigation

---

## 🔄 Git Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Add Testing checklist and Ship lock features"

# Push to GitHub
git push origin main

# Check remote
git remote -v
```

---

## 🌐 Deployment URLs

- **GitHub Pages:** https://gayathri7756.github.io/kodnest-placement-platform-/
- **Vercel:** Check your Vercel dashboard

---

## 📞 Support

If something doesn't work:
1. Check browser console (F12)
2. Verify localStorage value
3. Check network tab for failed requests
4. Try hard refresh (Ctrl+Shift+R)
5. Clear localStorage and test again

---

**Current Status:** ✅ Implementation complete, ready for testing

**Dev Server:** Running on http://localhost:5173

**Next Action:** Open browser and start verification!
