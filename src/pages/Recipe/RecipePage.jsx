import styles from "./RecipePage.module.css";
import RecipeListDisplay from "./RecipeListDisplay";
import FavoriteButton from "./FavoriteButton";
import { useEffect, useState } from "react";
import ingredientsDB from "@/mocks/ingredients.json";
import { useNavigate, useParams } from "react-router-dom";
import { recipeApi } from "@services/Api";
import PopularRecipes from "./PopularRecipes";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await recipeApi.getRecipes(id);
        setRecipe(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const author = recipe?.user || recipe?.author || null;

  const navigate = useNavigate();

  const OnHome = () => {
    navigate(`/`);
  };

  const ingredientMap = ingredientsDB.reduce((acc, ing) => {
    acc[ing._id] = ing;
    acc[ing.id] = ing;
    return acc;
  }, {});

  const getFullMappedIngredients = () => {
    if (!recipe?.ingredients || recipe.ingredients.length === 0) {
      return [];
    }

    return recipe.ingredients
      .map((item) => {
        let parsedItem = item;
        if (typeof item === "string") {
          try {
            parsedItem = JSON.parse(item);
          } catch {
            console.error("Failed to parse ingredient:", item);
            return {
              id: Math.random().toString(),
              name: item,
              measure: "1 unit",
              img: "/default-ingredient.png",
            };
          }
        }

        if (parsedItem.name) {
          let ingredientDetails = null;
          if (parsedItem.id) {
            ingredientDetails =
              ingredientMap[parsedItem.id] || ingredientMap[parsedItem._id];
          }

          if (!ingredientDetails) {
            ingredientDetails = Object.values(ingredientMap).find(
              (ing) => ing.name === parsedItem.name
            );
          }

          return {
            id: parsedItem.id || Math.random().toString(),
            name: parsedItem.name,
            measure: parsedItem.quantity || parsedItem.measure || "1 unit",
            img:
              ingredientDetails?.img ||
              parsedItem.img ||
              "/default-ingredient.png",
          };
        }

        const ingredientDetails =
          ingredientMap[parsedItem.id] || ingredientMap[parsedItem._id];

        if (!ingredientDetails) {
          return {
            id: parsedItem.id || parsedItem._id || Math.random().toString(),
            name: "Unknown ingredient",
            measure: parsedItem.measure || parsedItem.quantity || "1 unit",
            img: "/default-ingredient.png",
          };
        }

        return {
          id: parsedItem.id || parsedItem._id,
          name: ingredientDetails.name,
          measure: parsedItem.measure || parsedItem.quantity || "1 unit",
          img: ingredientDetails.img,
        };
      })
      .filter(Boolean);
  };

  const finalIngredientsData = getFullMappedIngredients();

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Loading recipe...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className={styles.notFound}>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.logo1}>
        <div className={styles.left}>
          <li key={recipe.id}>
            <div className={styles.logo}>
              <p className={styles.homelink} onClick={OnHome}>
                Home /
              </p>
              <p>{recipe.title}</p>
            </div>

            <img src={recipe.thumb || recipe.image} alt={recipe.title} />
          </li>
        </div>

        <div className={styles.right}>
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>

            <div className={styles.logo}>
              <p className={styles.logo2}>{recipe.category}</p>
              <p className={styles.logo2}>
                {recipe.time && recipe.time !== "0" && recipe.time !== 0
                  ? `${recipe.time}min`
                  : "Time not specified"}
              </p>
            </div>
            <p>{recipe.description}</p>
            <div className={styles.items}>
              <img
                src={author?.avatar || "/default-avatar.png"}
                alt={author?.name || "Author"}
              />
              <div>
                <p>Created by</p>
                <p>{author?.name || "Unknown Author"}</p>
              </div>
            </div>
            <RecipeListDisplay
              recipes={[
                { title: recipe.title, ingredients: finalIngredientsData },
              ]}
            />
            <h2>RECIPE PREPARATION </h2>
            <p>{recipe.instructions}</p>
          </li>
          <FavoriteButton recipeId={recipe.id} />
        </div>
      </div>
      <PopularRecipes />
    </>
  );
};

export default RecipePage;
