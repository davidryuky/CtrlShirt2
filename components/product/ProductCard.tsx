
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-dark-card border-2 border-dark-border rounded-lg overflow-hidden group transition-all duration-300 hover:border-primary hover:shadow-glow-primary">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white truncate">{product.name}</h3>
          <p className="text-2xl font-bold text-accent mt-2">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
