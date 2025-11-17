import React, { useState, useEffect, useCallback } from 'react';
import { mockApi } from '../../services/mockApi';
import { Category } from '../../types';

const CategoryModal: React.FC<{
    category: Category | null;
    onClose: () => void;
    onSave: (category: Category | Omit<Category, 'id' | 'slug'>) => void;
}> = ({ category, onClose, onSave }) => {
    const [name, setName] = useState(category?.name || '');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave(category ? { ...category, name } : { name });
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-dark-card border border-dark-border rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{category ? 'Editar' : 'Nova'} Categoria</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="categoryName" className="block text-sm font-medium text-gray-300">Nome</label>
                    <input
                        id="categoryName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome da categoria"
                        className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm p-2"
                        required
                    />
                    <div className="flex justify-end gap-4 mt-6">
                        <button type="button" onClick={onClose} className="bg-dark-border text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">Cancelar</button>
                        <button type="submit" className="bg-primary text-dark-bg font-bold py-2 px-4 rounded-md hover:bg-white transition-colors">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const AdminCategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

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

    const handleSave = async (categoryData: Category | Omit<Category, 'id' | 'slug'>) => {
        try {
            if ('id' in categoryData) {
                await mockApi.updateCategory(categoryData);
            } else {
                await mockApi.createCategory(categoryData);
            }
            fetchCategories();
        } catch (error) {
            console.error("Failed to save category:", error);
            alert("Erro ao salvar categoria.");
        } finally {
            closeModal();
        }
    };

    const handleDelete = async (categoryId: string) => {
        if (window.confirm('Tem certeza que deseja deletar esta categoria? Isso pode afetar produtos existentes.')) {
            try {
                await mockApi.deleteCategory(categoryId);
                fetchCategories();
            } catch (error) {
                console.error("Failed to delete category:", error);
                alert("Erro ao deletar categoria.");
            }
        }
    };

    const openModal = (category: Category | null = null) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingCategory(null);
        setIsModalOpen(false);
    };

    if (loading) return <p>Carregando categorias...</p>;

    return (
        <div>
            {isModalOpen && <CategoryModal category={editingCategory} onClose={closeModal} onSave={handleSave} />}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-press-start text-white">Gerenciar Categorias</h1>
                 <button onClick={() => openModal()} className="bg-primary text-dark-bg font-bold py-2 px-4 rounded-md hover:bg-white transition-colors">
                    + Nova Categoria
                </button>
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
                                    <button onClick={() => openModal(category)} className="text-primary hover:underline">Editar</button>
                                    <button onClick={() => handleDelete(category.id)} className="text-secondary hover:underline">Deletar</button>
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
