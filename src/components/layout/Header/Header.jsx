import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { selectIsLoggedIn } from "@redux/slices/authSlice";
import "@/styles/header.css";

import Logo from "./Logo";
import Nav from "./Nav";
import AuthBar from "./AuthBar";
import UserBar from "./UserBar";
import DrinkImg from "@/assets/images/HeroDrinkImage.png";
import FoodImg from "@/assets/images/HeroFoodImage.png";

export default function Header({ openModal }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const headerClass = isHomePage ? "header" : "header header--regular";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={headerClass}>
      <div className="header__container">
        <div className="header__left">
          <Logo />
        </div>

        <div className="header__center">
          <div className="header__desktop">
            {isLoggedIn && <Nav openModal={openModal} />}
          </div>
        </div>

        <div className="header__right">
          <div className="header__desktop">
            {isLoggedIn ? (
              <UserBar openModal={openModal} />
            ) : (
              <AuthBar openModal={openModal} />
            )}
          </div>
        </div>

        <div className="header__mobile">
          {isLoggedIn ? (
            <>
              <UserBar openModal={openModal} />
              <button
                className={`header__burger ${isMobileMenuOpen ? "header__burger--hidden" : ""}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </>
          ) : (
            <AuthBar openModal={openModal} />
          )}
        </div>

        {isMobileMenuOpen && isLoggedIn && (
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
            <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-menu__header">
                <Logo />
                <button
                  className="mobile-menu__close"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  ×
                </button>
              </div>

              <div className="mobile-menu__content">
                <div className="mobile-menu__nav" onClick={closeMobileMenu}>
                  <Nav openModal={openModal} />
                </div>

                <div className="mobile-menu__images">
                  <img
                    src={DrinkImg}
                    alt="Drink"
                    className="mobile-menu__img1"
                  />
                  <img src={FoodImg} alt="Food" className="mobile-menu__img2" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
