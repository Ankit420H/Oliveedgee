import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaTimes } from 'react-icons/fa';

const SizeGuideModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-clinical-ink/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-4xl bg-clinical-canvas border border-clinical-border shadow-2xl p-12 overflow-hidden rounded-3xl"
                    >
                        <button onClick={onClose} className="absolute top-6 right-6 text-clinical-ink hover:opacity-50 transition-opacity">
                            <FaTimes size={20} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Technical Drawing */}
                            <div className="border border-clinical-border bg-white p-8 flex items-center justify-center relative rounded-3xl">
                                <span className="absolute top-2 left-2 text-[8px] font-mono tracking-widest opacity-50">FIG 01.0 // SCHEMATIC</span>
                                {/* Placeholder for Tech Drawing */}
                                <div className="w-full h-64 border-2 border-dashed border-clinical-border opacity-20 flex items-center justify-center">
                                    [Schematic_View]
                                </div>
                            </div>

                            {/* Data Table */}
                            <div>
                                <h3 className="font-sans font-bold text-2xl uppercase mb-8">Measurement<br />Matrix</h3>
                                <div className="font-mono text-xs space-y-4">
                                    <div className="grid grid-cols-5 border-b border-clinical-ink/10 pb-2 opacity-50">
                                        <span>SIZE</span>
                                        <span>CHEST</span>
                                        <span>SLV</span>
                                        <span>LEN</span>
                                        <span>SHLZ</span>
                                    </div>
                                    {['XS', 'S', 'M', 'L', 'XL'].map((s, i) => (
                                        <div key={s} className="grid grid-cols-5 border-b border-clinical-ink/5 pb-2">
                                            <span className="font-bold">{s}</span>
                                            <span>{90 + i * 4}</span>
                                            <span>{60 + i * 1}</span>
                                            <span>{70 + i * 2}</span>
                                            <span>{42 + i * 1}</span>
                                        </div>
                                    ))}
                                    <div className="pt-4 text-clinical-ink/40 text-[10px]">
                                        * All measurements in CM. Tolerance +/- 0.5cm.
                                    </div>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SizeGuideModal;
