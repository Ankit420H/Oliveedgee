'use client';

import { useState } from 'react';
import { FaInstagram, FaTwitter, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import api from '../../../lib/api';
import { getErrorMessage } from '../../../lib/error-utils';

const HomeNewsletter = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        try {
            await api.post('/api/subscribers', { email });
            setMessage('Uplink Established. Welcome to the network.');
            setEmail('');
            setLoading(false);
        } catch (err: unknown) {
            setMessage(getErrorMessage(err));
            setLoading(false);
        }
    };

    return (
        <section className="bg-clinical-canvas px-container-sm md:px-container-md lg:px-container-lg pb-32">
            <div className="bg-clinical-ink text-clinical-canvas rounded-[2.5rem] p-8 md:p-16 lg:p-20 overflow-hidden relative shadow-2xl">

                {/* Abstract Background Blur */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-sage/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* Left: Content & Form */}
                    <div className="lg:col-span-7 flex flex-col justify-between h-full">
                        <div className="mb-8 md:mb-12">
                            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.85] tracking-tight mb-4 md:mb-8 text-clinical-canvas/30">
                                Intelligence<br />Briefing
                            </h2>
                            <p className="font-sans text-sm md:text-base text-clinical-canvas/60 max-w-md leading-relaxed">
                                Join the network for classified updates, early access to new equipment drops, and mission-critical reports.
                            </p>
                        </div>

                        <form onSubmit={submitHandler} className="w-full max-w-lg relative group">
                            <div className="relative flex items-center border-b border-clinical-canvas/20 focus-within:border-accent-bronze transition-colors duration-500 pb-2">
                                <input
                                    type="email"
                                    placeholder="Enter encrypted comms ID"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent border-none text-clinical-canvas placeholder-clinical-canvas/30 font-sans text-sm md:text-base py-4 focus:ring-0 outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-clinical-canvas/80 hover:text-accent-bronze transition-colors flex items-center gap-2 group-focus-within:text-white disabled:opacity-50"
                                >
                                    {loading ? 'Simulating Uplink...' : <>Initiate Uplink <FaArrowRight size={10} /></>}
                                </button>
                            </div>
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-bronze group-focus-within:w-full transition-all duration-700 ease-out"></div>
                            {message && (
                                <p className={`mt-4 text-[10px] font-mono uppercase tracking-widest ${message.includes('Failed') ? 'text-signal-error' : 'text-signal-success'}`}>
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Right: Social & Navigation Structure */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full pt-4">
                        <div className="hidden lg:block w-px h-full bg-gradient-to-b from-clinical-canvas/10 via-clinical-canvas/5 to-transparent absolute left-[58%] top-0 bottom-0"></div>

                        <div className="space-y-12">
                            <div>
                                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-accent-sage mb-6">Social Connect</span>
                                <ul className="flex flex-col gap-4 font-display text-2xl md:text-3xl font-medium">
                                    <li>
                                        <a href="#" className="flex items-center justify-between group py-2 border-b border-clinical-canvas/5 hover:border-clinical-canvas/20 transition-all">
                                            <span>Instagram</span>
                                            <FaInstagram className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center justify-between group py-2 border-b border-clinical-canvas/5 hover:border-clinical-canvas/20 transition-all">
                                            <span>Twitter / X</span>
                                            <FaTwitter className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center justify-between group py-2 border-b border-clinical-canvas/5 hover:border-clinical-canvas/20 transition-all">
                                            <span>LinkedIn</span>
                                            <FaLinkedin className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm" />
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-8">
                                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-clinical-canvas/40 mb-4">Contact</span>
                                <a href="mailto:hello@oliveedge.com" className="font-sans text-sm text-clinical-canvas/80 hover:text-white transition-colors">
                                    hello@oliveedge.com
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeNewsletter;
