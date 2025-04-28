import React, { useState } from "react";
import "../styles/AskQuestion.css";
import { api } from "../endpoints/api";

const AskQuestion: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      email,
      question,
    };

    try {
      const response = await api.post("send_question", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response) {
        alert("Pergunta enviada com sucesso!");
        setName("");
        setEmail("");
        setQuestion("");
      } else {
        alert("Erro ao enviar pergunta.");
      }
    } catch (err) {
      console.error("Erro ao enviar pergunta:", err);
    }
  };

  return (
    <div className="ask-question">
      <h3>Envie sua pergunta</h3>
      <p>
        Está com alguma dúvida? Mande para nossa equipe e responderemos o mais
        breve possível.
      </p>
      <form className="ask-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Escreva sua pergunta aqui (máx. 1000 caracteres)"
          maxLength={1000}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button type="submit">Enviar Pergunta</button>
      </form>
    </div>
  );
};

export default AskQuestion;
