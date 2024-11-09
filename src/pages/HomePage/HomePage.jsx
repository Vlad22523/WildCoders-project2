import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import s from "./HomePage.module.css";
import { selectLoader } from "../../redux/auth/selectors.js";
import Loader from "../../components/Loader/Loader.jsx";
import { useEffect } from "react";
import { fetchUserThunk } from "../../redux/auth/operations.js";
import ScreensPage from "../../components/MainBoard/ScreensPage/ScreensPage.jsx";
import HelpModal from "../../components/HelpModal/HelpModal.jsx";
import { selectIsOpenHelpModal } from "../../redux/needHelp/selectors.js";

const HomePage = () => {
  // useTokenRefresh();
  const loader = useSelector(selectLoader);
  // const loaderHelp = useSelector(selectIsLoading);
  const isHelpModalOpen = useSelector(selectIsOpenHelpModal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserThunk());
    // dispatch(getBoardsThunk());
  }, [dispatch]);

  return loader ? (
    <Loader />
  ) : (
    <div className={s.wrapper}>
      {isHelpModalOpen && <HelpModal />}
      <Sidebar />
      <div className={s.content}>
        <Header />
        <ScreensPage />
      </div>
    </div>
  );
};

export default HomePage;
