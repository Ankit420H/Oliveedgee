import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
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
                        className="fixed inset-0 bg-clinical-ink/20 backdrop-blur-sm z-50 transition-colors"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            className="bg-clinical-canvas border border-clinical-ink/10 shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-md pointer-events-auto relative overflow-hidden"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M32 0V64" stroke="currentColor" strokeWidth="1" />
                                    <path d="M0 32H64" stroke="currentColor" strokeWidth="1" />
                                    <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1" />
                                </svg>
                            </div>

                            <h3 className="font-display font-black text-2xl md:text-3xl text-clinical-ink mb-4 uppercase leading-[0.9]">
                                {title}
                            </h3>
                            <p className="font-sans text-sm text-clinical-ink/60 mb-10 leading-relaxed">
                                {message}
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-4 border border-clinical-ink/10 text-clinical-ink/60 font-sans text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-clinical-ink/5 hover:text-clinical-ink transition-all rounded-full"
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="flex-1 py-4 bg-red-800 text-white font-sans text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-red-900 transition-all rounded-full"
                                >
                                    Confirm
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
