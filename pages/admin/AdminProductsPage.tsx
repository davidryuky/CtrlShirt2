import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../../services/mockApi';
import { Product, Category, ProductSize } from '../../types';

const AdminProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const [productsData, categoriesData] = await Promise.all([
                mockApi.getProducts(),
                mockApi.getCategories()
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = async (productId: string) => {
        if (window.confirm('Tem certeza que deseja deletar este produto?')) {
            try {
                await mockApi.deleteProduct(productId);
                fetchProducts(); // Refresh list
            } catch (error) {
                console.error("Failed to delete product:", error);
                alert('Erro ao deletar produto.');
            }
        }
    };

    const getCategoryName = (categoryId: string) => {
        return categories.find(c => c.id === categoryId)?.name || 'N/A';
    };
    
    const getTotalStock = (sizes: ProductSize[]) => {
        return sizes.reduce((acc, size) => acc + size.stock, 0);
    }

    if (loading) {
        return <p>Carregando produtos...</p>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-press-start text-white">Gerenciar Produtos</h1>
                <Link to="/admin/products/new" className="bg-primary text-dark-bg font-bold py-2 px-4 rounded-md hover:bg-white transition-colors">
                    + Novo Produto
                </Link>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-dark-border">
                        <tr>
                            <th className="p-4">Imagem</th>
                            <th className="p-4">Nome</th>
                            <th className="p-4">Categoria</th>
                            <th className="p-4">Preço</th>
                            <th className="p-4">Estoque Total</th>
                            <th className="p-4">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-b border-dark-border last:border-b-0">
                                <td className="p-4"><img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-md" /></td>
                                <td className="p-4 font-semibold">{product.name}</td>
                                <td className="p-4 text-gray-400">{getCategoryName(product.categoryId)}</td>
                                <td className="p-4 text-accent">R$ {product.price.toFixed(2)}</td>
                                <td className="p-4">{getTotalStock(product.sizes)}</td>
                                <td className="p-4 space-x-2">
                                    <Link to={`/admin/products/edit/${product.id}`} className="text-primary hover:underline">Editar</Link>
                                    <button onClick={() => handleDelete(product.id)} className="text-secondary hover:underline">Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProductsPage;
