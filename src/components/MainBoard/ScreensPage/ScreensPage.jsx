import s from "./ScreensPage.module.css";
import AddColumnModal from "../../ColumnModal/AddcolumnModal/AddColumnModal.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Column from "../Column/Column.jsx";
import HeaderDashboard from "../HeaderDashboard/HeaderDashboard.jsx";
import SvgIcon from "../../../hooks/SvgIcon.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchColumnsThunk } from "../../../redux/columns/operations.js";
import {
  selectAllColumns,
  selectLoadingColumns,
  selectRefreshColumns,
} from "../../../redux/columns/selectors.js";
import { ColorRing } from "react-loader-spinner";
import {
  selectAllBoards,
  selectLoadingBoard,
} from "../../../redux/boards/selectors.js";
import backgroundsData from "../../../images/backgroundImages.json";
import { refreshUserThunk } from "../../../redux/auth/operations.js";
import { resetRefreshColumn } from "../../../redux/columns/slice.js";

const ScreensPage = () => {
  const { boardId } = useParams();
  const boards = useSelector(selectAllBoards);
  const loadingBoards = useSelector(selectLoadingBoard);
  const loadingColumns = useSelector(selectLoadingColumns);
  const dispatch = useDispatch();
  const columns = useSelector(selectAllColumns);
  const refresh = useSelector(selectRefreshColumns);

  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("");
  const [isDataLoaded, setDataLoaded] = useState(false);

  // Функция для получения пути к фоновому изображению в зависимости от ширины экрана
  const getBackgroundImagePath = (backgroundId) => {
    const screenWidth = window.innerWidth; // Получаем ширину экрана

    const backgroundData = backgroundsData.find(
      (item) => item.id === backgroundId
    );

    if (backgroundData) {
      if (screenWidth >= 1440) {
        return backgroundData.src.desktop;
      } else if (screenWidth >= 768) {
        return backgroundData.src.tablet;
      } else {
        return backgroundData.src.mobile;
      }
    }

    return "";
  };
  useEffect(() => {
    const handleResize = () => {
      if (boardId && !loadingBoards) {
        const currentBoard = boards.find((board) => board._id === boardId);

        if (currentBoard) {
          const bgPath = getBackgroundImagePath(currentBoard.background);
          setBackground(bgPath);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [boardId, loadingBoards, boards]);

  useEffect(() => {
    if (boardId && !loadingBoards) {
      const currentBoard = boards.find((board) => board._id === boardId);

      if (currentBoard) {
        setTitle(currentBoard.title);
        const bgPath = getBackgroundImagePath(currentBoard.background);
        setBackground(bgPath);
        dispatch(fetchColumnsThunk(boardId)).finally(() => {
          setDataLoaded(true);
        });
      }
    }
  }, [boardId, dispatch, boards, loadingBoards]);

  useEffect(() => {
    // Виконати логіку для refresh, якщо це необхідно
    if (refresh) {
      dispatch(refreshUserThunk()).then(() => {
        dispatch(resetRefreshColumn());
        dispatch(fetchColumnsThunk(boardId)); // Скидаємо refresh після виконання
      });
    }
  }, [dispatch, refresh, boardId]);

  let style = {
    backgroundImage: background ? `url(${background})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  if (!boardId) {
    style = {};
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <main className={s.main}>
      <div className={s.mainContainer} style={style}>
        <div className={s.header}>
          <HeaderDashboard title={title} />
        </div>
        <div
          className={`${s.mainWrapper} ${
            boardId && !loadingColumns && isDataLoaded
              ? s.boardCreated
              : s.noBoard
          }`}
        >
          {boardId ? (
            loadingColumns || !isDataLoaded ? (
              <ColorRing
                visible={true}
                height="120"
                width="120"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass={s.colorRingWrapper}
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : (
              <div className={s.scrollbarColumn}>
                <div className={s.columnContainer}>
                  {columns?.map((column) => (
                    <Column key={column._id} data={column} boardId={boardId} />
                  ))}
                  <button
                    onClick={openModal}
                    className={s.button}
                    type="button"
                  >
                    <div className={s.svgWrapper}>
                      <SvgIcon
                        name="icon-plus"
                        width="14"
                        height="14"
                        className={s.icon}
                      />
                    </div>
                    Add another column
                  </button>
                </div>
              </div>
            )
          ) : (
            <p className={s.text}>
              Before starting your project, it is essential{" "}
              <span className={s.linkCreate}>to create a board</span> to
              visualize and track all the necessary tasks and milestones. This
              board serves as a powerful tool to organize the workflow and
              ensure effective collaboration among team members.
            </p>
          )}
          <AddColumnModal
            isOpen={isModalOpen}
            onClose={closeModal}
            boardId={boardId}
          />
        </div>
      </div>
    </main>
  );
};

export default ScreensPage;
