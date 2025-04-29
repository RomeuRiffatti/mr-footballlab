import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Importação correta do FontAwesome
import { ProductProvider } from "./contexts/ProductsContext";
import { initMercadoPago } from "@mercadopago/sdk-react";


const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Elemento root não encontrado");
}
initMercadoPago("APP_USR-f76f3f9c-4d9f-4839-9c29-e949fc9a3cb2", {
  locale: "pt-BR",
});

ReactDOM.createRoot(rootElement).render(

    <ProductProvider>
      <App />
    </ProductProvider>

);
