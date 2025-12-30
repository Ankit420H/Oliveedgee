# Olive Edge | Digital Flagship

The intersection of discipline and design.

Olive Edge is a premium digital flagship for technical apparel, reimagined with a "Clinical, Organic, Tactical" aesthetic inspired by Aesop. It serves as a study in minimalist e-commerce design, featuring editorial typography, fluid page transitions, and a rigorous attention to detail.

![Olive Edge Banner](public/favicon.svg)

## 🏛️ Design Philosophy

*   **Clinical**: Precision layouts, negative space, and a restrained "Rice Cake" color palette.
*   **Organic**: Fluid animations, serif typography, and natural language.
*   **Tactical**: Functional resilience, ensuring the platform performs under pressure.

## 🚀 Engineering Excellence

*   **Feature-Based Architecture**: Modularized design in `src/features` for ultimate scalability and maintainability.
*   **Total Type Safety**: 100% TypeScript (`.tsx`) across the entire `src` directory, verified with zero `tsc` emissions.
*   **Immersive Commerce**: "Ghost" headers, editorial product grids, and distraction-free "Search Overlays".
*   **Seamless Logistics**: A custom-built cart and multi-step checkout flow (Shipping -> Payment -> Order).
*   **Concierge Services**: Fully integrated "About", "FAQ", and "Contact" support pages.
*   **Secure Operations**: JWT Authentication for users and a protected "Command Center" for administrators.
*   **Digital Polish**: Optimized SEO, cinematic transitions (`Framer Motion`), and "magnetic" micro-interactions.

## 🛠️ Technology Stack

*   **Frontend**: Next.js 14 (App Router), TypeScript, Framer Motion (Animation), Tailwind CSS (Utility).
*   **Backend**: Node.js, Express.js (REST API).
*   **Persistence**: MongoDB (Mongoose).
*   **Architecture**: Monorepo (Unified Dependencies).
*   **Deployment**: Vercel (Full Stack Features).

## ⚙️ Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Ankit420H/OliveEdgee.git
    cd Olive-Edge
    ```

2.  **Install Dependencies**
    ```bash
    # Install dependencies for both frontend and backend (Monorepo)
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    NODE_ENV=development
    PORT=5001
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    SMTP_HOST=smtp.ethereal.email (Optional)
    NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key
    ```

4.  **Initialize Database** (Optional)
    Seed the database with the new editorial content:
    ```bash
    npm run data:destroy # Clear old data
    npm run data:import  # Import new editorial data
    ```

5.  **Run the Experience**
    ```bash
    # Run both Backend and Frontend concurrently
    npm run dev
    ```

## 📦 Deployment

This project includes a comprehensive [Deployment Guide](deployment_guide.md) created during the refactoring process. Refer to it for checking environment keys and verification steps.

## 📄 License

Distributed under the MIT License.
