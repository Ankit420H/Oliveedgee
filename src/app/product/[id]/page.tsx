'use client';

import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '../../../lib/api';
import { CartContext, CartContextType } from '../../../features/cart';
import { WishlistContext, WishlistContextType } from '../../../features/wishlist';
import { Product } from '../../../features/product/types';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaPlus, FaMinus, FaRuler, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import StickyCTA from '../../../components/ui/StickyCTA';
import QuickAdd from '../../../components/ui/QuickAdd';
import SizeGuideModal from '../../../features/product/components/SizeGuideModal';
import ReviewList from '../../../features/product/components/ReviewList';
import ProductCard from '../../../features/product/components/ProductCard';

const ProductPage = () => {
    const params = useParams();
    const id = params?.id as string;

    const { addToCart } = useContext(CartContext) as CartContextType;
    const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext) as WishlistContextType;
    const [product, setProduct] = useState<Product | null>(null);
    const [qty, setQty] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [selectedSize, setSelectedSize] = useState('M');
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

    const [isStickyVisible, setIsStickyVisible] = useState(false);
    const mainBtnRef = useRef<HTMLButtonElement>(null);

    const fetchProduct = useCallback(async () => {
        if (!id) return;
        try {
            setError(false);
            const { data } = await api.get(`/api/products/${id}`);
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
            setError(true);
        }

        try {
            const { data: related } = await api.get(`/api/products/${id}/related`);
            setRelatedProducts(related);
        } catch (error) {
            console.warn('Error fetching related products:', error);
            // Do not set main error, just ignore related products failure
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
        window.scrollTo(0, 0);
    }, [fetchProduct]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsStickyVisible(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        const btn = mainBtnRef.current;
        if (btn && product) {
            observer.observe(btn);
        }

        return () => {
            if (btn) observer.unobserve(btn);
        };
    }, [product]);

    const handleAddToCart = (item: Product | null = product, quantity = qty, size = selectedSize) => {
        if (!item) return;
        // Use the new signature: (product, quantity, size)
        addToCart(item, quantity, size);
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
        toast.info(`Added to Cart: ${item.name} [Size: ${size}]`, { theme: "light" });
    };

    if (loading) return (
        <div className="min-h-screen bg-clinical-canvas flex items-center justify-center font-serif text-xl animate-pulse">
            Loading Asset...
        </div>
    );

    if (error || !product) return (
        <div className="min-h-screen bg-clinical-canvas flex flex-col items-center justify-center text-center p-6">
            <h1 className="font-display font-black text-6xl text-clinical-ink mb-4">404</h1>
            <p className="font-sans text-clinical-ink/60 uppercase tracking-widest mb-8">Asset Not Found or Deprecated</p>
            <Link href="/shop" className="px-8 py-3 bg-clinical-ink text-white font-mono text-xs uppercase tracking-widest rounded-full hover:bg-black transition-all">
                Return to Shop
            </Link>
        </div>
    );

    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    return (
        <div className="bg-clinical-canvas min-h-screen pt-24 pb-20">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    <div className="relative">
                        <div className="lg:sticky lg:top-32 px-6 lg:px-0">
                            <motion.img
                                layoutId={`product-image-${product._id}`}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain max-h-[80vh] mx-auto z-10 relative rounded-poster shadow-soft"
                            />
                        </div>
                    </div>

                    <div className="px-6 lg:pl-10 lg:pr-20 flex flex-col justify-center">
                        <div className="border-t border-black pt-6 mb-4">
                            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-clinical-ink mb-2">
                                {product.category}
                            </h2>
                            <h1 className="font-display font-black text-5xl md:text-7xl lg:text-heading-main text-clinical-ink mb-8 leading-none md:leading-[0.9] uppercase">
                                {product.name}
                            </h1>
                        </div>

                        <p className="font-sans text-base text-clinical-ink/80 leading-relaxed mb-10 max-w-md">
                            {product.description}
                        </p>

                        <div className="border-t border-b border-clinical-ink/20 py-8 mb-10">
                            <div className="flex items-center justify-between mb-6">
                                <span className="font-display text-xl">Rs. {product.price}</span>
                                <span className={product.countInStock > 0 ? "text-xs font-mono font-bold tracking-widest text-signal-success" : "text-xs font-mono font-bold tracking-widest text-signal-error"}>
                                    {product.countInStock > 0 ? 'Available' : 'Out of Stock'}
                                </span>
                            </div>

                            {product.countInStock > 0 && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {sizes.map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => setSelectedSize(s)}
                                                    className={`w-10 h-10 border text-xs font-mono transition-all rounded-full ${selectedSize === s
                                                        ? 'border-accent-bronze bg-accent-bronze text-white'
                                                        : 'border-clinical-ink/20 hover:border-clinical-ink/50'
                                                        }`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => setIsSizeGuideOpen(true)}
                                            className="text-[10px] font-mono uppercase underline decoration-1 underline-offset-4 flex items-center gap-2 hover:opacity-50"
                                        >
                                            <FaRuler /> Size Guide
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-sans font-medium">Quantity</span>
                                        <div className="flex items-center border border-clinical-ink/30 rounded-3xl overflow-hidden">
                                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-black/5"><FaMinus size={10} /></button>
                                            <span className="px-4 font-mono">{qty}</span>
                                            <button onClick={() => setQty(Math.min(product.countInStock || 1, qty + 1))} className="p-3 hover:bg-black/5"><FaPlus size={10} /></button>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        ref={mainBtnRef}
                                        onClick={() => handleAddToCart()}
                                        className="w-full py-4 bg-accent-bronze text-white font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-clinical-ink hover:text-white transition-colors duration-500 rounded-full"
                                    >
                                        Acquire
                                    </motion.button>

                                    <button
                                        onClick={() => isInWishlist(product._id) ? removeFromWishlist(product._id) : addToWishlist(product)}
                                        className="w-full py-3 border border-clinical-ink/20 text-clinical-ink font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-clinical-ink/5 transition-colors duration-300 rounded-full flex items-center justify-center gap-2"
                                    >
                                        {isInWishlist(product._id) ? <><FaBookmark size={12} /> Asset Secured</> : <><FaRegBookmark size={12} /> Add to Reserve</>}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 border-t border-clinical-ink/20 pt-8">
                            <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-4 block">Product Details</span>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs font-mono">
                                <div>
                                    <span className="block opacity-50 uppercase tracking-wide">Seams</span>
                                    <span className="block font-bold">Ultrasonic / 13mm Tape</span>
                                </div>
                                <div>
                                    <span className="block opacity-50 uppercase tracking-wide">Hardware</span>
                                    <span className="block font-bold">YKK AquaGuard®</span>
                                </div>
                                <div>
                                    <span className="block opacity-50 uppercase tracking-wide">Insulation</span>
                                    <span className="block font-bold">800-Fill Goose Down</span>
                                </div>
                                <div>
                                    <span className="block opacity-50 uppercase tracking-wide">Rating</span>
                                    <span className="block font-bold">-10°C to +15°C</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg py-24 border-t border-clinical-ink/5">
                    <div className="mb-12">
                        <span className="font-mono text-xs text-clinical-ink/40 uppercase tracking-[0.2em] block mb-2">Tactical Recommendations</span>
                        <h2 className="font-display font-black text-4xl md:text-5xl text-clinical-ink uppercase tracking-tight">Complementary Assets</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                </div>
            )}

            <div className="container mx-auto">
                <ReviewList product={product} refreshProduct={fetchProduct} />
            </div>

            <StickyCTA
                product={product}
                onAddToCart={handleAddToCart}
                isVisible={isStickyVisible}
            />

            <AnimatePresence>
                {isStickyVisible && (
                    <div className="hidden md:block">
                        <QuickAdd product={product} onAddToCart={handleAddToCart} />
                    </div>
                )}
            </AnimatePresence>

            <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
        </div>
    );
};

export default ProductPage;
