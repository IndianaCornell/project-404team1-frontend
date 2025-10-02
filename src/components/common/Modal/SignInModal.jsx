import Modal from "./Modal";
import SignInForm from "./SignInForm";

export default function SignInModal({ onClose, onSwitch }) {
  return (
    <Modal title="Sign In" onClose={onClose}>
      <SignInForm onSuccess={onClose} />
      <button
        type="button"
        className="btn btn--ghost btn--md"
        onClick={onSwitch}
      >
        Create an account
      </button>
    </Modal>
  );
}
