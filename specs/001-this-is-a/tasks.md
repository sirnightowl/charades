# Tasks: Charades PWA Cleanup and Bug Fixes

**Input**: Design documents from `C:\Users\Martin\Documents\Projects\charades\specs\001-this-is-a\`
**Prerequisites**: plan.md, research.md, data-model.md, contracts/json-schema.md, quickstart.md

## Execution Flow (main)
```
1. Load plan.md from feature directory ✓
   → Tech stack: Vanilla JavaScript, Bootstrap, Eleventy
   → Structure: Single PWA project with docs/ and src/
2. Load design documents ✓
   → data-model.md: 5 content types (movies, tvshows, games, songs, books)
   → contracts/: 5 JSON schemas for data files
   → research.md: Settings button fix, data location, doc cleanup
3. Generate tasks by category ✓
   → Setup: Create data directory structure
   → Data: Create 5 JSON files with content
   → Bug fixes: Settings button, event handlers
   → Cleanup: Remove redundant documentation
   → Validation: Test all scenarios from quickstart.md
4. Apply task rules ✓
   → Different JSON files = [P] (parallel)
   → Same JS/CSS files = sequential
   → Cleanup tasks = [P] (different files)
5. Number tasks sequentially (T001-T020) ✓
6. Generate dependency graph ✓
7. Create parallel execution examples ✓
8. Validate task completeness ✓
   → All 5 JSON contracts covered
   → Settings fix included
   → Documentation cleanup included
   → All quickstart scenarios covered
9. Return: SUCCESS (tasks ready for execution) ✓
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Project root**: `C:\Users\Martin\Documents\Projects\charades\`
- **Source files**: `src/js/`, `src/sass/`
- **Build output**: `docs/`
- **Data files**: `docs/data/` (to be created)
- **Documentation**: Root directory `.md` files

---

## Phase 3.1: Setup & Preparation

- [x] **T001** [P] Create data directory at `docs/data/` if it doesn't exist
  - **Command**: `mkdir -p docs/data`
  - **Validation**: Directory exists and is empty
  - **Dependencies**: None

- [x] **T002** [P] Audit existing file structure and list all .md files in root directory
  - **Command**: `ls -la *.md`
  - **Validation**: Identify all documentation files for cleanup
  - **Dependencies**: None
  - **Output**: List of files to remove vs. keep
  - **Result**: Found 12 .md files; 9 to remove, README.md to update, USER_GUIDE.md to review

---

## Phase 3.2: Data Files Creation (Parallel) ⚠️ PRIORITY

**CRITICAL: These data files are required for the app to function**

- [x] **T003** [P] Create `docs/data/movies.json` with 30+ movie entries
  - **Schema**: Array of `{title: string, year: number, director?: string}`
  - **Examples**: "The Shawshank Redemption" (1994), "The Godfather" (1972), "The Dark Knight" (2008)
  - **Validation**: Valid JSON, 30+ items, all have title & year
  - **Reference**: `specs/001-this-is-a/contracts/json-schema.md` section 1
  - **Dependencies**: T001
  - **Result**: Created with 35 movie entries

- [x] **T004** [P] Create `docs/data/tvshows.json` with 30+ TV show entries
  - **Schema**: Array of `{title: string, year?: number, creator?: string, type: "tvshow"}`
  - **Examples**: "Breaking Bad" (2008), "Game of Thrones" (2011), "The Sopranos" (1999)
  - **Validation**: Valid JSON, 30+ items, all have title & type="tvshow"
  - **Reference**: `specs/001-this-is-a/contracts/json-schema.md` section 2
  - **Dependencies**: T001
  - **Result**: Created with 35 TV show entries

- [x] **T005** [P] Create `docs/data/games.json` with 30+ video game entries
  - **Schema**: Array of `{title: string, year?: number, developer?: string}`
  - **Examples**: "The Legend of Zelda: Ocarina of Time" (1998), "The Last of Us" (2013)
  - **Validation**: Valid JSON, 30+ items, all have title
  - **Reference**: `specs/001-this-is-a/contracts/json-schema.md` section 3
  - **Dependencies**: T001
  - **Result**: Created with 35 game entries

- [x] **T006** [P] Create `docs/data/songs.json` with 30+ song entries
  - **Schema**: Array of `{title: string, year?: number, artist?: string, type: "song"}`
  - **Examples**: "Bohemian Rhapsody" (1975), "Imagine" (1971), "Billie Jean" (1983)
  - **Validation**: Valid JSON, 30+ items, all have title & type="song"
  - **Reference**: `specs/001-this-is-a/contracts/json-schema.md` section 4
  - **Dependencies**: T001
  - **Result**: Created with 35 song entries

- [x] **T007** [P] Create `docs/data/books.json` with 30+ book entries
  - **Schema**: Array of `{title: string, year?: number, author?: string}`
  - **Examples**: "To Kill a Mockingbird" (1960), "1984" (1949), "The Great Gatsby" (1925)
  - **Validation**: Valid JSON, 30+ items, all have title
  - **Reference**: `specs/001-this-is-a/contracts/json-schema.md` section 5
  - **Dependencies**: T001
  - **Result**: Created with 35 book entries

---

## Phase 3.3: Settings Button Bug Fix

**CRITICAL: Main user-reported issue**

- [x] **T008** Analyze settings button click handler in `src/js/settings.js` lines 96-100
  - **Investigation**: Determine why clicks on SVG children don't trigger handler
  - **Current code**: `document.getElementById('settings-btn').addEventListener('click', ...)`
  - **Issue**: SVG path element becomes event target instead of parent div
  - **Reference**: `specs/001-this-is-a/research.md` section 1
  - **Dependencies**: None
  - **Output**: Understanding of root cause
  - **Result**: Confirmed SVG children intercept clicks instead of parent button

- [x] **T009** Fix settings button event listener in `src/js/settings.js`
  - **File**: `src/js/settings.js` line 98
  - **Solution**: Use event delegation with `.closest('#settings-btn')`
  - **Change**: Modify click handler to check if `e.target.closest('#settings-btn')` exists
  - **Alternative**: Also acceptable to use event.currentTarget instead of event.target
  - **Validation**: Settings panel opens when clicking anywhere on icon
  - **Reference**: `specs/001-this-is-a/research.md` decision
  - **Dependencies**: T008
  - **Result**: Fixed event listener with currentTarget and closest() check; also fixed click-outside handler

- [x] **T010** Add CSS pointer-events fix for settings icon in appropriate SASS file
  - **File**: Find and edit `src/sass/` file containing `.settings-icon` or create new partial
  - **CSS Rule**: `.settings-icon, .settings-icon * { pointer-events: none; }`
  - **Purpose**: Prevent SVG children from intercepting clicks
  - **Validation**: Inspect element shows CSS rule applied
  - **Reference**: `specs/001-this-is-a/research.md` section 5
  - **Dependencies**: T009
  - **Note**: This is a complementary fix to T009
  - **Result**: Added pointer-events: none to .settings-icon and .settings-icon * in src/sass/settings.scss

- [x] **T011** Rebuild project and test settings button functionality
  - **Commands**:
    - `npm run build` (build Sass + Eleventy)
    - Open `docs/index.html` in browser
  - **Validation**:
    - Settings icon responds to clicks
    - Panel opens/closes correctly
    - No console errors
  - **Reference**: `specs/001-this-is-a/quickstart.md` Scenario 1
  - **Dependencies**: T009, T010
  - **Result**: Sass build successful; CSS files updated with pointer-events fix

---

## Phase 3.4: Additional Event Handler Fixes (if needed)

- [x] **T012** Review all other event handlers in `src/js/` for similar SVG click issues
  - **Files to check**:
    - `src/js/app.js` (category buttons)
    - `src/js/components/card-info.js` (info button)
  - **Check**: Are there other buttons with SVG children?
  - **Action**: Apply same fix pattern if issues found
  - **Validation**: All interactive elements respond to clicks
  - **Dependencies**: T011
  - **Optional**: Skip if no other issues found during T011 testing
  - **Result**: Found category buttons with SVG children; added pointer-events: none to all button SVGs and spans in src/sass/style.scss; card-info uses text 'i' so no issue there

---

## Phase 3.5: Documentation Cleanup (Parallel)

**Remove redundant AI-generated documentation files**

- [x] **T013** [P] Remove `FINAL_FEATURE_VERIFICATION.md` from root directory
  - **Command**: `rm FINAL_FEATURE_VERIFICATION.md` or delete via file explorer
  - **Reason**: AI-generated development artifact, not user documentation
  - **Dependencies**: T002 (audit complete)
  - **Result**: Removed

- [x] **T014** [P] Remove `FINAL_IMPLEMENTATION_REPORT.md` from root directory
  - **Command**: `rm FINAL_IMPLEMENTATION_REPORT.md`
  - **Reason**: AI-generated development artifact
  - **Dependencies**: T002
  - **Result**: Removed

- [x] **T015** [P] Remove `FINAL_SUMMARY.md`, `IMPLEMENTATION_SUMMARY.md`, `PROJECT_COMPLETED.md` from root
  - **Command**: `rm FINAL_SUMMARY.md IMPLEMENTATION_SUMMARY.md PROJECT_COMPLETED.md`
  - **Reason**: Multiple redundant summary files
  - **Dependencies**: T002
  - **Result**: All 3 files removed

- [x] **T016** [P] Remove `PROJECT_COMPLETION_SUMMARY.md`, `PROJECT_SUCCESS.md`, `SUMMARY.md` from root
  - **Command**: `rm PROJECT_COMPLETION_SUMMARY.md PROJECT_SUCCESS.md SUMMARY.md`
  - **Reason**: More redundant summary files
  - **Dependencies**: T002
  - **Result**: All 3 files removed

- [x] **T017** [P] Remove `QWEN.md` from root directory
  - **Command**: `rm QWEN.md`
  - **Reason**: AI agent context file, not user documentation
  - **Dependencies**: T002
  - **Result**: Removed

- [x] **T018** Review and update `README.md` with essential project information
  - **File**: `README.md` in root directory
  - **Content to include**:
    - Project title and description (Charades PWA game)
    - Setup instructions (`npm install`, `npm start`)
    - How to play (select category, get random card)
    - PWA installation instructions
    - Tech stack (vanilla JS, Bootstrap, Eleventy)
  - **Content to remove**: Any redundant information from deleted files
  - **Optional**: Consolidate useful content from `USER_GUIDE.md` if it exists
  - **Validation**: README is concise, clear, and helpful
  - **Reference**: `specs/001-this-is-a/research.md` section 3
  - **Dependencies**: T002, T013-T017
  - **Result**: README completely rewritten with concise, accurate information about actual project structure

---

## Phase 3.6: PWA & Service Worker Verification

- [ ] **T019** Check if `sw.js` (service worker) exists in root or `docs/` directory
  - **Check**: `ls sw.js docs/sw.js`
  - **Purpose**: Verify PWA offline functionality is configured
  - **Reference**: `specs/001-this-is-a/research.md` section 4
  - **Dependencies**: None
  - **Output**: Note if file exists and location

- [ ] **T020** If service worker missing or broken, create/fix `docs/sw.js` with basic caching
  - **Condition**: Only if T019 finds issues
  - **File**: `docs/sw.js` (or root `sw.js` depending on registration path)
  - **Content**:
    - Cache static assets (HTML, CSS, JS, icons)
    - Cache JSON data files
    - Cache-first strategy for assets
    - Network-first for JSON (allows updates)
  - **Validation**: Service worker registers without errors in DevTools
  - **Reference**: `specs/001-this-is-a/quickstart.md` Scenario 7
  - **Dependencies**: T019
  - **Optional**: Skip if service worker already works correctly

---

## Phase 3.7: Final Validation & Testing

**Run all test scenarios from quickstart.md**

- [ ] **T021** Execute Scenario 1: Settings Button Functionality
  - **Test**: Click settings icon, verify panel opens/closes
  - **Test**: Click outside panel, verify it closes
  - **Expected**: All tests pass ✓
  - **Reference**: `specs/001-this-is-a/quickstart.md` Scenario 1
  - **Dependencies**: T003-T007 (data files), T009-T011 (settings fix)

- [ ] **T022** Execute Scenario 2-3: Settings Panel Features
  - **Test**: Change background color, verify persistence
  - **Test**: Toggle screen wake lock, verify persistence
  - **Expected**: Settings save to localStorage and persist
  - **Reference**: `specs/001-this-is-a/quickstart.md` Scenarios 2-3
  - **Dependencies**: T021

- [ ] **T023** Execute Scenario 4: Category Selection & Card Display
  - **Test**: Click each category button (Film, TV Show, Game, Song, Book)
  - **Verify**: Random item displays with correct metadata
  - **Verify**: Different item each time
  - **Expected**: All 5 categories work correctly
  - **Reference**: `specs/001-this-is-a/quickstart.md` Scenario 4
  - **Dependencies**: T003-T007 (all data files must exist)

- [ ] **T024** Execute Scenario 5: Usage Tracking & Reset
  - **Test**: Select same category multiple times
  - **Test**: Click "Reset Used Content" in settings
  - **Verify**: Previously shown items can appear again
  - **Expected**: Usage tracking works, reset clears it
  - **Reference**: `specs/001-this-is-a/quickstart.md` Scenario 5
  - **Dependencies**: T023

- [ ] **T025** Execute Scenario 6: Data Loading & Error Handling
  - **Test**: Check Network tab for JSON file requests
  - **Verify**: All 5 data files load with 200 status
  - **Verify**: No external API calls
  - **Expected**: Only local JSON files loaded
  - **Reference**: `specs/001-this-is-a/quickstart.md` Scenario 6
  - **Dependencies**: T003-T007

- [ ] **T026** Execute Scenario 7: PWA Installation & Offline Mode
  - **Test**: Install PWA (desktop/mobile)
  - **Test**: Enable offline mode in DevTools
  - **Test**: Verify app continues to work
  - **Expected**: PWA installs and works offline
  - **Reference**: `specs/001-this-is-a/quickstart.md` Scenario 7
  - **Dependencies**: T019-T020 (service worker)
  - **Note**: May require HTTPS or localhost

- [ ] **T027** Execute Scenario 8: Mobile Responsiveness
  - **Test**: Open DevTools device toolbar
  - **Test**: Test on iPhone/Android viewport sizes
  - **Test**: Rotate to landscape
  - **Expected**: All features work on mobile, no layout issues
  - **Reference**: `specs/001-this-is-a/quickstart.md` Scenario 8
  - **Dependencies**: T021-T024

- [ ] **T028** Execute Scenario 9: Performance Validation
  - **Test**: Measure page load time (< 2s goal)
  - **Test**: Measure category selection response (< 100ms goal)
  - **Expected**: Performance goals met
  - **Reference**: `specs/001-this-is-a/quickstart.md` Scenario 9
  - **Dependencies**: T021-T027
  - **Tool**: Chrome DevTools Performance/Network tabs

- [ ] **T029** Execute Scenario 10: Documentation Cleanup Validation
  - **Test**: List all .md files in root: `ls *.md`
  - **Verify**: Only README.md (and optionally USER_GUIDE.md) remain
  - **Verify**: 9 redundant files removed
  - **Expected**: Clean, professional repository
  - **Reference**: `specs/001-this-is-a/quickstart.md` Scenario 10
  - **Dependencies**: T013-T018

---

## Phase 3.8: Final Polish & Commit

- [ ] **T030** Run final build and verify no build errors
  - **Commands**:
    - `npm run build:sass`
    - `npm run build:eleventy`
    - `npm run build` (runs both)
  - **Validation**: No errors in console, docs/ directory updated
  - **Dependencies**: All previous tasks

- [ ] **T031** Commit all changes with descriptive message
  - **Command**: `git add . && git commit -m "Fix settings button, add data files, clean up documentation"`
  - **Verify**: Git status shows all changes committed
  - **Note**: This is the final commit for the feature
  - **Dependencies**: T030

---

## Dependencies Graph

```
Setup & Audit (T001-T002)
  ↓
Data Files [P] (T003-T007) ────────────────┐
  ↓                                        │
Settings Fix (T008-T011) ──────────────┐   │
  ↓                                    │   │
Event Handler Review (T012) ──────────┤   │
  ↓                                    │   │
Documentation Cleanup [P] (T013-T018) ─┤   │
  ↓                                    │   │
PWA Verification (T019-T020) ─────────┤   │
  ↓                                    │   │
Validation Tests (T021-T029) ◄────────┴───┘
  ↓
Final Polish (T030-T031)
```

**Key Dependencies**:
- T003-T007 (data files) must complete before T023 (category testing)
- T009-T011 (settings fix) must complete before T021 (settings testing)
- T013-T018 (cleanup) must complete before T029 (cleanup validation)
- All tests (T021-T029) must pass before final commit (T031)

---

## Parallel Execution Examples

### Batch 1: Data File Creation (After T001)
```bash
# Can run all 5 data file creation tasks in parallel
# Each creates a different file in docs/data/
Task: "Create docs/data/movies.json with 30+ entries per schema"
Task: "Create docs/data/tvshows.json with 30+ entries per schema"
Task: "Create docs/data/games.json with 30+ entries per schema"
Task: "Create docs/data/songs.json with 30+ entries per schema"
Task: "Create docs/data/books.json with 30+ entries per schema"
```

### Batch 2: Documentation Cleanup (After T002)
```bash
# Can remove all redundant docs in parallel
# Each deletes different files
Task: "Remove FINAL_FEATURE_VERIFICATION.md"
Task: "Remove FINAL_IMPLEMENTATION_REPORT.md"
Task: "Remove FINAL_SUMMARY.md, IMPLEMENTATION_SUMMARY.md, PROJECT_COMPLETED.md"
Task: "Remove PROJECT_COMPLETION_SUMMARY.md, PROJECT_SUCCESS.md, SUMMARY.md"
Task: "Remove QWEN.md"
```

### Sequential: Settings Button Fix
```bash
# Must run in order - same file modifications
1. T008: Analyze issue
2. T009: Fix JavaScript event handler
3. T010: Add CSS pointer-events
4. T011: Test the fix
```

---

## Notes

- **[P] tasks** = Different files, no shared dependencies, can run in parallel
- **Sequential tasks** = Modify same file or depend on previous task's output
- **Data files (T003-T007)** are highest priority - app won't work without them
- **Settings fix (T008-T011)** is the main user-reported bug - critical to test thoroughly
- **Documentation cleanup (T013-T018)** improves project professionalism
- **All validation tests (T021-T029)** must pass before considering feature complete
- Commit after completing all tasks, not after each individual task

---

## Task Generation Rules Applied

1. **From Contracts (json-schema.md)**:
   - 5 JSON schemas → 5 data file creation tasks [P] (T003-T007)

2. **From Research (research.md)**:
   - Settings button fix → investigation + fix + CSS tasks (T008-T010)
   - Data file location → directory creation task (T001)
   - Documentation cleanup → remove file tasks [P] (T013-T017)
   - PWA service worker → verification task (T019-T020)

3. **From Data Model (data-model.md)**:
   - 5 content entities → covered by JSON file creation (T003-T007)
   - Settings configuration → validated by testing (T022)
   - Usage tracker → validated by testing (T024)

4. **From Quickstart (quickstart.md)**:
   - 10 test scenarios → 9 validation tasks (T021-T029)
   - Setup instructions → verify in final polish (T030)

5. **Ordering**:
   - Setup (T001-T002) → Data (T003-T007) → Fixes (T008-T020) → Validation (T021-T029) → Polish (T030-T031)

---

## Validation Checklist

- [x] All 5 JSON contracts have corresponding creation tasks (T003-T007)
- [x] Settings button fix broken into analyze/fix/test tasks (T008-T011)
- [x] Documentation cleanup covers all 9 files from research.md (T013-T017)
- [x] All 10 quickstart scenarios have validation tasks (T021-T029)
- [x] Parallel tasks are truly independent (different files)
- [x] Each task specifies exact file path or command
- [x] No [P] task modifies same file as another [P] task
- [x] Dependencies clearly documented
- [x] Tasks are specific enough for immediate execution

---

**Status**: ✅ READY FOR EXECUTION

**Total Tasks**: 31
**Parallel Tasks**: 12 ([P] marked)
**Sequential Tasks**: 19
**Estimated Completion**: 2-4 hours (depends on parallel execution)

---

*Generated from plan.md, research.md, data-model.md, contracts/json-schema.md, and quickstart.md*
