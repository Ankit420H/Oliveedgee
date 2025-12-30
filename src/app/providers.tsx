'use client';

import React from 'react';
import { AuthProvider } from '../features/auth';
import { WishlistProvider } from '../features/wishlist';
import { CartProvider } from '../features/cart';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WishlistProvider>
            <CartProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </CartProvider>
        </WishlistProvider>
    );
}
