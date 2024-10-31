import Header from "../../components/Header/Header.jsx";
import ScreenPage from "../../components/ScreenPage/ScreenPage.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={s.wrapper}>
      <Sidebar />
      <div className={s.content}>
        <Header />
        <ScreenPage />
      </div>
    </div>
  );
};

export default HomePage;
