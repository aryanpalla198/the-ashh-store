const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'src', 'data', 'products.ts');
let content = fs.readFileSync(file, 'utf8');

// For titles with Women's or similar, use clean double quotes:
content = content.replace(/title:\s*['"][^'"]*Women.*?['"]/g, 'title: "Women\'s Boyfriend Oversized Crisp Poplin Striped Shirt"');
content = content.replace(/title:\s*['"][^'"]*Tailored High-Waist.*?['"]/g, 'title: "Women\'s Tailored High-Waist Straight Leg Trousers - Ivory Cream"');
content = content.replace(/title:\s*['"][^'"]*Sculpt Flex.*?['"]/g, 'title: "Women\'s Sculpt Flex Ribbed Biker Shorts - Washed Onyx"');

// Fix any descriptions with unescaped quotes:
content = content.replace(/description:\s*'([^']*)'([^']*)'/g, 'description: "$1\'$2"');

fs.writeFileSync(file, content, 'utf8');
console.log('Normalized quotes in products.ts');
