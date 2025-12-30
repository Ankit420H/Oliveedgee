'use client';

import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

            {!isHome && (
                <div className="bg-clinical-ink text-accent-bronze text-xs font-mono py-2 text-center tracking-wider uppercase relative z-[60]">
                    <span>Global Shipping | Secure Payments | 24/7 Support</span>
                </div>
            )}

            <header
                className={`hidden md:fixed top-6 left-6 right-6 md:left-12 md:right-12 lg:left-24 lg:right-24 z-50 transition-all duration-500 ease-in-out bg-clinical-canvas/90 backdrop-blur-md border border-clinical-ink/5 rounded-3xl ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}
            >
                <div className="container mx-auto px-10 h-20 flex justify-between items-center relative z-50">

                    <nav className="flex-1 flex gap-8 items-center z-10">
                        <div
                            onMouseEnter={() => setMegaMenuOpen(true)}
                            onMouseLeave={() => setMegaMenuOpen(false)}
                            className="h-20 flex items-center"
                        >
                            <Link href="/shop" className="text-sm font-sans font-medium uppercase tracking-wide cursor-pointer text-clinical-ink relative group">
                                Shop
                                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-clinical-ink transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </div>
                        <Link href="/about" className="text-sm font-sans font-medium uppercase tracking-wide cursor-pointer text-clinical-ink relative group">
                            About
                            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-clinical-ink transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/stores" className="text-sm font-sans font-medium uppercase tracking-wide cursor-pointer text-clinical-ink relative group">
                            Locations
                            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-clinical-ink transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <button onClick={() => setSearchOpen(true)} aria-label="Search" className="text-sm font-sans font-medium uppercase tracking-wide cursor-pointer text-clinical-ink relative group">
                            <FaSearch size={14} />
                        </button>
                    </nav>

                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <Link href="/" className="block" aria-label="Olive Edge Home">
                            <img src="/images/Logo.png" alt="Olive Edge" className="h-12 w-auto object-contain" />
                        </Link>
                    </div>

                    <div className="flex-1 flex justify-end gap-8 items-center z-10">
                        {user ? (
                            <Link href="/profile" className="text-sm font-sans font-medium uppercase tracking-wide cursor-pointer text-clinical-ink relative group">
                                Profile
                                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-clinical-ink transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ) : (
                            <Link href="/login" className="text-sm font-sans font-medium uppercase tracking-wide cursor-pointer text-clinical-ink relative group">
                                Login
                                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-clinical-ink transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        )}

                        <Link href="/wishlist" className="relative group" aria-label="Tactical Reserve">
                            <FaBookmark size={20} className="text-clinical-ink group-hover:text-accent-bronze transition-colors" />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent-bronze text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        <Link href="/cart" aria-label={`Cart (${cartItems.length} items)`} className="text-sm font-sans font-medium uppercase tracking-wide cursor-pointer text-clinical-ink relative group flex items-center gap-2">
                            Cart
                            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-clinical-ink transition-all duration-300 group-hover:w-full"></span>
                            {cartItems.length > 0 && <span>({cartItems.length})</span>}
                        </Link>
                    </div>
                </div>

                <MegaMenu
                    isOpen={megaMenuOpen}
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                />
            </header>

            <header className="md:hidden sticky top-0 z-50 bg-clinical-canvas border-b border-clinical-border h-16 flex items-center justify-between px-6 rounded-b-3xl shadow-sm">
                <button className="text-clinical-ink" onClick={() => setMobileMenuOpen(true)} aria-label="Open Menu">
                    <FaBars size={20} />
                </button>
                <Link href="/" aria-label="Olive Edge Home">
                    <img src="/images/Logo.png" alt="Olive Edge" className="h-8 w-auto object-contain" />
                </Link>
                <div className="flex items-center gap-4">
                    <button onClick={() => setSearchOpen(true)} className="text-clinical-ink" aria-label="Search">
                        <FaSearch size={18} />
                    </button>
                    <Link href="/cart" className="text-clinical-ink relative" aria-label="Cart">
                        <FaShoppingBag size={18} />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-2 bg-clinical-ink text-clinical-canvas text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>
                </div>
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
