# Implementation Plan: Charades PWA Cleanup and Bug Fixes

**Branch**: `001-this-is-a` | **Date**: 2025-10-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `C:\Users\Martin\Documents\Projects\charades\specs\001-this-is-a\spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path ✓
2. Fill Technical Context ✓
   → Project Type: Web (PWA)
   → Structure Decision: Single frontend project with existing structure
3. Fill Constitution Check section ✓
4. Evaluate Constitution Check section ✓
   → No violations detected
   → Update Progress Tracking: Initial Constitution Check ✓
5. Execute Phase 0 → research.md ✓
   → All technical decisions clear from user input
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, CLAUDE.md ✓
7. Re-evaluate Constitution Check section ✓
   → No new violations
   → Update Progress Tracking: Post-Design Constitution Check ✓
8. Plan Phase 2 → Describe task generation approach ✓
9. STOP - Ready for /tasks command ✓
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Fix critical bugs and clean up the charades PWA application to ensure proper functionality on Android and iOS. Primary issues include non-functional settings button click handler, excessive documentation files cluttering the repository, and ensuring all content loads from local JSON files. The app uses vanilla JavaScript with existing architecture, requiring targeted fixes rather than architectural changes.

## Technical Context
**Language/Version**: Vanilla JavaScript (ES6+), HTML5, CSS3
**Primary Dependencies**: Bootstrap 5.3.0, Sass 1.58.0, Eleventy 1.0.2, jQuery 3.6.1
**Storage**: Local JSON files for content data (movies, books, games, TV shows, songs), LocalStorage for user preferences
**Testing**: Manual testing, browser DevTools, PWA validation tools
**Target Platform**: Web browsers (Chrome, Safari, Firefox), PWA on iOS 15+, Android 8+
**Project Type**: Web (single frontend PWA application)
**Performance Goals**: <2s initial load, <100ms interaction response, offline-capable after first load
**Constraints**: No external APIs for content, must work offline, existing vanilla JS architecture must be preserved
**Scale/Scope**: ~5 content categories, ~10 settings options, single-page application

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Note**: The constitution file contains placeholder content. Applying general best practices:
- ✅ **Simplicity**: Maintain existing vanilla JS architecture, no new frameworks
- ✅ **Testing**: Manual testing with documented quickstart validation
- ✅ **Code Quality**: Fix bugs without introducing technical debt
- ✅ **Documentation**: Remove excessive docs, keep only essential README

**Status**: PASS - No constitutional violations. Cleanup and bug fixes align with simplicity principles.

## Project Structure

### Documentation (this feature)
```
specs/001-this-is-a/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
└── contracts/           # Phase 1 output (/plan command)
    └── json-schema.md   # JSON data file schemas
```

### Source Code (repository root)
```
charades/
├── docs/                    # Built output (Eleventy)
│   ├── index.html          # Main app entry point
│   ├── css/                # Compiled CSS
│   │   ├── style.css
│   │   └── settings.css
│   ├── js/                 # Application JavaScript (copied from src)
│   ├── scripts/            # Legacy scripts
│   └── data/               # JSON content files (TO BE CREATED)
│       ├── movies.json
│       ├── tvshows.json
│       ├── games.json
│       ├── songs.json
│       └── books.json
├── src/                    # Source files
│   ├── index.njk          # Eleventy template
│   ├── sass/              # SCSS source files
│   ├── js/                # JavaScript source
│   │   ├── app.js         # Main application controller
│   │   ├── settings.js    # Settings panel (FIX REQUIRED)
│   │   ├── components/    # UI components
│   │   ├── models/        # Data models
│   │   ├── services/      # Content service
│   │   └── utils/         # Utility functions
│   └── scripts/           # Legacy scripts
├── package.json
└── README.md              # Essential documentation (TO BE UPDATED)
```

**Structure Decision**: Existing single-page PWA structure maintained. The app uses Eleventy for build process, Sass for styling, and vanilla JavaScript for functionality. Bug fixes will be applied to existing files without restructuring. JSON data files need to be created in `docs/data/` directory.

## Phase 0: Outline & Research

### Research Findings

**1. Settings Button Click Issue**
- **Decision**: Fix event listener propagation in settings.js
- **Rationale**: Current issue likely caused by SVG child element capturing clicks instead of parent button. Need to use event delegation or ensure all child elements have `pointer-events: none` CSS
- **Alternatives considered**:
  - Replace SVG with icon font (rejected - SVG is more modern and flexible)
  - Rebuild settings component (rejected - existing code is good, just needs click handler fix)

**2. JSON Data File Location**
- **Decision**: Create data files in `docs/data/` directory
- **Rationale**: The content service fetches from `/data/*.json`, which resolves to `docs/data/` in the built output. Files currently missing
- **Alternatives considered**:
  - Keep in `src/` and copy via build (rejected - adds build complexity)
  - Use dynamic import (rejected - not needed for static JSON)

**3. Documentation Cleanup Strategy**
- **Decision**: Remove redundant MD files, keep only README.md with essential info
- **Rationale**: Files like FINAL_FEATURE_VERIFICATION.md, IMPLEMENTATION_SUMMARY.md, PROJECT_SUCCESS.md are development artifacts, not user documentation
- **Files to remove**: FINAL_FEATURE_VERIFICATION.md, FINAL_IMPLEMENTATION_REPORT.md, FINAL_SUMMARY.md, IMPLEMENTATION_SUMMARY.md, PROJECT_COMPLETED.md, PROJECT_COMPLETION_SUMMARY.md, PROJECT_SUCCESS.md, SUMMARY.md, QWEN.md
- **Files to keep**: README.md (updated), USER_GUIDE.md (consolidated into README if useful)
- **Alternatives considered**:
  - Move to docs/archive (rejected - adds clutter)
  - Keep all files (rejected - violates cleanup requirement)

**4. PWA Service Worker**
- **Decision**: Verify and update service worker path if needed
- **Rationale**: App registers `/sw.js` but file may not exist or have incorrect cache paths
- **Alternatives considered**:
  - Use Workbox (rejected - adds dependency, violates vanilla JS constraint)
  - Remove PWA features (rejected - required for mobile deployment)

**5. Event Handler Best Practices**
- **Decision**: Use event delegation pattern for dynamic elements
- **Rationale**: Ensures clicks work regardless of which child element is targeted
- **Implementation**: Add `.closest()` method calls and CSS `pointer-events: none` on SVG children
- **Alternatives considered**:
  - Stop propagation on all children (rejected - fragile, hard to maintain)

**Output**: All technical decisions resolved. No NEEDS CLARIFICATION remain.

## Phase 1: Design & Contracts

### 1. Data Model (→ data-model.md)

**Entities from spec**:
- Content Item (Movie, TV Show, Game, Song, Book)
- Settings Configuration
- Usage Tracker
- Category

See `data-model.md` for complete entity definitions, field specifications, and validation rules.

### 2. API Contracts (→ contracts/json-schema.md)

Since this is a client-side PWA with no backend API, "contracts" are the JSON file schemas:
- movies.json schema
- tvshows.json schema
- games.json schema
- songs.json schema
- books.json schema

See `contracts/json-schema.md` for complete schemas.

### 3. Contract Tests

Not applicable for this feature - no API endpoints. Data validation happens in existing model classes (Movie, Book, Game) which already have `.validate()` methods.

### 4. Test Scenarios (→ quickstart.md)

Quickstart document includes manual test scenarios for:
- Settings button open/close functionality
- Category selection and card display
- Background color changes
- Screen wake lock toggle
- Used content reset
- Offline functionality

### 5. Agent Context Update

Claude Code context updated with project structure, key files to modify, and bug fix approach.

**Output**: data-model.md, contracts/json-schema.md, quickstart.md, CLAUDE.md generated

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks in TDD order: Setup → Bug fixes → Cleanup → Validation
- Group related fixes (settings, data files, documentation)
- Each fix gets verification step

**Task Breakdown**:
1. **Setup & Preparation** [P]
   - Create data directory structure
   - Audit current file structure

2. **Data Files Creation** [P]
   - Create movies.json with sample data
   - Create tvshows.json with sample data
   - Create games.json with sample data
   - Create songs.json with sample data
   - Create books.json with sample data

3. **Settings Button Fix**
   - Analyze settings.js click handler issue
   - Fix event listener in settings.js
   - Add CSS pointer-events to settings button SVG
   - Test settings panel open/close

4. **Documentation Cleanup** [P]
   - Remove redundant MD files
   - Update README.md with essential info
   - Consolidate USER_GUIDE.md content if needed

5. **PWA Verification**
   - Check service worker exists
   - Verify manifest configuration
   - Test offline functionality

6. **Final Validation**
   - Run quickstart test scenarios
   - Verify all functional requirements
   - Test on mobile viewport
   - Performance check

**Ordering Strategy**:
- [P] tasks can run in parallel (independent files)
- Settings fix depends on data files being created (for testing)
- Documentation cleanup can run parallel to code fixes
- Validation runs last after all fixes

**Estimated Output**: 15-20 numbered tasks in dependency order

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)
**Phase 4**: Implementation (execute tasks.md, fix bugs, clean up files)
**Phase 5**: Validation (manual testing per quickstart.md, PWA audit, cross-browser testing)

## Complexity Tracking
*No constitutional violations - this section is empty*

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none)

---
*Plan ready for /tasks command execution*
