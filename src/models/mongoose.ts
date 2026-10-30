import mongoose, { Schema, Document } from 'mongoose';

// Product Schema
export const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    category: { type: String, required: true, index: true },
    fandom: { type: String, index: true },
    gender: { type: String, default: 'unisex' },
    fit: { type: String, default: 'Oversized Fit' },
    fabric: { type: String, required: true },
    gsm: { type: Number, required: true },
    washCare: [{ type: String }],
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    memberPrice: { type: Number },
    hsnCode: { type: String, default: '61091000' },
    gstRate: { type: Number, default: 5 },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
        angle: { type: String },
        isModel: { type: Boolean, default: false },
      },
    ],
    variants: [
      {
        sku: { type: String, required: true, unique: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        colorHex: { type: String },
        stock: { type: Number, default: 0 },
      },
    ],
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 0 },
    isBestseller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    officialLicenseBadge: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Order Schema
export const OrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: String, index: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    items: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        image: { type: String },
        size: { type: String, required: true },
        color: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        mrp: { type: Number, required: true },
        hsnCode: { type: String, default: '61091000' },
        gstRate: { type: Number, default: 5 },
      },
    ],
    shippingAddress: { type: Object, required: true },
    billingAddress: { type: Object, required: true },
    paymentMethod: { type: String, enum: ['razorpay', 'cod'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    subtotal: { type: Number, required: true },
    couponCode: { type: String },
    couponDiscount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    codFee: { type: Number, default: 0 },
    tax: { type: Object, required: true },
    grandTotal: { type: Number, required: true },
    orderStatus: {
      type: String,
      enum: ['placed', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned'],
      default: 'placed',
      index: true,
    },
    courier: { type: Object },
    returnRequest: { type: Object },
  },
  { timestamps: true }
);

export const ProductModel =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);

export const OrderModel =
  mongoose.models.Order || mongoose.model('Order', OrderSchema);
