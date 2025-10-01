import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="header-logo">
      <span className="header-logo__text">foodies</span>
    </Link>
  );
}
