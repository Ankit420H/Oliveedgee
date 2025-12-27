import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Link } from "react-router-dom";

const GalleryScroll = ({ products }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Transform vertical scroll to horizontal movement
    // We want to scroll significantly far: -100% of the container width roughly
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-clinical-canvas">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* The Title Block */}
                <div className="absolute top-12 left-12 z-20 mix-blend-difference text-white pointer-events-none">
                    <span className="font-sans text-xs uppercase tracking-widest block mb-2">Collection 2025</span>
                    <h2 className="font-serif text-4xl">The Gallery</h2>
                </div>

                <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24 items-center h-full will-change-transform">

                    {/* Intro spacer */}
                    <div className="min-w-[50vw] md:min-w-[30vw] shrink-0 flex items-center justify-center">
                        <p className="font-serif text-3xl md:text-5xl text-clinical-ink max-w-sm leading-tight">
                            Artifacts of resilience, designed for the future.
                        </p>
                    </div>

                    {/* Product Cards "Portraits" */}
                    {products.map((product) => (
                        <div key={product._id} className="relative w-[30vw] md:w-[25vw] min-w-[300px] h-[70vh] shrink-0 group">
                            <Link to={`/product/${product._id}`} className="block w-full h-full relative overflow-hidden bg-clinical-bone">
                                <motion.img
                                    layoutId={`product-image-${product._id}`}
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-8 transition-transform duration-1000 group-hover:scale-110 mix-blend-multiply filter grayscale-[0.2] group-hover:grayscale-0"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-start">
                                    <span className="font-mono text-[10px] text-clinical-ink/50 mb-2">{product.category}</span>
                                    <h3 className="font-serif text-2xl text-clinical-ink leading-none">{product.name}</h3>
                                    <span className="font-sans text-xs mt-2">₹ {product.price}</span>
                                </div>
                            </Link>
                        </div>
                    ))}

                    {/* Outro */}
                    <div className="min-w-[50vw] md:min-w-[30vw] shrink-0 flex items-center justify-center">
                        <Link to="/shop" className="group flex items-center gap-4">
                            <span className="font-serif text-4xl md:text-6xl text-clinical-ink group-hover:italic transition-all">
                                View All
                            </span>
                            <span className="text-xl group-hover:translate-x-4 transition-transform duration-500">→</span>
                        </Link>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default GalleryScroll;
