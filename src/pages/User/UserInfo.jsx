export default function UserInfo({ user, stats, isSelf, onLogout }) {
  if (!user) return null;

  return (
    <aside className="profile-left">
      <div className="profile-card">
        {/* Аватар */}
        <div className="profile-avatar">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={user.name}
            width={120}
            height={120}
            className="avatar-img"
          />
          {isSelf && (
            <button
              className="plus"
              type="button"
              aria-label="Upload avatar"
              onClick={() => console.log("upload avatar")}
            >
              +
            </button>
          )}
        </div>

        {/* Имя */}
        <div className="profile-name">{user.name?.toUpperCase()}</div>

        {/* Email */}
        {user.email && (
          <div className="profile-stat">
            <label>Email:</label>
            <value>{user.email}</value>
          </div>
        )}

        {/* Счётчики */}
        <div className="profile-stats">
          <div className="profile-stat">
            <label>Added recipes:</label>
            <value>{stats?.createdRecipes ?? 0}</value>
          </div>
          <div className="profile-stat">
            <label>Favorites:</label>
            <value>{stats?.favoritesCount ?? 0}</value>
          </div>
          <div className="profile-stat">
            <label>Followers:</label>
            <value>{stats?.followersCount ?? 0}</value>
          </div>
          <div className="profile-stat">
            <label>Following:</label>
            <value>{stats?.followingCount ?? 0}</value>
          </div>
        </div>
      </div>

      {/* Кнопка LogOut */}
      {isSelf && (
        <button className="profile-logout" type="button" onClick={onLogout}>
          LOG OUT
        </button>
      )}
    </aside>
  );
}
