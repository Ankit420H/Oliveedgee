import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion"; // eslint-disable-line no-unused-vars

const HeritageScroll = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);

    const items = [
        {
            id: 1,
            title: "The Origin",
            subtitle: "Roots Deep in the Soil",
            text: "Our story begins not in a lab, but in the ancient looms of India. Where patience is a virtue and detail is a religion.",
            image: "/images/hero4.jpg",
        },
        {
            id: 2,
            title: "The Process",
            subtitle: "Precision Meets Soul",
            text: "We take the wisdom of the hand and apply the rigorous standards of the machine. A synthesis of eras.",
            image: "/images/cargo_camo.jpg",
        },
        {
            id: 3,
            title: "The Ethereal",
            subtitle: "Beyond the Physical",
            text: "The final form is barely there. A garment that feels like a second skin, protecting the spirit within.",
            image: "/images/oe3.jpg",
        },
    ];

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-clinical-canvas">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-24 px-24">

                    {/* Intro Text */}
                    <div className="min-w-[50vw] flex flex-col justify-center">
                        <h2 className="font-serif text-6xl md:text-8xl text-clinical-ink opacity-10">
                            The<br />Journey
                        </h2>
                    </div>

                    {items.map((item) => (
                        <div key={item.id} className="relative h-[70vh] w-[40vw] min-w-[300px] flex flex-col">
                            <div className="flex-1 overflow-hidden relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover filter sepia-[0.2] brightness-90 grayscale-[0.5]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-clinical-ink/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 flex items-end p-8">
                                    <span className="text-white font-sans text-xs uppercase tracking-widest">{item.subtitle}</span>
                                </div>
                            </div>
                            <div className="mt-8">
                                <span className="font-mono text-clinical-ink/40 text-xs mb-2 block">0{item.id}</span>
                                <h3 className="font-serif text-3xl text-clinical-ink mb-4">{item.title}</h3>
                                <p className="font-sans text-sm text-clinical-ink/70 font-light leading-relaxed max-w-xs">{item.text}</p>
                            </div>
                        </div>
                    ))}

                    {/* Outro Text */}
                    <div className="min-w-[50vw] flex flex-col justify-center items-center">
                        <h2 className="font-serif text-4xl md:text-6xl text-clinical-ink text-center leading-tight">
                            Welcome to<br />Olive Edge.
                        </h2>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeritageScroll;
