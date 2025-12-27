import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars

const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' }
];

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-white cursor-pointer text-sm uppercase tracking-widest transition-all duration-200 hover:bg-white/10 hover:border-white/20 outline-none rounded-full"
            >
                <FaGlobe className="text-sm opacity-80" />
                <span>{currentLang.name.split(' ')[0]}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <FaChevronDown className="text-xs opacity-70" />
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[120%] right-0 w-48 bg-clinical-ink/95 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden z-50 rounded-3xl"
                    >
                        <div className="max-h-[300px] overflow-y-auto">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className={`flex items-center justify-between w-full px-4 py-3 bg-transparent border-b border-white/5 cursor-pointer text-sm text-left transition-colors font-sans hover:bg-white/5 ${i18n.language === lang.code ? 'text-white font-bold' : 'text-gray-400'}`}
                                >
                                    <span>{lang.name}</span>
                                    {i18n.language === lang.code && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;

