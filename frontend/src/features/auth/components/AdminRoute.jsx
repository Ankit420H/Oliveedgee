import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null; // Or a spinner

    return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
