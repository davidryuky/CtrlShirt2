
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product, Category } from '../../types';
import { mockApi } from '../../services/mockApi';
import ProductCard from '../../components/product/ProductCard';

const HomePage: React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [newArrivals, setNewArrivals] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [allProducts, allCategories] = await Promise.all([
                    mockApi.getProducts(),
                    mockApi.getCategories()
                ]);
                setFeaturedProducts(allProducts.slice(0, 4));
                setNewArrivals(allProducts.slice(4, 8));
                setCategories(allCategories);
            } catch (error) {
                console.error("Failed to fetch home page data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center text-primary text-2xl font-press-start">Loading Loot...</div>;
    }

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="bg-dark-card p-8 md:p-12 rounded-lg border-2 border-primary shadow-glow-primary text-center">
                <h1 className="text-3xl md:text-5xl font-press-start text-primary mb-4 animate-hologram">NEW LOOT DROPPED!</h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                    As melhores estampas do universo geek, com qualidade lendária para o seu inventário.
                </p>
                <Link to="/products" className="bg-primary text-dark-bg font-bold py-3 px-8 rounded-md text-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                    VER TODO O LOOT
                </Link>
            </section>

            {/* Featured Products */}
            <section>
                <h2 className="text-3xl font-press-start text-white mb-6">Itens em Destaque</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
            
            {/* New Arrivals */}
             <section>
                <h2 className="text-3xl font-press-start text-white mb-6">Novos Drops</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {newArrivals.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section>
                <h2 className="text-3xl font-press-start text-white mb-6 text-center">Explorar Categorias</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {categories.map(category => (
                        <Link key={category.id} to={`/products?category=${category.slug}`} className="bg-dark-card border-2 border-dark-border p-6 rounded-lg text-center font-semibold text-white hover:border-secondary hover:shadow-glow-secondary transition-all duration-300">
                            {category.name}
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
