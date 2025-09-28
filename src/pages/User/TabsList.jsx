import { useEffect, useRef } from "react";

const TABS = [
  { key: "my", label: "MY RECIPES" },
  { key: "favorites", label: "MY FAVORITES" },
  { key: "followers", label: "FOLLOWERS" },
  { key: "following", label: "FOLLOWING" },
];

export default function TabsList({ active, onChange }) {
  const ref = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const activeTab = ref.current?.querySelector(".profile-tab.active");
    const underline = underlineRef.current;
    if (activeTab && underline) {
      underline.style.width = `${activeTab.offsetWidth}px`;
      underline.style.left = `${activeTab.offsetLeft}px`;
    }
  }, [active]);

  return (
    <div className="profile-tabs" ref={ref}>
      {TABS.map((t) => (
        <button
          key={t.key}
          type="button"
          className={`profile-tab ${active === t.key ? "active" : ""}`}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
      <span ref={underlineRef} className="active-underline" aria-hidden />
    </div>
  );
}
