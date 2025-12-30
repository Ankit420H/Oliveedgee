import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

// @desc    Health check endpoint
// @route   GET /api/health
// @access  Public
router.get('/', async (req, res) => {
    const health = {
        status: 'operational',
        uptime: process.uptime(),
        timestamp: Date.now(),
        environment: process.env.NODE_ENV || 'development',
        database: 'disconnected',
        memory: {
            used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
            total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
            unit: 'MB'
        }
    };

    // Check database connection
    try {
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.db.admin().ping();
            health.database = 'connected';
            health.status = 'healthy';
        } else {
            health.database = 'disconnected';
            health.status = 'degraded';
        }
    } catch {
        health.database = 'error';
        health.status = 'unhealthy';
    }

    const statusCode = health.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(health);
});

export default router;
