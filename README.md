# Olive Edge | Digital Flagship

The intersection of discipline and design.

Olive Edge is a premium digital flagship for technical apparel, reimagined with a "Clinical, Organic, Tactical" aesthetic inspired by Aesop. It serves as a study in minimalist e-commerce design, featuring editorial typography, fluid page transitions, and a rigorous attention to detail.

![Olive Edge Banner](frontend/public/favicon.svg)

## 🏛️ Design Philosophy

*   **Clinical**: Precision layouts, negative space, and a restrained "Rice Cake" color palette.
*   **Organic**: Fluid animations, serif typography, and natural language.
*   **Tactical**: Functional resilience, ensuring the platform performs under pressure.

## 🚀 Key Features

*   **Immersive Commerce**: "Ghost" headers, editorial product grids, and distraction-free "Search Overlays".
*   **Seamless Logistics**: A custom-built cart and multi-step checkout flow (Shipping -> Payment -> Order).
*   **Concierge Services**: Fully integrated "About", "FAQ", and "Contact" support pages.
*   **Secure Operations**: JWT Authentication for users and a protected "Command Center" for administrators.
*   **Digital Polish**: Full SEO optimization (`React Helmet`), cinematic transitions (`Framer Motion`), and "magnetic" micro-interactions.

## 🛠️ Technology Stack

*   **Frontend**: React (Vite), Framer Motion (Animation), Tailwind CSS (Utility), Vanilla CSS (Design Tokens).
*   **Backend**: Node.js, Express.js (REST API).
*   **Persistence**: MongoDB (Mongoose).
*   **Deployment**: Ready for Vercel (Frontend) and Render (Backend).

## ⚙️ Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Ankit420H/OliveEdgee.git
    cd Olive-Edge
    ```

2.  **Install Dependencies**
    *   **Backend**: `cd backend && npm install`
    *   **Frontend**: `cd frontend && npm install`

3.  **Environment Variables**
    Create a `.env` file in `backend`:
    ```env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    SMTP_HOST=smtp.ethereal.email (Optional)
    ```

4.  **Initialize Database** (Optional)
    Seed the database with the new editorial content:
    ```bash
    # From root
    node backend/seeder.js -d # Clear old data
    node backend/seeder.js    # Import new editorial data
    ```

5.  **Run the Experience**
    ```bash
    # Terminal 1 (Backend)
    cd backend && npm run dev

    # Terminal 2 (Frontend)
    cd frontend && npm run dev
    ```

## 📦 Deployment

This project includes a comprehensive [Deployment Guide](deployment_guide.md) created during the refactoring process. Refer to it for checking environment keys and verification steps.

## 📄 License

Distributed under the MIT License.
