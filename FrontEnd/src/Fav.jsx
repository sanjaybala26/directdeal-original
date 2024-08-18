import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Fav.css';

const Fav = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter(product => product.id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="fav-page">
      <h1>Your Favorites</h1>
      <div className="product-list">
        {favorites.map((product, index) => (
          <div key={index} className="product">
            <Link to={`/product/${product.id}`}>
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h2>{product.name}</h2>
            </Link>
            <button
              className="remove-from-favorites-button"
              onClick={() => removeFromFavorites(product.id)}
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fav;
