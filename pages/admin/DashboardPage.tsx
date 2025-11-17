import React, { useState, useEffect } from 'react';
import { mockApi } from '../../services/mockApi';

interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    newOrders: number;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-dark-card border-2 border-dark-border rounded-lg p-6 flex items-center">
        <div className="p-4 bg-dark-border rounded-lg mr-4 text-primary">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const DashboardPage: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await mockApi.getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return <div className="text-center text-primary text-xl">Loading dashboard...</div>;
    }

    if (!stats) {
        return <div className="text-center text-secondary text-xl">Could not load dashboard stats.</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-press-start text-white mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Receita Total" 
                    value={`R$ ${stats.totalRevenue.toFixed(2).replace('.', ',')}`} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                />
                <StatCard 
                    title="Total de Pedidos" 
                    value={stats.totalOrders} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
                />
                <StatCard 
                    title="Total de Clientes" 
                    value={stats.totalCustomers} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>}
                />
                 <StatCard 
                    title="Novos Pedidos (7d)" 
                    value={stats.newOrders} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                />
            </div>
            {/* Can add more components here like recent orders list or charts */}
        </div>
    );
};

export default DashboardPage;
