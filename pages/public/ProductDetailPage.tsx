
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../types';
import { mockApi } from '../../services/mockApi';
import { useAppContext } from '../../context/AppContext';

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};


const ProductDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { addToCart } = useAppContext();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState<'P' | 'M' | 'G' | 'GG' | 'XG' | null>(null);
    const [mainImage, setMainImage] = useState<string>('');
    const [notification, setNotification] = useState<string>('');

    useEffect(() => {
        const fetchProduct = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                const fetchedProduct = await mockApi.getProductBySlug(slug);
                if (fetchedProduct) {
                    setProduct(fetchedProduct);
                    setMainImage(fetchedProduct.images[0]);
                }
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    const handleAddToCart = () => {
        if (!product || !selectedSize) {
            setNotification('Por favor, selecione um tamanho.');
            setTimeout(() => setNotification(''), 3000);
            return;
        }
        
        const cartItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: selectedSize,
            quantity: 1,
        };
        addToCart(cartItem);
        setNotification(`${product.name} adicionado ao carrinho!`);
        setTimeout(() => setNotification(''), 3000);
    };

    if (loading) {
        return <div className="text-center text-primary text-2xl font-press-start">Loading Item Data...</div>;
    }

    if (!product) {
        return <div className="text-center text-secondary text-2xl font-press-start">Item não encontrado!</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                 {/* Image Gallery */}
                <div>
                    <div className="aspect-square bg-dark-card rounded-lg border-2 border-dark-border overflow-hidden mb-4">
                        <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex space-x-2">
                        {product.images.map((img, index) => (
                            <button key={index} onClick={() => setMainImage(img)} className={`w-20 h-20 rounded-md overflow-hidden border-2 ${mainImage === img ? 'border-primary' : 'border-transparent'}`}>
                                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
                    <p className="text-4xl font-bold text-accent mb-6">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                    
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Descrição</h3>
                        <p className="text-gray-300 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Size Selector */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Tamanho:</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes.map(s => (
                                <button 
                                    key={s.size}
                                    onClick={() => s.stock > 0 && setSelectedSize(s.size)}
                                    disabled={s.stock === 0}
                                    className={`w-14 h-14 rounded-md border-2 font-bold transition-colors duration-200 ${
                                        selectedSize === s.size ? 'bg-primary text-dark-bg border-primary' : 'bg-dark-card border-dark-border'
                                    } ${s.stock > 0 ? 'hover:border-primary cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                                >
                                    {s.size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-primary text-dark-bg font-bold py-4 px-8 rounded-md text-lg hover:bg-white hover:shadow-lg transition-all duration-300 shadow-glow-primary"
                    >
                        ADICIONAR AO CARRINHO
                    </button>
                    {notification && <p className="text-center mt-4 text-accent">{notification}</p>}
                </div>
            </div>
            
            {/* Reviews */}
            <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-4">Avaliações</h3>
                <div className="space-y-6">
                    {product.reviews.length > 0 ? product.reviews.map(review => (
                        <div key={review.id} className="bg-dark-card p-4 rounded-lg border border-dark-border">
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-semibold text-white">{review.author}</p>
                                <StarRating rating={review.rating} />
                            </div>
                            <p className="text-gray-400">{review.comment}</p>
                        </div>
                    )) : (
                        <div className="bg-dark-card p-4 rounded-lg border border-dark-border text-center text-gray-400">
                            <p>Este item ainda não possui avaliações. Seja o primeiro a avaliar!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
