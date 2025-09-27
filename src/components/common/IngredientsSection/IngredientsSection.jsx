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
    const newIngredient = {
      name: values.ingredient,
      quantity: values.quantity,
      image: `/images/${values.ingredient.toLowerCase()}.png`,
    };
    setAddedIngredients([...addedIngredients, newIngredient]);
    setFieldValue("ingredient", "");
    setFieldValue("quantity", "");
  };

  const handleRemove = (index) => {
    setAddedIngredients(addedIngredients.filter((_, i) => i !== index));
  };

  const handleImageError = (e) => {
    e.target.src = "/images/placeholder.png";
  };

  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel}>INGREDIENTS</label>
      <div className={styles.ingredientsRow}>
        <Dropdown
          label=""
          options={ingredients}
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
      <AddIngredientButton onClick={handleAdd} />

      {addedIngredients.length > 0 && (
        <div className={styles.cards}>
          {addedIngredients.map((item, index) => (
            <div key={index} className={styles.card}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.image}
                onError={handleImageError}
              />
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

      {errors.ingredient && touched.ingredient && (
        <div className={styles.error}>{errors.ingredient}</div>
      )}
    </div>
  );
};

export default IngredientsSection;
