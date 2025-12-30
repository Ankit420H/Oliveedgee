'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchProducts } from '../../features/product/api';
import { Product } from '../../features/product';
// import { Helmet } from 'react-helmet-async'; // Metadata handled by layout/page
import ProductCard from '../../features/product/components/ProductCard';
import QuickViewModal from '../../components/ui/QuickViewModal';

const ShopContent = () => {
    // State
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category');

    const formatCategory = (slug: string | null) => {
        if (!slug) return 'All';
        if (slug === 'new') return 'New Arrivals';
        return slug.charAt(0).toUpperCase() + slug.slice(1);
    };

    const [searchQuery, setSearchQuery] = useState('');

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(() =>
        initialCategory ? formatCategory(initialCategory) : 'All'
    );
    const [sortBy, setSortBy] = useState('newest');

    // Quick View State
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts(100);
                const productsList = data.products || data;
                setProducts(productsList);
                const uniqueCategories: string[] = ['All', ...Array.from(new Set(
                    productsList.map((item: Product) => item.category)
                )) as string[]];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        loadProducts();
    }, []);

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const getSortedAndFilteredProducts = () => {
        let currentProducts = products;

        // 1. Filter by Category
        if (selectedCategory !== 'All') {
            currentProducts = currentProducts.filter(product => product.category === selectedCategory);
        }

        // 2. Filter by Search Query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            currentProducts = currentProducts.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query)
            );
        }

        const sorted = [...currentProducts];

        switch (sortBy) {
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
            default:
                // Assuming newer products have higher _id or createdAt
                sorted.sort((a, b) => {
                    const dateA = new Date(a.createdAt || 0).getTime();
                    const dateB = new Date(b.createdAt || 0).getTime();
                    return dateB - dateA;
                });
                break;
        }
        return sorted;
    };

    const filteredAndSortedProducts = getSortedAndFilteredProducts();

    return (
        <div className="bg-clinical-canvas min-h-screen pt-20 md:pt-32 pb-24 md:pb-40">
            <div className="mx-auto px-container-sm md:px-container-md lg:px-container-lg">

                {/* Header: The Collection */}
                <div className="mb-12 md:mb-24 flex flex-col items-center text-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-clinical-ink/40 mb-4 md:mb-6">
                        Full Inventory
                    </span>
                    <h1 className="font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-heading-main text-clinical-ink leading-none md:leading-[0.9]">
                        All Tactical Assets
                    </h1>
                </div>

                {/* Filters & Sorting */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 mb-16 md:mb-32 sticky top-20 md:top-8 z-30 py-4 mix-blend-multiply bg-clinical-canvas/90 backdrop-blur-sm rounded-3xl md:rounded-full px-6 md:px-8 border border-clinical-ink/5 shadow-soft w-full">
                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`text-xs font-sans uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-clinical-ink text-white border-clinical-ink'
                                    : 'bg-transparent text-clinical-ink/60 border-transparent hover:border-clinical-ink/20 hover:text-clinical-ink'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Search & Sort Group */}
                    <div className="flex items-center gap-6">
                        {/* Search Input */}
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search Assets..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-b border-clinical-ink/20 py-2 pl-2 pr-8 font-sans text-xs uppercase tracking-wider focus:outline-none focus:border-clinical-ink placeholder-clinical-ink/30 w-32 focus:w-48 transition-all duration-300"
                            />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-clinical-ink/40 pointer-events-none">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                        </div>

                        {/* Sorting Dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent border border-clinical-ink/20 rounded-full px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-clinical-ink cursor-pointer"
                            >
                                <option value="newest">Newest</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* The Grid */}
                <div>
                    {filteredAndSortedProducts.length === 0 ? (
                        <div className="py-24 text-center">
                            <p className="font-display font-medium text-2xl italic text-clinical-ink/30">No assets found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                className="mt-4 text-xs font-bold uppercase tracking-widest text-clinical-ink underline underline-offset-4"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-32">
                            {filteredAndSortedProducts.map((product, index) => (
                                <div
                                    key={product._id}
                                    className={`${index % 2 === 0 ? 'md:translate-y-12' : ''} transition-transform duration-1000`} // Offset for staggered masonry feel
                                >
                                    <ProductCard
                                        product={product}
                                        onQuickView={handleQuickView}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick View Modal */}
            <QuickViewModal
                key={selectedProduct ? selectedProduct._id : 'modal'}
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-clinical-canvas flex items-center justify-center">Loading Shop...</div>}>
            <ShopContent />
        </Suspense>
    );
}

