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

const HeartIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
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
        `flex flex-col items-center justify-center flex-1 py-2 transition-colors duration-300 ${
            isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'
        }`;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-card/90 backdrop-blur-sm border-t-2 border-dark-border z-50 flex justify-around h-[72px]">
            <NavLink to="/" className={navLinkClasses}>
                {({ isActive }) => (
                    <>
                        <div className={`p-3 rounded-full transition-colors duration-200 ${isActive ? 'bg-primary/10' : ''}`}>
                            <HomeIcon />
                        </div>
                        <span className="text-xs">Início</span>
                    </>
                )}
            </NavLink>
            <NavLink to="/products" className={navLinkClasses}>
                {({ isActive }) => (
                    <>
                        <div className={`p-3 rounded-full transition-colors duration-200 ${isActive ? 'bg-primary/10' : ''}`}>
                            <ProductsIcon />
                        </div>
                        <span className="text-xs">Loot</span>
                    </>
                )}
            </NavLink>
            <NavLink to="/favorites" className={navLinkClasses}>
                 {({ isActive }) => (
                    <>
                        <div className={`p-3 rounded-full transition-colors duration-200 ${isActive ? 'bg-primary/10' : ''}`}>
                            <HeartIcon />
                        </div>
                        <span className="text-xs">Favoritos</span>
                    </>
                )}
            </NavLink>
            <NavLink to="/cart" className={navLinkClasses}>
                 {({ isActive }) => (
                    <>
                        <div className={`relative p-3 rounded-full transition-colors duration-200 ${isActive ? 'bg-primary/10' : ''}`}>
                            <CartIcon />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-secondary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold border border-dark-card">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <span className="text-xs">Carrinho</span>
                    </>
                )}
            </NavLink>
            <NavLink to={user ? "/account" : "/login"} className={navLinkClasses}>
                {({ isActive }) => (
                    <>
                        <div className={`p-3 rounded-full transition-colors duration-200 ${isActive ? 'bg-primary/10' : ''}`}>
                            <UserIcon />
                        </div>
                        <span className="text-xs">Conta</span>
                    </>
                )}
            </NavLink>
        </nav>
    );
};

export default MobileNav;