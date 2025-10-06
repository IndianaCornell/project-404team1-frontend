import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "@redux/slices/authOperations";
import { selectIsRefreshing } from "@redux/slices/authSlice";
import { token } from "@/services/Api";

import AppRoutes from "./routes";
import Notification from "../components/common/Notification/Notification";
 

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      token.set(savedToken);
      dispatch(refreshUser());
    }
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppRoutes />
      <Notification />
    </>
  );
}

export default App;
