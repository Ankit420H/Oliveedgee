import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { FaBox, FaUsers, FaClipboardList, FaSignOutAlt, FaChartLine, FaBars, FaTimes } from 'react-icons/fa';

const AdminLayout = () => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname.includes(path);

    const navItemClass = (path) => `
        flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300
        ${isActive(path)
            ? 'bg-clinical-ink text-white shadow-soft'
            : 'text-clinical-ink/60 hover:bg-clinical-ink/5 hover:text-clinical-ink'}
    `;

    return (
        <div className="flex min-h-screen bg-clinical-canvas">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 w-full bg-white border-b border-clinical-ink/10 p-4 z-50 flex justify-between items-center">
                <span className="font-display font-black text-xl uppercase tracking-tighter text-clinical-ink">Olive Edge Admin</span>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-clinical-ink">
                    {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Admin Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full w-72 bg-white border-r border-clinical-ink/10 z-40 transition-transform duration-300
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static
            `}>
                <div className="p-10 border-b border-clinical-ink/10 flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-accent-bronze rounded-full"></div>
                            <span className="font-display font-black text-2xl tracking-tighter uppercase text-clinical-ink">
                                Olive Edge
                            </span>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-clinical-ink/40 mt-2 block pl-6">
                            Admin Portal
                        </span>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    <Link to="/admin/dashboard" className={navItemClass('/admin/dashboard')} onClick={() => setIsSidebarOpen(false)}>
                        <FaChartLine />
                        <span className="font-sans text-xs uppercase tracking-widest font-bold">Dashboard</span>
                    </Link>
                    <Link to="/admin/orders" className={navItemClass('/admin/orders')} onClick={() => setIsSidebarOpen(false)}>
                        <FaClipboardList />
                        <span className="font-sans text-xs uppercase tracking-widest font-bold">Orders</span>
                    </Link>
                    <Link to="/admin/products" className={navItemClass('/admin/product')} onClick={() => setIsSidebarOpen(false)}>
                        <FaBox />
                        <span className="font-sans text-xs uppercase tracking-widest font-bold">Products</span>
                    </Link>
                    <Link to="/admin/users" className={navItemClass('/admin/users')} onClick={() => setIsSidebarOpen(false)}>
                        <FaUsers />
                        <span className="font-sans text-xs uppercase tracking-widest font-bold">Users</span>
                    </Link>
                </nav>

                <div className="p-8 border-t border-clinical-ink/10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-clinical-ink rounded-full flex items-center justify-center text-white font-bold">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div>
                            <p className="font-sans text-sm font-bold text-clinical-ink">{user?.name || 'Admin'}</p>
                            <p className="font-mono text-[10px] text-clinical-ink/50">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 py-3 border border-clinical-ink/10 rounded-xl hover:bg-signal-error hover:text-white hover:border-transparent transition-all text-xs uppercase tracking-widest text-clinical-ink/60"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-clinical-ink/20 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 p-6 md:p-12 lg:ml-0 mt-16 lg:mt-0 transition-all duration-300">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
