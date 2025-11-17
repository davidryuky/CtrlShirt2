
import React from 'react';
import { Link } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-press-start text-primary mb-4">Meus Favoritos</h1>
      <p className="text-gray-400 mb-8">Aqui você encontrará seus itens salvos. Esta funcionalidade está em construção!</p>
      <Link to="/products" className="bg-primary text-dark-bg font-bold py-3 px-8 rounded-md text-lg hover:bg-white transition-all duration-300">
          EXPLORAR PRODUTOS
      </Link>
    </div>
  );
};

export default FavoritesPage;
