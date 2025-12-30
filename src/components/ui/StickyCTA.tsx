import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../features/product/types';

interface StickyCTAProps {
    product: Product | null;
    onAddToCart: () => void;
    isVisible: boolean;
}

const StickyCTA = ({ product, onAddToCart, isVisible }: StickyCTAProps) => {
    if (!product) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-4 left-4 right-4 z-50 bg-clinical-canvas border border-clinical-border p-4 md:hidden shadow-2xl rounded-3xl"
                >
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="font-serif text-sm font-bold text-clinical-ink truncate max-w-[150px]">
                                {product.name}
                            </span>
                            <span className="font-mono text-xs text-clinical-ink/60">
                                ₹ {product.price}
                            </span>
                        </div>
                        <button
                            onClick={onAddToCart}
                            className="bg-clinical-ink text-clinical-canvas px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest flex-shrink-0 active:scale-95 transition-transform hover:bg-clinical-ink/90"
                        >
                            Add to Cart
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyCTA;
