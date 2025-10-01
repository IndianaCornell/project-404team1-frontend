import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectIsLoggedIn } from "@redux/slices/authSlice";
import "@/styles/header.css";

import Logo from "./Logo";
import Nav from "./Nav";
import AuthBar from "./AuthBar";
import UserBar from "./UserBar";

export default function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const headerClass = isHomePage ? "header" : "header header--regular";

  return (
    <header className={headerClass}>
      <div className="header__container">
        <Logo />
        <Nav />
        {isLoggedIn ? <UserBar /> : <AuthBar />}
      </div>
    </header>
  );
}
