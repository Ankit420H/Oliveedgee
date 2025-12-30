'use client';

import { useContext } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CartContext, CartContextType, CartItem } from '../../features/cart';

const CartPage = () => {
    const { cartItems, removeFromCart } = useContext(CartContext) as CartContextType;
    const router = useRouter();

    const checkoutHandler = () => {
        router.push('/login?redirect=/shipping');
    };

    return (
        <div className="bg-clinical-canvas min-h-screen pt-20 md:pt-32 pb-40">
            {/* Metadata handled by Next.js layout or export metadata */}
            <div className="mx-auto px-container-sm md:px-container-md lg:px-container-lg">

                {/* Header: The Manifest */}
                <div className="flex flex-col items-center mb-24 border-b border-clinical-ink/10 pb-8">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-clinical-ink/40 mb-6">
                        Your Cart
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-heading-main text-clinical-ink mb-8 leading-[0.8] uppercase">
                        Shopping <br /> Cart
                    </h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="font-display text-2xl italic text-clinical-ink/30 mb-8">
                            Your cart is empty.
                        </p>
                        <Link
                            href="/shop"
                            className="inline-block px-8 py-3 text-xs font-sans uppercase tracking-widest border border-clinical-ink/20 hover:border-clinical-ink transition-colors duration-500 rounded-full"
                        >
                            Return to Shop
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-24">
                        {/* Manifest Items */}
                        <div className="flex-1 space-y-12">
                            {cartItems.map((item: CartItem) => (
                                <div key={item.product} className="flex flex-col md:flex-row items-center gap-8 group">

                                    {/* Image */}
                                    <Link href={`/product/${item.product}`} className="w-32 h-40 bg-clinical-bone flex-shrink-0 overflow-hidden relative rounded-3xl">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </Link>

                                    {/* Info */}
                                    <div className="flex-1 text-center md:text-left">
                                        <Link href={`/product/${item.product}`} className="block font-display text-2xl text-clinical-ink mb-2">
                                            {item.name}
                                        </Link>
                                        <span className="font-sans text-[10px] uppercase tracking-widest text-clinical-ink/40">
                                            Qt. {item.qty}
                                        </span>
                                    </div>

                                    {/* Price & Remove */}
                                    <div className="flex flex-col items-center md:items-end gap-2">
                                        <span className="font-mono text-sm text-clinical-ink">
                                            ₹ {(item.qty * item.price).toLocaleString()}
                                        </span>
                                        <button
                                            onClick={() => removeFromCart(item.product)}
                                            className="text-[10px] uppercase tracking-widest text-red-800/50 hover:text-red-800 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary / Checkout */}
                        <div className="lg:w-96 shrink-0">
                            <div className="sticky top-32 p-8 border border-clinical-ink/5 bg-white/40 backdrop-blur-sm rounded-3xl">
                                <h3 className="font-display font-medium text-2xl text-clinical-ink mb-8">Summary</h3>

                                <div className="flex justify-between mb-4">
                                    <span className="font-sans text-xs uppercase tracking-widest text-clinical-ink/60">Subtotal</span>
                                    <span className="font-mono text-sm text-clinical-ink">
                                        ₹ {cartItems.reduce((acc: number, item: CartItem) => acc + item.qty * item.price, 0).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-8">
                                    <span className="font-sans text-xs uppercase tracking-widest text-clinical-ink/60">Shipping</span>
                                    <span className="font-mono text-xs text-clinical-ink/40">Calculated Next</span>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={checkoutHandler}
                                    className="w-full py-4 bg-signal-success text-white font-mono text-xs uppercase tracking-[0.2em] hover:bg-clinical-ink transition-colors duration-500 rounded-full"
                                >
                                    Proceed to Checkout
                                </motion.button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default CartPage;
