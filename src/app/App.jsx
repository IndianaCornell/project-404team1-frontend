import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "@redux/slices/authOperations";
import { selectIsRefreshing } from "@redux/slices/authSlice";
import { setAuthHeader } from "@redux/slices/authOperations";

import AppRoutes from "./routes";
import Notification from "../components/common/Notification/Notification";
 

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthHeader(token);
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
