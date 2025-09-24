import { Outlet } from "react-router-dom";
import Header from "@components/layout/Header/Header";
import Footer from "@components/layout/Footer/Footer";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default SharedLayout;
