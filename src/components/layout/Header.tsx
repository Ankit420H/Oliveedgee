'use client';

import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthContext, AuthContextType } from '../../features/auth';
import { CartContext, CartContextType } from '../../features/cart';
import { WishlistContext, WishlistContextType } from '../../features/wishlist';
import MobileMenu from './MobileMenu';
import MegaMenu from './MegaMenu';
import SearchOverlay from './SearchOverlay';
import { FaBars, FaSearch, FaShoppingBag, FaBookmark } from 'react-icons/fa';

const Header = () => {
    const { user, logout } = useContext(AuthContext) as AuthContextType;
    const { cartItems } = useContext(CartContext) as CartContextType;
    const { wishlist } = useContext(WishlistContext) as WishlistContextType;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Global Scroll Listener
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

            {/* Top Bar - Hidden on mobile, visible on lg+ */}
            <div className="hidden lg:block bg-clinical-ink text-accent-bronze text-xs font-mono py-2 text-center tracking-wider uppercase relative z-[60]">
                <span>Global Shipping | Secure Payments | 24/7 Support</span>
            </div>

            {/* Main Header - Sticky & Responsive */}
            <header
                className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${isScrolled
                    ? 'bg-clinical-canvas/90 backdrop-blur-md shadow-sm py-4'
                    : 'bg-clinical-canvas py-6'
                    }`}
            >
                <div className="container mx-auto px-6 h-full flex justify-between items-center">

                    {/* Left: Mobile Toggle & Desktop Nav */}
                    <div className="flex items-center gap-8">
                        {/* Mobile: Hamburger */}
                        <button
                            className="lg:hidden text-clinical-ink p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Menu"
                        >
                            <FaBars size={20} />
                        </button>

                        {/* Desktop: Navigation Links */}
                        <nav className="hidden lg:flex gap-8 items-center">
                            <div
                                onMouseEnter={() => setMegaMenuOpen(true)}
                                onMouseLeave={() => setMegaMenuOpen(false)}
                                className="relative py-4"
                            >
                                <Link href="/shop" className="text-sm font-sans font-bold uppercase tracking-widest text-clinical-ink hover:text-accent-bronze transition-colors">
                                    Shop
                                </Link>
                                {/* Mega Menu attached to Shop link wrapper */}
                                <div className="absolute top-full left-0 pt-2">
                                    {/* MegaMenu logic handled by component below, but positioning is trickier if relative. 
                                         We'll keep MegaMenu outside for full width, but trigger it here. */}
                                </div>
                            </div>
                            <Link href="/about" className="text-sm font-sans font-bold uppercase tracking-widest text-clinical-ink hover:text-accent-bronze transition-colors">
                                About
                            </Link>
                            <Link href="/stores" className="text-sm font-sans font-bold uppercase tracking-widest text-clinical-ink hover:text-accent-bronze transition-colors">
                                Locations
                            </Link>
                        </nav>
                    </div>

                    {/* Center: Logo */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Link href="/" aria-label="Olive Edge Home">
                            <img
                                src="/images/Logo.png"
                                alt="Olive Edge"
                                className={`w-auto transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10 md:h-12'}`}
                            />
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-4 md:gap-6">
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="text-clinical-ink p-2 hover:text-accent-bronze transition-colors"
                            aria-label="Search"
                        >
                            <FaSearch size={18} />
                        </button>

                        <div className="hidden lg:flex items-center gap-6">
                            {user ? (
                                <Link href="/profile" className="text-sm font-sans font-bold uppercase tracking-widest text-clinical-ink hover:text-accent-bronze transition-colors">
                                    Account
                                </Link>
                            ) : (
                                <Link href="/login" className="text-sm font-sans font-bold uppercase tracking-widest text-clinical-ink hover:text-accent-bronze transition-colors">
                                    Login
                                </Link>
                            )}

                            <Link href="/wishlist" className="relative text-clinical-ink hover:text-accent-bronze transition-colors" aria-label="Wishlist">
                                <FaBookmark size={20} />
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-accent-bronze text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>
                        </div>

                        <Link href="/cart" className="relative text-clinical-ink hover:text-accent-bronze transition-colors p-2 -mr-2" aria-label="Cart">
                            <FaShoppingBag size={20} />
                            {cartItems.length > 0 && (
                                <span className="absolute top-0 right-0 bg-clinical-ink text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-clinical-canvas">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mega Menu Hooked to global hover state */}
                <MegaMenu
                    isOpen={megaMenuOpen}
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                    user={user}
                />
            </header>

            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                user={user}
                logout={logout}
            />
        </>
    );
};

export default Header;
