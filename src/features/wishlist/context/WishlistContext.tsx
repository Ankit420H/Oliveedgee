'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { WishlistItem, WishlistContextType } from '../types';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
    children: ReactNode;
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize from LocalStorage
    useEffect(() => {
        const initWishlist = () => {
            const savedWishlist = localStorage.getItem('oliveEdgeWishlist');
            if (savedWishlist) {
                try {
                    setWishlist(JSON.parse(savedWishlist));
                } catch (e) {
                    console.error('Failed to parse wishlist', e);
                }
            }
            setIsInitialized(true);
        };
        initWishlist();
    }, []);

    // Save to LocalStorage (only after initialization)
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('oliveEdgeWishlist', JSON.stringify(wishlist));
        }
    }, [wishlist, isInitialized]);

    const addToWishlist = (product: WishlistItem) => {
        const exists = wishlist.find((item) => item._id === product._id);
        if (!exists) {
            setWishlist([...wishlist, product]);
        }
    };

    const removeFromWishlist = (productId: string) => {
        setWishlist(wishlist.filter((item) => item._id !== productId));
    };

    const isInWishlist = (productId: string) => {
        return wishlist.some((item) => item._id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistContext;
