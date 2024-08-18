import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BuyPage.css';

const BuyPage = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchData();
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products'); // Adjust URL if needed
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleFavorite = (product) => {
    const isFavorite = favorites.some(fav => fav.id === product.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.id !== product.id);
    } else {
      updatedFavorites = [...favorites, product];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (productId) => {
    return favorites.some(fav => fav.id === productId);
  };

  return (
    <div className="buy-page">
      <h1>Product For Sale</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product">
            <Link to={`/product/${product.id}`}>
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h2>{product.name}</h2>
            </Link>
            <button
              className={`heart-button ${isFavorite(product.id) ? 'favorite' : ''}`}
              onClick={() => toggleFavorite(product)}
            >
              ♥
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyPage;
