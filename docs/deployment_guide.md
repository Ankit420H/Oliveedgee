# Deployment Protocol: Olive Edge

This guide outlines the procedure for deploying the **Olive Edge** digital flagship (Next.js) to a production environment.

## 1. Architecture Overview
*   **Frontend**: Next.js App Router (SSR/CSR).
*   **Backend**: Node.js / Express REST API (Proxied via Next.js).
*   **Database**: MongoDB (Atlas).

---

## 2. Unified Vercel Deployment (Recommended)
You will deploy this repository as a **single** Vercel project. Next.js handles the frontend and proxies API requests to your standalone backend (if deployed separately) OR you can wrap the Express app in a Serverless Function (advanced).

**Current Strategy**: The current configuration `next.config.mjs` is set to proxy `/api` requests to `http://localhost:5001` for local development. For production Vercel deployment, you have two options:

### Option A: Separate Backend (Easiest)
Deploy your Node.js backend to a service like Render, Railway, or Heroku.
Then update your Next.js environment variables to point to that URL.

### Option B: Backend as Serverless Functions (Integrated)
*This requires adapting the Express app to export a handler for Vercel.*
(Currently, the project is structured for a separate running backend server).

**For this Guide (Standard Vercel Deployment for Frontend):**

### Steps:
1.  **Add New Project** in Vercel and import this repository (`Ankit420H/OliveEdgee`).
2.  **Framework Preset**: Select **Next.js**.
3.  **Root Directory**: Leave as **.** (Root).
4.  **Build & Development Settings**:
    *   **Build Command**: `next build` (Default).
    *   **Output Directory**: (Default / `.next`).
    *   *Install Command*: `npm install` (Default).
5.  **Environment Variables**:
    *   `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Your Razorpay Key ID.
    *   **Backend URL**: If you deploy the backend separately, you might need to update the proxy target or use an absolute URL in your API calls.
        *   *Note*: The current `next.config.mjs` rewrites `/api/:path*` to `http://localhost:5001`. You should change this to an Environment Variable for production, e.g., `process.env.BACKEND_URL`.

6.  **Deploy**.

### Production Config Update
The project is already configured to be production-ready. In `next.config.mjs`, the API proxy destination is dynamic:

```javascript
destination: process.env.BACKEND_URL 
  ? `${process.env.BACKEND_URL}/api/:path*` 
  : 'http://localhost:5001/api/:path*',
```

**Action Required**: In your Vercel project settings, set the `BACKEND_URL` environment variable to your production backend URL (e.g., `https://olive-edge-api.onrender.com`). If you are using the integrated serverless approach, this might not be necessary depending on your final architecture.

---

## 3. Database Seeding
To populate your production database:
1.  Connect to your production MongoDB cluster via MongoDB Compass.
2.  Import your local collections directly.
