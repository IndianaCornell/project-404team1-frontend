import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import LogOutModal from "./LogOutModal";

export default function ModalManager({ activeModal, closeModal, openModal }) {
  if (activeModal === "signup") {
    return (
      <SignUpModal onClose={closeModal} onSwitch={() => openModal("signin")} />
    );
  }
  if (activeModal === "signin") {
    return (
      <SignInModal onClose={closeModal} onSwitch={() => openModal("signup")} />
    );
  }
  if (activeModal === "logout") {
    return <LogOutModal onClose={closeModal} />;
  }
  return null;
}
