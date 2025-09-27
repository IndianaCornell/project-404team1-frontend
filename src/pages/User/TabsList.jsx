const tabs = [
  { key: "my", label: "My recipes" },
  { key: "favorites", label: "Favorites" },
  { key: "followers", label: "Followers" },
  { key: "following", label: "Following" },
];

export default function TabsList({ active, onChange }) {
  return (
    <div
      className="flex gap-4 border-b border-gray-200 mt-6"
      role="tablist"
      aria-label="User profile tabs"
    >
      {tabs.map((t) => (
        <button
          key={t.key}
          role="tab"
          aria-selected={active === t.key}
          className={`px-2 pb-2 -mb-px border-b-2 transition-colors ${
            active === t.key
              ? "border-black font-semibold text-black"
              : "border-transparent text-gray-500 hover:text-black"
          }`}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
