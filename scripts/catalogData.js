const fs = require('fs');
const path = require('path');

// Let's create the complete, robust 48-item catalog
const products = [];

// Base angle images
const imgAngles = {
  naruto: [
    { url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80', alt: 'Front Model View', angle: 'front', isModel: true },
    { url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', alt: 'Back Graphic View', angle: 'back', isModel: true },
    { url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80', alt: 'Side Drop Profile', angle: 'side', isModel: true },
    { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80', alt: 'Fabric & Puff Print Closeup', angle: 'close' },
    { url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80', alt: 'Harajuku Street Styling', angle: 'lifestyle', isModel: true }
  ],
  spiderman: [
    { url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', alt: 'Front Pullover View', angle: 'front', isModel: true },
    { url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80', alt: 'Back Graphic View', angle: 'back', isModel: true },
    { url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80', alt: 'Side Hood Profile', angle: 'side', isModel: true },
    { url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', alt: 'Brushed Fleece Closeup', angle: 'close' },
    { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', alt: 'Streetwear Outfit Styling', angle: 'lifestyle', isModel: true }
  ],
  batman: [
    { url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80', alt: 'Tactical Cargo Front View', angle: 'front', isModel: true },
    { url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80', alt: 'Back Pocket View', angle: 'back', isModel: true },
    { url: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80', alt: 'Side Cargo Holster Profile', angle: 'side', isModel: true },
    { url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80', alt: 'Matte Metal Hardware Closeup', angle: 'close' },
    { url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80', alt: 'Night City Sneaker Pairing', angle: 'lifestyle', isModel: true }
  ],
  shirt: [
    { url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80', alt: 'Shirt Front Model View', angle: 'front', isModel: true },
    { url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', alt: 'Back Drape View', angle: 'back', isModel: true },
    { url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80', alt: 'Side Profile', angle: 'side', isModel: true },
    { url: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=800&q=80', alt: 'Fabric Weave & Shell Buttons Closeup', angle: 'close' },
    { url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80', alt: 'Casual Summer Styling', angle: 'lifestyle', isModel: true }
  ],
  trousers: [
    { url: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80', alt: 'Trousers Front View', angle: 'front', isModel: true },
    { url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80', alt: 'Back Welt Pockets View', angle: 'back', isModel: true },
    { url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80', alt: 'Side Drape Profile', angle: 'side', isModel: true },
    { url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', alt: 'Front Pleats & Twill Texture', angle: 'close' },
    { url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80', alt: 'Chunky Sneaker Styling', angle: 'lifestyle', isModel: true }
  ],
  shorts: [
    { url: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80', alt: 'Shorts Front Model View', angle: 'front', isModel: true },
    { url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80', alt: 'Back Pocket View', angle: 'back', isModel: true },
    { url: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80', alt: 'Side Silhouette & Zipper Pocket', angle: 'side', isModel: true },
    { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80', alt: 'Loopback Texture & Drawcords', angle: 'close' },
    { url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80', alt: 'Oversized Tee Combo Styling', angle: 'lifestyle', isModel: true }
  ],
  shoes: [
    { url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80', alt: 'Sneakers Front Toe Box View', angle: 'front', isModel: false },
    { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', alt: 'Lateral Silhouette Profile', angle: 'side', isModel: false },
    { url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80', alt: 'Heel Counter & Pull Tab View', angle: 'back', isModel: false },
    { url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80', alt: 'Outsole Tread & Stitching Closeup', angle: 'close' },
    { url: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80', alt: 'On-Foot Streetwear Outfit', angle: 'lifestyle', isModel: true }
  ]
};

console.log('Angles mapped');
