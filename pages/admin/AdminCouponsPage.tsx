import React, { useState, useEffect, useCallback } from 'react';
import { mockApi } from '../../services/mockApi';
import { Coupon } from '../../types';

const AdminCouponsPage: React.FC = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCoupons = useCallback(async () => {
        setLoading(true);
        try {
            const data = await mockApi.getCoupons();
            setCoupons(data);
        } catch (error) {
            console.error("Failed to fetch coupons:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    // Mock form handling
    const [newCouponCode, setNewCouponCode] = useState('');
    const [newCouponDiscount, setNewCouponDiscount] = useState<number | string>('');

    const handleCreateCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Criação de cupom é uma demonstração. API Mock não suporta.");
        const newCoupon = { id: Date.now().toString(), code: newCouponCode, discountPercentage: Number(newCouponDiscount), isActive: true };
        setCoupons([...coupons, newCoupon]);
        setNewCouponCode('');
        setNewCouponDiscount('');
    }
    
    const handleToggleActive = (couponId: string) => {
        setCoupons(prev => prev.map(c => c.id === couponId ? {...c, isActive: !c.isActive} : c))
        alert("Status do cupom alterado (simulação).");
    }

    if (loading) return <p>Carregando cupons...</p>;

    return (
        <div>
            <h1 className="text-3xl font-press-start text-white mb-8">Gerenciar Cupons</h1>

            <div className="mb-8 bg-dark-card p-6 rounded-lg border border-dark-border">
                <h2 className="text-xl font-bold mb-4">Novo Cupom</h2>
                <form onSubmit={handleCreateCoupon} className="flex flex-col md:flex-row gap-4">
                    <input type="text" value={newCouponCode} onChange={e => setNewCouponCode(e.target.value)} placeholder="Código (ex: GEEK15)" className="flex-grow bg-dark-bg border-dark-border rounded-md shadow-sm p-2" required />
                    <input type="number" value={newCouponDiscount} onChange={e => setNewCouponDiscount(e.target.value === '' ? '' : parseInt(e.target.value, 10))} placeholder="Desconto %" className="w-40 bg-dark-bg border-dark-border rounded-md shadow-sm p-2" required />
                    <button type="submit" className="bg-primary text-dark-bg font-bold py-2 px-4 rounded-md hover:bg-white transition-colors">Criar</button>
                </form>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-dark-border">
                        <tr>
                            <th className="p-4">Código</th>
                            <th className="p-4">Desconto</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map(coupon => (
                            <tr key={coupon.id} className="border-b border-dark-border last:border-b-0">
                                <td className="p-4 font-mono font-bold">{coupon.code}</td>
                                <td className="p-4 text-accent">{coupon.discountPercentage}%</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${coupon.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                        {coupon.isActive ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button onClick={() => handleToggleActive(coupon.id)} className="text-primary hover:underline">
                                        {coupon.isActive ? 'Desativar' : 'Ativar'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCouponsPage;
