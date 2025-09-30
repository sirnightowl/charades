# Tasks: Mobile App for Content Catalog

**Input**: Design documents from `/specs/001-this-is-a/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **PWA Application**: `public/` for frontend assets, `data/` for content files
- Paths shown below follow the existing 11ty + PWA structure from the implementation plan

## Phase 3.1: Setup
- [x] T001 Create directory structure: public/data/, public/js/models/, public/js/services/, public/js/components/
- [x] T002 Initialize PWA assets (manifest, service worker) in public/ directory
- [x] T003 [P] Configure linting for JavaScript files
- [x] T004 Create data directory and initial JSON files
- [x] T005 Set up directory structure for JSON data: public/data/movies.json, public/data/books.json, public/data/games.json

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T006 [P] Create basic HTML structure test in tests/unit/test_html_structure.js
- [x] T007 [P] Integration test for content loading from JSON in tests/integration/test_content_loading.js
- [x] T008 [P] Integration test for category browsing in tests/integration/test_category_browsing.js
- [x] T009 [P] Integration test for search functionality in tests/integration/test_search.js
- [x] T010 [P] Test for PWA manifest validation in tests/unit/test_manifest.js
- [x] T011 [P] Test for service worker registration in tests/unit/test_service_worker.js

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T012 [P] Movie data model utility in public/js/models/movie-model.js
- [x] T013 [P] Book data model utility in public/js/models/book-model.js
- [x] T014 [P] Game data model utility in public/js/models/game-model.js
- [x] T015 [P] Content service to load JSON data in public/js/services/content-service.js
- [x] T016 [P] Category navigation component in public/js/components/nav-component.js
- [x] T017 [P] Movie display component in public/js/components/movie-component.js
- [x] T018 [P] Book display component in public/js/components/book-component.js
- [x] T019 [P] Game display component in public/js/components/game-component.js
- [x] T020 [P] Search functionality in public/js/utils/search-utils.js
- [x] T021 Create main app controller in public/js/app.js
- [x] T022 Create PWA manifest.json file in public/manifest.json
- [x] T023 Create service worker sw.js file in public/sw.js
- [x] T024 Update CSS for responsive design in public/css/style.css

## Phase 3.4: Integration
- [x] T025 Connect content service to actual JSON files (migrate from hardcoded data)
- [x] T026 Integrate service worker for offline caching of JSON and app assets
- [x] T027 Connect search functionality to content display
- [x] T028 Implement category filtering functionality
- [x] T029 Add loading states and error handling

## Phase 3.5: Polish
- [x] T030 [P] Unit tests for Movie model in tests/unit/test_movie_model.js
- [x] T031 [P] Unit tests for Book model in tests/unit/test_book_model.js
- [x] T032 [P] Unit tests for Game model in tests/unit/test_game_model.js
- [x] T033 [P] Unit tests for content service in tests/unit/test_content_service.js
- [ ] T034 Performance tests for loading time and offline capability
- [ ] T035 Add accessibility features to HTML elements
- [x] T036 [P] Update documentation in README.md
- [ ] T037 Add loading indicators and animations
- [x] T038 Create sample JSON data files: public/data/movies.json, public/data/books.json, public/data/games.json
- [x] T039 Run manual testing per quickstart guide

## Dependencies
- Tests (T006-T011) before implementation (T012-T024)
- T012-T014 block T015 (models needed before service)
- T015 blocks T021 (service needed before app controller)
- T021 blocks T025 (app controller needed before integration)
- Implementation before polish (T030-T039)

## Parallel Example
```
# Launch T012-T014 together (independent model files):
Task: "Movie data model utility in public/js/models/movie-model.js"
Task: "Book data model utility in public/js/models/book-model.js"
Task: "Game data model utility in public/js/models/game-model.js"

# Launch T016-T019 together (independent component files):
Task: "Category navigation component in public/js/components/nav-component.js"
Task: "Movie display component in public/js/components/movie-component.js"
Task: "Book display component in public/js/components/book-component.js"
Task: "Game display component in public/js/components/game-component.js"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
   
2. **From Data Model**:
   - Each entity → model creation task [P] (Movie, Book, Game)
   - Relationships → service layer tasks
   
3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Components → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks (Movie, Book, Game)
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task