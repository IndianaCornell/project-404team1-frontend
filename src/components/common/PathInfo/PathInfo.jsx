import { Link, useLocation } from "react-router-dom";

export default function PathInfo({ title }) {
  const location = useLocation();

  return (
    <nav
      className="flex items-center gap-2 text-sm text-gray-500"
      aria-label="Breadcrumb"
    >
      <Link to="/" className="hover:underline text-gray-600">
        Home
      </Link>
      <span aria-hidden="true">/</span>
      <span
        title={location.pathname}
        className="font-medium text-gray-800 truncate max-w-[200px]"
      >
        {title}
      </span>
    </nav>
  );
}
