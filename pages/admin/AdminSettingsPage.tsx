import React, { useState, useEffect } from 'react';
import { mockApi } from '../../services/mockApi';
import { Settings } from '../../types';

const AdminSettingsPage: React.FC = () => {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await mockApi.getSettings();
                setSettings(data);
            } catch (error) {
                console.error("Failed to fetch settings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!settings) return;
        const { name, value } = e.target;
        setSettings({
            ...settings,
            [name]: name === 'shippingCost' ? parseFloat(value) || 0 : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!settings) return;
        setSaving(true);
        try {
            await mockApi.updateSettings(settings);
            alert("Configurações salvas com sucesso!");
        } catch (error) {
            console.error("Failed to save settings:", error);
            alert("Erro ao salvar configurações.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <p>Carregando configurações...</p>;
    }

    if (!settings) {
        return <p>Não foi possível carregar as configurações.</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-press-start text-white mb-8">Configurações Gerais</h1>
            <form onSubmit={handleSubmit}>
                <div className="bg-dark-card p-6 rounded-lg border border-dark-border space-y-6">
                    <div>
                        <label htmlFor="storeName" className="block text-sm font-medium text-gray-300">Nome da Loja</label>
                        <input type="text" id="storeName" name="storeName" value={settings.storeName} onChange={handleInputChange} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-300">Descrição da Loja</label>
                        <textarea id="storeDescription" name="storeDescription" value={settings.storeDescription} onChange={handleInputChange} rows={3} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300">Email de Contato</label>
                        <input type="email" id="contactEmail" name="contactEmail" value={settings.contactEmail} onChange={handleInputChange} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm p-2" />
                    </div>
                     <div>
                        <label htmlFor="shippingCost" className="block text-sm font-medium text-gray-300">Custo de Frete Padrão</label>
                        <input type="number" step="0.01" id="shippingCost" name="shippingCost" value={settings.shippingCost} onChange={handleInputChange} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm p-2" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" disabled={saving} className="bg-primary text-dark-bg font-bold py-2 px-4 rounded-md hover:bg-white transition-colors disabled:opacity-50">
                            {saving ? 'Salvando...' : 'Salvar Configurações'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminSettingsPage;
