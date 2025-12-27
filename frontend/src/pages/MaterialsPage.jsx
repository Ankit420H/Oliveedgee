import React from 'react';

import Meta from '../components/Meta';

const MaterialCard = ({ code, name, description, usage }) => (
    <div className="border border-clinical-ink/20 p-8 hover:bg-white transition-colors duration-500 cursor-default group">
        <div className="flex justify-between items-start mb-6">
            <span className="font-mono text-xs border border-clinical-ink/30 px-2 py-1 uppercase tracking-widest text-clinical-ink/60 group-hover:bg-clinical-ink group-hover:text-clinical-canvas transition-colors">
                {code}
            </span>
            <span className="font-sans text-xs text-clinical-ink/60 uppercase tracking-widest">
                Grade-A
            </span>
        </div>
        <h3 className="font-display font-medium text-2xl mb-4">{name}</h3>
        <p className="font-sans text-sm leading-relaxed text-clinical-ink/80 mb-6 min-h-[80px]">
            {description}
        </p>
        <div className="border-t border-black/5 pt-4">
            <span className="block font-sans text-[10px] uppercase tracking-widest text-clinical-ink/60 mb-1">
                Primary Application
            </span>
            <span className="font-display italic text-sm">
                {usage}
            </span>
        </div>
    </div>
);

const MaterialsPage = () => {
    const materials = [
        {
            code: 'Ny-66',
            name: 'Ballistic Nylon',
            description: 'A thick, tough, synthetic nylon fabric originally developed for military body armor. Exceptional resistance to abrasion and tearing.',
            usage: 'Expedition Rucksacks, Plate Carriers',
        },
        {
            code: 'Rp-St',
            name: 'Ripstop Cotton',
            description: 'Woven fabrics, often made of nylon, using a special reinforcing technique that makes them resistant to tearing and ripping.',
            usage: 'Field Jackets, Cargo Trousers',
        },
        {
            code: 'Gt-X',
            name: 'Hydro-Guard Membrane',
            description: 'A waterproof, breathable fabric membrane. It repels liquid water while allowing water vapor to pass through, designed for all-weather capability.',
            usage: 'Outer Shells, Rain Gear',
        },
        {
            code: 'Mr-Wl',
            name: 'Merino Wool',
            description: 'A natural fiber grown by Merino sheep. It is thinner and softer than regular wool, offering superior body temperature regulation.',
            usage: 'Base Layers, Socks',
        },
        {
            code: 'Kv-Lr',
            name: 'Aramid Fiber',
            description: 'A class of heat-resistant and strong synthetic fibers. Used in aerospace and military applications for ballistic rated body armor fabric.',
            usage: 'Reinforced Gloves, Key Fobs',
        },
        {
            code: 'Yk-K',
            name: 'Zippers & Hardware',
            description: 'Industrial strength fastening systems designed to withstand corrosion, dirt, and freezing temperatures without failure.',
            usage: 'All Equipment',
        }
    ];

    return (
        <div className="bg-clinical-canvas min-h-screen text-clinical-ink pt-32 pb-24">
            <Meta title="Fabrication | Olive Edge" description="A technical analysis of our materials: Ballistic Nylon, Ripstop, and GORE-TEX membranes." />
            <div className="container mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60 mb-4 block">
                        Material Science
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-8xl lg:text-heading-main leading-[0.9] mb-8 uppercase">
                        The Physics <br /> of Resilience.
                    </h1>
                    <p className="font-sans text-sm md:text-base leading-relaxed text-clinical-ink/70 max-w-2xl mx-auto">
                        Our equipment is defined not by ornamentation, but by the integrity of its composition.
                        We source textiles that have been proven in the most hostile environments on Earth.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-clinical-ink/20">
                    {materials.map((mat, idx) => (
                        <MaterialCard key={idx} {...mat} />
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-24 text-center">
                    <p className="font-display font-medium italic text-lg text-clinical-ink/60">
                        "Form follows fabrication."
                    </p>
                </div>

            </div>
        </div>
    );
};

export default MaterialsPage;
