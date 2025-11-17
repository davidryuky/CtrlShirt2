
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmationPage: React.FC = () => {
    const { state } = useLocation();
    const orderId = state?.orderId;

    if (!orderId) {
        return (
            <div className="text-center py-20">
                <h1 className="text-4xl font-press-start text-secondary mb-4">Oops!</h1>
                <p className="text-gray-400 mb-8">Não foi possível encontrar os detalhes do seu pedido.</p>
                <Link to="/" className="bg-primary text-dark-bg font-bold py-3 px-8 rounded-md text-lg hover:bg-white transition-all duration-300">
                    VOLTAR PARA HOME
                </Link>
            </div>
        );
    }

    return (
        <div className="text-center py-20 bg-dark-card border-2 border-accent shadow-glow-primary rounded-lg">
            <h1 className="text-4xl font-press-start text-accent mb-4">Pedido Recebido!</h1>
            <p className="text-gray-300 text-lg mb-2">Obrigado pela sua compra! Seu loot está a caminho.</p>
            <p className="text-gray-400 mb-8">
                O ID do seu pedido é: <span className="font-bold text-white">{orderId}</span>
            </p>
            <Link to="/products" className="bg-primary text-dark-bg font-bold py-3 px-8 rounded-md text-lg hover:bg-white transition-all duration-300">
                CONTINUAR COMPRANDO
            </Link>
        </div>
    );
};

export default OrderConfirmationPage;
