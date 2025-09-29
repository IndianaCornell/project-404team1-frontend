import React from "react";

const Copyright = () => {
  const year = new Date().getFullYear();
  return <p className="footer__copy">©{year}, Foodies. All rights reserved</p>;
};

export default Copyright;
