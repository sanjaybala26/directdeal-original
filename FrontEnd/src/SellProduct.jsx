import React, { useState } from 'react';
import axios from 'axios';
import './SellProduct.css'; // Import your CSS file for styling

const SellProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    location: '',
    category: '',
    productCondition: '',
    description: '',
    imageUrl: '',
  });

  const username = localStorage.getItem('username'); // Get username from local storage

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/sell', product, {
        headers: {
          'Content-Type': 'application/json',
          'username': username // Include username in headers
        },
      });
      alert('Product listed successfully!');
    } catch (error) {
      console.error('There was an error listing the product!', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="product-form-container">
      <h2>Ｓｅｌｌ Ｙｏｕｒ Ｐｒｏｄｕｃｔ</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="input-box">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={product.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="productCondition"
            placeholder="Condition"
            value={product.productCondition}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Contact Details"
            value={product.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={product.imageUrl}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SellProduct;
