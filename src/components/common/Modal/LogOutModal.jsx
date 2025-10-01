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
    navigate("/login", { replace: true });
  };

  return (
    <Modal isOpen={open} onClose={onClose} title="Log out">
      <p className="mt-2">Are you sure you want to log out?</p>
      <div className="mt-4 flex gap-3 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
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
