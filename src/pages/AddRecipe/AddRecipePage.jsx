import styles from "./AddRecipePage.module.css";
import Breadcrumbs from "../../components/common/Breadcrumbs/Breadcrumbs";
import AddRecipeForm from "../AddRecipe/AddRecipeForm";
import MainTitle from "../../components/common/Typography/MainTitle";
import Subtitle from "../../components/common/Typography/Subtitle";

const AddRecipePage = () => {
  return (
    <div className={styles.wrapper}>
      <Breadcrumbs />
      <div className={styles.header}>
        <MainTitle>Add Recipe</MainTitle>
        <Subtitle>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Subtitle>
      </div>
      <AddRecipeForm />
    </div>
  );
};

export default AddRecipePage;
