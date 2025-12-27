import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import Meta from '../components/Meta';

const AboutPage = () => {
    return (
        <div className="bg-clinical-canvas min-h-screen text-clinical-ink pt-32 pb-24">
            <Meta title="Philosophy | Olive Edge" description="The intersection of discipline and design. Learn about the Olive Edge mission." />
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60 mb-4 block">
                        Our Philosophy
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-8xl lg:text-heading-main leading-[0.9] mb-8 uppercase tracking-tight">
                        Precision. Purpose. <br /> The New Standard.
                    </h1>
                </motion.div>

                {/* Content Section 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="font-display font-black text-4xl md:text-6xl lg:text-heading-sub mb-6 uppercase tracking-tight">Our Story</h2>
                        <p className="font-sans text-sm md:text-base leading-relaxed text-clinical-ink/80 mb-6">
                            Olive Edge was founded on a singular premise: that tactical functionality need not sacrifice aesthetic restraint.
                            Born from the rigour of military specifications and refined by the principles of minimalist design,
                            we create equipment that performs in the field and keeps its composure in the city.
                        </p>
                        <p className="font-sans text-sm md:text-base leading-relaxed text-clinical-ink/80">
                            We believe in the quiet confidence of capability. Our gear does not shout; it endures.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-full min-h-[500px] relative overflow-hidden rounded-3xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1200&auto=format&fit=crop"
                            alt="Field Test"
                            className="absolute inset-0 w-full h-full object-cover filter grayscale-[20%]"
                        />
                        <div className="absolute bottom-6 left-6 text-white/60 font-mono text-xs uppercase tracking-widest">
                            Fig. 01 / North Sector Deployment
                        </div>
                    </motion.div>
                </div>

                {/* Content Section 2 (Wide Text) */}
                <div className="mb-24 text-center max-w-4xl mx-auto">
                    <h2 className="font-display font-black text-4xl md:text-heading-sub mb-8 uppercase tracking-tight">Fabrication Integrity</h2>
                    <p className="font-sans text-lg italic leading-relaxed text-clinical-ink/70">
                        "We select materials for resilience. Every stitch is a deliberate decision; every pocket a calculated geometric necessity."
                    </p>
                </div>

                {/* Content Section 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/10 pt-16">
                    <div>
                        <h3 className="font-display font-medium text-xl mb-4">Operational Clarity</h3>
                        <p className="font-sans text-sm leading-relaxed text-clinical-ink/60">
                            Stripping away the superfluous to reveal the essential. Our design language is rooted in clarity and purpose.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-display font-medium text-xl mb-4">Organic Resilience</h3>
                        <p className="font-sans text-sm leading-relaxed text-clinical-ink/60">
                            Adapted for the human form in motion. Gear that moves with you, indistinguishable from the operator.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-display font-medium text-xl mb-4">Service Lineage</h3>
                        <p className="font-sans text-sm leading-relaxed text-clinical-ink/60">
                            Respecting the lineage of service while pushing the boundaries of modern textile engineering.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
