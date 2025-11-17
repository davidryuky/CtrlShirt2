
import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { UserRole } from '../../types';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
      isActive ? 'bg-primary text-dark-bg' : 'text-gray-300 hover:bg-dark-border hover:text-white'
    }`;
  
  return (
    <div className="min-h-screen flex bg-dark-bg">
      <aside className="w-64 bg-dark-card p-6 border-r-2 border-dark-border flex flex-col">
        <div className="mb-8">
          <Link to="/admin" className="text-2xl font-press-start text-primary">
            CtrlPanel
          </Link>
          <p className="text-sm text-gray-400">Admin</p>
        </div>
        <nav className="flex-grow space-y-2">
          <NavLink to="/admin/dashboard" className={navLinkClasses}>Dashboard</NavLink>
          <NavLink to="/admin/products" className={navLinkClasses}>Produtos</NavLink>
          <NavLink to="/admin/categories" className={navLinkClasses}>Categorias</NavLink>
          <NavLink to="/admin/orders" className={navLinkClasses}>Pedidos</NavLink>
          <NavLink to="/admin/customers" className={navLinkClasses}>Clientes</NavLink>
          <NavLink to="/admin/coupons" className={navLinkClasses}>Cupons</NavLink>
          {user?.role === UserRole.ADMIN && (
            <NavLink to="/admin/settings" className={navLinkClasses}>Configurações</NavLink>
          )}
        </nav>
        <div className="mt-auto">
           <div className="text-gray-300 mb-4">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          <button
            onClick={handleLogout}
            className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
