'use client';

import { useState, useContext, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthContext, AuthContextType } from '../../features/auth';
import { motion } from 'framer-motion';
// import { Helmet } from 'react-helmet-async';
import AlertModal from '../../components/ui/AlertModal';
import { getErrorMessage } from '../../lib/error-utils';

const RegisterContent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, user } = useContext(AuthContext) as AuthContextType;
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    useEffect(() => {
        if (user) {
            router.push(redirect);
        }
    }, [router, user, redirect]);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                await register(name, email, password);
                // TRIGGER MODAL INSTEAD OF NAVIGATE
                setIsModalOpen(true);
            } catch (err: unknown) {
                setMessage(getErrorMessage(err));
            }
        }
    };

    return (
        <div className="min-h-screen bg-clinical-canvas flex flex-col md:flex-row">

            <AlertModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    router.push(redirect);
                }}
                title="Identity Established"
                message="Your secure account has been created successfully. Welcome to the ecosystem."
                type="success"
                actionLabel="Access Interface"
                onAction={() => router.push(redirect)}
            />

            {/* Left Column: Visual/Aesthetics */}
            <div className="hidden md:flex md:w-1/2 bg-clinical-ink relative overflow-hidden items-center justify-center p-20">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="/images/ui-auth-register.jpg"
                        alt="Texture"
                        className="w-full h-full object-cover grayscale"
                    />
                </div>
                <div className="relative z-10 text-white max-w-md">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-bronze mb-6 block"
                    >
                        Olive Edge Membership
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-display font-black text-6xl uppercase leading-none mb-8"
                    >
                        Refined <br />Commerce.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="font-sans text-sm text-white/60 leading-relaxed mb-12"
                    >
                        Enroll in our exclusive network for bespoke skin care, prioritizing efficacy and aesthetic rigor.
                    </motion.p>
                </div>
            </div>

            {/* Right Column: Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-24 bg-clinical-canvas pt-32 md:pt-24">
                <div className="w-full max-w-sm">
                    <div className="mb-12">
                        <Link href="/" className="inline-block mb-12">
                            <span className="font-display font-black text-2xl uppercase tracking-tighter text-clinical-ink">Olive Edge</span>
                        </Link>
                        <h1 className="font-display font-black text-4xl text-clinical-ink uppercase leading-none mb-4">Establish ID</h1>
                        <p className="font-sans text-xs text-clinical-ink/40 uppercase tracking-widest">Register for access</p>
                    </div>

                    {message && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-8 p-4 bg-signal-error/10 border border-signal-error/20 text-signal-error rounded-2xl text-[10px] uppercase tracking-widest text-center"
                        >
                            {message}
                        </motion.div>
                    )}

                    <form onSubmit={submitHandler} className="space-y-8">
                        <div className="aesop-input-group">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
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
                                required
                                className="aesop-input peer placeholder-transparent"
                                placeholder="Email Address"
                                id="email"
                            />
                            <label htmlFor="email">Email Address</label>
                        </div>

                        <div className="aesop-input-group relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="aesop-input peer placeholder-transparent"
                                placeholder="Password"
                                id="password"
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        <div className="aesop-input-group relative">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="aesop-input peer placeholder-transparent"
                                placeholder="Confirm Password"
                                id="confirmPassword"
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 bg-clinical-ink text-white font-sans text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all duration-500 rounded-full shadow-xl"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-clinical-ink/5">
                        <p className="font-sans text-xs text-clinical-ink/40">
                            Already authenticated?{' '}
                            <Link
                                href={redirect ? `/login?redirect=${redirect}` : '/login'}
                                className="text-clinical-ink font-bold hover:underline underline-offset-4"
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RegisterPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-clinical-canvas flex items-center justify-center">
                <span className="font-sans text-xs uppercase tracking-widest text-clinical-ink/60 animate-pulse">Initializing Security Protocol...</span>
            </div>
        }>
            <RegisterContent />
        </Suspense>
    );
};

export default RegisterPage;
