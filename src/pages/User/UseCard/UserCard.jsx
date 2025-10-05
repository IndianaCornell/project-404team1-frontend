// src/pages/User/UserCard.jsx
import { useNavigate } from "react-router-dom";
import styles from "./UserCard.module.css";
import Button from "@ui/Button.jsx";
import Back from "@/components/ui/Back/Back.jsx";
import { routes } from "@constants/routes";
import { getPathWithId } from "@helpers/getPathWithId";
import { getImagePath, TYPE_IMG } from "@helpers/getImagePath";

const UserCard = ({ user, onFollow, onUnfollow, owner }) => {
  const navigate = useNavigate();

  const userId = String(user?._id || user?.id || "");
  const ownerId = String(owner?._id || owner?.id || "");

  const followingIds = Array.isArray(owner?.following)
    ? owner.following.map(String)
    : [];

  const isFollowing = userId && followingIds.includes(userId);
  const isOwner = ownerId && ownerId === userId;

  const buttonText = isOwner ? "me" : isFollowing ? "following" : "follow";

  const onButtonClick = () => {
    if (isOwner) return;
    if (isFollowing) onUnfollow?.(userId);
    else onFollow?.(userId);
  };

  const goToProfile = () => {
    if (!userId) return;
    navigate(getPathWithId(routes.user, userId));
  };

  const goToRecipe = (id) => {
    if (!id) return;
    navigate(getPathWithId(routes.recipe, id));
  };

  const safeRecipes = Array.isArray(user?.recipes) ? user.recipes : [];

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <div className={styles.img}>
          <img
            src={getImagePath(user?.avatar, TYPE_IMG.AVATAR)}
            alt={user?.name || "User"}
          />
        </div>
        <div className={styles.info}>
          <p className={styles.name}>{user?.name || "User"}</p>
          <div className={styles.count}>
            {`Own recipes: ${safeRecipes.length}`}
          </div>
          <Button onClick={onButtonClick} variant="outline_secondary">
            {buttonText}
          </Button>
        </div>
      </div>

      <ul className={styles.center}>
        {safeRecipes.map((recipe) => {
          const rid = recipe?._id || recipe?.id;
          return (
            <li
              key={rid || Math.random()}
              className={styles.recipe}
              onClick={() => goToRecipe(rid)}
            >
              <img
                src={getImagePath(recipe?.thumb, TYPE_IMG.RECIPE)}
                alt={recipe?.title || "Recipe"}
              />
            </li>
          );
        })}
      </ul>

      <Back icon="icon-arrow-up-right" onClick={goToProfile} />
    </div>
  );
};

export default UserCard;