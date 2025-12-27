import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-clinical-canvas flex flex-col items-center justify-center text-center px-6">
            <Helmet>
                <title>404 Not Found | Olive Edge</title>
                <meta name="description" content="Page not found." />
            </Helmet>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
            >
                <h1 className="font-display font-black text-9xl text-clinical-ink/10">404</h1>

                <div className="space-y-4">
                    <h2 className="font-display font-medium text-2xl text-clinical-ink uppercase tracking-wide">
                        Coordinates Unknown
                    </h2>
                    <p className="font-sans text-clinical-ink/60 text-sm max-w-md mx-auto leading-relaxed">
                        The page you are looking for does not exist or has been moved.
                        Please return to the main console.
                    </p>
                </div>

                <div className="pt-8">
                    <Link
                        to="/"
                        className="inline-block px-8 py-4 bg-clinical-ink text-white font-sans text-xs uppercase tracking-[0.2em] hover:bg-black transition-all duration-500 rounded-full shadow-lg"
                    >
                        Return Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
