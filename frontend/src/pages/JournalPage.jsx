import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import Meta from '../components/Meta';

const ArticlePreview = ({ date, title, excerpt, category }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group cursor-pointer border-t border-clinical-ink/20 py-12"
    >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60 block mb-2">
                    {category}
                </span>
                <span className="font-display text-sm italic text-clinical-ink/60">
                    {date}
                </span>
            </div>
            <div className="md:col-span-3">
                <h2 className="font-display font-medium text-3xl mb-4 group-hover:underline underline-offset-4 decoration-1">
                    {title}
                </h2>
                <p className="font-sans text-sm leading-relaxed text-clinical-ink/70 mb-6 max-w-2xl">
                    {excerpt}
                </p>
                <span className="font-sans text-xs font-bold uppercase tracking-widest underline underline-offset-4 text-clinical-ink opacity-0 group-hover:opacity-100 transition-opacity">
                    Read Transmission
                </span>
            </div>
        </div>
    </motion.div>
);

const JournalPage = () => {
    const articles = [
        {
            id: 1,
            category: 'Field Report',
            date: '09.12.2025',
            title: 'Operation: Silent Night',
            excerpt: 'A retrospective on low-light urban navigation. How reflectivity and silhouette reduction play a crucial role in modern evasion tactics.',
        },
        {
            id: 2,
            category: 'Design Study',
            date: '24.11.2025',
            title: 'The Architecture of Pockets',
            excerpt: 'Why the cargo pant endures. Examining the geometric necessity of load-bearing textiles and the evolution of the thigh pocket from 1940 to present.',
        },
        {
            id: 3,
            category: 'Etiquette',
            date: '10.11.2025',
            title: 'Maintenance of the Uniform',
            excerpt: 'Proper care instructions for technical fabrics. Why dry-cleaning destroys water-resistance, and the meditative practice of polishing leather.',
        },
        {
            id: 4,
            category: 'Dispatch',
            date: '01.11.2025',
            title: 'Winter Collection',
            excerpt: 'Layering guides for sub-zero temperatures. Understanding the interaction between Merino wool base layers and GORE-TEX shells.',
        }
    ];

    return (
        <div className="bg-clinical-canvas min-h-screen text-clinical-ink pt-32 pb-24">
            <Meta title="The Dossier | Olive Edge" description="Field reports, design studies, and operational intelligence from the Olive Edge command." />
            <div className="container mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="mb-24">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60 mb-4 block">
                        Olive Edge Intelligence
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-8xl lg:text-heading-main leading-[0.9] mb-8 uppercase">
                        The Dossier.
                    </h1>
                </div>

                {/* Article List */}
                <div className="max-w-5xl">
                    {articles.map((article) => (
                        <ArticlePreview key={article.id} {...article} />
                    ))}

                    {/* Bottom Border */}
                    <div className="border-t border-clinical-ink/20"></div>
                </div>

                {/* Pagination / More */}
                <div className="mt-16 text-center md:text-left">
                    <button className="px-8 py-3 border border-clinical-ink/30 hover:bg-clinical-ink hover:text-clinical-canvas transition-colors font-sans text-xs font-bold uppercase tracking-widest">
                        Access Archives
                    </button>
                </div>

            </div>
        </div>
    );
};

export default JournalPage;
