
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const HomeIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const ProductsIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const CartIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const UserIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);


const MobileNav: React.FC = () => {
    const { cartCount, user } = useAppContext();

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex flex-col items-center justify-center flex-1 py-2 text-xs transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'}`;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-card border-t-2 border-dark-border z-50 flex">
            <NavLink to="/" className={navLinkClasses}>
                <HomeIcon />
                <span>Início</span>
            </NavLink>
            <NavLink to="/products" className={navLinkClasses}>
                <ProductsIcon />
                <span>Loot</span>
            </NavLink>
            <NavLink to="/cart" className={`${navLinkClasses} relative`}>
                <CartIcon />
                {cartCount > 0 && (
                    <span className="absolute top-1 right-[calc(50%-20px)] bg-secondary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                        {cartCount}
                    </span>
                )}
                <span>Carrinho</span>
            </NavLink>
            <NavLink to={user ? "/account" : "/login"} className={navLinkClasses}>
                <UserIcon />
                <span>Conta</span>
            </NavLink>
        </nav>
    );
};

export default MobileNav;
