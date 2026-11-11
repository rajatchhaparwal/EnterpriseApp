# Shraddha Enterprise — Luxury Affiliate E-Commerce Platform

A high-performance luxury affiliate e-commerce web application featuring handpicked beauty and skincare deals from **Amazon** and **Flipkart**, integrated with an **Admin Dashboard** and a **PostgreSQL** database.

---

## 🏗️ Project Architecture

```
shraddha-ecom/
├── cbeuty/                 # Frontend (React 18, Vite, Tailwind CSS, React Icons)
│   ├── src/
│   │   ├── components/     # Navbar, Cards, Carousel, Footer, TrustBar, etc.
│   │   ├── pages/          # Home, ProductPage, Cart, Admin Dashboard
│   │   ├── context/        # CartContext with dynamic backend API synchronization
│   │   └── data/           # Offline fallback mock data
│   └── package.json
│
├── backened/               # Backend API (Node.js, Express, PostgreSQL / pg Pool)
│   ├── app.js              # REST API (/api/productData, /api/products)
│   ├── db.js               # PostgreSQL connection pool with Cloud/SSL support
│   ├── productdata.js      # Seed and backup catalog
│   └── package.json
│
└── data/
    └── se.sql              # Production PostgreSQL table schema with constraints & indexes
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+) running locally on port 5432 with database `se`

### 2. Database Setup
Create database `se` in PostgreSQL and run the schema:
```sql
-- Using psql or pgAdmin:
CREATE DATABASE se;
-- Execute the schema located in data/se.sql
```

### 3. Start Backend
```powershell
cd backened
npm install
npm start
```
Backend runs on `http://localhost:3000`.

### 4. Start Frontend
```powershell
cd ../cbeuty
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

---

## 🌐 Cloud Deployment Guide

### Database (Free Cloud PostgreSQL)
1. Create a free PostgreSQL instance on **[Neon.tech](https://neon.tech)** or **[Supabase](https://supabase.com)**.
2. Run the SQL schema from `data/se.sql` in the SQL editor.
3. Copy the `DATABASE_URL` (e.g. `postgres://user:password@host/neondb?sslmode=require`).

### Backend (Render / Railway)
1. Connect this GitHub repository to **[Render.com](https://render.com)** as a Web Service.
2. Root Directory: `backened`
3. Build Command: `npm install`
4. Start Command: `node app.js`
5. Add Environment Variable:
   - `DATABASE_URL`: *your Cloud PostgreSQL connection string*

### Frontend (Vercel)
1. Connect this GitHub repository to **[Vercel](https://vercel.com)**.
2. Root Directory: `cbeuty`
3. Framework Preset: **Vite**
4. Add Environment Variable (Optional, points to live backend):
   - `VITE_API_URL`: *https://your-backend.onrender.com*
