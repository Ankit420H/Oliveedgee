import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FilmGrain from '../ui/FilmGrain';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-clinical-canvas">
            <FilmGrain />
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
