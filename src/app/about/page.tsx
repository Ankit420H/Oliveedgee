'use client';

import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="bg-clinical-canvas min-h-screen pt-20 md:pt-32 pb-40">
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-4xl">
                <div className="mb-24 text-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-clinical-ink/40 mb-6 block">
                        Our Story
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-8xl text-clinical-ink leading-none uppercase">
                        Philosophy
                    </h1>
                </div>

                <div className="space-y-12 text-clinical-ink/70">
                    <section>
                        <h2 className="font-display font-bold text-3xl text-clinical-ink mb-6">Our Mission</h2>
                        <p className="text-lg leading-relaxed">
                            Olive Edge was born from the belief that technical apparel should be as refined as it is functional.
                            We create premium garments for men who demand both performance and aesthetics.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-3xl text-clinical-ink mb-6">Design Philosophy</h2>
                        <p className="text-lg leading-relaxed mb-4">
                            Every piece in our collection is meticulously engineered with precision and care.
                            We combine cutting-edge materials with minimalist design to create apparel that performs in any environment.
                        </p>
                        <p className="text-lg leading-relaxed">
                            From fabric selection to final stitching, we obsess over every detail to deliver products that exceed expectations.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-3xl text-clinical-ink mb-6">Sustainability</h2>
                        <p className="text-lg leading-relaxed">
                            We're committed to responsible manufacturing and sustainable practices.
                            Our products are built to last, reducing waste and environmental impact.
                        </p>
                    </section>

                    <div className="pt-12">
                        <Link
                            href="/shop"
                            className="inline-block px-12 py-4 bg-clinical-ink text-white font-sans text-xs uppercase tracking-widest rounded-full hover:bg-accent-bronze transition-colors"
                        >
                            Explore Collection
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
