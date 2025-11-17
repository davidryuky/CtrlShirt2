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
            <section 
                className="relative h-96 rounded-lg overflow-hidden flex items-center justify-center text-center p-4 border-2 border-primary shadow-glow-primary"
                style={{ backgroundImage: "url('https://picsum.photos/seed/geek-bg/1920/1080')", backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="absolute inset-0 bg-dark-bg bg-opacity-70 backdrop-blur-xs"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-press-start text-primary mb-4 drop-shadow-lg animate-hologram">Player 1, Press Start</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
                        As melhores estampas do universo geek, com qualidade lendária para o seu inventário.
                    </p>
                    <Link to="/products" className="bg-primary text-dark-bg font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 shadow-glow-primary">
                        VER TODO O LOOT
                    </Link>
                </div>
            </section>

            {/* Categories */}
            <section>
                <h2 className="text-3xl font-press-start text-white mb-6 text-center">Explorar Categorias</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map(category => (
                        <Link key={category.id} to={`/products?category=${category.slug}`} className="relative aspect-video rounded-lg overflow-hidden group flex items-center justify-center p-4 text-center font-bold text-white transition-all duration-300 border-2 border-dark-border hover:border-secondary">
                            <div className="absolute inset-0 bg-dark-card group-hover:bg-secondary/20 transition-all duration-300"></div>
                            <span className="relative z-10 text-lg group-hover:scale-110 transition-transform duration-300">{category.name}</span>
                        </Link>
                    ))}
                    <Link to="/products" className="relative aspect-video rounded-lg overflow-hidden group flex items-center justify-center p-4 text-center font-bold text-white transition-all duration-300 border-2 border-dark-border hover:border-accent">
                        <div className="absolute inset-0 bg-dark-card group-hover:bg-accent/20 transition-all duration-300"></div>
                        <span className="relative z-10 text-lg group-hover:scale-110 transition-transform duration-300">Ver Todo Loot</span>
                    </Link>
                </div>
            </section>

            {/* Featured Products */}
            <section>
                <h2 className="text-3xl font-press-start text-white mb-6">Itens em Destaque</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
            
            {/* New Arrivals */}
             <section>
                <h2 className="text-3xl font-press-start text-white mb-6">Novos Drops</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {newArrivals.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;