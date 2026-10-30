# The Ashh Store ⚡
### Premium Indian Streetwear & Pop-Culture Fashion Apparel E-Commerce Platform
> Built to match the exact aesthetic, vibrancy, and functionality of **The Souled Store** (T-shirts, oversized drops, winter hoodies, cargo joggers, and official superhero & anime merchandise).

---

## 🎨 Brand Identity & Logo
- **Brand Name:** `The Ashh Store`
- **Color Palette:**
  - **Signature Red:** `#E11B23` (The Souled Store Crimson)
  - **Dark Neutral:** `#18181B` (Zinc 900 Street Black)
  - **Light Accent:** `#FFF1F2` & `#FAFAFA`
  - **Membership Gold:** `#EAB308` (The Ashh Club VIP)
- **Logo Design:**
  - Iconic rounded red badge (`rx="24"`) featuring custom geometric silhouette and lightning accent, flanked by heavy tracking typography: **The Ashh Store** with subtitle **Official Pop Culture Merch**.
  - Formats provided: SVG Vector (`public/logo.svg`), Favicon (`public/favicon.svg`), and Next.js Vector Component (`src/components/Logo.tsx`).

---

## 🚀 Tech Stack
- **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend:** Next.js API Routes (Node.js runtime).
- **Database:** Universal Data Layer with:
  - **Out-of-the-box Persistent Store:** File-backed JSON repository (`.ashh-db-store.json`) with zero external database setup required.
  - **MongoDB Atlas Support:** Full Mongoose schemas provided in `src/models/mongoose.ts`.
  - **PostgreSQL / Supabase Support:** Complete Prisma schema and migrations in `prisma/schema.prisma`.
- **Authentication:** JWT with HTTP-only cookies, Google OAuth adapter, and mobile OTP verification (MSG91/Twilio compatible).
- **Payments:** Razorpay integration (UPI, GPay, PhonePe, Cards, NetBanking, Wallets) and Cash on Delivery (COD) with configurable convenience fees and rules.
- **Logistics:** Shiprocket courier adapter with real-time Indian pincode validation, AWB generation, and visual tracking checkpoints (Bhiwandi Hub -> Local Transit Hub -> Out for Delivery).
- **Taxation:** Indian GST calculation (CGST, SGST, IGST) with compliant printable GST Tax Invoices.

---

## 📁 Complete Folder Structure
```
the-ashh-store/
├── public/
│   ├── favicon.svg             # Brand icon
│   └── logo.svg                # Full SVG logo wordmark
├── prisma/
│   └── schema.prisma           # PostgreSQL / Supabase Schema
├── src/
│   ├── app/
│   │   ├── layout.tsx          # App root layout, SEO metadata, JSON-LD
│   │   ├── page.tsx            # Homepage (Hero slider, category circles, trending, fandoms, UGC)
│   │   ├── globals.css         # Tailwind & print styles
│   │   ├── not-found.tsx       # 404 custom drop not found page
│   │   ├── sitemap.ts          # Automated SEO XML Sitemap generator
│   │   ├── [category]/         # Dynamic Category Listing (Men, Women, Oversized, Hoodies, Joggers, Sale)
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   └── [id]/           # Product Detail Page (Zoom gallery, size chart modal, stock, reviews)
│   │   │       └── page.tsx
│   │   ├── cart/               # Dedicated full cart page
│   │   │   └── page.tsx
│   │   ├── checkout/           # Multi-step checkout (Address, shipping speed, Razorpay / COD)
│   │   │   └── page.tsx
│   │   ├── order-success/      # Celebration confetti, summary, GST invoice trigger
│   │   │   └── page.tsx
│   │   ├── account/            # Customer profile, order history, visual courier tracking, returns
│   │   │   └── page.tsx
│   │   ├── wishlist/           # Saved merchandise with 1-click move to bag
│   │   │   └── page.tsx
│   │   ├── search/             # Instant predictive search results
│   │   │   └── page.tsx
│   │   ├── track-order/        # Dedicated Shiprocket tracking page
│   │   │   └── page.tsx
│   │   ├── about/              # Brand story
│   │   ├── contact/            # Support desk & contact form
│   │   ├── faq/                # Frequently asked questions
│   │   ├── size-guide/         # Comprehensive size charts (Inches & CM)
│   │   ├── shipping-policy/    # Shipping terms & free delivery rules
│   │   ├── returns-policy/     # 15-day return & exchange guidelines
│   │   ├── terms/              # Terms and conditions
│   │   ├── privacy-policy/     # DPDPA compliant privacy policy
│   │   ├── admin/              # Protected Admin Dashboard
│   │   │   ├── layout.tsx      # Admin sidebar and control center header
│   │   │   ├── page.tsx        # KPI metrics, revenue, COD vs prepaid, low stock
│   │   │   ├── products/       # Catalog & variant stock matrix manager
│   │   │   │   └── page.tsx
│   │   │   ├── orders/         # Order workflow, status transitions, shipping labels
│   │   │   │   └── page.tsx
│   │   │   ├── coupons/        # Promotional coupon creator
│   │   │   │   └── page.tsx
│   │   │   └── returns/        # Return inspection & refund authorization desk
│   │   │       └── page.tsx
│   │   └── api/                # Next.js Serverless API Endpoints
│   │       ├── auth/login/
│   │       ├── checkout/create-order/
│   │       ├── checkout/verify-payment/
│   │       ├── coupons/validate/
│   │       ├── orders/
│   │       ├── orders/[id]/
│   │       ├── orders/[id]/return/
│   │       ├── products/
│   │       ├── products/[id]/
│   │       └── shipping/check-pincode/
│   ├── components/
│   │   ├── Logo.tsx            # Official Brand SVG Component
│   │   ├── Navbar.tsx          # Announcement bar, mega menu, search dropdown, user profile
│   │   ├── Footer.tsx          # Full footer with trust pillars and newsletter
│   │   ├── HeroSlider.tsx      # Autoplay hero carousel
│   │   ├── CategoryCircles.tsx # The Souled Store iconic circular category stories
│   │   ├── ProductCard.tsx     # Hover model flip, license badge, quick size add drawer
│   │   ├── CartDrawer.tsx      # Slide-over cart with free shipping progress bar
│   │   ├── SizeChartModal.tsx  # Modal with Inches/CM toggle
│   │   ├── InvoiceModal.tsx    # Printable Indian GST Tax Invoice
│   │   └── BottomNav.tsx       # Mobile web app bottom navigation bar
│   ├── context/
│   │   ├── AuthContext.tsx     # Session, JWT, customer & admin switcher
│   │   ├── CartContext.tsx     # Bag items, coupon application, GST calculations
│   │   └── WishlistContext.tsx # Wishlist persistence
│   ├── data/
│   │   ├── products.ts         # 30 Curated The Souled Store Style Products
│   │   ├── categories.ts       # Categories & Hero Banners
│   │   └── coupons.ts          # Promo codes (ASHH200, ASHH10, FREESHIP)
│   ├── lib/
│   │   ├── db.ts               # Resilient data layer supporting local/Mongo/Postgres
│   │   ├── auth.ts             # JWT signing & password hashing
│   │   ├── razorpay.ts         # Razorpay checkout & HMAC signature verification
│   │   ├── shiprocket.ts       # Courier rates, pincode serviceability, live tracking
│   │   ├── gst.ts              # Indian GST calculation (CGST, SGST, IGST)
│   │   ├── notifications.ts    # SendGrid email & MSG91 SMS dispatchers
│   │   └── utils.ts            # Formatting currency (₹), discounts, order IDs
│   ├── models/
│   │   └── mongoose.ts         # MongoDB Schemas
│   └── types/
│       └── index.ts            # Complete TypeScript Interfaces
├── .env.example
├── .env.local
├── next.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## ⚡ Quick Start & Installation

### 1. Prerequisites
- Node.js 18+ or 20+ LTS
- npm or pnpm or yarn

### 2. Setup Project
```bash
# Navigate to the project directory
cd C:\Users\aryan\.gemini\antigravity\scratch\the-ashh-store

# Install dependencies (if not already installed)
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser!

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🐙 Push to GitHub Repository

Initialize and push this complete project to your GitHub account:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Add all files
git add .

# 3. Create your initial commit
git commit -m "feat: complete production release of The Ashh Store e-commerce platform"

# 4. Link your remote GitHub repository
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/the-ashh-store.git

# 5. Push to main branch
git branch -M main
git push -u origin main
```

### ⚡ Automated GitHub Actions CI/CD Pipeline
Every push and pull request to the `main` branch automatically triggers our continuous integration workflow located at [`.github/workflows/ci.yml`](.github/workflows/ci.yml):
- Runs automated Node 20 environment initialization.
- Validates clean package dependencies.
- Executes full Next.js production compilation and TypeScript verification across all 32 routes.

---

## 🔐 Demo Credentials & Admin Access

You can seamlessly explore both the Customer and Admin experiences without manual database seeding:

- **Customer View:** [http://localhost:3000](http://localhost:3000)
  - Pre-loaded with demo user `Aryan Palla` (`aryan@example.com`), saved Mumbai delivery addresses, and cart/wishlist items.
- **Admin Panel:** [http://localhost:3000/admin](http://localhost:3000/admin)
  - Pre-configured with full Super Admin privileges.
  - Access products catalog, update stock variants, process orders, print GST tax invoices, generate shipping labels, and approve refunds.
- **Quick Switch:** Use the role switch pill in the top announcement bar to toggle between `Customer` and `Admin Panel` in one click!

---

## 💳 Payment & Courier Integrations

### 1. Razorpay Setup
In `.env.local`:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_ashhStore7890
RAZORPAY_KEY_ID=rzp_test_ashhStore7890
RAZORPAY_KEY_SECRET=ashhStoreRazorpaySecretKey2026
```
- In development/sandbox mode, the checkout modal simulates instant successful payments and verifies HMAC SHA-256 signatures.
- For live payments, replace with your keys from [dashboard.razorpay.com](https://dashboard.razorpay.com).

### 2. Shiprocket Courier Logistics
In `.env.local`:
```env
SHIPROCKET_EMAIL=logistics@theashhstore.com
SHIPROCKET_PASSWORD=shiprocket_demo_pass_2026
```
- Includes automatic 6-digit Indian postal zone validation.
- Real-time estimated delivery date calculation (2 days for metros, 3-4 days for other zones).
- Realistic visual tracking checkpoints generated with AWB tracking numbers.

### 3. Email & SMS Notifications
In `.env.local`:
```env
SENDGRID_API_KEY=your_sendgrid_key
MSG91_AUTH_KEY=your_msg91_auth_key
EMAIL_FROM=support@theashhstore.com
```
- Automatically triggers formatted HTML order confirmations and SMS dispatch updates.

---

## 📦 Deployment Guide

### Deploy to Vercel (Recommended)
1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. In Project Settings -> Environment Variables, copy the contents of `.env.example`.
4. Click **Deploy**. Vercel will automatically build the Next.js serverless application.

### Deploy Database (MongoDB Atlas or Supabase)
- **MongoDB Atlas:** Set `MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/ashhstore`.
- **Supabase (PostgreSQL):** Set `DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres` and run `npx prisma db push`.

---

© 2026 **THE ASHH STORE PRIVATE LIMITED**. Built with passion for pop-culture fashion.
