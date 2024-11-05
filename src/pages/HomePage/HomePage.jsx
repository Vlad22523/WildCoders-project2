import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import s from "./HomePage.module.css";
import { selectLoader } from "../../redux/auth/selectors.js";
import Loader from "../../components/Loader/Loader.jsx";
import { useEffect } from "react";
import { fetchUserThunk } from "../../redux/auth/operations.js";
import ScreensPage from "../../components/MainBoard/ScreensPage/ScreensPage.jsx";

const HomePage = () => {
  const loader = useSelector(selectLoader);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);

  return loader ? (
    <Loader />
  ) : (
    <div className={s.wrapper}>
      <Sidebar />
      <div className={s.content}>
        <Header />
        <ScreensPage />
      </div>
    </div>
  );
};

export default HomePage;
