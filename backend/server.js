import 'dotenv/config'; // Load env vars immediately
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

const app = express();
const PORT = process.env.PORT || 5001;

import compression from 'compression';
import rateLimit from 'express-rate-limit';

// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://checkout.razorpay.com"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
            frameSrc: ["https://api.razorpay.com"],
            connectSrc: ["'self'", "https://api.razorpay.com"],
            fontSrc: ["'self'", "https:", "data:"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
}));
app.use(compression()); // Compress all responses
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5001', process.env.FRONTEND_URL || 'https://olive-edge.vercel.app'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security Hardening
// app.use(mongoSanitize()); // Removed: Causes req.query setter error in this env
// app.use(xss()); // Removed: Deprecated
// app.use(hpp()); // Removed: Linked to same req property issues

// Rate Limiting
// Rate Limiting Strategies
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Strict: 20 requests per 15m for login/register
    message: 'Too many login attempts from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300, // Loose: 300 requests per 15m for general browsing
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply Limiters
// Apply general limiter to ALL /api requests first (Broad protection)
app.use('/api', generalLimiter);

// Then apply strict limiter to specific routes (Overwrites headers with stricter limits)
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/users/send-otp', authLimiter);
app.use('/api/users/verify-otp', authLimiter);

// Database Connection
connectDB();

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Routes
// Health check (no rate limiting)
app.use('/api/health', healthRoutes);

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
    res.send('Olive Edge API is running...');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Only listen if not running in Vercel Serverless environment
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
