
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, Category } from '../../types';
import { mockApi } from '../../services/mockApi';
import ProductCard from '../../components/product/ProductCard';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState({
        category: searchParams.get('category') || 'all',
        size: 'all',
        price: 'all',
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [allProducts, allCategories] = await Promise.all([
                    mockApi.getProducts(),
                    mockApi.getCategories()
                ]);
                setProducts(allProducts);
                setCategories(allCategories);
            } catch (error) {
                console.error("Failed to fetch products data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        
        const newSearchParams = new URLSearchParams(searchParams);
        if (name === 'category' && value !== 'all') {
            newSearchParams.set('category', value);
        } else if (name === 'category' && value === 'all') {
            newSearchParams.delete('category');
        }
        setSearchParams(newSearchParams);
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const categoryMatch = filters.category === 'all' || 
                categories.find(c => c.slug === filters.category)?.id === product.categoryId;

            const sizeMatch = filters.size === 'all' || 
                product.sizes.some(s => s.size === filters.size && s.stock > 0);
                
            const priceMatch = filters.price === 'all' ||
                (filters.price === 'under100' && product.price < 100) ||
                (filters.price === 'over100' && product.price >= 100);

            return categoryMatch && sizeMatch && priceMatch;
        });
    }, [products, filters, categories]);

    return (
        <div>
            <h1 className="text-4xl font-press-start text-primary mb-8">Nosso Loot</h1>

            {/* Filters */}
            <div className="bg-dark-card border-2 border-dark-border p-4 rounded-lg mb-8 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Categoria</label>
                    <select id="category" name="category" value={filters.category} onChange={handleFilterChange} className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-white focus:ring-primary focus:border-primary">
                        <option value="all">Todas</option>
                        {categories.map(cat => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}
                    </select>
                </div>
                <div className="flex-1">
                    <label htmlFor="size" className="block text-sm font-medium text-gray-300 mb-1">Tamanho</label>
                     <select id="size" name="size" value={filters.size} onChange={handleFilterChange} className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-white focus:ring-primary focus:border-primary">
                        <option value="all">Todos</option>
                        <option value="P">P</option>
                        <option value="M">M</option>
                        <option value="G">G</option>
                        <option value="GG">GG</option>
                        <option value="XG">XG</option>
                    </select>
                </div>
                 <div className="flex-1">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Preço</label>
                    <select id="price" name="price" value={filters.price} onChange={handleFilterChange} className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-white focus:ring-primary focus:border-primary">
                        <option value="all">Qualquer Preço</option>
                        <option value="under100">Até R$100</option>
                        <option value="over100">Acima de R$100</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center text-primary text-xl font-press-start">Carregando Itens...</div>
            ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-400 text-lg py-16">
                    <p>Nenhum item encontrado com esses filtros.</p>
                    <p>Tente ajustar sua busca por loot!</p>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
