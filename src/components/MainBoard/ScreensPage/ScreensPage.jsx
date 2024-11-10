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
  selectLoadedColumns,
  selectLoadingColumns,
} from "../../../redux/columns/selectors.js";
import { ColorRing } from "react-loader-spinner";
import { selectAllBoards } from "../../../redux/boards/selectors.js";
import backgroundsData from "../../../images/backgroundImages.json";

const ScreensPage = () => {
  const { boardId } = useParams();
  const boards = useSelector(selectAllBoards);
  const loading = useSelector(selectLoadingColumns);
  const dispatch = useDispatch();
  const columns = useSelector(selectAllColumns);
  const loadedColumns = useSelector(selectLoadedColumns);

  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("");
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (boardId) {
      dispatch(fetchColumnsThunk(boardId)).then(() => {
        const currentBoard = boards.find((board) => board._id === boardId);

        if (currentBoard) {
          setTitle(currentBoard.title);

          const backgroundData = backgroundsData.find(
            (item) => item.id === currentBoard.background
          );
          if (backgroundData && backgroundData.id !== "bg-1") {
            setBackground(backgroundData.src.desktop);
            setBackground("");
          }
        } else {
          console.warn(`Board with ID ${boardId} not found`);
        }

        setDataLoaded(true);
      });
    }
  }, [boardId, dispatch, boards]);
  console.log(background);

  // if (loadedColumns) {
  //   setStyle({
  //     backgroundImage: background ? `url(${background})` : "none",
  //     backgroundSize: "cover",
  //     backgroundPosition: "center center",
  //     height: "100vh",
  //   });
  // }

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <main className={s.main}>
      <div className={s.mainContainer}>
        <div className={s.header}>
          <HeaderDashboard title={title} />
        </div>
        <div
          className={`${s.mainWrapper} ${
            boardId && !loading ? s.boardCreated : s.noBoard
          }`}
        >
          {boardId ? (
            loading ? (
              <ColorRing
                visible={true}
                height="120"
                width="120"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : (
              <div className={s.scrollbarColumn}>
                <div className={s.columnContainer}>
                  {columns.map((column) => (
                    <Column key={column._id} data={column} />
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
              <button className={s.linkCreate}>to create a board</button> to
              visualize and track all the necessary tasks and milestones. This
              board serves as a powerful tool to organize the workflow and
              ensure effective collaboration among team members.
            </p>
          )}
          <AddColumnModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
    </main>
  );
};

export default ScreensPage;
