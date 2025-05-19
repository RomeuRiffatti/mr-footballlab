
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import { api } from "../endpoints/api";

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

export interface Color {
  color: string;
  color_code: string;
}

export interface Brand {
  brand: string;
}

export interface Line {
  line: string;
}

interface CartItem {
  cart_id: string;
  product: Product;
  amount: number;
  size: number;
}

interface ProductsContextType {
  products: Product[];
  colors: Color[];
  brands: Brand[];
  lines: Line[];
  cartItems: CartItem[];
  isCartOpen: boolean;
  fetchCartItems: () => void;
  changeSelectedBrand: (selectedBrand: string) => void;
  changeSelectedColor: (selectedColor: string) => void;
  changeBootType: (selectedBootType: string) => void;
  changeBootie: (selectedBootie: string) => void;
  clearCartItems: () => void;
  handleAddToCartContext: (productToadd: Product, size: number) => void;
  handleIncreaseBootAmountInCart: (bootToIncrease: CartItem) => void;
  handleDecreaseBootAmountInCart: (bootToDecrease: CartItem) => void;
  handleRemoveBootFromCart: (bootToRemove: CartItem) => void;
  handleOpenCart: (value: boolean) => void;
}

const ProductContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [color, setColor] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brand, setBrand] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [type, setType] = useState("");
  const [bootie, setBootie] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCartItems = async () => {
    const getOrCreateCartId = () => {
      let cartId = localStorage.getItem("cartId");
      if (!cartId) {
        cartId = crypto.randomUUID();
        localStorage.setItem("cartId", cartId);
      }
      return cartId;
    };
    const cartID = getOrCreateCartId()
    try {
      const response = await api.get(`get_boots_in_cart`, {
        params: {
          cartID, 
        }
      });
      setCartItems(response.data);
    } catch (err) {
      console.error("Erro ao buscar itens do carrinho:", err);
    }
  };

  const clearCartItems = async () => {
    setCartItems([]);
  };

  const handleAddToCartContext = async (
    productToAdd: Product,
    size: number
  ) => {
    const getOrCreateCartId = () => {
      let cartId = localStorage.getItem("cartId");
      if (!cartId) {
        cartId = crypto.randomUUID();
        localStorage.setItem("cartId", cartId);
      }
      return cartId;
    };

    const toCartData = {
      product: productToAdd,
      cart_id: getOrCreateCartId(),
      size,
    };

    try {
      const response = await api.post("add_boot_to_cart", toCartData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Produto Adicionado ao carrinho!");
      // Após adicionar, atualize o carrinho
      await fetchCartItems();
    } catch (err) {
      console.log(err);
    }
  };

  const handleIncreaseBootAmountInCart = async (bootToIncrease: CartItem) => {
    const data = {
      cart_id: bootToIncrease.cart_id,
      boot_id: bootToIncrease.product.id,
      amount: bootToIncrease.amount,
      size: bootToIncrease.size,
    };
    try {
      const response = await api.patch("increase_boot_amount_in_cart", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetchCartItems();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecreaseBootAmountInCart = async (bootToDecrease: CartItem) => {
    const data = {
      cart_id: bootToDecrease.cart_id,
      boot_id: bootToDecrease.product.id,
      amount: bootToDecrease.amount,
    };
    try {
      const response = await api.patch("decrease_boot_amount_in_cart", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetchCartItems();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveBootFromCart = async (bootToRemove: CartItem) => {
    const data = {
      cart_id: bootToRemove.cart_id,
      boot_id: bootToRemove.product.id,
    };
    try {
      const response = await api.delete("remove_boot_from_cart", {
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetchCartItems();
    } catch (err) {
      console.log(err);
    }
  };

  const changeBootType = (selectedBootType: string) => {
    setType(selectedBootType);
  };

  const changeSelectedColor = (selectedColor: string) => {
    setColor(selectedColor);
  };

  const changeSelectedBrand = (selectedBrand: string) => {
    setBrand(selectedBrand);
  };

  const changeBootie = (selectedBootie: string) => {
    setBootie(selectedBootie);
  };

  const handleOpenCart = (value: boolean) => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await api.get("get_soccer_boots", {
          params: {
            color,
            brand,
            type,
            bootie,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos filtrados:", error);
      }
    };

    fetchFilteredProducts();
  }, [color, brand, type, bootie]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [brandsResponse, linesResponse, colorsResponse] =
          await Promise.all([
            api.get("get_brands"),
            api.get("get_lines"),
            api.get("get_colors"),
          ]);

        setBrands(brandsResponse.data);
        setLines(linesResponse.data);
        setColors(colorsResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados iniciais:", error);
      } finally {
        fetchCartItems();
      }
    };

    fetchInitialData();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        fetchCartItems,
        changeSelectedColor,
        changeSelectedBrand,
        changeBootType,
        changeBootie,
        clearCartItems,
        handleAddToCartContext,
        handleIncreaseBootAmountInCart,
        handleDecreaseBootAmountInCart,
        handleRemoveBootFromCart,
        handleOpenCart,
        products,
        cartItems,
        colors,
        brands,
        lines,
        isCartOpen,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("Erro no Provider");
  }
  return context;
};
