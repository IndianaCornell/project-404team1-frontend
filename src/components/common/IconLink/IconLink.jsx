import { Link } from "react-router-dom";
import css from "./IconLink.module.css";

export default function IconLink({
  to,
  external,
  iconSrc,
  className,
  ariaLabel,
}) {
  const classes = [css.iconLink, className].filter(Boolean).join(" ");

  if (external) {
    return (
      <a
        href={to}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        <img className={css.iconLinkIcon} src={iconSrc} alt="" />
      </a>
    );
  }

  return (
    <Link to={to} className={classes} aria-label={ariaLabel} title={ariaLabel}>
      <img className={css.iconLinkIcon} src={iconSrc} alt="" />
    </Link>
  );
}
