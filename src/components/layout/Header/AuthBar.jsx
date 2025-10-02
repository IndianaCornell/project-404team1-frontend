export default function AuthBar({ openModal }) {
  return (
    <div className="auth-bar">
      <div className="auth-bar__container">
        <button
          className="btn btn--ghost btn--md"
          onClick={() => openModal("signin")}
          type="button"
        >
          SIGN IN
        </button>
        <button
          className="btn btn--primary btn--md"
          onClick={() => openModal("signup")}
          type="button"
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}
