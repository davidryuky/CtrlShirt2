import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useAppContext } from '../../context/AppContext';
import StarRating from './StarRating';

const HeartIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useAppContext();
  const [added, setAdded] = useState(false);

  const avgRating = useMemo(() => {
    if (!product.reviews || product.reviews.length === 0) return 0;
    return product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
  }, [product.reviews]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const defaultSize = product.sizes.find(s => s.size === 'M' && s.stock > 0) || product.sizes.find(s => s.stock > 0);
    if (defaultSize) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: defaultSize.size,
        quantity: 1,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };
  
  const hasStock = useMemo(() => product.sizes.some(s => s.stock > 0), [product.sizes]);

  return (
    <div className="bg-dark-card border-2 border-dark-border rounded-lg overflow-hidden group transition-all duration-300 flex flex-col hover:border-primary hover:shadow-glow-primary">
      <Link to={`/products/${product.slug}`} className="block aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-white leading-tight h-14">{product.name}</h3>
        </Link>
        
        <div className="mt-1 mb-2">
            <StarRating rating={avgRating} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <p className="text-2xl font-bold text-accent">
                R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
            <span className="text-xs font-bold bg-accent/20 text-accent px-2 py-1 rounded-md mt-1 sm:mt-0 w-fit">5% Off no Pix</span>
        </div>

        <div className="mt-auto pt-4 flex gap-2">
            <button
                aria-label="Adicionar aos Favoritos"
                className="p-2 sm:p-3 bg-dark-border rounded-md text-gray-400 hover:text-secondary hover:bg-secondary/20 transition-colors"
            >
                <HeartIcon className="w-5 h-5" />
            </button>
            <button 
                onClick={handleAddToCart}
                disabled={!hasStock || added}
                className={`flex-grow font-bold text-sm sm:text-base py-2 px-3 sm:px-4 rounded-md transition-colors duration-200
                    ${!hasStock ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 
                    added ? 'bg-green-500 text-white' : 
                    'bg-primary text-dark-bg hover:bg-white'}`}
            >
                { !hasStock ? 'Esgotado' : added ? 'Adicionado!' : 'Comprar'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;