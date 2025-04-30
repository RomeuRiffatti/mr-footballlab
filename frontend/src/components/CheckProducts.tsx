import React from "react";
import "../styles/CheckProducts.css";
import { Plus, Minus, Trash } from "@phosphor-icons/react";
import { useProducts } from "../contexts/ProductsContext";
import { BASE_URL } from "../endpoints/api";


interface Product {
  id: number;
  brand: string;
  line: string;
  image: string;
  price: number;
  rating: number;
  color: string;
  amount: number;
  type: string;
  boot: boolean;
  description?: string;
}

interface CartItem {
  cart_id: string;
  product: Product;
  amount: number;
  size: number;
}

const CheckProducts: React.FC = () => {
  const {
    cartItems,
    handleIncreaseBootAmountInCart,
    handleDecreaseBootAmountInCart,
    handleRemoveBootFromCart
  } = useProducts();

  function increaseBootAmountInCart(boot: CartItem) {
    handleIncreaseBootAmountInCart(boot);
  }

  function decreaseBootAmountInCart(boot: CartItem) {
    handleDecreaseBootAmountInCart(boot);
  }

  function removeBootFromCart(boot: CartItem) {
    handleRemoveBootFromCart(boot);
  }

  return (
    <div className="cart-sidebar-check">
      <h2>Conferir Produtos</h2>

      <div className="cart-labels-check">
        <p className="cart-label-check">Produto</p>
        <p className="cart-label-check">Preço</p>
        <p className="cart-label-check">Quantidade</p>
      </div>

      {cartItems?.map((boot, index) => (
        <div className="boots-in-cart-container-check" key={index}>
          <div className="boots-in-cart-info-container-check">
            <img
              className="boots-in-cart-img-check"
              src={`https://discerning-charisma-production.up.railway.app${boot.product.image}`}
              alt=""
            />
            <p>
              {boot.product.brand} {boot.product.line} {boot.product.color} T:{" "}
              {boot.size}
            </p>
          </div>

          <div className="boots-in-cart-price-check">
            R$: {boot.product.price.toFixed(2)}
          </div>

          <div className="boots-in-cart-amount-container-check">
            <p className="cart-amount-check">{boot.amount}</p>
            <div className="buttons-in-cart-container-check">
              <button
                className="plus-minus-trash-button-check"
                onClick={() => increaseBootAmountInCart(boot)}
              >
                <Plus size={16} color="#ff6600" />
              </button>
              <button
                className="plus-minus-trash-button-check"
                onClick={() => decreaseBootAmountInCart(boot)}
              >
                <Minus size={16} color="#ff6600" />
              </button>
              <button
                onClick={() => removeBootFromCart(boot)}
                className="plus-minus-trash-button-check"
              >
                <Trash size={16} color="#858282" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckProducts;
