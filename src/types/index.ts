export type Gender = 'men' | 'women' | 'unisex' | 'kids';

export type ProductFit = 'Oversized Fit' | 'Regular Fit' | 'Relaxed Fit' | 'Slim Fit';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL';

export interface ProductVariant {
  sku: string;
  size: ProductSize;
  color: string;
  colorHex: string;
  stock: number;
}

export type ProductSubCategory =
  | 't-shirts'
  | 'oversized-t-shirts'
  | 'shirts'
  | 'hoodies-sweatshirts'
  | 'trousers'
  | 'cargo-joggers'
  | 'shorts'
  | 'shoes-sneakers'
  | 'polos'
  | 'dresses'
  | 'co-ords'
  | 'jackets';

export interface ProductImage {
  url: string;
  alt: string;
  angle?: 'front' | 'back' | 'side' | 'close' | 'lifestyle';
  isModel?: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  highlights: string[];
  category:
    | 'men'
    | 'women'
    | 'oversized'
    | 'hoodies'
    | 'joggers'
    | 'printed-tshirts'
    | 'collections'
    | 'sale'
    | 'kids'
    | 'shirts'
    | 'trousers'
    | 'shorts'
    | 'shoes';
  subCategory?: ProductSubCategory | string;
  fandom?: 'Marvel' | 'Anime / Naruto' | 'DC Comics' | 'Harry Potter' | 'Disney' | 'Friends' | 'Ashh Originals' | 'Supima Solids';
  gender: Gender;
  fit: ProductFit;
  fabric: string;
  gsm: number;
  washCare: string[];
  price: number;
  mrp: number;
  discountPercentage: number;
  memberPrice?: number;
  hsnCode: string;
  gstRate: number; // usually 5% for apparel < ₹1000, 12% for >= ₹1000
  images: ProductImage[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  officialLicenseBadge?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string; // generated client/cart item id
  productId: string;
  product: Product;
  size: ProductSize;
  color: string;
  quantity: number;
  price: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  addressType: 'Home' | 'Work' | 'Other';
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin' | 'manager' | 'support';
  addresses: Address[];
  walletBalance: number;
  isMember?: boolean; // The Ashh Club membership
  wishlist: string[]; // product IDs
  createdAt: string;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface TrackingStep {
  status: string;
  location: string;
  timestamp: string;
  message: string;
  completed: boolean;
}

export interface CourierInfo {
  awbNumber: string;
  courierName: string;
  trackingUrl: string;
  currentLocation: string;
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
}

export interface TaxBreakdown {
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  isInterState: boolean;
}

export interface ReturnRequest {
  id: string;
  reason: string;
  comments?: string;
  photoUrl?: string;
  refundMethod: 'bank_account' | 'store_credit';
  bankDetails?: {
    accountNumber: string;
    ifsc: string;
    accountHolderName: string;
    upiId?: string;
  };
  status: 'pending' | 'approved' | 'item_picked' | 'refunded' | 'rejected';
  requestedAt: string;
  refundAmount: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    productId: string;
    title: string;
    image: string;
    size: ProductSize;
    color: string;
    quantity: number;
    price: number;
    mrp: number;
    hsnCode: string;
    gstRate: number;
  }[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  subtotal: number;
  couponCode?: string;
  couponDiscount: number;
  shippingFee: number;
  codFee: number;
  tax: TaxBreakdown;
  grandTotal: number;
  orderStatus: OrderStatus;
  courier?: CourierInfo;
  cancellationReason?: string;
  returnRequest?: ReturnRequest;
  stockLocked?: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  validFrom: string;
  validTill: string;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  isFirstOrderOnly?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  photos?: string[];
  verifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
}

export interface PincodeServiceability {
  pincode: string;
  city: string;
  state: string;
  isServiceable: boolean;
  codAvailable: boolean;
  estimatedDays: number;
  estimatedDeliveryDate: string;
  courierPartner: string;
  expressAvailable: boolean;
}
