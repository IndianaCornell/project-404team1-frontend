import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./AddRecipeForm.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Dropdown from "../../components/common/Dropdown/Dropdown";
import CookingTimeSelector from "../../components/common/CookingTimeSelector/CookingTimeSelector";
import TextareaInput from "../../components/common/TextareaInput/TextareaInput";
import PhotoUpload from "../../components/common/PhotoUpload/PhotoUpload";
import IngredientsSection from "../../components/common/IngredientsSection/IngredientsSection";
import FormActions from "../../components/common/FormActions/FormActions";

import { getCategories } from "../../redux/slices/categoriesOperations";
import { selectCategories } from "../../redux/slices/categoriesSlice";
import { getAreas } from "../../redux/slices/areasOperations";
import { selectAreas } from "../../redux/slices/areasSlice";
import { getIngredients } from "../../redux/slices/ingredientsOperations";
import { selectIngredients } from "../../redux/slices/ingredientsSlice";
import { addRecipe } from "../../redux/slices/recipesOperations";
import { showNotification } from "../../redux/slices/notificationsSlice";

const AddRecipeForm = () => {
  const [time, setTime] = useState(10);
  const [addedIngredients, setAddedIngredients] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(selectCategories);
  const areas = useSelector(selectAreas);
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAreas());
    dispatch(getIngredients());
  }, [dispatch]);

  const decreaseTime = () => {
    if (time > 1) setTime(time - 1);
  };
  const increaseTime = () => setTime(time + 1);

  return (
    <div>
      <Formik
        initialValues={{
          image: null,
          title: "",
          description: "",
          category: "",
          area: "",
          preparation: "",
          ingredients: [],
        }}
        validationSchema={Yup.object({
          image: Yup.mixed().required("Photo is required"),
          title: Yup.string().required("Title is required"),
          description: Yup.string().required("Description is required"),
          category: Yup.string().required("Category is required"),
          area: Yup.string().required("Area is required"),
          preparation: Yup.string().required("Preparation is required"),
          ingredients: Yup.array()
            .min(1, "Ingredients are required")
            .required("Ingredients are required"),
        })}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("category", values.category);
            formData.append("area", values.area);
            formData.append("instructions", values.preparation);
            formData.append("time", time);

            addedIngredients.forEach((ing, i) => {
              formData.append(
                `ingredients[${i}]`,
                JSON.stringify({
                  id: ing.id,
                  name: ing.name,
                  quantity: ing.quantity,
                })
              );
            });

            if (values.image) {
              formData.append("image", values.image);
            }

            const newRecipe = await dispatch(addRecipe(formData)).unwrap();

            resetForm();
            setTime(10);
            setAddedIngredients([]);

            dispatch(
              showNotification({
                type: "success",
                message: "Recipe created successfully",
              })
            );

            navigate(`/recipe/${newRecipe.id}`);
          } catch (err) {
            dispatch(
              showNotification({
                type: "error",
                message: err.message || "Failed to create recipe",
              })
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, setFieldValue, resetForm }) => (
          <Form className={styles.formContainer}>
            <div className={styles.leftCol}>
              <PhotoUpload
                value={values.image}
                onChange={(file) => setFieldValue("image", file)}
                onClear={() => setFieldValue("image", null)}
              />
              {errors.image && touched.image && (
                <div className={styles.error}>{errors.image}</div>
              )}
            </div>

            <div className={styles.rightCol}>
              <div className={`${styles.textInputTitle}`}>
                <input
                  type="text"
                  name="title"
                  placeholder="THE NAME OF THE RECIPE"
                  value={values.title}
                  onChange={(e) => setFieldValue("title", e.target.value)}
                  className={`${styles.inputTitle} ${
                    errors.title && touched.title ? styles.inputError : ""
                  }`}
                />
                {errors.title && touched.title && (
                  <div className={styles.error}>{errors.title}</div>
                )}
              </div>

              <TextareaInput
                name="description"
                placeholder="Enter a description of the dish"
                maxLength={200}
                value={values.description}
                error={errors.description}
                touched={touched.description}
              />

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
                  options={areas.map((a) => a.name)}
                  value={values.area}
                  onChange={(val) => setFieldValue("area", val)}
                  placeholder="Select an area"
                  className={styles.dropdownArea}
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
                setAddedIngredients={(list) => {
                  setAddedIngredients(list);
                  setFieldValue("ingredients", list);
                }}
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
                  error={errors.preparation}
                  touched={touched.preparation}
                />
              </div>

              <FormActions
                onDelete={() => {
                  resetForm();
                  setTime(10);
                  setFieldValue("image", null);
                  setAddedIngredients([]);
                }}
                onSubmit={() => {}}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipeForm;
