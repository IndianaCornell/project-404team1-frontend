import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@redux/slices/authSlice";

export default function Nav() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleAddRecipeClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      // Here will be the logic to open login modal
      console.log("Open Login Modal - need to login first");
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
