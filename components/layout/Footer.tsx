
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
                        {/* Placeholder for social icons */}
                        <div className="flex justify-center md:justify-start space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-primary">Social 1</a>
                            <a href="#" className="text-gray-400 hover:text-primary">Social 2</a>
                            <a href="#" className="text-gray-400 hover:text-primary">Social 3</a>
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
