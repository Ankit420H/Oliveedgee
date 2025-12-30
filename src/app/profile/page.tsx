'use client';

import { useState, useEffect, useContext, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext, AuthContextType } from '../../features/auth';
import { CartContext, CartContextType, ShippingAddress } from '../../features/cart';
import { WishlistContext, WishlistContextType } from '../../features/wishlist';
import { Order } from '../../features/order/types';
import { UserReview } from '../../features/product/types';
import api from '../../lib/api';
import { FaUser, FaBox, FaMapMarkerAlt, FaSignOutAlt, FaExclamationCircle, FaBookmark, FaClipboardList } from 'react-icons/fa';
import { motion } from 'framer-motion';
import WishlistGrid from '../../features/wishlist/components/WishlistGrid';
import AlertModal from '../../components/ui/AlertModal';
import { getErrorMessage } from '../../lib/error-utils';

const ProfilePage = () => {
    const { user, updateProfile, logout } = useContext(AuthContext) as AuthContextType;
    const { shippingAddress, saveShippingAddress } = useContext(CartContext) as CartContextType;
    const { wishlist: _wishlist } = useContext(WishlistContext) as WishlistContextType;
    const router = useRouter();

    const [activeTab, setActiveTab] = useState('identity');

    // Identity State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [successTitle, setSuccessTitle] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Acquisitions State
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    // Reviews State
    const [reviews, setReviews] = useState<UserReview[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    // Coordinates State
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        const syncProfile = async () => {
            await Promise.resolve();
            if (user) {
                setName(user.name || '');
                setEmail(user.email || '');
                setPhone(user.phone || '');
            }
            if (shippingAddress) {
                setAddress(shippingAddress.address || '');
                setCity(shippingAddress.city || '');
                setPostalCode(shippingAddress.postalCode || '');
                setCountry(shippingAddress.country || '');
            }
        };
        syncProfile();
    }, [user, shippingAddress]);

    const fetchOrders = useCallback(async () => {
        try {
            const { data } = await api.get('/api/orders/myorders');
            setOrders(data);
            setLoadingOrders(false);
        } catch (err: unknown) {
            console.error(getErrorMessage(err));
            setLoadingOrders(false);
        }
    }, []);

    const fetchReviews = useCallback(async () => {
        try {
            const { data } = await api.get('/api/users/reviews');
            setReviews(data);
            setLoadingReviews(false);
        } catch (err: unknown) {
            console.error(getErrorMessage(err));
            setLoadingReviews(false);
        }
    }, []);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            const loadData = async () => {
                if (activeTab === 'acquisitions') {
                    await fetchOrders();
                } else if (activeTab === 'reviews') {
                    await fetchReviews();
                }
            };
            loadData();
        }
    }, [router, user, activeTab, fetchOrders, fetchReviews]);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const submitIdentityHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                const { data } = await api.put(
                    '/api/users/profile',
                    { id: user?._id, name, email, password, phone }
                );
                setSuccessTitle('Identity Updated');
                setSuccessMessage('Your personnel dossier has been successfully modified.');
                setIsSuccessModalOpen(true);
                updateProfile(data);
            } catch (err: unknown) {
                setMessage(getErrorMessage(err));
            }
        }
    };

    // Redirect if not authenticated
    useEffect(() => {
        if (!user) {
            router.push('/login?redirect=/profile');
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <div className="bg-clinical-canvas min-h-screen pt-20 md:pt-32 pb-40">
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg">
                <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-clinical-ink/40 mb-12 font-sans">
                    <Link href="/" className="hover:text-clinical-ink transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-clinical-ink">Personnel File</span>
                </nav>

                <div className="border-t border-black pt-6 mb-24">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-clinical-ink/40 mb-4 block">
                        Personnel Record
                    </span>
                    <h1 className="font-display font-black text-5xl md:text-7xl lg:text-heading-main text-clinical-ink uppercase leading-[0.9]">
                        Personal Dossier
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24 relative">
                    <div className="md:col-span-1 space-y-12 md:sticky md:top-32 h-fit">
                        <ul className="flex flex-col gap-6 font-sans text-xs uppercase tracking-widest text-clinical-ink/60">
                            <li>
                                <button
                                    onClick={() => setActiveTab('identity')}
                                    className={`flex items-center gap-4 transition-all duration-300 w-full text-left group ${activeTab === 'identity' ? 'text-clinical-ink font-bold pl-4 border-l-2 border-accent-bronze' : 'hover:text-clinical-ink pl-4 border-l-2 border-transparent'}`}
                                >
                                    <FaUser className={activeTab === 'identity' ? 'text-accent-bronze' : 'opacity-0 group-hover:opacity-50 transition-opacity'} size={10} />
                                    Identity
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('acquisitions')}
                                    className={`flex items-center gap-4 transition-all duration-300 w-full text-left group ${activeTab === 'acquisitions' ? 'text-clinical-ink font-bold pl-4 border-l-2 border-accent-bronze' : 'hover:text-clinical-ink pl-4 border-l-2 border-transparent'}`}
                                >
                                    <FaBox className={activeTab === 'acquisitions' ? 'text-accent-bronze' : 'opacity-0 group-hover:opacity-50 transition-opacity'} size={10} />
                                    Acquisitions
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('coordinates')}
                                    className={`flex items-center gap-4 transition-all duration-300 w-full text-left group ${activeTab === 'coordinates' ? 'text-clinical-ink font-bold pl-4 border-l-2 border-accent-bronze' : 'hover:text-clinical-ink pl-4 border-l-2 border-transparent'}`}
                                >
                                    <FaMapMarkerAlt className={activeTab === 'coordinates' ? 'text-accent-bronze' : 'opacity-0 group-hover:opacity-50 transition-opacity'} size={10} />
                                    Coordinates
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('wishlist')}
                                    className={`flex items-center gap-4 transition-all duration-300 w-full text-left group ${activeTab === 'wishlist' ? 'text-clinical-ink font-bold pl-4 border-l-2 border-accent-bronze' : 'hover:text-clinical-ink pl-4 border-l-2 border-transparent'}`}
                                >
                                    <FaBookmark className={activeTab === 'wishlist' ? 'text-accent-bronze' : 'opacity-0 group-hover:opacity-50 transition-opacity'} size={10} />
                                    Tactical Reserve
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className={`flex items-center gap-4 transition-all duration-300 w-full text-left group ${activeTab === 'reviews' ? 'text-clinical-ink font-bold pl-4 border-l-2 border-accent-bronze' : 'hover:text-clinical-ink pl-4 border-l-2 border-transparent'}`}
                                >
                                    <FaClipboardList className={activeTab === 'reviews' ? 'text-accent-bronze' : 'opacity-0 group-hover:opacity-50 transition-opacity'} size={10} />
                                    Field Reports
                                </button>
                            </li>
                        </ul>

                        <div className="pt-12 border-t border-clinical-ink/10">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-4 text-xs font-sans uppercase tracking-widest text-red-800/60 hover:text-red-800 transition-colors pl-4"
                            >
                                <FaSignOutAlt /> Terminate Session
                            </button>
                        </div>
                    </div>

                    <div className="md:col-span-3 min-h-[500px]">
                        {activeTab === 'identity' && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <div className="mb-12">
                                    <h2 className="font-display font-black text-4xl md:text-5xl text-clinical-ink mb-2 uppercase tracking-tight">Identity Details</h2>
                                    <p className="font-sans text-[10px] text-clinical-ink/40 uppercase tracking-widest">Manage Credentials & Access</p>
                                </div>

                                {message && (
                                    <div className="mb-8 p-3 bg-red-50 border border-red-100 flex items-center gap-3 text-red-800 text-xs font-sans">
                                        <FaExclamationCircle /> {message}
                                    </div>
                                )}

                                <form onSubmit={submitIdentityHandler} className="space-y-8 max-w-lg">
                                    <div className="aesop-input-group">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="aesop-input peer placeholder-transparent"
                                            placeholder="Full Name"
                                            id="name"
                                        />
                                        <label htmlFor="name">Full Name</label>
                                    </div>

                                    <div className="aesop-input-group">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="aesop-input peer placeholder-transparent"
                                            placeholder="Security ID (Email)"
                                            id="email"
                                        />
                                        <label htmlFor="email">Security ID (Email)</label>
                                    </div>

                                    <div className="aesop-input-group">
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="aesop-input peer placeholder-transparent"
                                            placeholder="Comms (Phone)"
                                            id="phone"
                                        />
                                        <label htmlFor="phone">Comms (Phone)</label>
                                    </div>

                                    <div className="pt-8 space-y-6">
                                        <div className="aesop-input-group">
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="aesop-input peer placeholder-transparent"
                                                placeholder="New Passcode"
                                                id="password"
                                            />
                                            <label htmlFor="password">New Passcode</label>
                                        </div>

                                        <div className="aesop-input-group">
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="aesop-input peer placeholder-transparent"
                                                placeholder="Confirm Passcode"
                                                id="confirmPassword"
                                            />
                                            <label htmlFor="confirmPassword">Confirm Passcode</label>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-accent-bronze text-white font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-clinical-ink transition-all duration-500 rounded-full"
                                    >
                                        Update Identity
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === 'acquisitions' && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <div className="mb-12">
                                    <h2 className="font-display font-black text-4xl md:text-5xl text-clinical-ink mb-2 uppercase tracking-tight">Acquisitions</h2>
                                    <p className="font-sans text-[10px] text-clinical-ink/40 uppercase tracking-widest">Transaction History & Status</p>
                                </div>

                                {loadingOrders ? (
                                    <div className="font-mono text-xs text-clinical-ink/40 animate-pulse">Retrieving Archives...</div>
                                ) : orders.length === 0 ? (
                                    <div className="p-12 border border-clinical-ink/10 rounded-3xl text-center">
                                        <p className="font-sans text-lg text-clinical-ink/60 italic mb-6">No acquisitions found in your dossier.</p>
                                        <Link href="/shop" className="inline-block px-8 py-4 bg-accent-bronze text-white font-mono text-xs uppercase tracking-widest rounded-full hover:bg-clinical-ink transition-colors">
                                            Explore Collection
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div key={order._id} className="bg-white/40 border border-clinical-ink/5 p-6 rounded-2xl hover:border-accent-bronze/30 transition-all group">
                                                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                                    <div>
                                                        <span className="font-mono text-[10px] text-clinical-ink/40 uppercase block mb-1">ID: {order._id.substring(20, 24)}...</span>
                                                        <h3 className="font-display font-bold text-xl text-clinical-ink">₹ {order.totalPrice}</h3>
                                                        <p className="font-sans text-xs text-clinical-ink/60 mt-1">{order.createdAt.substring(0, 10)}</p>
                                                    </div>

                                                    <div className="flex gap-3">
                                                        <div className={`px-4 py-2 rounded-full border text-[10px] font-mono uppercase tracking-widest ${order.isPaid ? 'border-signal-success/20 bg-signal-success/5 text-signal-success' : 'border-signal-error/20 bg-signal-error/5 text-signal-error'}`}>
                                                            {order.isPaid ? 'Settled' : 'Pending'}
                                                        </div>
                                                        <div className={`px-4 py-2 rounded-full border text-[10px] font-mono uppercase tracking-widest ${order.isCancelled ? 'border-red-500/20 bg-red-500/5 text-red-500' : order.isDelivered ? 'border-signal-success/20 bg-signal-success/5 text-signal-success' : 'border-accent-bronze/20 bg-accent-bronze/5 text-accent-bronze'}`}>
                                                            {order.isCancelled ? 'Cancelled' : order.isDelivered ? 'Delivered' : 'In Transit'}
                                                        </div>
                                                    </div>

                                                    <Link href={`/order/${order._id}`} className="px-6 py-3 bg-white border border-clinical-ink/10 text-[10px] uppercase tracking-widest hover:bg-clinical-ink hover:text-white transition-all rounded-xl">
                                                        Inspect
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'coordinates' && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <div className="mb-12">
                                    <h2 className="font-display font-black text-4xl md:text-5xl text-clinical-ink mb-2 uppercase tracking-tight">Coordinates</h2>
                                    <p className="font-sans text-[10px] text-clinical-ink/40 uppercase tracking-widest">Manage Shipping Locations</p>
                                </div>

                                <div className="mb-12 space-y-4">
                                    <h3 className="font-display font-medium text-xl text-clinical-ink mb-6">Saved Locations</h3>
                                    {user && user.addresses && user.addresses.length > 0 ? (
                                        user.addresses.map((addr: ShippingAddress, index: number) => (
                                            <div key={index} className="bg-white/40 border border-clinical-ink/5 p-6 rounded-2xl flex justify-between items-center hover:border-accent-bronze/30 transition-all group">
                                                <div>
                                                    <p className="font-display font-bold text-clinical-ink">{addr.address}</p>
                                                    <p className="font-sans text-xs text-clinical-ink/60">{addr.city}, {addr.postalCode}</p>
                                                    <p className="font-sans text-[10px] text-clinical-ink/40 uppercase tracking-widest mt-1">{addr.country}</p>
                                                </div>
                                                <button
                                                    onClick={async () => {
                                                        const newAddresses = (user?.addresses || []).filter((_: ShippingAddress, i: number) => i !== index);
                                                        try {
                                                            const { data } = await api.put('/api/users/profile/address', { addresses: newAddresses });
                                                            updateProfile(data);
                                                            setSuccessTitle('Coordinates Updated');
                                                            setSuccessMessage('Location Removed.');
                                                            setIsSuccessModalOpen(true);
                                                        } catch (err: unknown) {
                                                            setMessage('Failed to remove location: ' + getErrorMessage(err));
                                                        }
                                                    }}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-clinical-ink/10 text-clinical-ink/40 hover:text-red-600 hover:border-red-600/30 transition-colors"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="font-sans text-sm text-clinical-ink/40 italic">No saved coordinates.</p>
                                    )}
                                </div>

                                <div className="border-t border-clinical-ink/10 pt-12">
                                    <h3 className="font-display font-medium text-xl text-clinical-ink mb-8">Add New Coordinates</h3>
                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        const newAddress = { address, city, postalCode, country, isDefault: (user?.addresses || []).length === 0 };
                                        const updatedAddresses = [...(user?.addresses || []), newAddress];

                                        try {
                                            const { data } = await api.put('/api/users/profile/address', { addresses: updatedAddresses });
                                            updateProfile(data);
                                            setSuccessTitle('Coordinates Synced');
                                            setSuccessMessage('New shipping location securely recorded.');
                                            setIsSuccessModalOpen(true);

                                            if ((user?.addresses || []).length === 0) {
                                                saveShippingAddress(newAddress as ShippingAddress);
                                            }

                                            setAddress('');
                                            setCity('');
                                            setPostalCode('');
                                            setCountry('');
                                        } catch (err: unknown) {
                                            setMessage('Sync Failed: ' + getErrorMessage(err));
                                        }
                                    }} className="space-y-8 max-w-lg">
                                        <div className="aesop-input-group">
                                            <input
                                                type="text"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="aesop-input peer placeholder-transparent"
                                                placeholder="Street Address"
                                                required
                                                id="address"
                                            />
                                            <label htmlFor="address">Street Address</label>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="aesop-input-group">
                                                <input
                                                    type="text"
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    className="aesop-input peer placeholder-transparent"
                                                    placeholder="City"
                                                    required
                                                    id="city"
                                                />
                                                <label htmlFor="city">City</label>
                                            </div>
                                            <div className="aesop-input-group">
                                                <input
                                                    type="text"
                                                    value={postalCode}
                                                    onChange={(e) => setPostalCode(e.target.value)}
                                                    className="aesop-input peer placeholder-transparent"
                                                    placeholder="Postal Code"
                                                    required
                                                    id="postalCode"
                                                />
                                                <label htmlFor="postalCode">Postal Code</label>
                                            </div>
                                        </div>

                                        <div className="aesop-input-group">
                                            <input
                                                type="text"
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                className="aesop-input peer placeholder-transparent"
                                                placeholder="Country"
                                                required
                                                id="country"
                                            />
                                            <label htmlFor="country">Country</label>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-5 bg-clinical-ink text-white font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-all duration-500 rounded-full"
                                        >
                                            Add To Dossier
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'wishlist' && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <div className="mb-12">
                                    <h2 className="font-display font-black text-4xl md:text-5xl text-clinical-ink mb-2 uppercase tracking-tight">Tactical Reserve</h2>
                                    <p className="font-sans text-[10px] text-clinical-ink/40 uppercase tracking-widest">Secured Assets</p>
                                </div>
                                <WishlistGrid />
                            </motion.div>
                        )}

                        {activeTab === 'reviews' && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <div className="mb-12">
                                    <h2 className="font-display font-black text-4xl md:text-5xl text-clinical-ink mb-2 uppercase tracking-tight">Field Reports</h2>
                                    <p className="font-sans text-[10px] text-clinical-ink/40 uppercase tracking-widest">Submitted Intelligence</p>
                                </div>

                                {loadingReviews ? (
                                    <div className="font-mono text-xs text-clinical-ink/40 animate-pulse">Retrieving Intelligence...</div>
                                ) : reviews.length === 0 ? (
                                    <div className="p-12 border border-clinical-ink/10 rounded-3xl text-center">
                                        <p className="font-sans text-lg text-clinical-ink/60 italic mb-6">No field reports submitted yet.</p>
                                        <Link href="/shop" className="inline-block bg-clinical-ink text-white font-mono text-xs uppercase tracking-widest rounded-full hover:bg-opacity-90 transition-colors">
                                            Submit Intelligence
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {reviews.map((review) => (
                                            <div key={review._id} className="bg-white border border-clinical-ink/10 p-6 rounded-2xl">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-clinical-ink/5">
                                                        <img src={review.productImage} alt={review.productName} className="w-full h-full object-cover mix-blend-multiply" />
                                                    </div>
                                                    <div>
                                                        <Link href={`/product/${review.productId}`} className="font-display font-bold text-lg text-clinical-ink hover:text-accent-bronze transition-colors block leading-none mb-1">
                                                            {review.productName}
                                                        </Link>
                                                        <div className="flex text-accent-bronze text-[10px]">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span key={i} className={i < review.rating ? 'opacity-100' : 'opacity-20'}>★</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="font-sans text-sm text-clinical-ink/70 italic leading-relaxed">
                                                    "{review.comment}"
                                                </p>
                                                <span className="block mt-4 text-[10px] font-mono text-clinical-ink/30 uppercase tracking-widest">
                                                    {review.createdAt.substring(0, 10)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
            <AlertModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                title={successTitle}
                message={successMessage}
                type="success"
                actionLabel="Proceed"
                onAction={() => setIsSuccessModalOpen(false)}
            />
        </div>
    );
};

export default ProfilePage;
