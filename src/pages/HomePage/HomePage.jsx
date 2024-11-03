import { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import ScreenPage from "../../components/ScreensPage/ScreensPage.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import s from "./HomePage.module.css";
import EditUserProfile from "../../components/EditUserProfile/EditUserProfile.jsx";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => setIsOpen(false);

  return (
    <div className={s.wrapper}>
      <Sidebar />
      <div className={s.content}>
        <Header />
        <ScreenPage />
        {isOpen && <EditUserProfile onClose={closeModal} />}
      </div>
    </div>
  );
};

export default HomePage;
