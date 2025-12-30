import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { Product } from '../../features/product/types';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
    const [query, setQuery] = useState('');

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch products for predictive search
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/api/products');
                setAllProducts(data.products || data); // Adjust based on API structure
            } catch (error) {
                console.error("Failed to fetch products for search", error);
            }
        };
        if (isOpen && allProducts.length === 0) {
            fetchProducts();
        }
    }, [isOpen, allProducts.length]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const suggestions = (query.trim() && allProducts.length > 0)
        ? allProducts.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)
        : [];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onClose();
            router.push(`/shop?search=${encodeURIComponent(query)}`);
        }
    };

    const handleSuggestionClick = (productId: string) => {
        onClose();
        router.push(`/product/${productId}`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[2000] bg-clinical-canvas flex flex-col"
                >
                    {/* Header Part */}
                    <div className="container mx-auto px-6 md:px-10 h-20 flex justify-between items-center">
                        <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60">
                            Search
                        </span>
                        <button onClick={onClose} className="text-clinical-ink hover:opacity-50 transition-opacity">
                            <FaTimes size={24} />
                        </button>
                    </div>

                    {/* Search Input Area */}
                    <div className="flex-1 container mx-auto px-6 md:px-10 flex flex-col justify-center -mt-20">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-full bg-white/50 border border-clinical-ink/10 rounded-full px-12 py-12 text-3xl md:text-5xl font-serif text-clinical-ink placeholder-clinical-ink/20 focus:outline-none focus:border-clinical-ink/40 transition-colors"
                            />
                            <button
                                type="submit"
                                className="absolute right-12 top-1/2 -translate-y-1/2 text-clinical-ink hover:opacity-70 transition-opacity"
                            >
                                <FaArrowRight size={32} />
                            </button>
                        </form>

                        {/* Suggestions List */}
                        <div className="mt-8 min-h-[200px]">
                            {suggestions.length > 0 ? (
                                <div>
                                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60 block mb-4">
                                        Suggestions
                                    </span>
                                    <ul className="space-y-4">
                                        {suggestions.map((product) => (
                                            <li key={product._id}>
                                                <button
                                                    onClick={() => handleSuggestionClick(product._id)}
                                                    className="group flex items-center justify-between w-full max-w-xl text-left font-serif text-xl text-clinical-ink hover:opacity-70"
                                                >
                                                    <span>{product.name}</span>
                                                    <span className="text-xs font-sans text-clinical-ink/60 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        View Product
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                // Fallback / Popular
                                query === '' && (
                                    <div>
                                        <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60 block mb-4">
                                            Popular Searches
                                        </span>
                                        <div className="flex flex-wrap gap-4">
                                            {['Tactical Vest', 'Boots', 'Uniforms', 'Jackets'].map((term) => (
                                                <button
                                                    key={term}
                                                    onClick={() => { setQuery(term); }}
                                                    className="text-sm font-sans text-clinical-ink hover:underline"
                                                >
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;
