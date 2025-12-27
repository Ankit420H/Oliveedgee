# Deployment Protocol: Olive Edge

This guide outlines the procedure for deploying the **Olive Edge** digital flagship to a production environment.

## 1. Architecture Overview
*   **Frontend**: React (Vite) Single Page Application.
*   **Backend**: Node.js / Express REST API.
*   **Database**: MongoDB (Atlas).

---

## 2. Full Vercel Deployment (Monorepo)
You will deploy this repository **twice** to Vercel: once for the Backend and once for the Frontend.

### Part A: Backend Deployment
1.  **Add New Project** in Vercel and import this repository (`Ankit420H/OliveEdgee`).
2.  **Framework Preset**: Other (Null).
3.  **Root Directory**: Click "Edit" and select `backend`.
4.  **Environment Variables**:
    *   `MONGO_URI`: Your production MongoDB connection string.
    *   `JWT_SECRET`: A strong secret key.
    *   `FRONTEND_URL`: The URL of your future frontend deployment (e.g., `https://olive-edge-frontend.vercel.app`).
5.  **Deploy**.
    *   *Note*: The `vercel.json` file in `backend/` will handle the routing to `api/index.js`.
    *   Copy the assigned domain (e.g., `https://olive-edge-backend.vercel.app`).

### Part B: Frontend Deployment
1.  **Add New Project** (again) and import the **same repository** (`Ankit420H/OliveEdgee`).
2.  **Framework Preset**: Vite.
3.  **Root Directory**: Click "Edit" and select `frontend`.
4.  **Build Settings**:
    *   Build Command: `npm run build`
    *   Output Directory: `dist`
5.  **Environment Variables**:
    *   `VITE_API_BASE_URL`: The URL of your Backend deployment from Part A (e.g., `https://olive-edge-backend.vercel.app`).
    *   `VITE_RAZORPAY_KEY_ID`: Your Razorpay Key ID.
6.  **Deploy**.

### Part C: Final Linkage
1.  Once the Frontend is live, go back to your **Backend Project** in Vercel.
2.  Update the `FRONTEND_URL` variable to match your actual Frontend URL.
3.  **Redeploy** the Backend to apply the CORS update.

## 3. Database Seeding (Production)
To populate your production database:
1.  Connect to your production MongoDB cluster via MongoDB Compass.
2.  Manually import your local collections, OR:
3.  Temporarily run the seeder locally pointing to production:
    `MONGO_URI=your_prod_uri node backend/seeder.js`

