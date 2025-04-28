import { createContext, ReactNode, useContext, useState } from "react";
import axios from "axios";
import { useProducts } from "./ProductsContext";
import { api } from "../endpoints/api";

interface Addres {
  phone: number;
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
  const [preferenceId, setPreferenceID] = useState("");

  const createPreference = async (
    name: string,
    last_name: string,
    addres: Addres
  ) => {
    const data = {
      name,
      last_name,
      addres,
      boots: cartItems,
    };

    try {
      const response = await api.post("create_mercado_pago_preference", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.preference_id) {
        setPreferenceID(response.data.preference_id);
      } else {
        alert(`Erro: ${response.data.error || "Preference ID não recebido"}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          "Erro ao conectar com o servidor";
        alert(`Erro: ${errorMessage}`);
      } else {
        alert("Erro desconhecido ao conectar com o servidor");
      }
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
