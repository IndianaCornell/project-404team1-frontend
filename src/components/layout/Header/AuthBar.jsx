export default function AuthBar({ openModal }) {
  return (
    <div className="auth-bar">
      <div className="auth-bar__container">
        <button
          className="auth-bar__btn auth-bar__btn--signin"
          onClick={() => openModal("signin")}
          type="button"
        >
          SIGN IN
        </button>
        <button
          className="auth-bar__btn auth-bar__btn--signup"
          onClick={() => openModal("signup")}
          type="button"
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}
