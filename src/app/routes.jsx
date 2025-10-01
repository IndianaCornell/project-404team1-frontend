import { Routes, Route } from "react-router-dom";
import SharedLayout from "@components/layout/SharedLayout";
import HomePage from "@pages/Home/HomePage";
// import RecipePage from "@pages/Recipe/RecipePage";
import AddRecipePage from "@pages/AddRecipe/AddRecipePage";
import UserPage from "@pages/User/UserPage";
import NotFoundPage from "@pages/NotFound/NotFoundPage";
import TestRecipePage from "@pages/Recipe/TestRecipePage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        {/* <Route path="recipe/:id" element={<RecipePage />} /> */}
        <Route path="/recipe/add" element={<AddRecipePage />} />
        <Route path="user/:id" element={<UserPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/recipe/:id" element={<TestRecipePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
