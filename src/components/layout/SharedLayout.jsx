import { Outlet } from "react-router-dom";
import Header from "@components/layout/Header/Header";
import Footer from "@components/layout/Footer/Footer";
import Sprite from "@components/common/Sprite/Sprite";

export default function SharedLayout() {
  return (
    <div className="app">
      <Sprite />
      <Header />
      <main className="app__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
