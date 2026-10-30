import React from 'react';
import CategoryView from './CategoryView';

export function generateStaticParams() {
  return [
    { category: 'men' },
    { category: 'women' },
    { category: 'kids' },
    { category: 'oversized' },
    { category: 'hoodies' },
    { category: 'joggers' },
    { category: 'printed-tshirts' },
    { category: 'collections' },
    { category: 'sale' },
    { category: 'shirts' },
    { category: 'trousers' },
    { category: 'shorts' },
    { category: 'shoes' },
  ];
}

export default function CategoryPage() {
  return <CategoryView />;
}
