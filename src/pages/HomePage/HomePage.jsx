import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import s from "./HomePage.module.css";
import { selectLoader } from "../../redux/auth/selectors.js";
import Loader from "../../components/Loader/Loader.jsx";
import { useEffect } from "react";
import {
  fetchUserThunk,
  refreshUserThunk,
} from "../../redux/auth/operations.js";
import ScreensPage from "../../components/MainBoard/ScreensPage/ScreensPage.jsx";
import HelpModal from "../../components/HelpModal/HelpModal.jsx";
import {
  selectIsLoading,
  selectIsOpenHelpModal,
} from "../../redux/needHelp/selectors.js";
import { getBoardsThunk } from "../../redux/boards/operations.js";
import {
  selectLoadingBoard,
  selectRefresh,
} from "../../redux/boards/selectors.js";
import { resetRefresh } from "../../redux/boards/slice.js";

const HomePage = () => {
  const loader = useSelector(selectLoader);
  const loaderHelp = useSelector(selectIsLoading);
  const isHelpModalOpen = useSelector(selectIsOpenHelpModal);
  const refresh = useSelector(selectRefresh);
  const loaderBoard = useSelector(selectLoadingBoard);

  const dispatch = useDispatch();

  useEffect(() => {
    // Виконати основні запити
    dispatch(fetchUserThunk());
    dispatch(getBoardsThunk());
  }, [dispatch]);

  useEffect(() => {
    // Виконати логіку для refresh, якщо це необхідно
    if (refresh) {
      dispatch(refreshUserThunk()).then(() => {
        dispatch(resetRefresh());
        dispatch(getBoardsThunk()); // Скидаємо refresh після виконання
      });
    }
  }, [dispatch, refresh]);

  return loader || loaderHelp || loaderBoard ? (
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
