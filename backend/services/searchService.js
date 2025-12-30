import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Search products with advanced filters
// @route   GET /api/products/search
// @access  Public
const searchProducts = asyncHandler(async (req, res) => {
    const {
        q,           // search query
        category,
        brand,
        minPrice,
        maxPrice,
        inStock,
        sort = '-createdAt',
        page = 1,
        limit = 12
    } = req.query;

    // Build search query
    const query = {};

    // Text search
    if (q) {
        query.$or = [
            { name: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { brand: { $regex: q, $options: 'i' } }
        ];
    }

    // Category filter
    if (category && category !== 'all') {
        query.category = category;
    }

    // Brand filter
    if (brand && brand !== 'all') {
        query.brand = brand;
    }

    // Price range filter
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Stock filter
    if (inStock === 'true') {
        query.countInStock = { $gt: 0 };
    }

    // Execute query with pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [products, totalProducts] = await Promise.all([
        Product.find(query)
            .sort(sort)
            .limit(limitNum)
            .skip(skip)
            .select('-reviews'),
        Product.countDocuments(query)
    ]);

    // Get aggregations for filters
    const aggregations = await Product.aggregate([
        { $match: q ? query.$or ? { $or: query.$or } : {} : {} },
        {
            $facet: {
                categories: [
                    { $group: { _id: '$category', count: { $sum: 1 } } },
                    { $sort: { count: -1 } }
                ],
                brands: [
                    { $group: { _id: '$brand', count: { $sum: 1 } } },
                    { $sort: { count: -1 } }
                ],
                priceRange: [
                    {
                        $group: {
                            _id: null,
                            minPrice: { $min: '$price' },
                            maxPrice: { $max: '$price' }
                        }
                    }
                ]
            }
        }
    ]);

    res.json({
        products,
        page: pageNum,
        pages: Math.ceil(totalProducts / limitNum),
        total: totalProducts,
        filters: {
            categories: aggregations[0].categories,
            brands: aggregations[0].brands,
            priceRange: aggregations[0].priceRange[0] || { minPrice: 0, maxPrice: 0 }
        }
    });
});

// @desc    Get search suggestions (autocomplete)
// @route   GET /api/products/suggest
// @access  Public
const getSearchSuggestions = asyncHandler(async (req, res) => {
    const { q } = req.query;

    if (!q || q.length < 2) {
        return res.json({ suggestions: [] });
    }

    const suggestions = await Product.aggregate([
        {
            $match: {
                $or: [
                    { name: { $regex: q, $options: 'i' } },
                    { brand: { $regex: q, $options: 'i' } }
                ]
            }
        },
        {
            $limit: 5
        },
        {
            $project: {
                name: 1,
                brand: 1,
                image: 1,
                price: 1,
                slug: 1
            }
        }
    ]);

    res.json({ suggestions });
});

export { searchProducts, getSearchSuggestions };
