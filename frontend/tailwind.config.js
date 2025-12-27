/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Japandi / Soft Minimalist Palette
                clinical: {
                    canvas: '#F9F9F6',  // Warm Off-White / Cream
                    ink: '#1F1F1F',     // Soft Black (Headings)
                    body: '#4A4A4A',    // Dark Grey (Body text)
                    surface: '#FFFFFF', // Pure White
                    border: '#ECDCC3',  // Beige/Warm divider
                    bone: '#F0EFEB',    // Image placeholder background
                },
                // Vibrant Accents for Energy -> NOW RESTRAINED & COHESIVE
                accent: {
                    sage: '#8A9A5B',
                    terracotta: '#BC6C25',
                    beige: '#DDA15E',
                    bronze: '#C5A065',  // Restrained Gold/Bronze - Luxury
                    moss: '#606C38',    // Deep Earthy Green - Grounded
                },
                signal: {
                    orange: '#E07A5F',
                    success: '#606C38', // Muted Green for success
                    error: '#BC6C25',   // Terracotta for error
                }
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
                display: ['"Anton"', '"Impact"', 'sans-serif'],
                serif: ['"Libre Baskerville"', '"Baskerville"', 'serif'],
                anton: ['"Anton"', 'sans-serif'],
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '30': '7.5rem',
                'container-sm': '1.5rem', // 24px (px-6)
                'container-md': '3rem',   // 48px (px-12)
                'container-lg': '6rem',   // 96px (px-24)
            },
            borderRadius: {
                '2xl': '1rem',    // 16px - Standard Card
                '3xl': '1.5rem',  // 24px - Large Container
                '4xl': '2rem',    // 32px - Extra Large
                '5xl': '2.5rem',  // 40px - Huge
                'pill': '999px',
                'poster': '2rem', // Poster radius
            },
            boxShadow: {
                'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
            },
            fontSize: {
                '10xl': '10rem',
                '11xl': '12rem',
                '12xl': '14rem',
                'huge': '16rem',
                'massive': '20rem',
                'heading-main': '120px',
                'heading-sub': '80px',
            },
        },
    },
    plugins: [],
}
