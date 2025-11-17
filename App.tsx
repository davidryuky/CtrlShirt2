
import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { UserRole } from './types';

// Import Layouts
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdminLayout from './components/admin/AdminLayout';

// Import Public Pages
import HomePage from './pages/public/HomePage';
import ProductsPage from './pages/public/ProductsPage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import CartPage from './pages/public/CartPage';
import CheckoutPage from './pages/public/CheckoutPage';
import OrderConfirmationPage from './pages/public/OrderConfirmationPage';

// Import Auth Pages
import AuthPage from './pages/auth/AuthPage';
import AccountPage from './pages/auth/AccountPage';

// Import Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductEditPage from './pages/admin/AdminProductEditPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminCouponsPage from './pages/admin/AdminCouponsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

const PublicLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow container mx-auto px-4 py-8">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// FIX: Updated ProtectedRoute to accept optional children.
// This allows it to function as both a layout route and a wrapper for role-specific checks.
const ProtectedRoute: React.FC<{ allowedRoles: UserRole[]; children?: React.ReactNode }> = ({ allowedRoles, children }) => {
  const { user } = useAppContext();
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/admin/login" replace />;
  }
  return children ? <>{children}</> : <AdminLayout><Outlet /></AdminLayout>;
};

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:slug" element={<ProductDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="login" element={<AuthPage />} />
            <Route path="account" element={<AccountPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]} />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/new" element={<AdminProductEditPage />} />
            <Route path="products/edit/:id" element={<AdminProductEditPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
            <Route path="coupons" element={<AdminCouponsPage />} />
            <Route path="settings" element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><AdminSettingsPage /></ProtectedRoute>} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}

export default App;