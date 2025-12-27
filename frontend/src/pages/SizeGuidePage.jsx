import React from 'react';

const SizeTable = ({ title, columns, data }) => (
    <div className="mb-16">
        <h3 className="font-serif text-xl mb-6">{title}</h3>
        <div className="overflow-x-auto">
            <table className="w-full text-left bg-white border border-clinical-ink/10">
                <thead>
                    <tr className="bg-clinical-ink text-clinical-canvas">
                        {columns.map((col, idx) => (
                            <th key={idx} className="p-4 font-sans text-xs font-bold uppercase tracking-widest border-r border-white/10 last:border-0 whitespace-nowrap">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx} className="border-b border-clinical-ink/10 hover:bg-black/5 transition-colors">
                            {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-4 font-sans text-sm text-clinical-ink/80 border-r border-clinical-ink/10 last:border-0 border-dashed">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const SizeGuidePage = () => {
    return (
        <div className="bg-clinical-canvas min-h-screen text-clinical-ink pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">

                <div className="text-center mb-20">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60 mb-4 block">
                        Technical Specifications
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-heading-main mb-6 uppercase leading-[0.9]">
                        Size Specifications
                    </h1>
                    <p className="font-sans text-sm text-clinical-ink/70 max-w-2xl mx-auto leading-relaxed">
                        To ensure optimal performance in the field, precise fit is mandatory.
                        Our cuts are "Athletic-Standard"—fitted close to the body to prevent snagging, yet allowing for dynamic range of motion.
                    </p>
                </div>

                <SizeTable
                    title="Upper Body (Tops / Plate Carriers)"
                    columns={['Size', 'Chest (in)', 'Chest (cm)', 'Sleeve (cm)', 'Torso Length (cm)']}
                    data={[
                        ['Small (S)', '36-38', '91-96', '84', '68'],
                        ['Medium (M)', '38-40', '96-101', '86', '70'],
                        ['Large (L)', '40-42', '101-106', '89', '72'],
                        ['X-Large (XL)', '42-44', '106-111', '91', '74']
                    ]}
                />

                <SizeTable
                    title="Lower Body (Trousers / Cargo)"
                    columns={['Size', 'Waist (in)', 'Waist (cm)', 'Inseam (Regular)', 'Inseam (Long)']}
                    data={[
                        ['30', '30', '76', '32', '34'],
                        ['32', '32', '81', '32', '34'],
                        ['34', '34', '86', '32', '34'],
                        ['36', '36', '91', '32', '34'],
                        ['38', '38', '96', '32', '34']
                    ]}
                />

                <SizeTable
                    title="Footwear (Boots)"
                    columns={['US / IND', 'UK', 'EU', 'Foot Length (mm)']}
                    data={[
                        ['7', '6', '40', '254'],
                        ['8', '7', '41', '262'],
                        ['9', '8', '42', '271'],
                        ['10', '9', '43', '279'],
                        ['11', '10', '44', '288']
                    ]}
                />

                <div className="bg-aesop-surface p-8 border border-clinical-ink/10 mt-12 flex gap-6 items-start">
                    <div className="hidden md:block w-12 h-12 bg-clinical-ink text-clinical-canvas flex items-center justify-center font-bold text-xl rounded-full">
                        ?
                    </div>
                    <div>
                        <h4 className="font-serif text-lg mb-2">Unsure of your coordinates?</h4>
                        <p className="font-sans text-sm text-clinical-ink/70 mb-4">
                            If you fall between sizes, we recommend sizing up for layering capability, or sizing down for a streamlined, base-layer fit.
                        </p>
                        <a href="/contact" className="text-xs font-bold uppercase tracking-widest underline underline-offset-4">
                            Contact Support for Assistance
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SizeGuidePage;
