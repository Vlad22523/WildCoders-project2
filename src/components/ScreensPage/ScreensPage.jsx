import { useState, useRef } from 'react';
import HeaderDashboard from "../HeaderDashboard/HeaderDashboard.jsx";
import SvgIcon from "../../hooks/SvgIcon.jsx";
import s from "./ScreensPage.module.css";
import AddColumnModal from "../ColumnModal/AddcolumnModal/addColumnModal.jsx";
import EditColumnModal from "../ColumnModal/EditColumnModal/EditColumnModal.jsx";

const ScreensPage = () => {
  const isBoardCreated = true;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(''); // State to store dynamic column title
  const titleRef = useRef(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openEditModal = (title) => {
    setEditTitle(title); // Set the title before opening the modal
    setEditModalOpen(true);
  };
  const closeEditModal = () => setEditModalOpen(false);

  const handleEditClick = () => {
    if (titleRef.current) {
      openEditModal(titleRef.current.innerText);
    }
  };

  return (
    <main className={s.main}>
      <div className={s.header}>
        <HeaderDashboard />
      </div>
      <div
        className={`${s.mainWrapper} ${
          isBoardCreated ? s.boardCreated : s.noBoard
        }`}
      >
        {isBoardCreated ? (
          <div className={s.columnContainer}>
            <div className={s.columnWrapper}>
              <button className={`${s.button} ${s.buttonColumn}`} type="button">
                <span className={s.buttonSpan} ref={titleRef}>To Do</span>
                <div className={s.svgWrapperColumn}>
                  <span onClick={handleEditClick}>
                  {/* * Pass dynamic title * */}
                    <SvgIcon
                      name="icon-pencil"
                      width="16"
                      height="16"
                      className={s.iconColumn}
                    />
                  </span>
                  <SvgIcon
                    name="icon-trash"
                    width="16"
                    height="16"
                    className={s.iconColumn}
                  />
                </div>
              </button>
              <button className={`${s.button} ${s.buttonColumnAdd}`} type="button">
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
            <span className={s.linkCreate}>to create a board</span> to visualize
            and track all the necessary tasks and milestones. This board serves
            as a powerful tool to organize the workflow and ensure effective
            collaboration among team members.
          </p>
        )}
        <AddColumnModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
        <EditColumnModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          initialTitle={editTitle}
        />
      </div>
    </main>
  );
};

export default ScreensPage;
