import { createContext, ReactNode, useContext, useState } from "react";

import { useProducts } from "./ProductsContext";

interface Addres {
  phone: number,
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  addres_complement: string;
  cep: String;
}

interface PaymentsContextType {
  preferenceId: string;
  createPreference: (name: string, last_name: string, address: Addres) => void;
}

const PaymentsContext = createContext<PaymentsContextType | undefined>(
  undefined
);

export const PaymentsProvider = ({ children }: { children: ReactNode }) => {
  const { cartItems } = useProducts();
  const [ preferenceId, setPreferenceID] = useState("")


  const createPreference = async (name: string, last_name: string ,addres: Addres) => {
    const data = {
      name,
      last_name,
      addres,
      boots: cartItems,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/create_mercado_pago_preference",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setPreferenceID(result.preference_id)
      } else {
        alert(`Erro: ${result.error}`);
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <PaymentsContext.Provider value={{ createPreference, preferenceId }}>
      {children}
    </PaymentsContext.Provider>
  );
};

export const usePayments = (): PaymentsContextType => {
  const context = useContext(PaymentsContext);
  if (!context) {
    throw new Error("Erro no Provider");
  }
  return context;
};
