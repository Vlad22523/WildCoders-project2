import s from "./ScreensPage.module.css";
import AddColumnModal from "../../ColumnModal/AddcolumnModal/AddColumnModal.jsx";
import { useState } from "react";
import arr from "../../Sidebar/BoardsArr.js";
import { useParams } from "react-router-dom";
import Column from "../Column/Column.jsx";
import HeaderDashboard from "../HeaderDashboard/HeaderDashboard.jsx";
import SvgIcon from "../../../hooks/SvgIcon.jsx";

const ScreensPage = () => {
  const { boardId } = useParams();
  let boardData;

  if (boardId) {
    boardData = arr.find((i) => i.boardId === boardId);
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <main className={s.main}>
      <div className={s.mainContainer}>
        <div className={s.header}>
          <HeaderDashboard title={boardData} />
        </div>
        <div
          className={`${s.mainWrapper} ${boardId ? s.boardCreated : s.noBoard}`}
        >
          {boardId ? (
            <div className={s.scrollbarColumn}>
              <div className={s.columnContainer}>
                <Column />
                <Column />
                <Column />
                <button onClick={openModal} className={s.button} type="button">
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
