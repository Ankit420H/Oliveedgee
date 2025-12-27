import { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Helmet } from 'react-helmet-async';
import AlertModal from '../components/ui/AlertModal';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const redirect = new URLSearchParams(location.search).get('redirect') || '/';

    useEffect(() => {
        if (user && !isModalOpen) {
            navigate(redirect);
        }
    }, [navigate, user, redirect, isModalOpen]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage(null);
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                await register(name, email, password);
                // TRIGGER MODAL INSTEAD OF NAVIGATE
                setIsModalOpen(true);
            } catch (error) {
                setMessage(error.response && error.response.data.message ? error.response.data.message : error.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-clinical-canvas flex flex-col md:flex-row">
            <Helmet>
                <title>Join Us | Olive Edge</title>
                <meta name="description" content="Create your identity and join the ecosystem." />
            </Helmet>

            <AlertModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    navigate(redirect);
                }}
                title="Identity Established"
                message="Your secure account has been created successfully. Welcome to the ecosystem."
                type="success"
                actionLabel="Access Interface"
            />

            {/* Left: The Gate Visual */}
            <div className="hidden md:block w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-clinical-ink/10 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1628148873641-a39cce54f395?q=80&w=2000&auto=format&fit=crop"
                    alt="Register Visual"
                    className="w-full h-full object-cover grayscale-[0.5] hover:scale-105 transition-transform duration-[2s] ease-in-out"
                />
                <div className="absolute bottom-12 left-12 z-20 text-white mix-blend-difference">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] block mb-2">Create Account</span>
                    <h2 className="font-display font-medium text-4xl">New Induction.</h2>
                </div>
            </div>

            {/* Right: The Interface */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-24 relative">
                <div className="w-full max-w-sm">

                    <div className="mb-12">
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-clinical-ink/40 mb-4 block">
                            Sign Up
                        </span>
                        <h1 className="font-display font-black text-5xl md:text-8xl lg:text-heading-main text-clinical-ink uppercase leading-[0.9]">
                            Create Identity
                        </h1>
                    </div>

                    {message && (
                        <div className="mb-8 p-0 text-red-800 text-xs font-sans text-center">
                            {message}
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="space-y-8">
                        {/* Name */}
                        <div className="aesop-input-group">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="aesop-input"
                                placeholder="Full Name"
                                id="name"
                            />
                            <label htmlFor="name">Full Name</label>
                        </div>

                        {/* Email */}
                        <div className="aesop-input-group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="aesop-input"
                                placeholder="Email Address"
                                id="email"
                            />
                            <label htmlFor="email">Security ID (Email)</label>
                        </div>

                        {/* Password */}
                        <div className="aesop-input-group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="aesop-input"
                                placeholder="Password"
                                id="password"
                            />
                            <label htmlFor="password">Passcode</label>
                        </div>

                        {/* Confirm Password */}
                        <div className="aesop-input-group">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="aesop-input"
                                placeholder="Confirm Password"
                                id="confirmPassword"
                            />
                            <label htmlFor="confirmPassword">Confirm Passcode</label>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-5 bg-accent-bronze text-white font-sans text-xs uppercase tracking-[0.2em] hover:bg-clinical-ink transition-all duration-500 mt-8 rounded-3xl"
                        >
                            Establish Identity
                        </motion.button>
                    </form>

                    <div className="mt-12 text-center">
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-[10px] font-sans uppercase tracking-widest text-clinical-ink/50 hover:text-clinical-ink transition-colors">
                            Access Existing Interface
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
