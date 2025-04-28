import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductsContext";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import "../../styles/DetailProduct.css";

const ProductDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, handleAddToCartContext, handleOpenCart } = useProducts();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const product = products.find((p) => p.id === Number(id));
  if (!product) return <p className="not-found">Produto não encontrado.</p>;

  const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

  const handleAddToCart = () => {
    if (selectedSize) {
      handleAddToCartContext(product, selectedSize);
      handleOpenCart(true);
    } else {
      alert("Selecione um tamanho primeiro.");
    }
  };

  return (
    <div className="detail-container">
      <div className="image-gallery">
        <img src={`https://discerning-charisma-production.up.railway.app${product.image}`} alt={product.line} />
      </div>

      <div className="product-info">
        <h2>{product.brand} {product.line}</h2>
        <p className="price">R$ {product.price.toFixed(2)}</p>

        <div className="colors-info">
          <span><strong>Cor:</strong> {product.color}</span>
          <span><strong>Tipo:</strong> {product.type}</span>
          <span><strong>Botinha:</strong> {product.boot ? "Sim" : "Não"}</span>
        </div>

        <div className="size-selector">
          <label>Selecione um tamanho:</label>
          <div className="size-options">
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <FaShoppingCart /> Adicionar ao carrinho
        </button>

        {/* <button className="favorite-btn">
          <FaHeart /> Salvar como favorito
        </button> */}

        <p className="description">
          {product.description || "Sem descrição disponível."}
        </p>
      </div>
    </div>
  );
};

export default ProductDetailView;
