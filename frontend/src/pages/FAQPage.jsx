
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaPlus, FaMinus } from 'react-icons/fa';
import Meta from '../components/Meta';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white/50 border border-clinical-ink/5 rounded-3xl px-8 mb-4 hover:border-clinical-ink/20 transition-colors">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left"
            >
                <span className="font-serif text-lg text-clinical-ink">{question}</span>
                <span className="text-clinical-ink/50 text-xs">
                    {isOpen ? <FaMinus /> : <FaPlus />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 pt-0 font-sans text-sm leading-relaxed text-clinical-ink/70 max-w-2xl border-t border-clinical-ink/5 mt-2 pt-6">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQPage = () => {
    const faqs = [
        {
            question: "How do I determine the correct sizing for tactical apparel?",
            answer: "We recommend consulting the detailed size chart available on every product page. Our cuts are athletic but allow for layering. If you fall between sizes, we suggest opting for the larger size to ensure mobility in the field."
        },
        {
            question: "What are the shipping policies?",
            answer: "Orders are dispatched within 24 hours of confirmation. We utilize secure courier partners to ensure your gear arrives intact. Standard domestic transit times are 3-5 business days."
        },
        {
            question: "Can I return equipment that has been field-tested?",
            answer: "Items must be returned in their original condition with all tags attached within 30 days of receipt. We cannot accept returns on items that show signs of wear, field damage, or alteration."
        },
        {
            question: "Is the gear compliant with military specifications?",
            answer: "While many of our items meet or exceed Mil-Spec standards, Olive Edge is a private label. Specific certifications (like IR compliance or flame resistance) are noted explicitly in the product description."
        }
    ];

    return (
        <div className="bg-clinical-canvas min-h-screen text-clinical-ink pt-32 pb-24">
            <Meta title="FAQ | Olive Edge" description="Frequently Asked Questions regarding shipping, sizing, and material policies." />
            <div className="container mx-auto px-6 md:px-12 max-w-3xl">
                <div className="mb-20 text-center">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60 mb-4 block">
                        Common Interrogatives
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-heading-main mb-4 uppercase leading-[0.8]">Frequently Asked Questions</h1>
                </div>

                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
