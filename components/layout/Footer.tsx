
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark-card border-t-2 border-dark-border mt-12">
            <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-xl font-press-start text-primary mb-4">CtrlShirt</h3>
                        <p className="text-gray-400">Sua dose diária de cultura geek em forma de camiseta. Qualidade de loot lendário.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-white mb-4">Links Rápidos</h4>
                        <ul className="space-y-2">
                            <li><Link to="/products" className="text-gray-400 hover:text-primary">Todos os Produtos</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-primary">Sobre Nós</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-primary">Contato</Link></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-primary">Minha Conta</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-white mb-4">Siga-nos</h4>
                        <p className="text-gray-400">Fique por dentro dos novos drops e promoções!</p>
                        <div className="flex justify-center md:justify-start space-x-6 mt-4">
                            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-primary transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-primary transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7.152a4.848 4.848 0 100 9.696 4.848 4.848 0 000-9.696zM12 15a3 3 0 110-6 3 3 0 010 6zm6.406-7.185a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                             <a href="#" aria-label="Twitch" className="text-gray-400 hover:text-primary transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.714 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0H6zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714v9.429z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-dark-border pt-6 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} CtrlShirt. Todos os direitos reservados. Projeto Fictício.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;