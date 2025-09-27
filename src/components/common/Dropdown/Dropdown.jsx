import { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.css";
import { FiChevronDown } from "react-icons/fi";

const Dropdown = ({ label, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={styles.control}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={value ? styles.value : styles.placeholder}>
          {value || placeholder}
        </span>
        <FiChevronDown className={styles.icon} />
      </div>

      {isOpen && (
        <ul className={styles.menu}>
          {options.map((option) => (
            <li
              key={option}
              className={styles.option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
