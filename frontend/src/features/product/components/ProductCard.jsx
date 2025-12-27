import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useContext } from 'react';
import WishlistContext from '../../../context/WishlistContext';

const ProductCard = ({ product, onQuickView }) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
    const inWishlist = isInWishlist(product._id);

    const toggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className="group relative flex flex-col gap-4 cursor-pointer">
            {/* Image Container with Aggressive Radius */}
            <Link to={`/product/${product._id}`} className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-clinical-canvas border border-clinical-border/50">
                {/* Badges - Floating Inside */}
                {product.countInStock === 0 ? (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-clinical-ink z-20">
                        Out of Stock
                    </div>
                ) : (
                    (product.price < 5000 || product.isNew) && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-clinical-ink z-20">
                            {product.isNew ? 'New Arrival' : 'Sale'}
                        </div>
                    )
                )}

                {/* Wishlist Toggle - Top Right */}
                <button
                    onClick={toggleWishlist}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur text-clinical-ink z-20 hover:text-accent-bronze transition-colors"
                >
                    {inWishlist ? <FaBookmark size={12} /> : <FaRegBookmark size={12} />}
                </button>

                {/* Image with Zoom */}
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply filter contrast-110"
                />

                {/* Circular Add Button - Bottom Right */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                        e.preventDefault();
                        if (onQuickView) onQuickView(product);
                    }}
                    aria-label="Quick View"
                    className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-clinical-ink shadow-lg z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent-bronze hover:text-white"
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.button>
            </Link>

            {/* Minimal Info */}
            <div className="flex justify-between items-start px-2">
                <div>
                    <h3 className="font-sans text-base font-bold text-clinical-ink leading-tight mb-1 group-hover:text-accent-bronze transition-colors duration-300">
                        {product.name}
                    </h3>
                    <p className="font-sans text-sm text-clinical-ink/60">
                        {product.category}
                    </p>
                </div>
                <div className="font-sans text-sm font-bold text-clinical-ink">
                    Rs. {product.price}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
