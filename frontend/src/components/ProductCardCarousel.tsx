import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "../styles/ProductCardCarousel.css";
import { api, BASE_URL } from "../endpoints/api";
import { Link } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  brand: string;
  line: string;
  image: string;
  price: number;
  rating: number;
}

const ProductCardCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [fade, setFade] = useState<"fade-in" | "fade-out">("fade-in");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetchProducts();
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    const fetchProducts = async () => {
      try {
        console.log("buscandoprodutos");
        const response = await api.get(
          "get_soccer_boots"
        );
        const data = response.data
        console.log("FETCH:", data, typeof data);

        setProducts(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Erro ao buscar produtos:",
            error.response?.data || error.message
          );
        } else {
          console.error("Erro desconhecido ao buscar produtos:", error);
        }
      }
    };

  const rotateLeft = () => {
    const first = products[0];
    setProducts([...products.slice(1), first]);
    setFade("fade-in");
  };

  const rotateRight = () => {
    const last = products[products.length - 1];
    setProducts([last, ...products.slice(0, products.length - 1)]);
    setFade("fade-in");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      rotateLeft();
    }, 20000000);
    return () => clearInterval(interval);
  }, [products]);

  const handleVisibleProducts = () => {
    if (windowWidth <= 550) {
      return products.slice(0, 1);
    } else if (windowWidth <= 768) {
      return products.slice(0, 2);
    } else if (windowWidth <= 1500) {
      return products.slice(0, 3);
    } else {
      return products.slice(0, 4);
    }
  };
  const visibleProducts = handleVisibleProducts();

  return (
    <section className="product-carousel-horizontal">
      <h2 className="carousel-title">Nossas Chuteiras</h2>
      <button className="arrow-btn left" onClick={rotateRight}>
        ❮
      </button>
      <div className={`carousel-track ${fade}`}>
        {visibleProducts.map((product) => (
          <div className="product-card-carroussel" key={product.id}>
            <img
              src={`${BASE_URL}${product.image}`}
              alt={product.brand}
              className="product-img-caroussel"
            />
            <h3 className="product-info-caroussel">
              {product.brand} {product.line}
            </h3>
            <div className="rating-caroussel">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < product.rating ? "#ffc107" : "#e4e5e9"}
                />
              ))}
            </div>
            <p className="price-caroussel">R$: {product.price}</p>
            <div className="card-buttons-caroussel">
            <Link className="link-button-carroussel" to={`/product-detail/${product.id}`}>
                Ver
            </Link>
            </div>
          </div>
        ))}
      </div>
      <button className="arrow-btn right" onClick={rotateLeft}>
        ❯
      </button>
    </section>
  );
};

export default ProductCardCarousel;
