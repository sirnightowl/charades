/**
 * Simple Node.js script to verify that our JavaScript files can be loaded without syntax errors
 */

const fs = require('fs');
const path = require('path');

// List of JavaScript files to test
const jsFiles = [
  'js/settings.js',
  'js/components/card-info.js',
  'js/utils/screen-wake-lock.js',
  'js/app.js'
];

console.log('Testing JavaScript files for syntax errors...\n');

let allPassed = true;

jsFiles.forEach(file => {
  const filePath = path.join(__dirname, 'public', file);
  
  try {
    // Try to read and parse the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Try to compile the JavaScript (this will catch syntax errors)
    new Function(fileContent);
    
    console.log(`✓ ${file} - Syntax OK`);
  } catch (error) {
    console.error(`✗ ${file} - Error: ${error.message}`);
    allPassed = false;
  }
});

console.log('\n' + (allPassed ? '🎉 All JavaScript files passed syntax check!' : '❌ Some JavaScript files have syntax errors.'));