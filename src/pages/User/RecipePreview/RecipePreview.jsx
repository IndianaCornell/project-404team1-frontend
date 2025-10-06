import { useNavigate } from "react-router-dom";

import styles from "./RecipePreview.module.css";
import Back from "@/components/ui/Back/Back";
import { routes } from "@constants/routes";
import { getPathWithId } from "@helpers/getPathWithId";
import { getImagePath, TYPE_IMG } from "@helpers/getImagePath";

const RecipePreview = ({ isOwner, recipe, onDeleteRecipe }) => {
  const navigate = useNavigate();

  const goToRecipe = () => {
    const recipeId = recipe?.id || recipe?._id;
    navigate(getPathWithId(routes.recipe, recipeId));
  };

  return (
    <div className={styles.item}>
      <div className={styles.img}>
        <img
          src={getImagePath(recipe?.thumb, TYPE_IMG.RECIPE)}
          alt={recipe?.title}
        />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{recipe?.title}</p>
        <p className={styles.descrip}>{recipe?.description}</p>
      </div>
      <div className={styles.buttons}>
        <Back icon="icon-arrow-up-right" onClick={goToRecipe} />

        {isOwner && (
          <Back
            icon="icon-trash"
            onClick={() => onDeleteRecipe(recipe?.id || recipe?._id)}
          />
        )}
      </div>
    </div>
  );
};

export default RecipePreview;
