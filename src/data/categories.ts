export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconImage: string;
  heroBanner: string;
  badge?: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'cat-oversized',
    name: 'Oversized Tees',
    slug: 'oversized',
    description: 'Heavyweight 240 GSM drop-shoulder tees engineered for supreme drape and street style.',
    iconImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1600&q=80',
    badge: 'POPULAR',
  },
  {
    id: 'cat-hoodies',
    name: 'Hoodies & Sweats',
    slug: 'hoodies',
    description: 'Ultra-warm 340 GSM brushed fleece pullovers, zip-ups, and boxy cut silhouettes.',
    iconImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1600&q=80',
    badge: 'WINTER DROP',
  },
  {
    id: 'cat-joggers',
    name: 'Cargo & Joggers',
    slug: 'joggers',
    description: 'Tactical multi-pocket cargo pants and heavy French terry daily sweatpants.',
    iconImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1600&q=80',
    badge: 'TRENDING',
  },
  {
    id: 'cat-men',
    name: 'Men',
    slug: 'men',
    description: 'Complete wardrobe featuring oversized tees, polos, shirts, shorts, and jeans.',
    iconImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'cat-women',
    name: 'Women',
    slug: 'women',
    description: 'Curated streetwear, cropped tees, oversized fits, hoodies, and dresses.',
    iconImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80',
    badge: 'NEW',
  },
  {
    id: 'cat-printed',
    name: 'Printed T-Shirts',
    slug: 'printed-tshirts',
    description: 'Graphic statements from pop culture, music, humor, and vintage aesthetics.',
    iconImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'cat-collections',
    name: 'Fandom Merch',
    slug: 'collections',
    description: '100% Official Licensed Marvel, Anime, Naruto, DC, Harry Potter & Disney collectibles.',
    iconImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1600&q=80',
    badge: 'OFFICIAL',
  },
  {
    id: 'cat-kids',
    name: 'Kids',
    slug: 'kids',
    description: 'Super-soft, hypoallergenic superhero and cartoon tees for little legends.',
    iconImage: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=400&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'cat-sale',
    name: 'Clearance Sale',
    slug: 'sale',
    description: 'Up to 60% OFF on last-chance drops and seasonal clearances.',
    iconImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1600&q=80',
    badge: 'UP TO 60% OFF',
  },
  {
    id: 'cat-shirts',
    name: 'Shirts',
    slug: 'shirts',
    description: 'Casual resort shirts, linen blends, premium oxfords, and official pop-culture vacation shirts.',
    iconImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1600&q=80',
    badge: 'NEW ARRIVALS',
  },
  {
    id: 'cat-trousers',
    name: 'Trousers & Chinos',
    slug: 'trousers',
    description: 'Korean wide-leg pleats, everyday flex stretch chinos, and tactical utility trousers.',
    iconImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1600&q=80',
    badge: 'TRENDING',
  },
  {
    id: 'cat-shorts',
    name: 'Shorts',
    slug: 'shorts',
    description: '280 GSM heavyweight French terry streetwear sweatshorts and tactical ripstop utility shorts.',
    iconImage: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=400&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'cat-shoes',
    name: 'Shoes & Sneakers',
    slug: 'shoes',
    description: 'Chunky streetwear kicks, vulcanized canvas retro skate shoes, and minimalist court sneakers.',
    iconImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1600&q=80',
    badge: 'SNEAKER DROP',
  },
];

export interface SubCollectionItem {
  id: string; // e.g. 'all' | 'shirts' | 'trousers' | 'shorts' | 't-shirts' | 'shoes-sneakers'
  name: string;
  subCategoryKey?: string;
  icon?: string;
  badge?: string;
}

export const CATEGORY_SUB_COLLECTIONS: Record<string, SubCollectionItem[]> = {
  men: [
    { id: 'all', name: 'All Men Collections' },
    { id: 'shirts', name: 'Shirts', subCategoryKey: 'shirts', badge: 'POPULAR' },
    { id: 'trousers', name: 'Trousers & Chinos', subCategoryKey: 'trousers', badge: 'NEW' },
    { id: 'shorts', name: 'Shorts', subCategoryKey: 'shorts' },
    { id: 't-shirts', name: 'T-Shirts & Polos', subCategoryKey: 't-shirts' },
    { id: 'oversized-t-shirts', name: 'Oversized T-Shirts', subCategoryKey: 'oversized-t-shirts', badge: 'HOT' },
    { id: 'hoodies-sweatshirts', name: 'Hoodies & Sweatshirts', subCategoryKey: 'hoodies-sweatshirts' },
    { id: 'cargo-joggers', name: 'Cargo & Joggers', subCategoryKey: 'cargo-joggers' },
    { id: 'shoes-sneakers', name: 'Shoes & Sneakers', subCategoryKey: 'shoes-sneakers', badge: 'DROPS' },
  ],
  women: [
    { id: 'all', name: 'All Women Collections' },
    { id: 'oversized-t-shirts', name: 'Oversized T-Shirts', subCategoryKey: 'oversized-t-shirts', badge: 'HOT' },
    { id: 'shirts', name: 'Shirts & Tops', subCategoryKey: 'shirts' },
    { id: 'trousers', name: 'Trousers & Pants', subCategoryKey: 'trousers', badge: 'CHIC' },
    { id: 'hoodies-sweatshirts', name: 'Hoodies & Sweats', subCategoryKey: 'hoodies-sweatshirts' },
    { id: 'cargo-joggers', name: 'Cargo Joggers', subCategoryKey: 'cargo-joggers' },
    { id: 'shorts', name: 'Shorts', subCategoryKey: 'shorts' },
    { id: 'dresses', name: 'Dresses & Co-ords', subCategoryKey: 'dresses' },
    { id: 'shoes-sneakers', name: 'Sneakers & Shoes', subCategoryKey: 'shoes-sneakers' },
  ],
  kids: [
    { id: 'all', name: 'All Kids Drops' },
    { id: 't-shirts', name: 'Superhero T-Shirts', subCategoryKey: 't-shirts' },
    { id: 'hoodies-sweatshirts', name: 'Kids Hoodies', subCategoryKey: 'hoodies-sweatshirts' },
    { id: 'shorts', name: 'Kids Shorts', subCategoryKey: 'shorts' },
  ],
  oversized: [
    { id: 'all', name: 'All Oversized Drops' },
    { id: 'anime', name: 'Anime & Naruto Editions', subCategoryKey: 'oversized-t-shirts' },
    { id: 'marvel', name: 'Marvel Avengers Drops', subCategoryKey: 'oversized-t-shirts' },
    { id: 'supima', name: 'Supima Cotton Solids', subCategoryKey: 'oversized-t-shirts' },
    { id: 'dc', name: 'DC Batman & Gotham', subCategoryKey: 'oversized-t-shirts' },
  ],
  hoodies: [
    { id: 'all', name: 'All Hoodies & Sweats' },
    { id: 'pullover', name: '340 GSM Pullovers', subCategoryKey: 'hoodies-sweatshirts' },
    { id: 'zippers', name: 'Zip-Up Street Jackets', subCategoryKey: 'hoodies-sweatshirts' },
    { id: 'anime-sweats', name: 'Anime Tapestry Hoodies', subCategoryKey: 'hoodies-sweatshirts' },
  ],
  joggers: [
    { id: 'all', name: 'All Bottomwear' },
    { id: 'cargo-joggers', name: 'Tactical Cargo Joggers', subCategoryKey: 'cargo-joggers' },
    { id: 'trousers', name: 'Pleated Trousers', subCategoryKey: 'trousers' },
    { id: 'shorts', name: 'Streetwear Shorts', subCategoryKey: 'shorts' },
  ],
  shirts: [
    { id: 'all', name: 'All Shirts' },
    { id: 'resort', name: 'Camp Collar Linen Resort', subCategoryKey: 'shirts' },
    { id: 'oxford', name: 'Oxford Button-Downs', subCategoryKey: 'shirts' },
    { id: 'denim', name: 'Denim Overshirts', subCategoryKey: 'shirts' },
    { id: 'anime-shirt', name: 'Official Anime Graphic Shirts', subCategoryKey: 'shirts' },
  ],
  trousers: [
    { id: 'all', name: 'All Trousers & Chinos' },
    { id: 'pleated', name: 'Korean Wide-Leg Pleats', subCategoryKey: 'trousers' },
    { id: 'chinos', name: 'Stretch Daily Chinos', subCategoryKey: 'trousers' },
    { id: 'tactical', name: 'Tactical Cargo Trousers', subCategoryKey: 'trousers' },
  ],
  shorts: [
    { id: 'all', name: 'All Shorts' },
    { id: 'terry-shorts', name: '280 GSM French Terry', subCategoryKey: 'shorts' },
    { id: 'cargo-shorts', name: 'Ripstop Cargo Shorts', subCategoryKey: 'shorts' },
    { id: 'anime-shorts', name: 'Anime Embroidered Shorts', subCategoryKey: 'shorts' },
  ],
  shoes: [
    { id: 'all', name: 'All Footwear' },
    { id: 'chunky-sneakers', name: 'Chunky Streetwear Kicks', subCategoryKey: 'shoes-sneakers' },
    { id: 'canvas-kicks', name: 'Retro High-Top Skate Canvas', subCategoryKey: 'shoes-sneakers' },
    { id: 'court-shoes', name: 'Classic Court Leather Shoes', subCategoryKey: 'shoes-sneakers' },
    { id: 'marvel-shoes', name: 'Marvel Miles Morales Kicks', subCategoryKey: 'shoes-sneakers' },
  ],
  collections: [
    { id: 'all', name: 'All Licensed Fandoms' },
    { id: 'anime', name: 'Naruto & Anime' },
    { id: 'marvel', name: 'Marvel Studios' },
    { id: 'dc', name: 'DC Comics' },
    { id: 'star-wars', name: 'Star Wars' },
    { id: 'supima', name: 'Supima Luxury' },
  ],
  sale: [
    { id: 'all', name: 'All Clearance Sale' },
    { id: 't-shirts', name: 'T-Shirts Under ₹599', subCategoryKey: 't-shirts' },
    { id: 'shirts', name: 'Shirts on Sale', subCategoryKey: 'shirts' },
    { id: 'hoodies-sweatshirts', name: 'Hoodies 50% Off', subCategoryKey: 'hoodies-sweatshirts' },
    { id: 'shoes-sneakers', name: 'Footwear Sale', subCategoryKey: 'shoes-sneakers' },
  ],
};

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  link: string;
  ctaText: string;
  color: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'OFFICIAL ANIME DROP 2026',
    subtitle: 'Naruto Akatsuki & One Piece Gear 5 Oversized Collection',
    tag: 'LIMITED OFFICIAL MERCH',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1600&q=85',
    link: '/oversized?fandom=Anime',
    ctaText: 'SHOP ANIME DROP',
    color: '#E11B23',
  },
  {
    id: 'slide-2',
    title: 'THE WINTER HOODIE FEST',
    subtitle: '340 GSM Brushed Fleece Pullovers & Varsity Jackets',
    tag: 'WARMTH MEETS STREET STYLE',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1600&q=85',
    link: '/hoodies',
    ctaText: 'EXPLORE HOODIES',
    color: '#0F172A',
  },
  {
    id: 'slide-3',
    title: 'MARVEL x ASHH STORE',
    subtitle: 'Spider-Man, Deadpool & Iron Man Glow Editions',
    tag: '100% OFFICIALLY LICENSED',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1600&q=85',
    link: '/collections?fandom=Marvel',
    ctaText: 'GET THE MERCH',
    color: '#B91C1C',
  },
  {
    id: 'slide-4',
    title: 'THE ASHH EXCLUSIVE CLUB',
    subtitle: 'Members Save Up to 20% Extra + Free Priority Shipping',
    tag: 'EXCLUSIVE PERKS',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=85',
    link: '/collections',
    ctaText: 'JOIN THE CLUB',
    color: '#18181B',
  },
];
