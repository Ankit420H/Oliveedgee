import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface MegaMenuProps {
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const MegaMenu = ({ isOpen, onMouseEnter, onMouseLeave }: MegaMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    className="absolute top-full mt-2 left-4 right-4 mx-auto max-w-[1400px] bg-clinical-canvas border border-clinical-ink/10 z-40 shadow-2xl rounded-3xl"
                >
                    <div className="container mx-auto px-10 py-12">
                        <div className="grid grid-cols-4 gap-12">
                            {/* Column 1 */}
                            <div>
                                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink mb-6">
                                    Categories
                                </h3>
                                <ul className="space-y-4">
                                    <li><Link href="/shop?category=new" className="font-sans text-sm uppercase tracking-widest text-clinical-ink hover:text-accent-bronze transition-colors">New Arrivals</Link></li>
                                    <li><Link href="/shop?category=apparel" className="font-sans text-sm uppercase tracking-widest text-clinical-ink hover:text-accent-bronze transition-colors">Apparel</Link></li>
                                    <li><Link href="/shop?category=footwear" className="font-sans text-sm uppercase tracking-widest text-clinical-ink hover:text-accent-bronze transition-colors">Footwear</Link></li>
                                    <li><Link href="/shop?category=accessories" className="font-sans text-sm uppercase tracking-widest text-clinical-ink hover:text-accent-bronze transition-colors">Accessories</Link></li>
                                </ul>
                            </div>

                            {/* Column 2 */}
                            <div>
                                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/40 mb-6">
                                    Collections
                                </h3>
                                <ul className="space-y-4">
                                    <li><Link href="/shop?collection=modern-uniform" className="font-sans text-sm uppercase tracking-widest text-clinical-ink hover:text-accent-bronze transition-colors">The Modern Uniform</Link></li>
                                    <li><Link href="/shop?collection=performance" className="font-sans text-sm uppercase tracking-widest text-clinical-ink hover:text-accent-bronze transition-colors">Performance</Link></li>
                                    <li><Link href="/shop?collection=tech-formal" className="font-sans text-sm uppercase tracking-widest text-clinical-ink hover:text-accent-bronze transition-colors">Tech-Formal</Link></li>
                                </ul>
                            </div>

                            {/* Column 3 - Featured Image */}
                            <div className="col-span-2 flex items-center gap-6">
                                <div className="flex-1 bg-gray-200 h-48 relative overflow-hidden group rounded-3xl">
                                    <img src="https://images.unsplash.com/photo-1542281286-9e0a56e2e224?q=80&w=800&auto=format&fit=crop" alt="Feature" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%]" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                        <span className="text-white font-serif text-2xl tracking-widest">WINTER OPS</span>
                                    </div>
                                </div>
                                <div className="flex-1 bg-gray-200 h-48 relative overflow-hidden group rounded-3xl">
                                    <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop" alt="Feature" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%]" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                        <span className="text-white font-serif text-2xl tracking-widest">ESSENTIAL GEAR</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MegaMenu;
