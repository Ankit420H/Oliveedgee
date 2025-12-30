import Header from './Header';
import Footer from './Footer';
import FilmGrain from '../ui/FilmGrain';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen bg-clinical-canvas">
            <FilmGrain />
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
