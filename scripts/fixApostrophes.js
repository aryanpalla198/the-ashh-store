const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'src', 'data', 'products.ts');
let content = fs.readFileSync(file, 'utf8');

// Fix unescaped "Women's"
content = content.replace(/title:\s*'Women's/g, "title: 'Women\\'s");
content = content.replace(/description:\s*'([^']*)'s/g, "description: '$1\\'s");
// Also check for "Luffy's", "Brooklyn's", "doesn't" in single-quoted strings:
content = content.replace(/title:\s*'([^']*)'s/g, "title: '$1\\'s");
content = content.replace(/'Women's/g, "'Women\\'s");
content = content.replace(/'Luffy's/g, "'Luffy\\'s");
content = content.replace(/'Brooklyn's/g, "'Brooklyn\\'s");

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed apostrophes in products.ts');
