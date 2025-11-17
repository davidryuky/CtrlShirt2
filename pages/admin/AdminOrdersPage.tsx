import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../../services/mockApi';
import { Order, User, OrderStatus } from '../../types';

const AdminOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [ordersData, usersData] = await Promise.all([
                    mockApi.getOrders(),
                    mockApi.getUsers()
                ]);
                setOrders(ordersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
                setUsers(usersData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getUserName = (userId: string) => users.find(u => u.id === userId)?.name || 'Cliente Deletado';

    const handleStatusChange = async (order: Order, newStatus: OrderStatus) => {
        const updatedOrder = { ...order, status: newStatus };
        try {
            await mockApi.updateOrder(updatedOrder);
            setOrders(prevOrders => prevOrders.map(o => o.id === order.id ? updatedOrder : o));
        } catch (error) {
            console.error("Failed to update order status:", error);
            alert("Erro ao atualizar status do pedido.");
        }
    };

    if (loading) return <p>Carregando pedidos...</p>;

    return (
        <div>
            <h1 className="text-3xl font-press-start text-white mb-8">Gerenciar Pedidos</h1>
            <div className="bg-dark-card border border-dark-border rounded-lg overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-dark-border">
                        <tr>
                            <th className="p-4">Pedido ID</th>
                            <th className="p-4">Cliente</th>
                            <th className="p-4">Data</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b border-dark-border last:border-b-0">
                                <td className="p-4 font-mono text-sm text-primary hover:underline">
                                    <Link to={`/admin/orders/${order.id}`}>{order.id}</Link>
                                </td>
                                <td className="p-4 font-semibold">{getUserName(order.userId)}</td>
                                <td className="p-4 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 text-accent">R$ {order.total.toFixed(2).replace('.', ',')}</td>
                                <td className="p-4">
                                     <select 
                                        value={order.status} 
                                        onChange={(e) => handleStatusChange(order, e.target.value as OrderStatus)}
                                        className={`w-full bg-dark-bg border border-dark-border rounded-md p-2 text-white focus:ring-primary focus:border-primary`}
                                     >
                                        {Object.values(OrderStatus).map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                     </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrdersPage;
