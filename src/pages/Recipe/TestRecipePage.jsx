import React from "react";
import { useParams } from "react-router-dom";

export default function TestRecipePage() {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test Recipe Page</h1>
      <p>Recipe ID: <strong>{id}</strong></p>
      <p>Тут буде контент рецепта 🚀</p>
    </div>
  );
}