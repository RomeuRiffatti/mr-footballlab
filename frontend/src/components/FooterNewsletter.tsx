import React from "react";
import { useState } from "react";
import "../styles/FooterNewsletter.css";
import { api } from "../endpoints/api";
const FooterNewsletter: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wpp, setNumber] = useState("");
  const addNewLetterConsumer = async () => {
    const consumerData = {
      name,
      email,
      wpp,
    };
    try {
      const response = await api.post(
        "create_newsletter_consumer",
        consumerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="footer-newsletter">
      <h3>Receba nossas novidades!</h3>
      <p>
        Fique por dentro de todas as novidades, promoções e muito mais!,
        inscreva-se em nossa newsletter.
      </p>
      <form className="newsletter-form">
        <input
          type="text"
          placeholder="Seu nome"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="WhatsApp"
          onChange={(e) => setNumber(e.target.value)}
        />
        <button onClick={addNewLetterConsumer}>Enviar</button>
      </form>
    </div>
  );
};

export default FooterNewsletter;
