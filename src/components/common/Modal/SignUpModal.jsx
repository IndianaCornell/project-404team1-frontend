import Modal from "./Modal";
import SignUpForm from "./SignUpForm";

export default function SignUpModal({ onClose, onSwitch }) {
  return (
    <Modal title="Sign Up" onClose={onClose}>
      <SignUpForm onSuccess={onClose} />
      <button
        type="button"
        className="btn btn--ghost btn--md"
        onClick={onSwitch}
      >
        Sign in
      </button>
    </Modal>
  );
}
