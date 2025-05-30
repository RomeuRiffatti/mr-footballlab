import React, { useState } from "react";
import "../styles/AddressForm.css";
import { useProducts } from "../contexts/ProductsContext";
import { usePayments } from "../contexts/PaymentsContext";
import { Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { api } from "../endpoints/api";

const AddressForm: React.FC = () => {
  const [payerName, setName] = useState("");
  const [payerLastName, setLastName] = useState("");
  const [streetPreference, setStreetPreference] = useState("");
  const [numberPreference, setNumberPreference] = useState(0);
  const [neighborhoodPreference, setNeiborhoodPreference] = useState("");
  const [cityPreference, setCityPreference] = useState("");
  const [statePreference, setStatePreference] = useState("");
  const [addresComplementPreference, setAddresComplementPreference] =
    useState("");
  const [phonePreference, setPhonePreference] = useState("");
  const [cepPreference, SetCepPreference] = useState("");
  const { cartItems, clearCartItems } = useProducts();
  const { createPreference, preferenceId } = usePayments();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Cria preferencia e pega o PreferenceID para mostrar o botão de pagar no mercado pago
  const handleStartPayment = async () => {
    const addres = {
      street: streetPreference,
      number: numberPreference,
      neighborhood: neighborhoodPreference,
      city: cityPreference,
      state: statePreference,
      addres_complement: addresComplementPreference,
      phone: phonePreference,
      cep: cepPreference,
    };
    createPreference(payerName, payerLastName, addres);
    setIsPaymentOpen(true);
  };

  
  

 

  return (
    <div className="form-container">
      <form className="form" id="form">
        <h2>Dados Pessoais</h2>
        <div className="item-div-personal-data">
          <div className="item-div">
            <label htmlFor="nome">Nome: </label>
            <input
              required
              name="nome"
              id="nome"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="item-div">
            <label htmlFor="sobrenome">Sobrenome: </label>
            <input
              name="sobrenome"
              id="sobrenome"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="item-div">
            <label htmlFor="phone">Celular: </label>
            <input required
              name="phone"
              id="phone"
              type="tel"
              pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
              onChange={(e) => setPhonePreference(e.target.value)}
            />
          </div>
        </div>

        <h2>Endereço</h2>
<div className="address-container">
  <div className="address-column">
    <div className="item-div">
      <label htmlFor="street">Rua:</label>
      <input required id="street" type="text" onChange={(e) => setStreetPreference(e.target.value)} />
    </div>
    <div className="item-div">
      <label htmlFor="number">Número:</label>
      <input required id="number" type="number" onChange={(e) => setNumberPreference(Number(e.target.value))} />
    </div>
    <div className="item-div">
      <label htmlFor="neighborhood">Bairro:</label>
      <input required id="neighborhood" type="text" onChange={(e) => setNeiborhoodPreference(e.target.value)} />
    </div>
    <div className="item-div">
      <label htmlFor="city">Cidade:</label>
      <input required id="city" type="text" onChange={(e) => setCityPreference(e.target.value)} />
    </div>
  </div>

  <div className="address-column">
    <div className="item-div">
      <label htmlFor="state">Estado:</label>
      <input required id="state" type="text" onChange={(e) => setStatePreference(e.target.value)} />
    </div>
    <div className="item-div">
      <label htmlFor="complement">Complemento:</label>
      <input id="complement" type="text" onChange={(e) => setAddresComplementPreference(e.target.value)} />
    </div>
    <div className="item-div">
      <label htmlFor="cep">CEP:</label>
      <input required id="cep" type="text" onChange={(e) => SetCepPreference(e.target.value)} />
    </div>
  </div>
</div>
        <div >
          <button className="finish-shopping-button" type="button" onClick={handleStartPayment}>
            Pagar com Mercado Pago
          </button>
        </div>

        {isPaymentOpen && preferenceId && (
          <div className="mercado-pago-container">
            <Wallet initialization={{ preferenceId: preferenceId, redirectMode:'blank' }} locale="pt-BR" />
          </div>
        )}
      </form>
    </div>
  );
};

export default AddressForm;
