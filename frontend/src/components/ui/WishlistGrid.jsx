import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import WishlistContext from '../../context/WishlistContext';
import CartContext from '../../context/CartContext';

const WishlistGrid = ({ items = [] }) => {
    const { removeFromWishlist } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (product) => {
        addToCart({ ...product, size: 'M' }, 1); // Default size M for quick add
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-24 border border-dashed border-clinical-ink/20 rounded-3xl">
                <p className="font-display text-2xl text-clinical-ink/50 mb-6">
                    Reserve Empty. No assets secured.
                </p>
                <Link
                    to="/shop"
                    className="px-8 py-3 bg-clinical-ink text-white font-sans text-xs font-bold uppercase tracking-widest rounded-full hover:bg-opacity-90 transition-all"
                >
                    Initiate Acquisition
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((product) => (
                <div key={product._id} className="group relative bg-white border border-clinical-ink/10 rounded-2xl overflow-hidden p-4 hover:border-accent-bronze/30 transition-all">
                    <Link to={`/product/${product._id}`} className="block relative aspect-[4/5] rounded-xl overflow-hidden mb-4">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 bg-accent-bronze text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Reserved
                        </div>
                    </Link>

                    <div className="space-y-2">
                        <h3 className="font-display font-bold text-lg leading-tight truncate text-clinical-ink">{product.name}</h3>
                        <p className="font-mono text-sm text-clinical-ink/80">Rs. {product.price}</p>

                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="flex-1 py-2 bg-clinical-ink text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-opacity-90 flex items-center justify-center gap-2 transition-colors"
                            >
                                <FaShoppingCart size={10} /> Acquire
                            </button>
                            <button
                                onClick={() => removeFromWishlist(product._id)}
                                className="w-8 h-8 flex items-center justify-center border border-signal-error/20 text-signal-error rounded-full hover:bg-signal-error hover:text-white transition-colors"
                                title="Remove from Reserve"
                            >
                                <FaTrash size={10} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WishlistGrid;
