const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
let content = fs.readFileSync(productsFilePath, 'utf8');

// For any images array that only has 2 images:
// e.g. prod-002, prod-003, prod-004 etc.
// We can complement them with high-definition side, closeup, and lifestyle images.

const complementaryViews = [
  {
    targetMatch: "alt: 'One Piece Gear 5 Oversized Tee Back',",
    addViews: `
      {
        url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
        alt: 'One Piece Gear 5 Oversized Tee - Side Drop Shoulder Profile',
        angle: 'side',
        isModel: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
        alt: 'One Piece Gear 5 Oversized Tee - Manga Artwork Print Closeup',
        angle: 'close',
      },
      {
        url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
        alt: 'One Piece Gear 5 Oversized Tee - Streetwear Styling Look',
        angle: 'lifestyle',
        isModel: true,
      },`
  },
  {
    targetMatch: "alt: 'Supima Crewneck Tee Back',",
    addViews: `
      {
        url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
        alt: 'Supima Crewneck Tee - Side Profile Drape',
        angle: 'side',
        isModel: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
        alt: 'Supima Crewneck Tee - 100% Supima Weave & Collar Stitched Detail',
        angle: 'close',
      },
      {
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
        alt: 'Supima Crewneck Tee - Minimalist Layered Styling',
        angle: 'lifestyle',
        isModel: true,
      },`
  },
  {
    targetMatch: "alt: 'Gojo Satoru Oversized Tee Back',",
    addViews: `
      {
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
        alt: 'Gojo Satoru Oversized Tee - Side Profile',
        angle: 'side',
        isModel: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
        alt: 'Gojo Satoru Oversized Tee - High Density Neon Eye Print Detail',
        angle: 'close',
      },
      {
        url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
        alt: 'Gojo Satoru Oversized Tee - Shibuya Street Style',
        angle: 'lifestyle',
        isModel: true,
      },`
  },
];

for (const comp of complementaryViews) {
  if (content.includes(comp.targetMatch) && !content.includes(comp.addViews.trim().slice(0, 40))) {
    // Find the closing brace of this image object:
    const pos = content.indexOf(comp.targetMatch);
    if (pos !== -1) {
      const nextBrace = content.indexOf('},', pos);
      if (nextBrace !== -1) {
        content = content.slice(0, nextBrace + 2) + comp.addViews + content.slice(nextBrace + 2);
      }
    }
  }
}

fs.writeFileSync(productsFilePath, content, 'utf8');
console.log('Enriched multi-angle views in products.ts');
