import React, { ElementType } from 'react';
import { motion, HTMLMotionProps, SVGMotionProps } from 'framer-motion';

interface RevealTextProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    tag?: ElementType;
}

const RevealText = ({
    text,
    className = "",
    delay = 0,
    stagger = 0.05,
    tag: Tag = "div"
}: RevealTextProps) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: delay
            }
        }
    };

    const child = {
        hidden: { y: "100%", rotate: 2, opacity: 0 },
        visible: {
            y: "0%",
            rotate: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
            }
        }
    };

    // Use a Record with a more specific type to avoid 'any'
    // motion is an object with keys corresponding to HTML elements
    const MotionTag = (typeof Tag === 'string' && Tag in motion)
        ? (motion as unknown as Record<string, React.FC<HTMLMotionProps<HTMLElement> | SVGMotionProps<SVGElement>>>)[Tag as keyof typeof motion]
        : motion.div;

    return (
        <MotionTag
            className={`flex flex-wrap overflow-hidden ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
        >
            {words.map((word, idx) => (
                <span key={idx} className="relative overflow-hidden inline-block mr-[0.2em] py-1">
                    <motion.span
                        variants={child}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </MotionTag>
    );
};

export default RevealText;
