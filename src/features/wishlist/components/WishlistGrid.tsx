'use client';

import { WishlistItem } from '../types';
import { Product } from '../../product/types';
import { useContext } from 'react';
import CartContext from '../../cart/context/CartContext';
import { CartContextType } from '../../cart/types';
import WishlistContext from '../context/WishlistContext';
import { WishlistContextType } from '../types';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const WishlistGrid = () => {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext) as WishlistContextType;
    const { addToCart } = useContext(CartContext) as CartContextType;

    const handleAddToCart = (product: WishlistItem) => {
        // Cast WishlistItem to unknown then to Product to avoid direct 'any'
        addToCart(product as unknown as Product, 1, 'M');
    };

    if (wishlist.length === 0) {
        return (
            <div className="py-20 text-center">
                <p className="font-sans text-sm text-clinical-ink/40 uppercase tracking-[0.2em]">Archival records are empty.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item: WishlistItem) => (
                <div key={item._id} className="group bg-white/40 border border-clinical-ink/5 p-6 rounded-3xl hover:border-accent-bronze/30 transition-all">
                    <div className="aspect-[4/5] bg-clinical-bone rounded-2xl overflow-hidden mb-6 relative">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    <div className="space-y-2 mb-6">
                        <h3 className="font-display font-bold text-lg text-clinical-ink">{item.name}</h3>
                        <p className="font-mono text-sm text-clinical-ink/60">₹ {item.price}</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => handleAddToCart(item)}
                            className="flex-1 py-3 bg-clinical-ink text-white rounded-full font-sans text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-accent-bronze transition-colors"
                        >
                            <FaShoppingCart size={12} /> Add to Cart
                        </button>
                        <button
                            onClick={() => removeFromWishlist(item._id)}
                            className="w-12 h-12 border border-clinical-ink/10 rounded-full flex items-center justify-center text-clinical-ink/40 hover:text-signal-error hover:border-signal-error/30 transition-all"
                        >
                            <FaTrash size={12} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WishlistGrid;
