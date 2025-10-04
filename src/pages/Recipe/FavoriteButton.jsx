import React, { useState } from "react";
import styles from "./FavoriteButton.module.css";

const FavoriteButton = ({ recipeId, initialIsFavorite = false }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  const handleToggleFavorite = async () => {
    setLoading(true);
    try {
      console.log(`Toggle favorite for recipe ${recipeId}`);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`${styles.favoriteButton} ${isFavorite ? styles.active : ""}`}
      onClick={handleToggleFavorite}
      disabled={loading}
    >
      {loading ? "Loading..." : isFavorite ? "REMOVE FROM FAVORITES" : "ADD TO FAVORITES"}
    </button>
  );
};

export default FavoriteButton;
