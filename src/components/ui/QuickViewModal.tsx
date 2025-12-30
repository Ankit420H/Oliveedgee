import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { CartContext, CartContextType } from '../../features/cart';
import { toast } from 'react-toastify';
import { Product } from '../../features/product/types';

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
    const { addToCart } = useContext(CartContext) as CartContextType;
    const [qty, setQty] = useState(1);
    const router = useRouter();

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, qty);
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
        toast.info(`Added to cart: ${product.name}`, { theme: "light" });
        onClose();
    };

    const handleFullDetails = () => {
        if (!product) return;
        onClose();
        router.push(`/product/${product._id}`);
    };

    return (
        <AnimatePresence>
            {isOpen && product && (
                <div className="fixed inset-0 z-[1500] flex items-center justify-center pointer-events-none p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto cursor-pointer"
                    />

                    {/* Modal Content - Glassmorphism */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-clinical-canvas/90 backdrop-blur-xl border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-hidden relative shadow-2xl pointer-events-auto flex flex-col md:flex-row rounded-3xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 text-clinical-ink/50 hover:text-clinical-ink hover:bg-black/5 transition-all"
                        >
                            <FaTimes />
                        </button>

                        {/* Image Half */}
                        <div className="w-full md:w-1/2 bg-clinical-highlight/10 flex items-center justify-center p-8 relative">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10 mix-blend-multiply"></div>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-h-[300px] md:max-h-[400px] object-contain mix-blend-multiply filter contrast-125"
                            />
                        </div>

                        {/* Content Half */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-white/40">
                            <div className="absolute top-8 right-8 font-mono text-[9px] text-clinical-ink/30 tracking-widest border border-clinical-ink/10 px-2 py-1 uppercase">
                                Status: Classified
                            </div>

                            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-signal-success mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-signal-success rounded-full"></span>
                                {product.category}
                            </span>
                            <h2 className="font-display font-medium text-4xl text-clinical-ink mb-6 leading-tight">
                                {product.name}
                            </h2>
                            <p className="font-sans text-xs text-clinical-ink/80 mb-8 leading-relaxed max-w-xs border-l-2 border-signal-success pl-4">
                                {product.description}
                            </p>

                            <div className="flex items-center justify-between mb-8 border-t border-b border-clinical-ink/10 py-6">
                                <span className="font-display text-2xl text-clinical-ink">₹ {product.price}</span>
                                <div className="flex items-center border border-clinical-ink/20 bg-white/50 rounded-full overflow-hidden">
                                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-black/5 transition-colors"><FaMinus size={8} /></button>
                                    <span className="px-4 font-mono text-xs">{qty}</span>
                                    <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} className="p-3 hover:bg-black/5 transition-colors"><FaPlus size={8} /></button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-clinical-ink text-clinical-canvas py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-signal-success transition-colors rounded-3xl"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleFullDetails}
                                    className="px-6 border border-clinical-ink/20 text-clinical-ink font-mono text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-clinical-ink hover:text-clinical-canvas transition-colors rounded-3xl"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default QuickViewModal;
