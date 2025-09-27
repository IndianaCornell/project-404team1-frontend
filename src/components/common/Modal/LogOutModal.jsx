import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal.jsx";
import { logOut } from "@/redux/store.js";

export default function LogOutModal({ open, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onConfirm = () => {
    dispatch(logOut());
    onClose?.();
    // якщо в проекті є /login — перенаправляємо туди
    navigate("/login", { replace: true });
  };

  return (
    <Modal isOpen={open} onClose={onClose} title="Confirm logout">
      <p className="text-sm text-gray-700 mb-4">
        Are you sure you want to log out?
      </p>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
    </Modal>
  );
}
