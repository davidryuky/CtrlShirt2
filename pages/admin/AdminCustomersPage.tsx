import React, { useState, useEffect } from 'react';
import { mockApi } from '../../services/mockApi';
import { User } from '../../types';

const AdminCustomersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const usersData = await mockApi.getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <p>Carregando clientes...</p>;

    return (
        <div>
            <h1 className="text-3xl font-press-start text-white mb-8">Gerenciar Clientes</h1>
            <div className="bg-dark-card border border-dark-border rounded-lg overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-dark-border">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Nome</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-dark-border last:border-b-0">
                                <td className="p-4 text-gray-400">{user.id}</td>
                                <td className="p-4 font-semibold">{user.name}</td>
                                <td className="p-4 text-gray-400">{user.email}</td>
                                <td className="p-4 uppercase text-xs font-bold">{user.role}</td>
                                <td className="p-4">
                                    <button className="text-primary hover:underline disabled:opacity-50" disabled>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCustomersPage;
