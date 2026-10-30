const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
let content = fs.readFileSync(productsFilePath, 'utf8');

// Replace any double commas or malformed lines:
content = content.replace(/,\s*,/g, ',');
content = content.replace(/id: 'prod-(\d+)'\s*\n\s*subCategory:/g, "id: 'prod-$1',\n    subCategory:");

// Fix prod-005 subcategory (it's a Supima Tee)
content = content.replace(
  "id: 'prod-005',\n    subCategory: 'hoodies-sweatshirts',",
  "id: 'prod-005',\n    subCategory: 't-shirts',"
);

// Fix prod-021 (it had subCat instead of subCategory)
content = content.replace("subCat: 't-shirts',", "subCategory: 't-shirts',");

fs.writeFileSync(productsFilePath, content, 'utf8');
console.log('Cleaned syntax in products.ts');
