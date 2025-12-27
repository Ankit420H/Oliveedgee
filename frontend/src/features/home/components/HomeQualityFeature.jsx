import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaPlay } from 'react-icons/fa';

const HomeQualityFeature = () => {
    return (
        <section className="py-24 bg-white/50 border-t border-b border-clinical-ink/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">

                    {/* Text Side */}
                    <div className="flex-1">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-signal-success mb-4 block">
                            Premium Quality
                        </span>
                        <h2 className="font-display font-bold text-4xl md:text-6xl mb-8 leading-none tracking-tight text-clinical-ink">
                            Designed for<br />Comfort.
                        </h2>
                        <p className="font-sans text-base text-clinical-ink/60 leading-relaxed mb-8 max-w-md">
                            We use the finest materials to ensure durability and comfort. Our garments are designed to move with you through your daily life.
                        </p>
                        <ul className="space-y-4 font-mono text-xs uppercase tracking-wide text-clinical-ink">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-signal-success rounded-full"></span>
                                Premium Cotton Blend
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-signal-success rounded-full"></span>
                                Water Resistant
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-signal-success rounded-full"></span>
                                Perfect Fit
                            </li>
                        </ul>
                    </div>

                    {/* Visual Side (Right in Ref) - With 'Play' button */}
                    <div className="flex-1 w-full relative group cursor-pointer">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden relative shadow-lg">
                            {/* Placeholder for Video/Image */}
                            <div className="absolute inset-0 bg-gray-200">
                                <img src="/images/hero3.jpg" alt="Quality" className="w-full h-full object-cover" />
                            </div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="w-20 h-20 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-clinical-ink pl-1 shadow-2xl"
                                >
                                    <FaPlay size={24} />
                                </motion.button>
                            </div>
                        </div>
                        {/* Product overlay card from ref image (green box) */}
                        <div className="absolute -bottom-8 -left-8 bg-clinical-canvas p-6 shadow-xl border border-clinical-ink/5 max-w-xs hidden md:block rounded-3xl">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100"></div>
                                <div>
                                    <div className="font-bold text-sm">Olea-Shell™ v2</div>
                                    <div className="text-xs opacity-50">3-Layer Gore-Tex Pro</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeQualityFeature;
