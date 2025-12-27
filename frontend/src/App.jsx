import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AdminLayout from './components/layout/AdminLayout';
import MainLayout from './components/layout/MainLayout';
import PrivateRoute from './features/auth/components/PrivateRoute';
import AdminRoute from './features/auth/components/AdminRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
import FilmGrain from './components/ui/FilmGrain';
import ScrollToTop from './components/layout/ScrollToTop';
import LenisScroll from './components/utils/LenisScroll';

// Lazy Loaded Pages
// Marketing/Static Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const MaterialsPage = lazy(() => import('./pages/MaterialsPage'));
const JournalPage = lazy(() => import('./pages/JournalPage'));
const ShippingPolicyPage = lazy(() => import('./pages/ShippingPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const SizeGuidePage = lazy(() => import('./pages/SizeGuidePage'));
const StoresPage = lazy(() => import('./pages/StoresPage'));
const AccessibilityPage = lazy(() => import('./pages/AccessibilityPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Feature-Based Pages
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));

// Auth Feature
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Checkout Feature
const ShippingPage = lazy(() => import('./pages/ShippingPage'));


const OrderPage = lazy(() => import('./pages/OrderPage'));

// Admin Feature
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ProductEditPage = lazy(() => import('./pages/ProductEditPage'));
const UserListPage = lazy(() => import('./pages/UserListPage'));
const OrderListPage = lazy(() => import('./pages/OrderListPage'));
const AdminOrderPage = lazy(() => import('./pages/AdminOrderPage'));
const AdminProductListPage = lazy(() => import('./pages/AdminProductListPage'));

// Route Loading Fallback
const RouteLoader = () => (
  <div className="min-h-screen bg-clinical-canvas flex items-center justify-center">
    <div className="w-16 h-1 bg-clinical-ink/20 overflow-hidden">
      <div className="w-full h-full bg-clinical-ink animate-progress origin-left"></div>
    </div>
  </div>
);

// Wrapper component to use useLocation hook
// Wrapper component to use useLocation hook
const AnimatedRoutes = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart/:id?" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Static Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/fabrication" element={<MaterialsPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/delivery" element={<ShippingPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/sizing" element={<SizeGuidePage />} />

          {/* Private Routes */}
          <Route path="" element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
            <Route path="/admin/users" element={<UserListPage />} />
            <Route path="/admin/orders" element={<OrderListPage />} />
            <Route path="/admin/order/:id" element={<AdminOrderPage />} />
            <Route path="/admin/products" element={<AdminProductListPage />} />
            <Route path="/admin/product/new" element={<ProductEditPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

function App() {

  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <LenisScroll />
            <ScrollToTop />
            <div className="min-h-screen">
              <AnimatedRoutes />
              <ToastContainer
                position="bottom-right"
                theme="light"
              />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
