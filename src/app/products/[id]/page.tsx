import React from 'react';
import ProductDetailView from './ProductDetailView';
import { INITIAL_PRODUCTS } from '@/data/products';

export function generateStaticParams() {
  return INITIAL_PRODUCTS.map((p) => ({
    id: p.id,
  }));
}

export default function ProductDetailPage() {
  return <ProductDetailView />;
}
