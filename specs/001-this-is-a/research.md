# Research: Charades PWA Cleanup and Bug Fixes

**Feature**: 001-this-is-a
**Date**: 2025-10-02

## Research Questions & Findings

### 1. Settings Button Click Handler Issue

**Question**: Why doesn't the settings button respond to clicks?

**Investigation**:
- Examined `src/js/settings.js` lines 96-100
- Examined `docs/index.html` lines 52-56
- Settings button contains SVG element with path child

**Finding**:
When users click on the SVG icon or its child `<path>` element, the event target is the SVG/path element, not the parent `#settings-btn` div. The current event listener only fires when clicking the exact div area outside the SVG.

**Decision**: Fix using event delegation with `.closest()` method
- Check if click target or any parent is the settings button
- Alternative: Add CSS `pointer-events: none` to SVG and children

**References**:
- MDN: Event Delegation Pattern
- CSS pointer-events specification

---

### 2. JSON Data File Structure

**Question**: Where should JSON content files be located and what format?

**Investigation**:
- Content service fetches from `/data/*.json` (src/js/services/content-service.js:40-92)
- Existing models validate: Movie, Book, Game (src/js/models/)
- Current fetch paths resolve to `docs/data/` in production build

**Finding**:
Files are currently missing. The app expects:
- `/data/movies.json` → array of movie objects
- `/data/books.json` → array of book objects
- `/data/games.json` → array of game objects
- `/data/tvshows.json` → array of TV show objects
- `/data/songs.json` → array of song objects

**Decision**: Create JSON files in `docs/data/` directory
- Each file contains array of objects
- Objects match existing model validation (title, year, director/author/developer, etc.)
- Minimum 20-30 items per category for good game variety

**Schema Example** (movies.json):
```json
[
  {
    "title": "The Shawshank Redemption",
    "year": 1994,
    "director": "Frank Darabont"
  }
]
```

---

### 3. Documentation Cleanup Strategy

**Question**: Which documentation files are redundant and should be removed?

**Investigation**:
- Found 11 markdown files in root directory
- Analyzed content: most are AI-generated project summaries
- Only README.md and USER_GUIDE.md contain useful information

**Finding**:
Redundant files (all AI-generated development artifacts):
- FINAL_FEATURE_VERIFICATION.md
- FINAL_IMPLEMENTATION_REPORT.md
- FINAL_SUMMARY.md
- IMPLEMENTATION_SUMMARY.md
- PROJECT_COMPLETED.md
- PROJECT_COMPLETION_SUMMARY.md
- PROJECT_SUCCESS.md
- SUMMARY.md
- QWEN.md

**Decision**: Remove all redundant files, consolidate into README.md
- Keep: README.md (updated with essential info)
- Optionally keep: USER_GUIDE.md (if user-facing value, otherwise merge into README)
- Remove: All other .md files listed above

---

### 4. PWA Service Worker Configuration

**Question**: Is the service worker properly configured for offline functionality?

**Investigation**:
- App registers service worker at `/sw.js` (src/js/app.js:378)
- Service worker file may not exist in docs/ directory
- PWA manifest exists at `/charades/site.webmanifest`

**Finding**:
Need to verify service worker file exists and properly caches:
- HTML entry point
- CSS files
- JavaScript files
- JSON data files
- Static assets (icons, images)

**Decision**: Check for sw.js file, create if missing
- Cache strategy: Cache-first for static assets
- Network-first for JSON data (allows updates)
- Offline fallback for all routes

**References**:
- Service Worker API specification
- PWA best practices (Google)

---

### 5. Event Handler Best Practices

**Question**: What's the best pattern for fixing click handlers on composite elements?

**Investigation**:
- Reviewed modern JavaScript event handling patterns
- Examined existing codebase event listeners
- Settings button uses direct getElementById + addEventListener

**Finding**:
Two complementary approaches:
1. **CSS approach**: `pointer-events: none` on non-interactive children
2. **JS approach**: Use `.closest()` to find target ancestor

**Decision**: Use both approaches for robustness
```css
.settings-icon, .settings-icon * {
  pointer-events: none;
}
```

```javascript
document.addEventListener('click', (e) => {
  if (e.target.closest('#settings-btn')) {
    // Handle click
  }
});
```

**Rationale**: CSS prevents child elements from being targets, JS handles cases where CSS might not apply

---

## Technology Decisions

### Confirmed Technologies
- **Language**: Vanilla JavaScript (ES6+) - per user requirement
- **Build System**: Eleventy 1.0.2 + Sass 1.58.0 (existing)
- **UI Framework**: Bootstrap 5.3.0 (existing)
- **Data Storage**: Local JSON files (per user requirement)
- **State Management**: LocalStorage for preferences, in-memory for content
- **Testing**: Manual testing with documented scenarios

### No New Dependencies
Per user requirement: "lets use json and vanilla JS, unless something more needed"
- No new frameworks needed
- No build tool changes needed
- No API libraries needed (no external APIs)

---

## Risk Assessment

### Low Risk
- Settings button fix (isolated change, easy to test)
- Documentation cleanup (no code impact)
- JSON file creation (existing models handle validation)

### Medium Risk
- Service worker updates (could affect caching, requires thorough testing)
- Event delegation changes (need to verify no side effects on other handlers)

### Mitigation
- Test all changes in multiple browsers
- Verify PWA functionality in Chrome DevTools
- Test offline mode explicitly
- Keep git history for easy rollback

---

## Open Questions: NONE

All research complete. Ready for Phase 1 design.
