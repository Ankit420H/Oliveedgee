import './globals.css';
import { Providers } from './providers';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TOAST_CONFIG } from '../lib/constants';

export const metadata = {
    title: 'Olive Edge | Digital Flagship',
    description: 'Premium digital flagship for technical apparel.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="antialiased">
                <Providers>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                    <ToastContainer {...(TOAST_CONFIG as any)} />
                </Providers>
            </body>
        </html>
    )
}
