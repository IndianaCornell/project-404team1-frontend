import { Link, useLocation } from "react-router-dom";

export default function PathInfo({ title }) {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="breadcrumbs" aria-label="breadcrumbs">
      <Link to="/">Home</Link>
      {segments.map((seg, i) => {
        const url = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        return (
          <span key={url}>
            <span className="sep">/</span>
            {isLast ? (
              <span className="current">{title || seg}</span>
            ) : (
              <Link to={url}>{seg}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
