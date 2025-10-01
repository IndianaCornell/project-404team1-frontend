import { useState } from "react";

export default function AuthBar() {
  const [activeButton, setActiveButton] = useState("signin"); // 'signin' or 'signup'

  const handleSignIn = () => {
    console.log("Open SignIn Modal");
  };

  const handleSignUp = () => {
    console.log("Open SignUp Modal");
  };

  const handleMouseEnter = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <div className="auth-bar">
      <div className="auth-bar__container">
        <button
          className={`auth-bar__btn auth-bar__btn--signin ${
            activeButton === "signup" ? "active" : ""
          }`}
          onClick={handleSignIn}
          onMouseEnter={() => handleMouseEnter("signin")}
          type="button"
        >
          SIGN IN
        </button>
        <button
          className={`auth-bar__btn auth-bar__btn--signup ${
            activeButton === "signup" ? "active" : ""
          }`}
          onClick={handleSignUp}
          onMouseEnter={() => handleMouseEnter("signup")}
          type="button"
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}
