const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'src', 'data', 'products.ts');
let content = fs.readFileSync(file, 'utf8');

const regex = /id:\s*'prod-\d+'(?!\s*,)/g;
const matches = content.match(regex);
console.log('Matches without comma:', matches);

if (matches) {
  content = content.replace(/id:\s*'prod-(\d+)'(?!\s*,)/g, "id: 'prod-$1',");
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed matches');
} else {
  console.log('All product IDs already have commas!');
}
