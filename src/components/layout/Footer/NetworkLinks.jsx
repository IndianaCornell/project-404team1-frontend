import React from "react";

const NetworkLinks = () => {
  return (
    <ul className="footer__social" aria-label="GoIT social links">
      <li>
        <a
          href="https://www.facebook.com/goITclub/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GoIT Facebook"
          className="footer__icon-btn"
        >
          <svg className="footer__icon" width="20" height="20">
            <use href="#icon-facebook" xlinkHref="#icon-facebook" />
          </svg>
        </a>
      </li>
      <li>
        <a
          href="https://www.instagram.com/goitclub/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GoIT Instagram"
          className="footer__icon-btn"
        >
          <svg className="footer__icon" width="20" height="20">
            <use href="#icon-instagram" xlinkHref="#icon-instagram" />
          </svg>
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com/c/GoIT"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GoIT YouTube"
          className="footer__icon-btn"
        >
          <svg className="footer__icon" width="20" height="20">
            <use href="#icon-youtube" xlinkHref="#icon-youtube" />
          </svg>
        </a>
      </li>
    </ul>
  );
};

export default NetworkLinks;
