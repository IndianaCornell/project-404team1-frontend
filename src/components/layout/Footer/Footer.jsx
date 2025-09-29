import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import NetworkLinks from "./NetworkLinks";
import "@/styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <Link to="/" className="footer__logo" aria-label="Go to home">
          <Logo />
        </Link>
        <NetworkLinks />
      </div>

      <div className="container">
        <hr className="footer__divider" />
      </div>

      <div className="container">
        <p className="footer__copy">
          © {new Date().getFullYear()}, Foodies. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
