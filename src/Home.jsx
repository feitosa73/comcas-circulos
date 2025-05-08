
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Círculo de Relacionamentos</h1>
      <p>Este sistema ajuda casais a refletirem sobre seus círculos de relacionamentos.</p>
      <p>Recomendamos que cada cônjuge faça o seu em separado e comparem ao final.</p>
      <Link to="/circulos">
        <button style={{ marginTop: "20px", padding: "10px 20px", background: "#4F46E5", color: "white", border: "none", borderRadius: "5px" }}>Acessar o Círculo</button>
      </Link>
    </div>
  );
}
