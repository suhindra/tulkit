const chroma = require('chroma-js');

// Read the actual pantoneColors data
const { PANTONE_COLORS, findClosestPantone } = require('./src/data/pantoneColors.ts');

console.log('Testing with #FF0000 (pure red):');
try {
  const result = findClosestPantone('#FF0000');
  console.log('Result:', result);
} catch (e) {
  console.error('Error:', e.message);
}

console.log('\nTesting with #00D1B2 (aquamarine):');
try {
  const result = findClosestPantone('#00D1B2');
  console.log('Result:', result);
} catch (e) {
  console.error('Error:', e.message);
}

console.log('\nTesting with #0000FF (pure blue):');
try {
  const result = findClosestPantone('#0000FF');
  console.log('Result:', result);
} catch (e) {
  console.error('Error:', e.message);
}
