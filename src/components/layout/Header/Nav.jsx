import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@redux/slices/authSlice";

export default function Nav({ openModal }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const handleAddRecipeClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      openModal("signin");
    }
  };

  return (
    <nav className="header-nav">
      <NavLink to="/" className="header-nav__link" end>
        HOME
      </NavLink>
      <NavLink
        to="/recipe/add"
        className="header-nav__link"
        onClick={handleAddRecipeClick}
      >
        ADD RECIPE
      </NavLink>
    </nav>
  );
}
