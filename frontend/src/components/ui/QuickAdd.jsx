import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaPlus } from 'react-icons/fa';

const QuickAdd = ({ product, onAddToCart }) => {
    const [size, setSize] = useState('M'); // Default
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    if (!product) return null;

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-8 right-8 z-40 flex items-center gap-0 bg-glass-matte rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl border border-white/10"
        >
            {/* Size Selector */}
            <div className="flex border-r border-white/10">
                {sizes.map((s) => (
                    <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`w-10 h-12 flex items-center justify-center font-mono text-xs hover:bg-white/5 transition-colors ${size === s ? 'text-white bg-white/10' : 'text-white/40'}`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Add Action */}
            <button
                onClick={() => onAddToCart(product, 1, size)}
                className="h-12 px-6 flex items-center gap-3 bg-signal-success text-white font-mono text-xs uppercase tracking-widest hover:bg-signal-success/90 transition-colors"
            >
                <span>Add to Cart</span>
                <FaPlus size={8} />
            </button>
        </motion.div>
    );
};

export default QuickAdd;
