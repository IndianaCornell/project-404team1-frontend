// src/pages/Home/Recipes/RecipeFilters.jsx
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// ingredients
import { getIngredients } from "@/redux/slices/ingredientsOperations";
import {
  selectIngredients,
  selectIngredientsLoading,
  // якщо додавали раніше:
  selectIngredientsLoaded,
} from "@/redux/slices/ingredientsSlice";

// areas
import { getAreas } from "@/redux/slices/areasOperations";
import {
  selectAreas,
  selectAreasLoading,
  // якщо додавали раніше:
  selectAreasLoaded,
} from "@/redux/slices/areasSlice";

// recipes filters
import {
  setIngredientFilter,
  setAreaFilter,
  selectSelectedIngredient,
  selectSelectedArea,
} from "@/redux/slices/recipesSlice";

const Field = ({ label, children }) => (
  <label style={{ display: "grid", gap: 8 }}>
    <span style={{ fontWeight: 600 }}>{label}</span>
    {children}
  </label>
);

export default function RecipeFilters() {
  const dispatch = useDispatch();

  // data from store
  const ingredients = useSelector(selectIngredients);
  const ingLoading = useSelector(selectIngredientsLoading);
  const ingLoaded = useSelector(selectIngredientsLoaded ?? (() => false)); // fallback, якщо селектора немає

  const areas = useSelector(selectAreas);
  const areasLoading = useSelector(selectAreasLoading);
  const areasLoaded = useSelector(selectAreasLoaded ?? (() => false)); // fallback

  const selectedIngredient = useSelector(selectSelectedIngredient);
  const selectedArea = useSelector(selectSelectedArea);

  // lazy fetch with cache
  useEffect(() => {
    if (!ingLoaded && !ingLoading) dispatch(getIngredients());
    if (!areasLoaded && !areasLoading) dispatch(getAreas());
  }, [dispatch, ingLoaded, ingLoading, areasLoaded, areasLoading]);

  // options (з «All …» зверху)
  const ingredientOptions = useMemo(
    () =>
      [{ value: "", label: "All ingredients" }].concat(
        (ingredients || []).map((it) => ({
          value: it.name, // <-- передаємо name у запит
          label: it.name,
        }))
      ),
    [ingredients]
  );

  const areaOptions = useMemo(
    () =>
      [{ value: "", label: "All areas" }].concat(
        (areas || []).map((it) => ({
          value: it.slug || it.id || it.name,
          label: it.name,
        }))
      ),
    [areas]
  );

  // handlers: лише виставляємо фільтри — рефетч зробить Recipes.jsx через useEffect
  const onIngredientChange = (e) => {
    const v = e.target.value || null;
    dispatch(setIngredientFilter(v));
  };

  const onAreaChange = (e) => {
    const v = e.target.value || null;
    dispatch(setAreaFilter(v));
  };

  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        gap: 16,
        alignItems: "end",
        marginTop: 12,
      }}
    >
      <Field label="Ingredient">
        <select
          value={selectedIngredient || ""}
          onChange={onIngredientChange}
          disabled={ingLoading}
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #E6E6E6",
            minWidth: 220,
            background: "#fff",
          }}
        >
          {ingredientOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Area">
        <select
          value={selectedArea || ""}
          onChange={onAreaChange}
          disabled={areasLoading}
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #E6E6E6",
            minWidth: 220,
            background: "#fff",
          }}
        >
          {areaOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}
