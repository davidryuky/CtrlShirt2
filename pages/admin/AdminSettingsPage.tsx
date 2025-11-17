import React from 'react';

const AdminSettingsPage: React.FC = () => {
    // This is a placeholder page. In a real app, it would manage global settings.
    return (
        <div>
            <h1 className="text-3xl font-press-start text-white mb-8">Configurações Gerais</h1>
            <div className="bg-dark-card p-6 rounded-lg border border-dark-border space-y-6">
                 <div>
                    <label htmlFor="storeName" className="block text-sm font-medium text-gray-300">Nome da Loja</label>
                    <input type="text" id="storeName" value="CtrlShirt" disabled className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm p-2 opacity-50" />
                </div>
                 <div>
                    <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-300">Descrição da Loja</label>
                    <textarea id="storeDescription" rows={3} disabled className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm p-2 opacity-50">
                        A complete online store for geek and nerd style t-shirts.
                    </textarea>
                </div>
                 <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300">Email de Contato</label>
                    <input type="email" id="contactEmail" value="contato@ctrlshirt.com" disabled className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm p-2 opacity-50" />
                </div>
                <div className="pt-4 text-center text-gray-400">
                    <p>Funcionalidade de configurações a ser implementada.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminSettingsPage;
