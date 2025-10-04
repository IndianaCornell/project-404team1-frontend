import { Routes, Route } from "react-router-dom";
import SharedLayout from "@components/layout/SharedLayout";
import HomePage from "@pages/Home/HomePage";
import RecipePage from "@pages/Recipe/RecipePage";
import AddRecipePage from "@pages/AddRecipe/AddRecipePage";
import UserPage from "@pages/User/UserPage";
import NotFoundPage from "@pages/NotFound/NotFoundPage";
import TestRecipePage from "@pages/Recipe/TestRecipePage";
import RecipePage from  "@pages/Recipe/RecipePage";
import PrivateRoute from "./PrivateRoute";
import FavoritesPage from "@pages/User/Favorites";
import FollowersPage from "@pages/User/Followers";
import FollowingPage from "@pages/User/Following";
import RecipesPage from "@pages/User/Recipes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        {/* <Route path="recipe/:id" element={<RecipePage />} /> */}
        <Route
          path="/recipe/add"
          element={
            <PrivateRoute>
              <AddRecipePage />
            </PrivateRoute>
          }
        />
        <Route
          path="user/:id"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        >
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="followers" element={<FollowersPage />} />
          <Route path="following" element={<FollowingPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="/recipe/:id" element={<TestRecipePage />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
