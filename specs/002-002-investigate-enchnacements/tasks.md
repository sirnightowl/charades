# Tasks: UX Enhancements - Settings, Background Color, Card Info, Screen Wake Lock

**Input**: Design documents from `/specs/002-002-investigate-enchnacements/`
**Prerequisites**: plan.md (required), spec.md

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → spec.md: Extract entities → model tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB connections, middleware, logging
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
- **PWA Application**: `public/` for frontend assets, `js/` for JavaScript files

## Phase 3.1: Setup
- [ ] T001 Update HTML to replace info button with settings icon in public/index.html
- [ ] T002 Create CSS file for color selection UI in public/css/settings.css
- [ ] T003 Create JavaScript file for settings functionality in public/js/settings.js

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T004 [P] Create settings UI test in tests/unit/test_settings_ui.js
- [ ] T005 [P] Create background color selection test in tests/unit/test_background_color.js
- [ ] T006 [P] Create card info button test in tests/unit/test_card_info.js
- [ ] T007 [P] Create screen wake lock test in tests/unit/test_screen_wake_lock.js

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T008 [P] Implement settings icon replacement in public/index.html
- [ ] T009 [P] Implement background color selection UI in public/js/settings.js
- [ ] T010 [P] Implement color preference persistence in public/js/settings.js
- [ ] T011 [P] Implement info button on cards in public/js/components/
- [ ] T012 [P] Implement screen wake lock functionality in public/js/utils/screen-wake-lock.js
- [ ] T013 Update main app controller to integrate new features in public/js/app.js
- [ ] T014 Add info modal/overlay for card details in public/index.html and public/js/components/info-modal.js

## Phase 3.4: Integration
- [ ] T015 Connect settings UI to background color functionality
- [ ] T016 Integrate screen wake lock with main app flow
- [ ] T017 Connect card info buttons to info display functionality
- [ ] T018 Ensure settings persist across app sessions

## Phase 3.5: Polish
- [ ] T019 [P] Unit tests for settings functionality in tests/unit/test_settings.js
- [ ] T020 [P] Unit tests for screen wake lock in tests/unit/test_screen_wake_lock_logic.js
- [ ] T021 [P] Update documentation in README.md
- [ ] T022 Add accessibility features to new UI elements
- [ ] T023 Run manual testing per quickstart guide

## Dependencies
- Tests (T004-T007) before implementation (T008-T014)
- T008 blocks T009, T011 (HTML needed for functionality)
- T009 blocks T015 (settings UI needed before integration)
- T012 blocks T016 (wake lock implementation needed before integration)
- T011 blocks T017 (card info buttons needed before integration)
- Implementation before polish (T019-T023)

## Parallel Example
```
# Launch T004-T007 together:
Task: "Create settings UI test in tests/unit/test_settings_ui.js"
Task: "Create background color selection test in tests/unit/test_background_color.js"
Task: "Create card info button test in tests/unit/test_card_info.js"
Task: "Create screen wake lock test in tests/unit/test_screen_wake_lock.js"

# Launch T009-T012 together (independent feature implementations):
Task: "Implement background color selection UI in public/js/settings.js"
Task: "Implement color preference persistence in public/js/settings.js"
Task: "Implement info button on cards in public/js/components/"
Task: "Implement screen wake lock functionality in public/js/utils/screen-wake-lock.js"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Spec**:
   - Each requirement → implementation task [P]
   
2. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

3. **Ordering**:
   - Setup → Tests → Models → Services → Components → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All requirements have corresponding tests
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task