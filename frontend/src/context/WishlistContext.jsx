import { createContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('oliveEdgeWishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('oliveEdgeWishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        const exists = wishlist.find((item) => item._id === product._id);
        if (!exists) {
            setWishlist([...wishlist, product]);
        }
    };

    const removeFromWishlist = (productId) => {
        setWishlist(wishlist.filter((item) => item._id !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item._id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistContext;
