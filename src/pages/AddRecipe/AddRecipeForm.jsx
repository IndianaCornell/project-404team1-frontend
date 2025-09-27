import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./AddRecipeForm.module.css";
import { useState, useEffect } from "react";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import CookingTimeSelector from "../../components/common/CookingTimeSelector/CookingTimeSelector";
import TextareaInput from "../../components/common/TextareaInput/TextareaInput";
import FormActions from "../../components/common/FormActions/FormActions";
import PhotoUpload from "../../components/common/PhotoUpload/PhotoUpload";
import dropdownStyles from "../../components/common/Dropdown/Dropdown.module.css";
import IngredientsSection from "../../components/common/IngredientsSection/IngredientsSection";

const AddRecipeForm = () => {
  const [time, setTime] = useState(10);
  const [categories, setCategories] = useState([]);
  const [addedIngredients, setAddedIngredients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch("http://localhost:3000/api/categories");
        const catData = await catRes.json();
        setCategories(catData);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchData();
  }, []);

  const areas = [
    "French",
    "Spanish",
    "Italian",
    "English",
    "Norwegian",
    "Ukrainian",
  ];

  const ingredients = [
    "Cabbage",
    "Cucumber",
    "Tomato",
    "Corn",
    "Radish",
    "Parsley",
  ];

  const decreaseTime = () => {
    if (time > 1) setTime(time - 1);
  };

  const increaseTime = () => {
    setTime(time + 1);
  };

  return (
    <div className={styles.wrapper}>
      <nav className={styles.breadcrumbs}>
        <span className={styles.link}>Home</span>
        <span className={styles.separator}>/</span>
        <span className={styles.current}>Add Recipe</span>
      </nav>

      <div className={styles.header}>
        <h1 className={styles.title}>Add Recipe</h1>
        <p className={styles.subtitle}>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </p>
      </div>

      <Formik
        initialValues={{
          photo: null,
          title: "",
          category: "",
          area: "",
          ingredient: "",
          quantity: "",
          preparation: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required"),
          category: Yup.string().required("Category is required"),
          area: Yup.string().required("Area is required"),
          ingredient: Yup.string().required("Ingredient is required"),
          quantity: Yup.string().required("Quantity is required"),
          preparation: Yup.string().required("Preparation is required"),
        })}
        onSubmit={(values) =>
          console.log({
            ...values,
            cookingTime: time,
            ingredients: addedIngredients,
          })
        }
      >
        {({ values, errors, touched, setFieldValue, resetForm }) => (
          <Form className={styles.formContainer}>
            <div className={styles.leftCol}>
              <PhotoUpload
                value={values.photo}
                onChange={(file) => setFieldValue("photo", file)}
                onClear={() => setFieldValue("photo", null)}
              />
            </div>

            <div className={styles.rightCol}>
              <label className={styles.sectionLabel} htmlFor="title">
                THE NAME OF THE RECIPE
              </label>
              <TextareaInput
                name="title"
                placeholder="Enter a description of the dish"
                maxLength={200}
                value={values.title}
                className={styles.textInputTitle}
              />
              {errors.title && touched.title && (
                <div className={styles.error}>{errors.title}</div>
              )}

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <Dropdown
                    label="CATEGORY"
                    options={categories.map((c) => c.name)}
                    value={values.category}
                    onChange={(val) => setFieldValue("category", val)}
                    placeholder="Select a category"
                  />
                  {errors.category && touched.category && (
                    <div className={styles.error}>{errors.category}</div>
                  )}
                </div>

                <div className={styles.fieldGroup}>
                  <CookingTimeSelector
                    label="COOKING TIME"
                    time={time}
                    onDecrease={decreaseTime}
                    onIncrease={increaseTime}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <Dropdown
                  label="AREA"
                  options={areas}
                  value={values.area}
                  onChange={(val) => setFieldValue("area", val)}
                  placeholder="Select an area"
                  className={dropdownStyles.dropdownArea}
                />
                {errors.area && touched.area && (
                  <div className={styles.error}>{errors.area}</div>
                )}
              </div>

              <IngredientsSection
                ingredients={ingredients}
                values={values}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                addedIngredients={addedIngredients}
                setAddedIngredients={setAddedIngredients}
              />

              <div className={`${styles.fieldGroup} ${styles.noMargin}`}>
                <label className={`${styles.fieldLabel} ${styles.noMargin}`}>
                  RECIPE PREPARATION
                </label>
                <TextareaInput
                  name="preparation"
                  placeholder="Enter recipe"
                  maxLength={1000}
                  value={values.preparation}
                />
                {errors.preparation && touched.preparation && (
                  <div className={styles.error}>{errors.preparation}</div>
                )}
              </div>

              <FormActions
                onDelete={() => {
                  resetForm();
                  setTime(10);
                  setFieldValue("photo", null);
                  setAddedIngredients([]);
                }}
                onSubmit={() => console.log("Submit clicked")}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipeForm;
