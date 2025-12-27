import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion'; // eslint-disable-line no-unused-vars

const Fabrication = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [0, 1, 1, 0]);

    const specs = [
        { label: "Seams", value: "Ultrasonic Welded / 13mm Tape" },
        { label: "Zippers", value: "YKK AquaGuard® VISLON®" },
        { label: "Insulation", value: "800-Fill Goose Down" },
        { label: "Rating", value: "-10°C to +15°C" }
    ];

    return (
        <motion.section ref={targetRef} style={{ y, opacity }} className="relative py-32 bg-clinical-canvas text-clinical-ink overflow-hidden">

            {/* Background Texture (Abstract) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Section 1: Materials Lab */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
                    <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-signal-success mb-4 block">
                            01 / Materials Lab
                        </span>
                        <h2 className="font-sans font-black text-5xl md:text-7xl mb-8 tracking-tighter uppercase leading-none">
                            Engineered<br />Ecosystems
                        </h2>
                        <p className="font-sans text-base leading-relaxed max-w-md opacity-80 mb-8 border-l-2 border-signal-success pl-6">
                            We do not choose fabrics; we engineer ecosystems. Our proprietary <span className="font-bold">Olea-Tex™</span> membrane combines high-denier ballistic nylon with breathable organic cotton substrates. Hydrophobic, oleophobic, and silent in motion.
                        </p>
                    </div>
                    <div className="relative h-[60vh] bg-clinical-ink/5 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-signal-success/20 to-transparent mix-blend-multiply"></div>
                        {/* Placeholder for Macro Fabric Shot */}
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="font-mono text-xs uppercase tracking-widest opacity-30">[Macro_Texture_View]</span>
                        </div>
                    </div>
                </div>

                {/* Section 2: Technical Specs (Grid) */}
                <div className="border-t border-clinical-border pt-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-signal-success mb-4 block">
                                02 / Schematics
                            </span>
                            <h3 className="font-sans font-bold text-2xl uppercase tracking-tight mb-2">Technical<br />Specifications</h3>
                        </div>

                        {specs.map((spec, i) => (
                            <div key={i} className="border-l border-clinical-border pl-6 py-2 group hover:border-signal-success transition-colors duration-500">
                                <span className="block font-mono text-[10px] uppercase tracking-widest opacity-50 mb-1">{spec.label}</span>
                                <span className="block font-sans text-lg font-bold uppercase tracking-wide group-hover:text-signal-success transition-colors duration-300">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 3: The Silhouette (Architectural Fit) */}
                <div className="mt-40 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-7">
                        <div className="w-full h-[50vh] bg-gray-200 grayscale relative overflow-hidden">
                            {/* Placeholder for Silhouette shot */}
                            <img src="/images/hero5.jpg" alt="Silhouette" className="w-full h-full object-cover mix-blend-multiply opacity-50" />
                        </div>
                    </div>
                    <div className="lg:col-span-5 pb-12">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-signal-success mb-4 block">
                            03 / Form Factor
                        </span>
                        <h2 className="font-sans font-black text-4xl mb-6 tracking-tight uppercase">
                            Architectural Fit
                        </h2>
                        <p className="font-sans text-sm leading-7 opacity-70">
                            Cut for the kinetic human form. Articulated joints, dropped rear hems, and gusseted underarms allow for unrestricted movement without compromising the stark, columnar silhouette. It is armor that breathes.
                        </p>
                    </div>
                </div>

            </div>
        </motion.section>
    );
};

export default Fabrication;
