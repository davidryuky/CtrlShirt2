import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockApi } from '../../services/mockApi';
import { Order, User, OrderStatus } from '../../types';

const AdminOrderDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [customer, setCustomer] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const orderData = await mockApi.getOrderById(id);
                if (orderData) {
                    setOrder(orderData);
                    const customerData = await mockApi.getUserById(orderData.userId);
                    setCustomer(customerData || null);
                }
            } catch (error) {
                console.error("Failed to fetch order details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [id]);

    if (loading) {
        return <p>Carregando detalhes do pedido...</p>;
    }

    if (!order) {
        return <div className="text-center text-secondary">Pedido não encontrado.</div>;
    }
    
    return (
        <div>
            <Link to="/admin/orders" className="text-primary hover:underline mb-6 inline-block">&larr; Voltar para Pedidos</Link>
            <h1 className="text-3xl font-press-start text-white mb-2">Detalhes do Pedido</h1>
            <p className="font-mono text-sm text-gray-500 mb-8">ID: {order.id}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
                        <h2 className="text-xl font-bold text-white mb-4">Itens do Pedido</h2>
                        <div className="space-y-4">
                            {order.items.map(item => (
                                <div key={item.id} className="flex items-center gap-4 border-b border-dark-border pb-4 last:border-b-0 last:pb-0">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md"/>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-white">{item.name}</h3>
                                        <p className="text-sm text-gray-400">Tamanho: {item.size}</p>
                                        <p className="text-sm text-gray-400">Qtd: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-accent">R$ {item.price.toFixed(2).replace(',', '.')}</p>
                                        <p className="text-sm text-white">Subtotal: R$ {(item.price * item.quantity).toFixed(2).replace(',', '.')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-dark-card p-6 rounded-lg border border-dark-border space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">Resumo Financeiro</h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span>Subtotal:</span> <span className="font-semibold">R$ {order.subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Frete:</span> <span className="font-semibold">R$ {order.shipping.toFixed(2)}</span></div>
                                <div className="flex justify-between text-lg font-bold text-accent border-t border-dark-border mt-2 pt-2"><span>Total:</span> <span>R$ {order.total.toFixed(2)}</span></div>
                            </div>
                        </div>
                         <div>
                            <h2 className="text-xl font-bold text-white mb-2">Status</h2>
                            <p className="font-semibold text-primary">{order.status}</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-2">Cliente</h2>
                            {customer ? (
                                <>
                                    <p className="font-semibold">{customer.name}</p>
                                    <p className="text-sm text-gray-400">{customer.email}</p>
                                </>
                            ) : <p className="text-gray-400">Informação indisponível</p>}
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white mb-2">Endereço de Entrega</h2>
                            <address className="not-italic text-sm text-gray-400">
                                {order.shippingAddress.fullName}<br/>
                                {order.shippingAddress.address}<br/>
                                {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br/>
                                {order.shippingAddress.country}
                            </address>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderDetailPage;
