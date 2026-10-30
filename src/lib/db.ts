import fs from 'fs';
import path from 'path';
import { Product, Order, User, Coupon, Review, CartItem, ProductSize } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/products';
import { INITIAL_COUPONS } from '@/data/coupons';

const DATA_FILE = path.join(process.cwd(), '.ashh-db-store.json');

interface DatabaseSchema {
  products: Product[];
  orders: Order[];
  users: User[];
  coupons: Coupon[];
  reviews: Review[];
}

function getInitialData(): DatabaseSchema {
  // Initial demo users (Admin and Customer)
  const defaultAdmin: User = {
    id: 'user-admin-1',
    name: 'Ashh Store Master Admin',
    email: 'admin@theashhstore.com',
    role: 'admin',
    addresses: [
      {
        id: 'addr-admin-1',
        name: 'Ashh HQ',
        phone: '9876543210',
        addressLine1: 'The Ashh Store Tower, Bandra Kurla Complex',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400051',
        addressType: 'Work',
        isDefault: true,
      },
    ],
    walletBalance: 2500,
    wishlist: ['prod-001', 'prod-002'],
    isMember: true,
    createdAt: new Date().toISOString(),
  };

  const defaultCustomer: User = {
    id: 'user-cust-1',
    name: 'Aryan Palla',
    email: 'aryan@example.com',
    phone: '9876500001',
    role: 'customer',
    addresses: [
      {
        id: 'addr-cust-1',
        name: 'Aryan Palla',
        phone: '9876500001',
        addressLine1: 'Flat 402, Skyline Residency, Linking Road',
        addressLine2: 'Near Khar Station',
        landmark: 'Opposite Starbucks',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400052',
        addressType: 'Home',
        isDefault: true,
      },
    ],
    walletBalance: 500,
    wishlist: ['prod-001', 'prod-003'],
    isMember: true,
    createdAt: new Date().toISOString(),
  };

  return {
    products: INITIAL_PRODUCTS,
    orders: [
      {
        id: 'ord-sample-1',
        orderNumber: 'ASHH-2026-SPK891',
        userId: 'user-cust-1',
        customer: {
          name: 'Aryan Palla',
          email: 'aryan@example.com',
          phone: '9876500001',
        },
        items: [
          {
            productId: 'prod-001',
            title: 'Naruto: Akatsuki Cloud Oversized T-Shirt',
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80',
            size: 'L',
            color: 'Midnight Black',
            quantity: 1,
            price: 999,
            mrp: 1799,
            hsnCode: '61091000',
            gstRate: 5,
          },
        ],
        shippingAddress: defaultCustomer.addresses[0],
        billingAddress: defaultCustomer.addresses[0],
        paymentMethod: 'razorpay',
        paymentStatus: 'paid',
        razorpayPaymentId: 'pay_sample123456789',
        subtotal: 999,
        couponCode: 'ASHH200',
        couponDiscount: 200,
        shippingFee: 0,
        codFee: 0,
        tax: {
          cgst: 19.02,
          sgst: 19.02,
          igst: 0,
          totalTax: 38.04,
          isInterState: false,
        },
        grandTotal: 799,
        orderStatus: 'shipped',
        courier: {
          awbNumber: 'SRKT9281726481',
          courierName: 'Shiprocket Bluedart Express',
          trackingUrl: 'https://shiprocket.co/tracking/SRKT9281726481',
          currentLocation: 'Mumbai Sorting Hub',
          estimatedDelivery: 'Tomorrow',
          trackingSteps: [
            {
              status: 'Order Placed',
              location: 'Warehouse Bhiwandi',
              timestamp: 'Oct 28, 11:30 AM',
              message: 'Order verified',
              completed: true,
            },
            {
              status: 'Packed',
              location: 'Warehouse Bhiwandi',
              timestamp: 'Oct 28, 04:00 PM',
              message: 'Packed in Ashh Box',
              completed: true,
            },
            {
              status: 'Shipped',
              location: 'Mumbai Sorting Hub',
              timestamp: 'Oct 29, 09:15 AM',
              message: 'In transit to local hub',
              completed: true,
            },
          ],
        },
        createdAt: '2026-10-28T11:30:00Z',
        updatedAt: '2026-10-29T09:15:00Z',
      },
    ],
    users: [defaultAdmin, defaultCustomer],
    coupons: INITIAL_COUPONS,
    reviews: [
      {
        id: 'rev-1',
        productId: 'prod-001',
        userId: 'user-cust-1',
        userName: 'Aryan P.',
        rating: 5,
        title: 'Insane quality! Legit Souled Store vibe!',
        comment: 'The 240 GSM heavy fabric feels premium. The puff cloud print on the back is incredible. Fits oversized just as promised.',
        verifiedPurchase: true,
        helpfulCount: 42,
        createdAt: '2026-10-20T12:00:00Z',
      },
      {
        id: 'rev-2',
        productId: 'prod-002',
        userId: 'user-cust-2',
        userName: 'Rohan Sharma',
        rating: 5,
        title: 'Best Spider-Man hoodie I own',
        comment: 'Fleece is super soft and warm. Love the Miles Morales neon red detailing. Shipped within 2 days to Bangalore!',
        verifiedPurchase: true,
        helpfulCount: 31,
        createdAt: '2026-10-22T14:30:00Z',
      },
    ],
  };
}

let cachedData: DatabaseSchema | null = null;

function loadData(): DatabaseSchema {
  if (cachedData) return cachedData;

  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      cachedData = JSON.parse(content);
      // Merge any newly added products from INITIAL_PRODUCTS (e.g. Shirts, Trousers, Shorts, Shoes)
      if (cachedData && Array.isArray(cachedData.products)) {
        const existingIds = new Set(cachedData.products.map((p) => p.id));
        const missing = INITIAL_PRODUCTS.filter((p) => !existingIds.has(p.id));
        if (missing.length > 0) {
          cachedData.products = [...cachedData.products, ...missing];
          saveData(cachedData);
        }
      }
      return cachedData!;
    }
  } catch (error) {
    console.error('Error reading db file, using initial data:', error);
  }

  cachedData = getInitialData();
  saveData(cachedData);
  return cachedData;
}

function saveData(data: DatabaseSchema): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    cachedData = data;
  } catch (error) {
    console.error('Error saving db file:', error);
  }
}

// ==================== PRODUCTS ====================

export function getProducts(filters?: {
  category?: string;
  gender?: string;
  fandom?: string;
  search?: string;
  fit?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
}): Product[] {
  const data = loadData();
  let list = [...data.products];

  if (filters?.category && filters.category !== 'all') {
    list = list.filter((p) => p.category.toLowerCase() === filters.category?.toLowerCase());
  }

  if (filters?.gender && filters.gender !== 'all') {
    list = list.filter((p) => p.gender === filters.gender || p.gender === 'unisex');
  }

  if (filters?.fandom && filters.fandom !== 'all') {
    list = list.filter((p) => p.fandom?.toLowerCase().includes(filters.fandom!.toLowerCase()));
  }

  if (filters?.fit && filters.fit !== 'all') {
    list = list.filter((p) => p.fit.toLowerCase() === filters.fit?.toLowerCase());
  }

  if (filters?.minPrice !== undefined) {
    list = list.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    list = list.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.fandom?.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (filters?.sort) {
    switch (filters.sort) {
      case 'price_asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'discount_desc':
        list.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case 'rating_desc':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popularity':
      default:
        list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
    }
  }

  return list;
}

export function getProductById(id: string): Product | null {
  const data = loadData();
  return data.products.find((p) => p.id === id || p.slug === id) || null;
}

export function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
  const data = loadData();
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  data.products.unshift(newProduct);
  saveData(data);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const data = loadData();
  const index = data.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  data.products[index] = {
    ...data.products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveData(data);
  return data.products[index];
}

export function deleteProduct(id: string): boolean {
  const data = loadData();
  const initialLen = data.products.length;
  data.products = data.products.filter((p) => p.id !== id);
  if (data.products.length !== initialLen) {
    saveData(data);
    return true;
  }
  return false;
}

/**
 * Real-time Stock Locking & Inventory Reduction during checkout
 */
export function lockAndDeductStock(
  items: { productId: string; size: ProductSize; quantity: number }[]
): { success: boolean; error?: string } {
  const data = loadData();

  // 1. Verify all items have sufficient stock
  for (const item of items) {
    const prod = data.products.find((p) => p.id === item.productId);
    if (!prod) {
      return { success: false, error: `Product not found: ${item.productId}` };
    }
    const variant = prod.variants.find((v) => v.size === item.size);
    if (!variant || variant.stock < item.quantity) {
      return {
        success: false,
        error: `Insufficient stock for "${prod.title}" in size ${item.size}. Only ${variant?.stock || 0} left.`,
      };
    }
  }

  // 2. Deduct inventory safely
  for (const item of items) {
    const prod = data.products.find((p) => p.id === item.productId)!;
    const variant = prod.variants.find((v) => v.size === item.size)!;
    variant.stock -= item.quantity;
  }

  saveData(data);
  return { success: true };
}

// ==================== ORDERS ====================

export function getOrders(userId?: string): Order[] {
  const data = loadData();
  if (userId) {
    return data.orders.filter((o) => o.userId === userId || o.customer.email === userId);
  }
  return [...data.orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getOrderById(id: string): Order | null {
  const data = loadData();
  return (
    data.orders.find((o) => o.id === id || o.orderNumber === id) || null
  );
}

export function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order {
  const data = loadData();
  const newOrder: Order = {
    ...orderData,
    id: `ord-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  data.orders.unshift(newOrder);
  saveData(data);
  return newOrder;
}

export function updateOrderStatus(id: string, status: Order['orderStatus']): Order | null {
  const data = loadData();
  const order = data.orders.find((o) => o.id === id || o.orderNumber === id);
  if (!order) return null;

  order.orderStatus = status;
  order.updatedAt = new Date().toISOString();

  if (order.courier) {
    // Update tracking steps to match
    order.courier.trackingSteps.forEach((step) => {
      if (status === 'delivered') step.completed = true;
      if (status === 'shipped' && step.status.includes('Courier')) step.completed = true;
      if (status === 'packed' && step.status.includes('Packed')) step.completed = true;
    });
  }

  saveData(data);
  return order;
}

export function updateOrder(id: string, updates: Partial<Order>): Order | null {
  const data = loadData();
  const index = data.orders.findIndex((o) => o.id === id || o.orderNumber === id);
  if (index === -1) return null;

  data.orders[index] = {
    ...data.orders[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveData(data);
  return data.orders[index];
}

// ==================== USERS ====================

export function getUsers(): User[] {
  return loadData().users;
}

export function getUserByEmail(email: string): User | null {
  return loadData().users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function getUserById(id: string): User | null {
  return loadData().users.find((u) => u.id === id) || null;
}

export function createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
  const data = loadData();
  const newUser: User = {
    ...userData,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  data.users.push(newUser);
  saveData(data);
  return newUser;
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const data = loadData();
  const index = data.users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  data.users[index] = {
    ...data.users[index],
    ...updates,
  };

  saveData(data);
  return data.users[index];
}

// ==================== COUPONS ====================

export function getCoupons(): Coupon[] {
  return loadData().coupons;
}

export function getCouponByCode(code: string): Coupon | null {
  return (
    loadData().coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase() && c.isActive
    ) || null
  );
}

export function createCoupon(coupon: Omit<Coupon, 'id' | 'usageCount'>): Coupon {
  const data = loadData();
  const newCoupon: Coupon = {
    ...coupon,
    id: `coup-${Date.now()}`,
    usageCount: 0,
  };

  data.coupons.push(newCoupon);
  saveData(data);
  return newCoupon;
}

// ==================== REVIEWS ====================

export function getReviews(productId: string): Review[] {
  return loadData().reviews.filter((r) => r.productId === productId);
}

export function addReview(review: Omit<Review, 'id' | 'createdAt' | 'helpfulCount'>): Review {
  const data = loadData();
  const newReview: Review = {
    ...review,
    id: `rev-${Date.now()}`,
    helpfulCount: 0,
    createdAt: new Date().toISOString(),
  };

  data.reviews.unshift(newReview);

  // Update product average rating & count
  const prod = data.products.find((p) => p.id === review.productId);
  if (prod) {
    const allProdReviews = data.reviews.filter((r) => r.productId === prod.id);
    const sum = allProdReviews.reduce((acc, r) => acc + r.rating, 0);
    prod.reviewCount = allProdReviews.length;
    prod.rating = Math.round((sum / allProdReviews.length) * 10) / 10;
  }

  saveData(data);
  return newReview;
}
