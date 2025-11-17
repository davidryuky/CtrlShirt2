import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApi } from '../../services/mockApi';
import { Product, Category, ProductSize } from '../../types';

const emptyProduct: Omit<Product, 'id' | 'slug' | 'reviews'> = {
    name: '',
    description: '',
    price: 0,
    categoryId: '',
    images: [''],
    sizes: [
        { size: 'P', stock: 0 },
        { size: 'M', stock: 0 },
        { size: 'G', stock: 0 },
        { size: 'GG', stock: 0 },
        { size: 'XG', stock: 0 },
    ],
    tags: [],
};

const AdminProductEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Omit<Product, 'id' | 'slug' | 'reviews'> | Product>({ ...emptyProduct });
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [isNew, setIsNew] = useState(true);

    useEffect(() => {
        mockApi.getCategories().then(setCategories);

        if (id) {
            setIsNew(false);
            setLoading(true);
            mockApi.getProducts().then(products => {
                const p = products.find(p => p.id === id);
                if (p) {
                    setProduct(p);
                }
                setLoading(false);
            });
        } else {
            setIsNew(true);
            setProduct({ ...emptyProduct });
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }));
    };
    
    const handleSizeChange = (size: ProductSize['size'], stock: string) => {
        setProduct(prev => ({
            ...prev,
            sizes: prev.sizes.map(s => s.size === size ? { ...s, stock: parseInt(stock) || 0 } : s),
        }));
    };
    
    const handleImageChange = (index: number, value: string) => {
        const newImages = [...product.images];
        newImages[index] = value;
        setProduct(prev => ({ ...prev, images: newImages }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isNew) {
                await mockApi.createProduct(product as Omit<Product, 'id' | 'slug' | 'reviews'>);
            } else {
                await mockApi.updateProduct(product as Product);
            }
            navigate('/admin/products');
        } catch (error) {
            console.error("Failed to save product:", error);
            alert("Erro ao salvar produto.");
            setLoading(false);
        }
    };

    if (loading && !isNew) return <p>Carregando produto...</p>;

    return (
        <div>
            <h1 className="text-3xl font-press-start text-white mb-8">
                {isNew ? 'Novo Produto' : 'Editar Produto'}
            </h1>
            <form onSubmit={handleSubmit} className="bg-dark-card p-6 rounded-lg border border-dark-border space-y-6">
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome do Produto</label>
                    <input type="text" id="name" name="name" value={product.name} onChange={handleInputChange} required className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm p-2" />
                </div>
                
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300">Descrição</label>
                    <textarea id="description" name="description" value={product.description} onChange={handleInputChange} rows={4} required className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm p-2"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-300">Preço</label>
                        <input type="number" id="price" name="price" value={product.price} onChange={handleInputChange} required step="0.01" className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm p-2" />
                    </div>
                     <div>
                        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-300">Categoria</label>
                        <select id="categoryId" name="categoryId" value={product.categoryId} onChange={handleInputChange} required className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm p-2">
                            <option value="">Selecione...</option>
                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">Estoque por Tamanho</label>
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {product.sizes.map(s => (
                             <div key={s.size}>
                                <label htmlFor={`stock-${s.size}`} className="block text-xs font-medium text-gray-400">{s.size}</label>
                                <input type="number" id={`stock-${s.size}`} value={s.stock} onChange={(e) => handleSizeChange(s.size, e.target.value)} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm p-2"/>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">Imagens (URLs)</label>
                    {product.images.map((img, index) => (
                        <input key={index} type="text" value={img} onChange={(e) => handleImageChange(index, e.target.value)} placeholder="https://..." className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md shadow-sm p-2 mb-2"/>
                    ))}
                    {/* A simple implementation allows only one image for now to keep the UI clean */}
                </div>


                <div className="flex justify-end">
                    <button type="button" onClick={() => navigate('/admin/products')} className="bg-dark-border text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors mr-4">
                        Cancelar
                    </button>
                    <button type="submit" disabled={loading} className="bg-primary text-dark-bg font-bold py-2 px-4 rounded-md hover:bg-white transition-colors disabled:opacity-50">
                        {loading ? 'Salvando...' : 'Salvar Produto'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProductEditPage;
