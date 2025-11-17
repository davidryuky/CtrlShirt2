
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);


const Header: React.FC = () => {
    const { cartCount, user } = useAppContext();

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${isActive ? 'text-primary bg-dark-border' : 'text-gray-300 hover:text-primary'}`;

    return (
        <header className="bg-dark-card/80 backdrop-blur-sm border-b-2 border-dark-border shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-press-start text-primary hover:text-white transition-colors duration-300">
                            CtrlShirt
                        </Link>
                    </div>
                    <nav className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
                            <NavLink to="/products" className={navLinkClasses}>Loot</NavLink>
                            <NavLink to="/about" className={navLinkClasses}>Sobre</NavLink>
                            <NavLink to="/contact" className={navLinkClasses}>Contato</NavLink>
                        </div>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Link to="/cart" className="text-gray-300 hover:text-primary transition-colors duration-300 relative">
                                <CartIcon />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                        <div className="relative">
                            <Link to={user ? "/account" : "/login"} className="text-gray-300 hover:text-primary transition-colors duration-300">
                                <UserIcon />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;