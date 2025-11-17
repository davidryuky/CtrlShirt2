import React, { useState, useEffect, useCallback } from 'react';
import { mockApi } from '../../services/mockApi';
import { Category } from '../../types';

const AdminCategoriesPage: React.FC = () => {
    // This is a simplified implementation for a demo.
    // In a real app, you would have dedicated edit/delete functions calling the API.
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState('');

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const data = await mockApi.getCategories();
            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        alert("A criação/edição de categorias é uma demonstração. A API mock não suporta isso ainda.");
        // Mock implementation:
        const newCategory = { id: Date.now().toString(), name: newCategoryName, slug: newCategoryName.toLowerCase().replace(/ /g, '-') };
        setCategories([...categories, newCategory]);
        setNewCategoryName('');
    };

    if (loading) return <p>Carregando categorias...</p>;

    return (
        <div>
            <h1 className="text-3xl font-press-start text-white mb-8">Gerenciar Categorias</h1>
            
            <div className="mb-8 bg-dark-card p-6 rounded-lg border border-dark-border">
                <h2 className="text-xl font-bold mb-4">Nova Categoria</h2>
                <form onSubmit={handleCreate} className="flex gap-4">
                    <input 
                        type="text" 
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Nome da categoria"
                        className="flex-grow bg-dark-bg border-dark-border rounded-md shadow-sm p-2"
                    />
                    <button type="submit" className="bg-primary text-dark-bg font-bold py-2 px-4 rounded-md hover:bg-white transition-colors">
                        Criar
                    </button>
                </form>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-dark-border">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Nome</th>
                            <th className="p-4">Slug</th>
                            <th className="p-4">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id} className="border-b border-dark-border last:border-b-0">
                                <td className="p-4 text-gray-400">{category.id}</td>
                                <td className="p-4 font-semibold">{category.name}</td>
                                <td className="p-4 text-gray-400">{category.slug}</td>
                                <td className="p-4 space-x-2">
                                    <button className="text-primary hover:underline disabled:opacity-50" disabled>Editar</button>
                                    <button className="text-secondary hover:underline disabled:opacity-50" disabled>Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCategoriesPage;
