import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

// @desc    Get comprehensive analytics data
// @route   GET /api/analytics/dashboard
// @access  Private/Admin
const getDashboardAnalytics = asyncHandler(async (req, res) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
        totalOrders,
        totalRevenue,
        ordersThisMonth,
        revenueThisMonth,
        totalUsers,
        newUsersThisMonth,
        totalProducts,
        lowStockProducts,
        recentOrders,
        topProducts
    ] = await Promise.all([
        // Total orders
        Order.countDocuments(),

        // Total revenue
        Order.aggregate([
            { $match: { isPaid: true } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]),

        // Orders this month
        Order.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),

        // Revenue this month
        Order.aggregate([
            {
                $match: {
                    isPaid: true,
                    createdAt: { $gte: thirtyDaysAgo }
                }
            },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]),

        // Total users
        User.countDocuments(),

        // New users this month
        User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),

        // Total products
        Product.countDocuments(),

        // Low stock products (< 10)
        Product.countDocuments({ countInStock: { $lt: 10, $gt: 0 } }),

        // Recent orders
        Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(10)
            .select('_id totalPrice isPaid isDelivered orderStatus createdAt user'),

        // Top selling products
        Order.aggregate([
            { $match: { isPaid: true } },
            { $unwind: '$orderItems' },
            {
                $group: {
                    _id: '$orderItems.product',
                    totalSold: { $sum: '$orderItems.qty' },
                    revenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.qty'] } }
                }
            },
            { $sort: { totalSold: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            {
                $project: {
                    name: '$product.name',
                    image: '$product.image',
                    totalSold: 1,
                    revenue: 1
                }
            }
        ])
    ]);

    // Calculate growth rates
    const averageOrderValue = totalOrders > 0
        ? (totalRevenue[0]?.total || 0) / totalOrders
        : 0;

    res.json({
        overview: {
            totalOrders,
            totalRevenue: totalRevenue[0]?.total || 0,
            totalUsers,
            totalProducts,
        },
        thisMonth: {
            orders: ordersThisMonth,
            revenue: revenueThisMonth[0]?.total || 0,
            newUsers: newUsersThisMonth,
        },
        metrics: {
            averageOrderValue: Math.round(averageOrderValue),
            lowStockProducts,
        },
        recentOrders: recentOrders.map(order => ({
            id: order._id,
            customer: order.user?.name || 'Guest',
            email: order.user?.email || '',
            total: order.totalPrice,
            isPaid: order.isPaid,
            isDelivered: order.isDelivered,
            status: order.orderStatus || 'pending',
            date: order.createdAt,
        })),
        topProducts,
    });
});

// @desc    Get sales analytics over time
// @route   GET /api/analytics/sales
// @access  Private/Admin
const getSalesAnalytics = asyncHandler(async (req, res) => {
    const { period = '30' } = req.query;
    const days = parseInt(period);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const salesData = await Order.aggregate([
        {
            $match: {
                isPaid: true,
                createdAt: { $gte: startDate }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                    day: { $dayOfMonth: '$createdAt' }
                },
                totalSales: { $sum: '$totalPrice' },
                orderCount: { $sum: 1 }
            }
        },
        {
            $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
        }
    ]);

    res.json({
        period: days,
        data: salesData.map(item => ({
            date: `${item._id.year}-${String(item._id.month).padStart(2, '0')}-${String(item._id.day).padStart(2, '0')}`,
            sales: item.totalSales,
            orders: item.orderCount
        }))
    });
});

export { getDashboardAnalytics, getSalesAnalytics };
