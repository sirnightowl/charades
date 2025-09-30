/**
 * Test script to validate the usage tracking implementation
 */
const fs = require('fs');
const path = require('path');

// Define the project directory
const projectDir = '/home/martin/Documents/Charades';

// Test 1: Check if the usage tracker file was created
const usageTrackerFile = path.join(projectDir, 'public', 'js', 'utils', 'usage-tracker.js');
const usageTrackerExists = fs.existsSync(usageTrackerFile);
console.log(`Test 1 - UsageTracker file exists: ${usageTrackerExists ? 'PASSED' : 'FAILED'}`);

if (usageTrackerExists) {
    const usageTrackerContent = fs.readFileSync(usageTrackerFile, 'utf8');
    const hasMarkUsedMethod = usageTrackerContent.includes('markUsed');
    const hasGetUnusedItemsMethod = usageTrackerContent.includes('getUnusedItems');
    const hasResetMethods = usageTrackerContent.includes('resetCategory') || usageTrackerContent.includes('resetAll');
    
    console.log(`  - Has markUsed method: ${hasMarkUsedMethod}`);
    console.log(`  - Has getUnusedItems method: ${hasGetUnusedItemsMethod}`);
    console.log(`  - Has reset methods: ${hasResetMethods}`);
}

// Test 2: Check if app.js was modified to initialize usage tracker
const appFile = path.join(projectDir, 'public', 'js', 'app.js');
const appContent = fs.readFileSync(appFile, 'utf8');
const hasInitUsageTracker = appContent.includes('initUsageTracker');
const hasWindowApp = appContent.includes('window.app = app');

console.log(`Test 2 - App.js modified for usage tracking: ${hasInitUsageTracker ? 'PASSED' : 'FAILED'}`);
console.log(`  - Has initUsageTracker call: ${hasInitUsageTracker}`);
console.log(`  - Makes app instance globally available: ${hasWindowApp}`);

// Test 3: Check if settings.js was modified to include reset functionality
const settingsFile = path.join(projectDir, 'public', 'js', 'settings.js');
const settingsContent = fs.readFileSync(settingsFile, 'utf8');
const hasResetButtonHTML = settingsContent.includes('Reset Used Content');
const hasResetFunction = settingsContent.includes('resetUsedContent');
const hasResetEventListener = settingsContent.includes('reset-used-content');

console.log(`Test 3 - Settings.js modified for reset functionality: ${hasResetButtonHTML && hasResetFunction ? 'PASSED' : 'FAILED'}`);
console.log(`  - Has reset button HTML: ${hasResetButtonHTML}`);
console.log(`  - Has reset function: ${hasResetFunction}`);
console.log(`  - Has reset event listener: ${hasResetEventListener}`);

// Test 4: Check if index.html includes the new script
const indexFile = path.join(projectDir, 'public', 'index.html');
const indexContent = fs.readFileSync(indexFile, 'utf8');
const hasUsageTrackerScript = indexContent.includes('usage-tracker.js');

console.log(`Test 4 - Index.html includes usage tracker script: ${hasUsageTrackerScript ? 'PASSED' : 'FAILED'}`);

// Test 5: Check if content service was modified
const contentServiceFile = path.join(projectDir, 'public', 'js', 'services', 'content-service.js');
const contentServiceContent = fs.readFileSync(contentServiceFile, 'utf8');
const hasUsageTrackerIntegration = contentServiceContent.includes('usageTracker') || contentServiceContent.includes('getUnusedItems');
const hasInitUsageTrackerMethod = contentServiceContent.includes('initUsageTracker');

console.log(`Test 5 - Content service modified for usage tracking: ${hasUsageTrackerIntegration ? 'PASSED' : 'FAILED'}`);
console.log(`  - Has usage tracker integration: ${hasUsageTrackerIntegration}`);
console.log(`  - Has initUsageTracker method: ${hasInitUsageTrackerMethod}`);

// Overall result
const allTestsPassed = usageTrackerExists && hasInitUsageTracker && hasWindowApp && 
                      hasResetButtonHTML && hasResetFunction && hasResetEventListener && 
                      hasUsageTrackerScript && hasUsageTrackerIntegration && hasInitUsageTrackerMethod;

console.log(`\nOverall Result: ${allTestsPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
console.log(`Implementation is ${allTestsPassed ? 'SUCCESSFUL' : 'NEEDS ATTENTION'}`);