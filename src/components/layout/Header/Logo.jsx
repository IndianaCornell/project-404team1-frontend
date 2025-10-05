import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetToCategories } from "@redux/slices/recipesSlice";

export default function Logo() {
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    dispatch(resetToCategories());
  };

  return (
    <Link to="/" className="header-logo" onClick={handleLogoClick}>
      <span className="header-logo__text">foodies</span>
    </Link>
  );
}
