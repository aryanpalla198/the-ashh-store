'use client';

import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from '@/data/products';
import { Product, ProductSize } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Plus, Edit, Trash2, Search, Shirt, X, Check, ArrowUpDown } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<any>('oversized');
  const [newFandom, setNewFandom] = useState<any>('Anime / Naruto');
  const [newPrice, setNewPrice] = useState(999);
  const [newMrp, setNewMrp] = useState(1799);
  const [newFit, setNewFit] = useState<any>('Oversized Fit');
  const [newFabric, setNewFabric] = useState('100% Combed Cotton (240 GSM)');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80');

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fandom?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProduct = (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: `prod-${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: `Official ${newTitle} crafted with high-density printing and premium streetwear silhouette.`,
      highlights: ['100% Super Combed Cotton', 'Pre-shrunk finish', 'Reinforced neckband'],
      category: newCategory,
      fandom: newFandom,
      gender: 'men',
      fit: newFit,
      fabric: newFabric,
      gsm: 240,
      washCare: ['Machine wash cold', 'Iron inside out'],
      price: Number(newPrice),
      mrp: Number(newMrp),
      discountPercentage: Math.round(((newMrp - newPrice) / newMrp) * 100),
      memberPrice: Number(newPrice) - 100,
      hsnCode: '61091000',
      gstRate: 5,
      images: [
        { url: newImageUrl, alt: newTitle, angle: 'front', isModel: true },
      ],
      variants: [
        { sku: `SKU-${Date.now()}-S`, size: 'S', color: 'Black', colorHex: '#000000', stock: 20 },
        { sku: `SKU-${Date.now()}-M`, size: 'M', color: 'Black', colorHex: '#000000', stock: 25 },
        { sku: `SKU-${Date.now()}-L`, size: 'L', color: 'Black', colorHex: '#000000', stock: 30 },
        { sku: `SKU-${Date.now()}-XL`, size: 'XL', color: 'Black', colorHex: '#000000', stock: 15 },
      ],
      rating: 4.8,
      reviewCount: 12,
      isNewArrival: true,
      officialLicenseBadge: 'THE ASHH STORE OFFICIAL',
      tags: ['new drop', 'streetwear'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProducts([created, ...products]);
    setShowAddModal(false);
    alert('Product created successfully and added to live catalog!');
  };

  const adjustVariantStock = (productId: string, size: ProductSize, delta: number) => {
    setProducts(
      products.map((p) => {
        if (p.id !== productId) return p;
        return {
          ...p,
          variants: p.variants.map((v) =>
            v.size === size ? { ...v, stock: Math.max(0, v.stock + delta) } : v
          ),
        };
      })
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#E11B23]">
            Inventory & Catalog Management
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-0.5">
            Products ({products.length})
          </h2>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#E11B23] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Apparel Drop</span>
        </button>
      </div>

      {/* Search Filter Bar */}
      <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex items-center gap-3">
        <Search className="w-4 h-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Filter by title, category, or fandom..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-white text-xs placeholder:text-zinc-500 w-full focus:outline-none"
        />
      </div>

      {/* Products Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-950/80 text-zinc-400 font-bold uppercase border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Category & Fandom</th>
                <th className="py-3 px-4">Price / MRP</th>
                <th className="py-3 px-4">Variant Stock (Click ± to Adjust)</th>
                <th className="py-3 px-4">HSN / GST</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300 font-medium">
              {filtered.map((prod) => {
                const totalStock = prod.variants.reduce((acc, v) => acc + v.stock, 0);

                return (
                  <tr key={prod.id} className="hover:bg-zinc-800/30 transition">
                    {/* Item Thumbnail & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]?.url}
                          alt={prod.title}
                          className="w-12 h-14 object-cover rounded-xl bg-zinc-800 shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-white line-clamp-1 max-w-xs">{prod.title}</h4>
                          <span className="text-[10px] text-zinc-500 font-mono">ID: {prod.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category & Fandom */}
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <span className="inline-block bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                          {prod.category}
                        </span>
                        <p className="text-[11px] text-[#E11B23] font-bold">{prod.fandom || 'Solids'}</p>
                      </div>
                    </td>

                    {/* Price / MRP */}
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <p className="text-white font-bold">{formatPrice(prod.price)}</p>
                        <p className="text-[10px] text-zinc-500 line-through">{formatPrice(prod.mrp)}</p>
                      </div>
                    </td>

                    {/* Variant Stock Matrix */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        {prod.variants.map((v) => (
                          <div
                            key={v.sku}
                            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold border ${
                              v.stock === 0
                                ? 'bg-red-950/40 border-red-900 text-red-400'
                                : v.stock < 10
                                ? 'bg-amber-950/40 border-amber-800 text-amber-300'
                                : 'bg-zinc-950 border-zinc-700 text-zinc-200'
                            }`}
                          >
                            <span>{v.size}:</span>
                            <span className="font-mono">{v.stock}</span>
                            <div className="flex flex-col ml-1">
                              <button
                                onClick={() => adjustVariantStock(prod.id, v.size, 5)}
                                className="hover:text-emerald-400"
                                title="Add 5"
                              >
                                +
                              </button>
                              <button
                                onClick={() => adjustVariantStock(prod.id, v.size, -5)}
                                className="hover:text-red-400"
                                title="Minus 5"
                              >
                                -
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* HSN / GST */}
                    <td className="py-3 px-4">
                      <div className="text-[11px]">
                        <p className="font-mono text-zinc-400">{prod.hsnCode}</p>
                        <p className="text-emerald-400 font-bold">{prod.gstRate}% GST</p>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-zinc-800"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-xl w-full p-6 text-white space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
              <h3 className="text-base font-black uppercase">Create New Apparel Drop</h3>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Attack On Titan: Survey Corps Oversized Hoodie"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-[#E11B23]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 focus:outline-none"
                  >
                    <option value="oversized">Oversized Tees</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="joggers">Cargo Joggers</option>
                    <option value="printed-tshirts">Printed T-Shirts</option>
                    <option value="collections">Collections</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Fandom / Theme</label>
                  <select
                    value={newFandom}
                    onChange={(e) => setNewFandom(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 focus:outline-none"
                  >
                    <option value="Anime / Naruto">Anime / Naruto</option>
                    <option value="Marvel">Marvel</option>
                    <option value="DC Comics">DC Comics</option>
                    <option value="Supima Solids">Supima Solids</option>
                    <option value="Ashh Originals">Ashh Originals</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newMrp}
                    onChange={(e) => setNewMrp(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#E11B23] hover:bg-red-700 text-white font-bold uppercase px-6 py-2.5 rounded-xl shadow-lg"
                >
                  Save & Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
