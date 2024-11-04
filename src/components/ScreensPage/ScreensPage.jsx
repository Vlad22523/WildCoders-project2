import HeaderDashboard from "../HeaderDashboard/HeaderDashboard.jsx";
import SvgIcon from "../../hooks/SvgIcon.jsx";
import s from "./ScreensPage.module.css";
import AddColumnModal from "../ColumnModal/AddcolumnModal/addColumnModal.jsx";
import { useState } from "react";
import arr from "../Sidebar/BoardsArr.js";
import { useParams } from "react-router-dom";


const ScreensPage = () => {
  // const isBoardCreated = true;
  const { boardId } = useParams();
  let boardData;

  if (boardId) { boardData = arr.find((i) => i.boardId === boardId); }

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <main className={s.main}>
      <div className={s.header}>
        <HeaderDashboard title={boardData} />
      </div>
      <div
        className={`${s.mainWrapper} ${
          boardId ? s.boardCreated : s.noBoard
        }`}
      >
        {boardId ? (
          <div className={s.columnContainer}>
            <div className={s.columnWrapper}>
              <button className={`${s.button} ${s.buttonColumn}`} type="button">
                <span className={s.buttonSpan}>To Do</span>
                <div className={s.svgWrapperColumn}>
                  <SvgIcon
                    name="icon-pencil"
                    width="16"
                    height="16"
                    className={s.iconColumn}
                  />
                  <SvgIcon
                    name="icon-trash"
                    width="16"
                    height="16"
                    className={s.iconColumn}
                  />
                </div>
              </button>
              <button
                className={`${s.button} ${s.buttonColumnAdd}`}
                type="button"
              >
                <div className={`${s.svgWrapperAddCard} ${s.svgWrapper} `}>
                  <SvgIcon
                    name="icon-plus"
                    width="14"
                    height="14"
                    className={s.iconAddCard}
                  />
                </div>
                <span className={s.buttonAddCard}>Add another card</span>
              </button>
            </div>
            <button onClick={openModal} className={s.button} type="button">
              <div className={s.svgWrapper}>
                <SvgIcon
                  name="icon-plus"
                  width="14"
                  height="14"
                  className={s.icon}
                />
              </div>
              <span className={s.buttonSpan}>Add another column</span>
            </button>
          </div>
        ) : (
          <p className={s.text}>
            Before starting your project, it is essential{" "}
            <button className={s.linkCreate}>to create a board</button> to visualize
            and track all the necessary tasks and milestones. This board serves
            as a powerful tool to organize the workflow and ensure effective
            collaboration among team members.
          </p>
        )}
        <AddColumnModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </main>
  );
};

export default ScreensPage;
