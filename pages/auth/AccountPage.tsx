
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Order } from '../../types';
import { mockApi } from '../../services/mockApi';

const AccountPage: React.FC = () => {
    const { user, logout } = useAppContext();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            const fetchOrders = async () => {
                setLoading(true);
                const allOrders = await mockApi.getOrders();
                // In a real app, this would be a filtered API call
                setOrders(allOrders.filter(o => o.userId === user.id));
                setLoading(false);
            };
            fetchOrders();
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-press-start text-primary">Minha Conta</h1>
                <button onClick={handleLogout} className="bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-pink-600 transition">
                    Sair
                </button>
            </div>
            
            <div className="bg-dark-card p-6 rounded-lg border border-dark-border mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Meus Dados</h2>
                <p><strong>Nome:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>

            <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
                <h2 className="text-2xl font-bold text-white mb-4">Histórico de Pedidos</h2>
                {loading ? <p>Carregando pedidos...</p> : (
                    <div className="space-y-4">
                        {orders.length > 0 ? orders.map(order => (
                            <div key={order.id} className="border border-dark-border p-4 rounded-md">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-lg">Pedido #{order.id}</p>
                                        <p className="text-sm text-gray-400">Data: {new Date(order.createdAt).toLocaleDateString()}</p>
                                        <p className="text-sm text-gray-400">Status: <span className="font-semibold">{order.status}</span></p>
                                    </div>
                                    <p className="text-xl font-bold text-accent">R$ {order.total.toFixed(2).replace('.', ',')}</p>
                                </div>
                                <div className="mt-4 border-t border-dark-border pt-2">
                                    <p className="font-semibold mb-2">Itens:</p>
                                    <ul className="list-disc list-inside text-sm text-gray-300">
                                        {order.items.map(item => (
                                            <li key={item.id}>{item.name} ({item.size}) - x{item.quantity}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )) : <p>Você ainda não fez nenhum pedido.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountPage;
