const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'src', 'data', 'products.ts');

let content = fs.readFileSync(productsFilePath, 'utf8');

// Ensure subCategory is added to prod-004 through prod-030 if missing
const subCategoryMappings = [
  { match: "id: 'prod-004'", subCat: "subCategory: 'oversized-t-shirts'," },
  { match: "id: 'prod-005'", subCat: "subCategory: 'hoodies-sweatshirts'," },
  { match: "id: 'prod-006'", subCat: "subCategory: 'oversized-t-shirts'," },
  { match: "id: 'prod-007'", subCat: "subCategory: 't-shirts'," },
  { match: "id: 'prod-008'", subCat: "subCategory: 't-shirts'," },
  { match: "id: 'prod-009'", subCat: "subCategory: 'hoodies-sweatshirts'," },
  { match: "id: 'prod-010'", subCat: "subCategory: 'cargo-joggers'," },
  { match: "id: 'prod-011'", subCat: "subCategory: 'oversized-t-shirts'," },
  { match: "id: 'prod-012'", subCat: "subCategory: 't-shirts'," },
  { match: "id: 'prod-013'", subCat: "subCategory: 'oversized-t-shirts'," },
  { match: "id: 'prod-014'", subCat: "subCategory: 'hoodies-sweatshirts'," },
  { match: "id: 'prod-015'", subCat: "subCategory: 'oversized-t-shirts'," },
  { match: "id: 'prod-016'", subCat: "subCategory: 'cargo-joggers'," },
  { match: "id: 'prod-017'", subCat: "subCategory: 't-shirts'," },
  { match: "id: 'prod-018'", subCat: "subCategory: 'hoodies-sweatshirts'," },
  { match: "id: 'prod-019'", subCat: "subCategory: 'oversized-t-shirts'," },
  { match: "id: 'prod-020'", subCat: "subCategory: 't-shirts'," },
  { match: "id: 'prod-021'", subCat: "subCat: 't-shirts'," },
  { match: "id: 'prod-022'", subCat: "subCategory: 'oversized-t-shirts'," },
  { match: "id: 'prod-023'", subCat: "subCategory: 'hoodies-sweatshirts'," },
  { match: "id: 'prod-024'", subCat: "subCategory: 'oversized-t-shirts'," },
  { match: "id: 'prod-025'", subCat: "subCategory: 't-shirts'," },
  { match: "id: 'prod-026'", subCat: "subCategory: 'oversized-t-shirts'," },
  { match: "id: 'prod-027'", subCat: "subCategory: 'hoodies-sweatshirts'," },
  { match: "id: 'prod-028'", subCat: "subCategory: 'shirts'," },
  { match: "id: 'prod-029'", subCat: "subCategory: 't-shirts'," },
  { match: "id: 'prod-030'", subCat: "subCategory: 'hoodies-sweatshirts'," },
];

for (const mapping of subCategoryMappings) {
  if (content.includes(mapping.match) && !content.includes(mapping.subCat)) {
    content = content.replace(mapping.match, `${mapping.match}\n    ${mapping.subCat}`);
  }
}

fs.writeFileSync(productsFilePath, content, 'utf8');
console.log('Successfully standardized all subcategories in products.ts');
