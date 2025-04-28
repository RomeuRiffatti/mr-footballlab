import { FaShoppingCart } from "react-icons/fa";
import { Product, useProducts } from "../../contexts/ProductsContext";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api, BASE_URL } from "../../endpoints/api"; 

const ProductGrid: React.FC = () => {
  const { products, handleAddToCartContext, handleOpenCart } = useProducts();
  const [size, setSize] = useState(38);

  function handleAddToCart(productToAdd: Product, size: number) {
    handleAddToCartContext(productToAdd, size);
    handleOpenCart(true);
  }

  function handleSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSize(parseInt(e.target.value));
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <Link to={`/product-detail/${product.id}`}>
            <img
              src={`https://discerning-charisma-production.up.railway.app${product.image}`}
              alt={product.brand}
              className="product-image"
            />
          </Link>
          <h4>{product.brand} {product.line}</h4>
          <p className="product-price">R$ {product.price.toFixed(2)}</p>
          <p className="size-label">
            Tamanho:
            <select defaultValue={"40"} onChange={handleSizeChange}>
              {[...Array(12)].map((_, i) => {
                const sizeValue = 35 + i;
                return <option key={sizeValue} value={sizeValue}>{sizeValue}</option>;
              })}
            </select>
          </p>
          <button
            onClick={() => handleAddToCart(product, size)}
            className="cartshoes-btn"
          >
            <FaShoppingCart size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
