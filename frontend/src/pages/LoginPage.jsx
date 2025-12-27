import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaExclamationCircle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import AlertModal from '../components/ui/AlertModal';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); // Granular error state
    const [authError, setAuthError] = useState(null); // Auth error state

    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertConfig, setAlertConfig] = useState({});

    const redirect = new URLSearchParams(location.search).get('redirect') || '/';

    useEffect(() => {
        if (user) {
            navigate(user.isAdmin ? '/admin/dashboard' : redirect);
        }
    }, [navigate, user, redirect]);

    // Check for session expired param
    useEffect(() => {
        const reason = searchParams.get('reason');
        if (reason === 'session_expired') {
            setTimeout(() => {
                setAlertConfig({
                    title: 'Session Terminated',
                    message: 'Your authenticated session has expired (Validity: 30d). Please re-establish connection.',
                    type: 'warning',
                    btnText: 'Proceed to Login'
                });
                setIsAlertOpen(true);
            }, 0);

            // Clean URL param
            searchParams.delete('reason');
            setSearchParams(searchParams);
        }
    }, [searchParams, setSearchParams]);

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Please enter your email address.';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'We need a valid email to reach you.';

        if (!password) newErrors.password = 'Password is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setAuthError(null); // Clear previous errors
        if (validate()) {
            try {
                const userData = await login(email, password);
                // Navigate immediately after successful login
                navigate(userData.isAdmin ? '/admin/dashboard' : redirect);
            } catch (error) {
                setAuthError(typeof error === 'string' ? error : error.message || 'Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-clinical-canvas flex flex-col md:flex-row">
            <Helmet>
                <title>Login | Olive Edge</title>
                <meta name="description" content="Access your secure account." />
            </Helmet>

            <AlertModal
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                actionLabel={alertConfig.btnText}
            />

            {/* Left: The Gate Visual */}
            <div className="hidden md:block w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-clinical-ink/10 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=2000&auto=format&fit=crop"
                    alt="Gate Visual"
                    className="w-full h-full object-cover grayscale-[0.5] hover:scale-105 transition-transform duration-[2s] ease-in-out"
                />
                <div className="absolute bottom-12 left-12 z-20 text-white mix-blend-difference">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] block mb-2">Login</span>
                    <h2 className="font-display font-medium text-4xl">The Gate.</h2>
                </div>
            </div>

            {/* Right: The Interface */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-24 relative">
                <div className="w-full max-w-sm">

                    <div className="mb-16">
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-clinical-ink/40 mb-4 block">
                            Identity Verification
                        </span>
                        <h1 className="font-display font-black text-5xl md:text-8xl lg:text-heading-main text-clinical-ink uppercase leading-[0.9]">
                            Create Identity
                        </h1>
                    </div>

                    {authError && (
                        <div className="mb-8 p-0 text-red-800 text-xs font-sans flex items-center gap-2">
                            <FaExclamationCircle />
                            {authError}
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="space-y-12">
                        {/* Email */}
                        <div className="aesop-input-group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors({ ...errors, email: null });
                                }}
                                className={`aesop-input ${errors.email ? 'error' : ''}`}
                                placeholder="Email Address"
                                id="email"
                            />
                            <label htmlFor="email">Security ID (Email)</label>
                            <AnimatePresence>
                                {errors.email && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        className="aesop-error-msg"
                                    >
                                        <FaExclamationCircle /> {errors.email}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Password */}
                        <div className="aesop-input-group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors({ ...errors, password: null });
                                }}
                                className={`aesop-input ${errors.password ? 'error' : ''}`}
                                placeholder="Password"
                                id="password"
                            />
                            <label htmlFor="password">Passcode</label>
                            {/* Reset Password Link */}
                            <Link to="/contact" className="absolute right-0 top-4 text-[10px] uppercase tracking-widest text-clinical-ink/40 hover:text-clinical-ink transition-colors">
                                Reset
                            </Link>
                            <AnimatePresence>
                                {errors.password && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        className="aesop-error-msg"
                                    >
                                        <FaExclamationCircle /> {errors.password}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-5 bg-accent-bronze text-white font-sans text-xs uppercase tracking-[0.2em] hover:bg-clinical-ink transition-all duration-500 mt-8 rounded-3xl"
                        >
                            Establish Connection
                        </motion.button>
                    </form>

                    <div className="mt-12 text-center">
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-[10px] font-sans uppercase tracking-widest text-clinical-ink/50 hover:text-clinical-ink transition-colors">
                            Initialize New Identity
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
