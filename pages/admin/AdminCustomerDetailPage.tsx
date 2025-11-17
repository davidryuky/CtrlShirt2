import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockApi } from '../../services/mockApi';
import { User, Order } from '../../types';

const AdminCustomerDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [customer, setCustomer] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const [customerData, allOrders] = await Promise.all([
                    mockApi.getUserById(id),
                    mockApi.getOrders()
                ]);
                setCustomer(customerData || null);
                setOrders(allOrders.filter(o => o.userId === id).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));

            } catch (error) {
                console.error("Failed to fetch customer details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomerDetails();
    }, [id]);

    if (loading) {
        return <p>Carregando detalhes do cliente...</p>;
    }

    if (!customer) {
        return <div className="text-center text-secondary">Cliente não encontrado.</div>;
    }

    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

    return (
        <div>
            <Link to="/admin/customers" className="text-primary hover:underline mb-6 inline-block">&larr; Voltar para Clientes</Link>
            <div className="flex items-center mb-8">
                <div>
                    <h1 className="text-3xl font-press-start text-white">{customer.name}</h1>
                    <p className="text-gray-400">{customer.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-dark-card p-4 rounded-lg border border-dark-border text-center">
                    <p className="text-sm text-gray-400">Total Gasto</p>
                    <p className="text-2xl font-bold text-accent">R$ {totalSpent.toFixed(2).replace('.', ',')}</p>
                </div>
                <div className="bg-dark-card p-4 rounded-lg border border-dark-border text-center">
                    <p className="text-sm text-gray-400">Total de Pedidos</p>
                    <p className="text-2xl font-bold text-white">{orders.length}</p>
                </div>
                 <div className="bg-dark-card p-4 rounded-lg border border-dark-border text-center">
                    <p className="text-sm text-gray-400">Cargo</p>
                    <p className="text-2xl font-bold text-white uppercase">{customer.role}</p>
                </div>
            </div>
            
            <div>
                <h2 className="text-2xl font-bold text-white mb-4">Histórico de Pedidos</h2>
                <div className="bg-dark-card border border-dark-border rounded-lg overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-dark-border">
                            <tr>
                                <th className="p-4">Pedido ID</th>
                                <th className="p-4">Data</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                             {orders.length > 0 ? orders.map(order => (
                                <tr key={order.id} className="border-b border-dark-border last:border-b-0">
                                    <td className="p-4 font-mono text-sm text-primary hover:underline">
                                        <Link to={`/admin/orders/${order.id}`}>{order.id}</Link>
                                    </td>
                                    <td className="p-4 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 text-accent">R$ {order.total.toFixed(2).replace('.', ',')}</td>
                                    <td className="p-4">
                                        <span className="font-semibold">{order.status}</span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-400">Nenhum pedido encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCustomerDetailPage;
