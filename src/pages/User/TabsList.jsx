const ALL_TABS = [
  { key: "my",        label: "MY RECIPES" },
  { key: "favorites", label: "MY FAVORITES" },
  { key: "followers", label: "FOLLOWERS" },
  { key: "following", label: "FOLLOWING" },
];

export default function TabsList({ active, onChange, showMyAndFav }) {
  const tabs = showMyAndFav ? ALL_TABS : ALL_TABS.filter(t => t.key === "followers" || t.key === "following");
  return (
    <div className="profile-tabs" role="tablist" aria-label="Profile tabs">
      {tabs.map(t => (
        <button 
          key={t.key}
          role="tab"
          className="profile-tab"
          aria-selected={active === t.key}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
