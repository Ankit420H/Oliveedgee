import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import api from '../../lib/api';
import { toast } from 'react-toastify';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            await api.post('/api/subscribers', { email });
            setStatus('success');
            toast.success('Welcome to the Inner Circle.');
            setEmail('');
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || 'Subscription failed.';
            toast.error(msg);
            setStatus('idle');
        }
    };

    return (
        <div className="bg-clinical-canvas pb-6 px-container-sm md:px-container-md lg:px-container-lg">
            <footer className="bg-clinical-ink text-clinical-canvas pt-32 pb-12 relative overflow-hidden rounded-3xl z-10 mx-auto w-full">
                <div className="mx-auto px-container-sm md:px-container-md lg:px-container-lg relative z-10">

                    {/* 1. Massive Call to Action / Brand */}
                    <div className="border-b border-white/10 pb-20 mb-20">
                        <h2 className="font-display font-black text-[15vw] leading-[0.75] text-white opacity-20 uppercase select-none pointer-events-none">
                            Olive Edge
                        </h2>
                    </div>

                    {/* 2. The Pillars: Minimal Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 font-sans text-sm font-medium tracking-wide">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-6">
                            <span className="text-xs uppercase tracking-widest text-gray-400 mb-2">Exploration</span>
                            <Link to="/shop" className="hover:text-white/70 transition-colors">Shop All</Link>
                            <Link to="/about" className="hover:text-white/70 transition-colors">Philosophy</Link>
                            <Link to="/journal" className="hover:text-white/70 transition-colors">Journal</Link>
                            <Link to="/stores" className="hover:text-white/70 transition-colors">Locations</Link>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-6">
                            <span className="text-xs uppercase tracking-widest text-gray-400 mb-2">Support</span>
                            <Link to="/profile" className="hover:text-white/70 transition-colors">My Personnel File</Link>
                            <Link to="/contact" className="hover:text-white/70 transition-colors">Contact Ops</Link>
                            <Link to="/faq" className="hover:text-white/70 transition-colors">FAQs</Link>
                            <Link to="/delivery" className="hover:text-white/70 transition-colors">Shipping Protocols</Link>
                        </div>

                        {/* Column 3 */}
                        <div className="flex flex-col gap-6">
                            <span className="text-xs uppercase tracking-widest text-gray-400 mb-2">Legal</span>
                            <Link to="/privacy" className="hover:text-white/70 transition-colors">Privacy Directive</Link>
                            <Link to="/terms" className="hover:text-white/70 transition-colors">Terms of Engagement</Link>
                            <Link to="/accessibility" className="hover:text-white/70 transition-colors">Accessibility</Link>
                        </div>

                        {/* Column 4: Newsletter (Minimal) */}
                        <div className="flex flex-col gap-6">
                            <span className="text-xs uppercase tracking-widest text-gray-400 mb-2">Newsletter</span>
                            <p className="opacity-50 text-xs leading-relaxed max-w-xs mb-4">
                                Join our community for exclusive access to new drops and events.
                            </p>
                            {status === 'success' ? (
                                <div className="text-accent-moss flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                    <FaCheck /> Subscribed
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-white/20 focus-within:border-accent-bronze transition-colors duration-500 pb-2">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-transparent border-none text-white placeholder-white/30 font-sans text-sm py-2 focus:ring-0 outline-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        aria-label="Subscribe"
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors disabled:opacity-50"
                                    >
                                        <FaArrowRight size={12} />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* 3. Base */}
                    <div className="mt-32 flex flex-col md:flex-row justify-between items-center md:items-end text-[10px] uppercase tracking-widest opacity-30 gap-6">
                        <span>© 2025 Olive Edge Inc.</span>
                        <span>Designed for Modern Living.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
