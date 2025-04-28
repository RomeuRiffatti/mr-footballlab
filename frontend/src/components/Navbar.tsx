import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, Trash } from "@phosphor-icons/react";
import { FaBars, FaShoppingCart, FaSearch, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";
import { useProducts } from "../contexts/ProductsContext";

export interface Product {
  id: number;
  brand: string;
  line: string;
  image: string;
  price: number;
  rating: number;
  color: string;
  amount: number;
  type: string; // Ex: "Campo", "Futsal"
  boot: boolean; // Se tem botinha ou não
  description?: string; // Descrição do produto, opcional
}
interface CartItem {
  cart_id: string;
  product: Product;
  amount: number;
  size: number;
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    cartItems,
    isCartOpen,
    handleIncreaseBootAmountInCart,
    handleDecreaseBootAmountInCart,
    handleOpenCart,
    handleRemoveBootFromCart,
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

  function openCloseCart(value: boolean) {
    handleOpenCart(value);
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="top-bar">
            <div className="left-section">
              <button
                className="menu-btn mobile-only"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
              <Link to="/" className="logo">
                <img src="/imagens/logo.jpeg" alt="Logo" />
              </Link>
            </div>

            <div className="search-desktop">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="O que você procura?"
                />
                <button className="search-btn">
                  <FaSearch />
                </button>
              </div>
            </div>

            {!isMobileMenuOpen && (
              <div className="cart-container">
                <button
                  className="cart-btn"
                  onClick={() => openCloseCart(!isCartOpen)}
                >
                  <FaShoppingCart />
                  <span>Carrinho</span>
                </button>
              </div>
            )}
          </div>

          <div className="center-section">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="O que você procura?"
              />
              <button className="search-btn">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div className="cart-container inside-menu">
              <button
                className="cart-btn"
                onClick={() => openCloseCart(!isCartOpen)}
              >
                <FaShoppingCart />
                <span>Carrinho</span>
              </button>
            </div>
            <ul className="mobile-header-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">Sobre nós</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
        )}
      </nav>

      {isCartOpen && (
        <div className="cart-modal">
          <div className="cart-sidebar">
            <button className="close-btn" onClick={() => openCloseCart(false)}>
              <FaTimes />
            </button>
            <h2>MEU CARRINHO</h2>
            <div className="cart-labels">
              <p className="cart-label-procuct">Produto</p>
              <p className="cart-label-price">Preço</p>
              <p className="cart-label-amount">Quantidade</p>
            </div>
            {cartItems?.map((boot, index) => (
              <div className="boots-in-cart-container" key={index}>
                <div className="boots-in-cart-info-container">
                  <img
                    className="boots-in-cart-img"
                    src={`https://discerning-charisma-production.up.railway.app${boot.product.image}`}
                    alt=""
                  />
                  <p>
                    {boot.product.brand} {boot.product.line} {boot.product.color} T: {boot.size}
                  </p>
                </div>
                <div className="boots-in-cart-price">
                  R$:{boot.product.price.toFixed(2)}
                </div>
                <div className="boots-in-cart-amount-container">
                  <p className="cart-amount">{boot.amount}</p>
                  <div className="buttons-in-cart-container">
                    <button
                      className="plus-minus-trash-button"
                      onClick={() => increaseBootAmountInCart(boot)}
                    >
                      <Plus size={16} color="#ff6600" />
                    </button>
                    <button
                      className="plus-minus-trash-button"
                      onClick={() => decreaseBootAmountInCart(boot)}
                    >
                      <Minus size={16} color="#ff6600" />
                    </button>
                    <button
                      className="plus-minus-trash-button"
                      onClick={() => removeBootFromCart(boot)}
                    >
                      <Trash size={16} color="#858282" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => openCloseCart(false)} className="finish-shopping-button-cart">
              <Link to="/finish" /*onClick={ criar Preferência aqui? }*/><span>Finalizar Compra</span></Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
