import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTimes, FaHome, FaShoppingBag, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const MobileMenu = ({ isOpen, onClose, user, logout }) => {
    const { t } = useTranslation();

    const menuVariants = {
        closed: {
            x: "100%",
            transition: {
                type: "tween",
                duration: 0.4,
                ease: "easeInOut"
            }
        },
        open: {
            x: "0%",
            transition: {
                type: "tween",
                duration: 0.4,
                ease: "easeInOut"
            }
        }
    };

    const links = [
        { to: "/", label: t('header.home'), icon: <FaHome /> },
        { to: "/shop", label: t('header.shop'), icon: <FaShoppingBag /> },
        ...(user ? [
            { to: "/profile", label: "Account", icon: <FaUser /> },
        ] : [
            { to: "/login", label: t('header.login'), icon: <FaSignInAlt /> }
        ])
    ];

    if (user && user.isAdmin) {
        links.splice(2, 0, { to: "/admin/dashboard", label: "Admin", icon: <FaUser /> });
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[1001] md:hidden"
                    />

                    {/* Menu Panel */}
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-clinical-canvas border-l border-clinical-ink/10 z-[1002] p-8 shadow-2xl md:hidden flex flex-col rounded-l-3xl"
                    >
                        <div className="flex justify-between items-center mb-16">
                            <span className="font-serif text-2xl text-clinical-ink">
                                Menu
                            </span>
                            <button onClick={onClose} className="text-clinical-ink hover:opacity-50 transition-opacity">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-8 flex-1">
                            {links.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={onClose}
                                    className="font-display font-bold text-4xl text-clinical-ink hover:text-accent-bronze transition-colors uppercase tracking-tight"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {user && (
                                <button
                                    onClick={() => { logout(); onClose(); }}
                                    className="font-display font-bold text-4xl text-clinical-ink/40 hover:text-red-800 text-left mt-8 uppercase tracking-tight"
                                >
                                    Log Out
                                </button>
                            )}
                        </div>

                        <div className="mt-auto pt-8 border-t border-black">
                            <span className="block font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink">
                                Olive Edge
                            </span>
                            <span className="text-sm text-clinical-ink/60">
                                © 2024
                            </span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
