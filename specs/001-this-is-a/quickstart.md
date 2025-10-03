# Quickstart Guide: Charades PWA Testing

**Feature**: 001-this-is-a
**Date**: 2025-10-02
**Purpose**: Manual testing guide for validating bug fixes and cleanup

---

## Prerequisites

- Node.js and npm installed
- Project cloned to local machine
- Terminal/command prompt access

---

## Setup

### 1. Install Dependencies

```bash
cd charades
npm install
```

### 2. Build the Project

```bash
npm run build
```

This compiles Sass and runs Eleventy to generate the `docs/` directory.

### 3. Start Development Server

```bash
npm start
```

This runs both Sass and Eleventy in watch mode. The app will be available at the local server URL shown in terminal (typically http://localhost:8080).

---

## Test Scenarios

### Scenario 1: Settings Button Functionality ✓

**Requirement**: FR-001, FR-002, FR-003

**Steps**:
1. Open the app in browser
2. Click the settings gear icon in the top-right corner
3. **Expected**: Settings panel slides in from the right
4. Click the X button in the panel header
5. **Expected**: Settings panel closes
6. Click the settings icon again to open
7. Click anywhere outside the panel (on the main content area)
8. **Expected**: Settings panel closes

**Edge Case Test**:
- Click rapidly on the settings icon multiple times
- **Expected**: Panel opens/closes smoothly without errors

**Validation**:
- [ ] Settings icon responds to clicks
- [ ] Panel opens when icon clicked
- [ ] Panel closes when X clicked
- [ ] Panel closes when clicking outside
- [ ] No console errors

---

### Scenario 2: Background Color Selection ✓

**Requirement**: FR-004, FR-006

**Steps**:
1. Open settings panel
2. Observe current background color
3. Click a different color swatch in the color palette
4. **Expected**: Background color changes immediately
5. Close settings panel
6. Refresh the browser page
7. **Expected**: Selected background color persists

**Validation**:
- [ ] Color changes when swatch clicked
- [ ] Selected swatch shows visual indicator
- [ ] Color persists after page refresh
- [ ] No console errors

---

### Scenario 3: Screen Wake Lock Toggle ✓

**Requirement**: FR-005, FR-006

**Steps**:
1. Open settings panel
2. Toggle "Keep Screen Awake" switch to ON
3. **Expected**: Switch shows enabled state
4. Close settings panel
5. Refresh the browser page
6. Open settings panel again
7. **Expected**: Switch remains in ON position

**Note**: Actual wake lock functionality requires user gesture and may not work in all browsers. This test validates the toggle state persistence.

**Validation**:
- [ ] Toggle switches between on/off
- [ ] Toggle state persists after refresh
- [ ] Console shows wake lock request (if supported)
- [ ] No errors if wake lock not supported

---

### Scenario 4: Category Selection & Card Display ✓

**Requirement**: FR-008, FR-010, FR-011

**Steps**:
1. On main screen, click "Film" button
2. **Expected**: Card displays with movie title, year, director
3. Click "Film" button again
4. **Expected**: Different movie appears
5. Repeat for other categories:
   - TV Show
   - Video Game
   - Song
   - Book
6. **Expected**: Each category displays appropriate content

**Validation**:
- [ ] Film button shows movie with director
- [ ] TV Show button shows series with creator
- [ ] Game button shows game with developer
- [ ] Song button shows song with artist
- [ ] Book button shows book with author
- [ ] Each card shows title and year
- [ ] Random selection varies each click

---

### Scenario 5: Usage Tracking & Reset ✓

**Requirement**: FR-007, FR-012

**Steps**:
1. Click "Film" button 5 times, note the titles shown
2. Open settings panel
3. Click "Reset Used Content" button
4. **Expected**: Alert/confirmation appears
5. Close settings panel
6. Click "Film" button multiple times
7. **Expected**: Previously shown movies may appear again

**Validation**:
- [ ] Reset button exists in settings
- [ ] Reset button shows confirmation
- [ ] After reset, used items can be selected again
- [ ] No console errors

---

### Scenario 6: Data Loading & Error Handling ✓

**Requirement**: FR-008, FR-009, FR-022

**Steps**:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh the page
4. **Expected**: See requests for:
   - /data/movies.json
   - /data/tvshows.json
   - /data/games.json
   - /data/songs.json
   - /data/books.json
5. Verify all return 200 status
6. **Expected**: No external API calls visible

**Error Test** (Optional):
1. Rename one JSON file temporarily
2. Refresh the page
3. **Expected**: Error message appears
4. Restore the file

**Validation**:
- [ ] All JSON files load successfully
- [ ] No external API calls made
- [ ] Console shows "Content loaded successfully"
- [ ] Error shown if file missing

---

### Scenario 7: PWA Installation & Offline Mode ✓

**Requirement**: FR-013, FR-014, FR-015, FR-016

**Steps (Chrome/Edge)**:
1. Open app in browser
2. Look for install icon in address bar
3. Click to install PWA
4. **Expected**: App installs to desktop/home screen
5. Open installed app
6. Open DevTools > Application > Service Workers
7. **Expected**: Service worker registered and active
8. Toggle "Offline" checkbox
9. Click category buttons
10. **Expected**: App continues to work offline

**Steps (iOS Safari)**:
1. Open app in Safari
2. Tap Share button
3. Tap "Add to Home Screen"
4. **Expected**: App icon appears on home screen
5. Tap icon to launch
6. **Expected**: App opens in standalone mode

**Validation**:
- [ ] PWA can be installed on desktop
- [ ] PWA can be added to iOS home screen
- [ ] Service worker registers successfully
- [ ] App works offline after first load
- [ ] Manifest file loads correctly

---

### Scenario 8: Mobile Responsiveness ✓

**Requirement**: FR-023

**Steps**:
1. Open browser DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or similar
4. Test all functionality from Scenarios 1-5
5. **Expected**: All features work on mobile viewport
6. Rotate to landscape mode
7. **Expected**: Layout adapts appropriately

**Validation**:
- [ ] Settings panel works on mobile
- [ ] Category buttons are tappable
- [ ] Cards are readable on small screens
- [ ] No horizontal scrolling
- [ ] Touch interactions work smoothly

---

### Scenario 9: Performance Validation ✓

**Requirement**: Performance goals from plan.md

**Steps**:
1. Open DevTools > Network tab
2. Hard refresh (Ctrl+Shift+R)
3. Note "Load" time in Network tab footer
4. **Expected**: Page loads in < 2 seconds
5. Click category button
6. Note time until card appears
7. **Expected**: Response in < 100ms

**Validation**:
- [ ] Initial page load < 2 seconds
- [ ] Category selection response < 100ms
- [ ] Smooth animations, no jank
- [ ] No memory leaks (check Performance Monitor)

---

### Scenario 10: Documentation Cleanup ✓

**Requirement**: FR-017, FR-018, FR-019

**Steps**:
1. Navigate to project root directory
2. List all .md files: `ls *.md`
3. **Expected**: Only essential files remain:
   - README.md (updated)
   - Optionally: USER_GUIDE.md (if merged into README, then removed)
4. Verify removed files:
   - FINAL_FEATURE_VERIFICATION.md ❌
   - FINAL_IMPLEMENTATION_REPORT.md ❌
   - FINAL_SUMMARY.md ❌
   - IMPLEMENTATION_SUMMARY.md ❌
   - PROJECT_COMPLETED.md ❌
   - PROJECT_COMPLETION_SUMMARY.md ❌
   - PROJECT_SUCCESS.md ❌
   - SUMMARY.md ❌
   - QWEN.md ❌

**Validation**:
- [ ] Redundant docs removed
- [ ] README.md contains essential info only
- [ ] Repository looks clean and professional

---

## Success Criteria

All test scenarios must pass with green checkmarks. Any failures indicate bugs that need fixing before the feature is complete.

### Critical Tests (Must Pass)
- Scenario 1: Settings button works
- Scenario 4: Categories display content
- Scenario 6: Data loads from JSON files

### Important Tests (Should Pass)
- Scenario 2: Background color selection
- Scenario 7: PWA functionality
- Scenario 8: Mobile responsiveness

### Nice-to-Have Tests (May Pass)
- Scenario 3: Wake lock (browser-dependent)
- Scenario 9: Performance metrics

---

## Troubleshooting

### Settings Button Not Working
- Check console for JavaScript errors
- Verify settings.js loaded correctly
- Inspect DOM to ensure #settings-btn exists

### JSON Files Not Loading
- Verify files exist in `docs/data/` directory
- Check file names exactly match (case-sensitive)
- Validate JSON syntax using online validator

### PWA Not Installing
- Ensure HTTPS (or localhost)
- Check manifest.json is valid
- Verify service worker registered (no errors)

### Performance Issues
- Run Lighthouse audit in DevTools
- Check Network tab for slow requests
- Verify service worker caching strategy

---

## Browser Compatibility

Test in at least:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (iOS 15+)

---

## Completion Checklist

- [ ] All Setup steps completed
- [ ] All 10 test scenarios executed
- [ ] All validation checkboxes marked
- [ ] No critical failures
- [ ] Documentation reviewed
- [ ] Ready for deployment

---

*Quickstart complete. Use this guide to validate all bug fixes and cleanup work.*
