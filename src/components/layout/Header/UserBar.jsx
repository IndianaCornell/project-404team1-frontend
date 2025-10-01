import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@redux/slices/authSlice";

export default function UserBar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Here will be the logic to open LogOut modal
    setIsOpen(false);
    console.log("Open LogOut Modal");
  };

  const getFirstLetter = () => {
    return user?.name?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <div className="user-bar" ref={dropdownRef}>
      <button
        className="user-bar__trigger"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {user?.avatar ? (
          <img
            className="user-bar__avatar"
            src={user.avatar}
            alt={user?.name || "User"}
          />
        ) : (
          <div className="user-bar__avatar user-bar__avatar--placeholder">
            {getFirstLetter()}
          </div>
        )}
        <span className="user-bar__name">{user?.name || "User"}</span>
      </button>

      {isOpen && (
        <div className="user-bar__dropdown">
          <Link
            to={`/user/${user?.id}`}
            className="user-bar__link"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <button
            className="user-bar__logout"
            onClick={handleLogout}
            type="button"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
