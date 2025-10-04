import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import NetworkLinks from "./NetworkLinks";
import "@/styles/footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Link to="/" className="footer__logo" aria-label="Go to home">
            <Logo />
          </Link>
          <NetworkLinks />
        </div>

        <hr className="footer__divider" />

        <p className="footer__copy">© {year}, Foodies. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
