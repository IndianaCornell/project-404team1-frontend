import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./PublicUserPage.module.css";
import ListItems from "@pages/User/ListItems/ListItems";
import Button from "@ui/Button.jsx";
import Back from "@/components/ui/Back/Back.jsx";
import { routes } from "@constants/routes";
import { getPathWithId } from "@helpers/getPathWithId";
import { getImagePath, TYPE_IMG } from "@helpers/getImagePath";
import { recipeApi, userApi } from "@services/Api";
import { selectUser } from "@redux/slices/authSlice";
import { EMPTY_TEXT, TYPE_TABS } from "@constants/common";

const PAGE_SIZE = 9;
const TABS = { RECIPES: "recipes", FOLLOWERS: "followers" };

export default function PublicUserPage() {
  const { id } = useParams();
  const me = useSelector(selectUser);
  const navigate = useNavigate();

  const [info, setInfo] = useState(null);
  const [list, setList] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingFollowId, setLoadingFollowId] = useState(null);

  const [tab, setTab] = useState(TABS.RECIPES);
  const [page, setPage] = useState(1);

  const isOwner = useMemo(
    () => (me?.id || me?._id) && String(me?.id || me?._id) === String(id),
    [me, id],
  );

  const isFollowingInitial = useMemo(() => {
    if (!me?.following) return false;
    return me.following.map(String).includes(String(id));
  }, [me?.following, id]);
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  useEffect(() => setIsFollowing(isFollowingInitial), [isFollowingInitial]);

  const [followingSet, setFollowingSet] = useState(
    () => new Set((me?.following ?? []).map(String))
  );
  useEffect(() => {
    setFollowingSet(new Set((me?.following ?? []).map(String)));
  }, [me?.id, me?.following]);

  const ownerOptimistic = useMemo(
    () => ({ ...(me || {}), following: Array.from(followingSet) }),
    [me, followingSet]
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingInfo(true);
        const { data } = await userApi.getProfile(id);
        if (mounted) setInfo(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoadingInfo(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const loadRecipes = async (p) => {
    try {
      setLoadingList(true);
      const { data } = await recipeApi.getUserRecipes(id, { page: p, limit: PAGE_SIZE });
      setList({
        result: data.items ?? [],
        items: data.items ?? [],
        total: Number(data.total ?? 0),
        page: Number(data.page ?? p),
        limit: Number(data.limit ?? PAGE_SIZE),
      });
    } catch (e) {
      console.error(e);
      setList({ result: [], items: [], total: 0, page: p, limit: PAGE_SIZE });
    } finally {
      setLoadingList(false);
    }
  };

  const loadFollowers = async (p) => {
    try {
      setLoadingList(true);
      const { data } = await userApi.getFollowersByUser(id, { page: p, limit: PAGE_SIZE });
      const normalized = (data.items ?? []).map((u) => ({
        _id: u._id || u.id,
        name: u.name ?? u.username ?? "User",
        avatar: u.avatar ?? null,
        recipes: Array.isArray(u.recipes) ? u.recipes : [],
      }));
      setList({
        result: normalized,
        items: normalized,
        total: Number(data.total ?? 0),
        page: Number(data.page ?? p),
        limit: Number(data.limit ?? PAGE_SIZE),
      });
    } catch (e) {
      console.error(e);
      setList({ result: [], items: [], total: 0, page: p, limit: PAGE_SIZE });
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    if (tab === TABS.RECIPES) loadRecipes(page);
    else loadFollowers(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, tab, page]);

  useEffect(() => {
    if (list?.result?.length === 0 && page > 1) setPage((prev) => prev - 1);
  }, [list?.result?.length, page]);

  const onChangePage = ({ selected }) => setPage(selected + 1);
  const changeTab = (next) => { setTab(next); setPage(1); };

  const handleFollow = async (targetId) => {
  const uid = String(targetId ?? id);
  if (!uid) return;

  setLoadingFollowId(uid);
  setFollowingSet((prev) => new Set(prev).add(uid));
  if (uid === String(id)) setIsFollowing(true);

  try {
    await userApi.followUser(uid);
  } catch (e) {
    setFollowingSet((prev) => {
      const next = new Set(prev);
      next.delete(uid);
      return next;
    });
    if (uid === String(id)) setIsFollowing(false);
    console.error(e);
  } finally {
    setLoadingFollowId(null);
  }
};

const handleUnfollow = async (targetId) => {
  const uid = String(targetId ?? id);
  if (!uid) return;

  setLoadingFollowId(uid);
  setFollowingSet((prev) => {
    const next = new Set(prev);
    next.delete(uid);
    return next;
  });
  if (uid === String(id)) setIsFollowing(false);

  try {
    await userApi.unfollowUser(uid);
  } catch (e) {
    setFollowingSet((prev) => new Set(prev).add(uid));
    if (uid === String(id)) setIsFollowing(true);
    console.error(e);
  } finally {
    setLoadingFollowId(null);
  }
};

  const goToRecipe = (rid) => navigate(getPathWithId(routes.recipe, rid));

  return (
    <div className={styles.wrap}>
      <h1 className={styles.h1}>PROFILE</h1>
      <p className={styles.lead}>
        Reveal your culinary art, share your favorite recipe and create
        gastronomic masterpieces with us.
      </p>

      <div className={styles.grid}>
        {/* LEFT CARD */}
        <div className={styles.card}>
          <div className={styles.avatar}>
            <img
              src={getImagePath(info?.avatar, TYPE_IMG.AVATAR)}
              alt={info?.name || "User"}
            />
          </div>
          <p className={styles.name}>{info?.name || "User"}</p>

          <div className={styles.meta}>
            <div>Email:<span> {info?.email || "-"}</span></div>
            {info?.createdRecipesCount && (
              <div>Added recipes:<span> {info?.createdRecipesCount}</span></div>
            )}
            {info?.followersCount && (
              <div>Followers:<span> {info?.followersCount}</span></div>
            )}
          </div>

          {!isOwner && (
           <Button
           style={{ display: "flex", width: "100%" }}
  onClick={isFollowing ? () => handleUnfollow(id) : () => handleFollow(id)}
  variant="outline_secondary"
  disabled={loadingFollowId === String(id)}
  aria-busy={loadingFollowId === String(id)}
>
  {loadingFollowId === String(id) ? (
    <div className={styles.tinyLoader}></div>
  ) : isFollowing ? "following" : "follow"}
</Button>
          )}
        </div>

        {/* RIGHT: TABS + LIST */}
        <div className={styles.list}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${tab === TABS.RECIPES ? styles.active : ""}`}
              onClick={() => changeTab(TABS.RECIPES)}
              type="button"
            >
              RECIPES
            </button>
            <button
              className={`${styles.tab} ${tab === TABS.FOLLOWERS ? styles.active : ""}`}
              onClick={() => changeTab(TABS.FOLLOWERS)}
              type="button"
            >
              FOLLOWERS
            </button>
          </div>

          <ListItems
            emptyText={
              tab === TABS.RECIPES ? EMPTY_TEXT.RECIPES : (EMPTY_TEXT.FOLLOWERS || "No followers yet")
            }
            data={list}
            type={tab === TABS.RECIPES ? TYPE_TABS.RECIPE : TYPE_TABS.USER}
            isOwner={false}
            isLoading={loadingInfo || loadingList}
            onDeleteRecipe={undefined}
            page={page}
            onChangePage={onChangePage}
            itemsPerPage={PAGE_SIZE}
            onOpen={tab === TABS.RECIPES ? (rid) => goToRecipe(rid) : undefined}
            owner={ownerOptimistic}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
            loadingFollowId={loadingFollowId}

          />
        </div>
      </div>
    </div>
  );
}
