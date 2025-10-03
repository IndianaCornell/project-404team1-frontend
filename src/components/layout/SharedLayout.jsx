import { useState } from "react";
import { Outlet } from "react-router-dom";
import ModalManager from "@components/common/Modal/ModalManager";
import Header from "@components/layout/Header/Header";
import Footer from "@components/layout/Footer/Footer";
import Sprite from "@components/common/Sprite/Sprite";

export default function SharedLayout() {
  const [activeModal, setActiveModal] = useState(null); // 'signin' | 'signup' | 'logout'

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="app">
      <Sprite />
      <Header openModal={openModal} />
      <main className="app__main">
        <Outlet context={{ openModal, closeModal, activeModal }} />
      </main>
      <Footer />

      {/* Modal */}
      <ModalManager
        activeModal={activeModal}
        openModal={openModal}
        closeModal={closeModal}
      />
    </div>
  );
}
