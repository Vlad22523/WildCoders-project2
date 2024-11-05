import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header.jsx";
import ScreenPage from "../../components/ScreensPage/ScreensPage.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import s from "./HomePage.module.css";
import { selectLoader } from "../../redux/auth/selectors.js";
import Loader from "../../components/Loader/Loader.jsx";
import { useEffect } from "react";
import { fetchUserThunk } from "../../redux/auth/operations.js";

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
        <ScreenPage />
      </div>
    </div>
  );
};

export default HomePage;
