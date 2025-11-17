import React, { useState, useEffect, useCallback } from 'react';
import { mockApi } from '../../services/mockApi';
import { Coupon } from '../../types';

const CouponModal: React.FC<{
    coupon: Coupon | null;
    onClose: () => void;
    onSave: (coupon: Coupon | Omit<Coupon, 'id'>) => void;
}> = ({ coupon, onClose, onSave }) => {
    const [code, setCode] = useState(coupon?.code || '');
    const [discount, setDiscount] = useState<number | string>(coupon?.discountPercentage || '');
    const [isActive, setIsActive] = useState(coupon?.isActive ?? true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim() || !discount) return;
        const couponData = {
            code,
            discountPercentage: Number(discount),
            isActive,
        };
        onSave(coupon ? { ...couponData, id: coupon.id } : couponData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-dark-card border border-dark-border rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{coupon ? 'Editar' : 'Novo'} Cupom</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="couponCode" className="block text-sm font-medium">Código</label>
                        <input id="couponCode" type="text" value={code} onChange={e => setCode(e.target.value.toUpperCase())} required className="mt-1 w-full bg-dark-bg p-2 border-dark-border border rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="discount" className="block text-sm font-medium">Desconto (%)</label>
                        <input id="discount" type="number" value={discount} onChange={e => setDiscount(e.target.value === '' ? '' : parseInt(e.target.value, 10))} required className="mt-1 w-full bg-dark-bg p-2 border-dark-border border rounded-md" />
                    </div>
                    <div className="flex items-center">
                        <input id="isActive" type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="h-4 w-4 rounded" />
                        <label htmlFor="isActive" className="ml-2 block text-sm">Ativo</label>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button type="button" onClick={onClose} className="bg-dark-border font-bold py-2 px-4 rounded-md">Cancelar</button>
                        <button type="submit" className="bg-primary text-dark-bg font-bold py-2 px-4 rounded-md">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const AdminCouponsPage: React.FC = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

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
    
    const handleSave = async (couponData: Coupon | Omit<Coupon, 'id'>) => {
        try {
            if ('id' in couponData) {
                await mockApi.updateCoupon(couponData);
            } else {
                await mockApi.createCoupon(couponData);
            }
            fetchCoupons();
        } catch (error) {
            console.error("Failed to save coupon:", error);
            alert("Erro ao salvar cupom.");
        } finally {
            closeModal();
        }
    };

    const handleDelete = async (couponId: string) => {
        if (window.confirm('Tem certeza que deseja deletar este cupom?')) {
            try {
                await mockApi.deleteCoupon(couponId);
                fetchCoupons();
            } catch (error) {
                console.error("Failed to delete coupon:", error);
                alert("Erro ao deletar cupom.");
            }
        }
    };

    const openModal = (coupon: Coupon | null = null) => {
        setEditingCoupon(coupon);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingCoupon(null);
        setIsModalOpen(false);
    };


    if (loading) return <p>Carregando cupons...</p>;

    return (
        <div>
            {isModalOpen && <CouponModal coupon={editingCoupon} onClose={closeModal} onSave={handleSave} />}
            <div className="flex justify-between items-center mb-8">
                 <h1 className="text-3xl font-press-start text-white">Gerenciar Cupons</h1>
                <button onClick={() => openModal()} className="bg-primary text-dark-bg font-bold py-2 px-4 rounded-md hover:bg-white transition-colors">
                    + Novo Cupom
                </button>
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
                                <td className="p-4 space-x-2">
                                    <button onClick={() => openModal(coupon)} className="text-primary hover:underline">Editar</button>
                                    <button onClick={() => handleDelete(coupon.id)} className="text-secondary hover:underline">Deletar</button>
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
