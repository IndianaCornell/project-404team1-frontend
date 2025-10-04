import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getIngredients } from "@/redux/slices/ingredientsOperations";
import {
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsLoaded,
} from "@/redux/slices/ingredientsSlice";

import { getAreas } from "@/redux/slices/areasOperations";
import {
  selectAreas,
  selectAreasLoading,
  selectAreasLoaded,
} from "@/redux/slices/areasSlice";

import {
  setIngredientFilter,
  setAreaFilter,
  selectSelectedIngredient,
  selectSelectedArea,
} from "@/redux/slices/recipesSlice";

import styles from "./RecipeFilters.module.css";

const Field = ({ children }) => <div>{children}</div>;

export default function RecipeFilters() {
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);
  const ingLoading = useSelector(selectIngredientsLoading);
  const ingLoaded = useSelector(selectIngredientsLoaded ?? (() => false));

  const areas = useSelector(selectAreas);
  const areasLoading = useSelector(selectAreasLoading);
  const areasLoaded = useSelector(selectAreasLoaded ?? (() => false));

  const selectedIngredient = useSelector(selectSelectedIngredient);
  const selectedArea = useSelector(selectSelectedArea);

  useEffect(() => {
    if (!ingLoaded && !ingLoading) dispatch(getIngredients());
    if (!areasLoaded && !areasLoading) dispatch(getAreas());
  }, [dispatch, ingLoaded, ingLoading, areasLoaded, areasLoading]);

  const ingredientOptions = useMemo(
    () =>
      [{ value: "", label: "Ingredients" }].concat(
        (ingredients || []).map((it) => ({ value: it.name, label: it.name }))
      ),
    [ingredients]
  );

  const areaOptions = useMemo(
    () =>
      [{ value: "", label: "Area" }].concat(
        (areas || []).map((it) => ({
          value: it.slug || it.id || it.name,
          label: it.name,
        }))
      ),
    [areas]
  );

  const disableControls = ingLoading || areasLoading;

  return (
    <div className={styles.wrap}>
      <Field>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={selectedIngredient || ""}
            onChange={(e) =>
              dispatch(setIngredientFilter(e.target.value || null))
            }
            disabled={disableControls}
          >
            {ingredientOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </Field>

      <Field>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={selectedArea || ""}
            onChange={(e) => dispatch(setAreaFilter(e.target.value || null))}
            disabled={disableControls}
          >
            {areaOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </Field>
    </div>
  );
}
