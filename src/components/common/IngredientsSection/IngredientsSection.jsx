import styles from "./IngredientsSection.module.css";
import dropdownStyles from "../Dropdown/Dropdown.module.css";
import Dropdown from "../Dropdown/Dropdown";
import TextInput from "../TextInput/TextInput";
import AddIngredientButton from "../AddIngredientButton/AddIngredientButton";

const IngredientsSection = ({
  ingredients,
  values,
  setFieldValue,
  errors,
  touched,
  addedIngredients,
  setAddedIngredients,
}) => {
  const handleAdd = () => {
    if (!values.ingredient || !values.quantity) return;

    const ingredientObj = ingredients.find((i) => i.name === values.ingredient);

    const newIngredient = {
      name: values.ingredient,
      quantity: values.quantity,
      image: ingredientObj?.img,
    };

    const updated = [...addedIngredients, newIngredient];
    setAddedIngredients(updated);
    setFieldValue("ingredients", updated);
    setFieldValue("ingredient", "");
    setFieldValue("quantity", "");
  };

  const handleRemove = (index) => {
    const updated = addedIngredients.filter((_, i) => i !== index);
    setAddedIngredients(updated);
    setFieldValue("ingredients", updated); // синхронизация
  };

  const hasIngredientsError = touched.ingredients && errors.ingredients;

  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel}>INGREDIENTS</label>

      <div
        className={`${styles.ingredientsRow} ${
          hasIngredientsError ? styles.withError : ""
        }`}
      >
        <Dropdown
          label=""
          options={ingredients.map((i) => i.name)}
          value={values.ingredient}
          onChange={(val) => setFieldValue("ingredient", val)}
          placeholder="Add the ingredient"
          className={dropdownStyles.dropdownIngredient}
        />

        <TextInput
          name="quantity"
          placeholder="Enter quantity"
          showCounter={false}
          value={values.quantity}
        />
      </div>

      {hasIngredientsError && (
        <div className={styles.error}>Ingredients are required</div>
      )}

      <AddIngredientButton onClick={handleAdd} />

      {addedIngredients.length > 0 && (
        <div className={styles.cards}>
          {addedIngredients.map((item, index) => (
            <div key={index} className={styles.card}>
              <img src={item.image} alt={item.name} className={styles.image} />
              <div className={styles.texts}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.quantity}>{item.quantity}</span>
              </div>
              <button
                type="button"
                className={styles.remove}
                onClick={() => handleRemove(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientsSection;
