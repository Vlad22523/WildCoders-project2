import SvgIcon from "../../../hooks/SvgIcon.jsx";
import Card from "../Card/Card.jsx";
import s from "./Column.module.css";
// import ModalCard from "../../ModalCard/ModalCard.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoadingCards } from "../../../redux/cards/selectors.js";
import { fetchCardsThunk } from "../../../redux/cards/operations.js";
import { LineWave } from "react-loader-spinner";
import { selectFilteredCards } from "../../../redux/cards/slice.js";
import EditColumnModal from "../../ColumnModal/EditColumnModal/EditColumModal.jsx";
import { DeleteColumn } from "../../ColumnModal/DeleteColumn/DeleteColumn.jsx";

const Column = ({ data: { title, _id }, boardId }) => {
  const loading = useSelector(selectLoadingCards);
  const dispatch = useDispatch();
  const filteredCards = useSelector(selectFilteredCards);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const openModalEdit = () => setModalOpen(true);
  const closeModalEdit = () => setModalOpen(false);

  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = () => setIsModalDeleteOpen(false);

  useEffect(() => {
    if (_id) {
      dispatch(fetchCardsThunk(_id));
    }
  }, [_id, dispatch]);

  return (
    <div className={s.columnWrapper}>
      <div className={`${s.button} ${s.buttonColumn}`} type="button">
        {title}

        <div className={s.svgWrapperColumn}>
          <button onClick={openModalEdit} className={s.btn_column}>
            <SvgIcon
              name="icon-pencil"
              width="16"
              height="16"
              className={s.iconColumn}
            />
          </button>
          <button className={s.btn_column} onClick={openModalDelete}>
            <SvgIcon
              name="icon-trash"
              width="16"
              height="16"
              className={s.iconColumn}
            />
          </button>
        </div>
        <EditColumnModal
          onClose={closeModalEdit}
          isOpen={isModalOpen}
          title={title}
          id={_id}
          boardId={boardId}
        />
        <DeleteColumn
          onClose={closeModalDelete}
          isOpen={isModalDeleteOpen}
          title={title}
          id={_id}
          boardId={boardId}
        />
      </div>
      {loading ? (
        <LineWave
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="line-wave-loading"
          wrapperClass={s.lineWaveLoader}
        />
      ) : (
        <div className={s.scrollBarTasks}>
          <div className={s.tasksWrapper}>
            {filteredCards.map((card) => (
              <Card key={card._id} data={card} />
            ))}
          </div>
        </div>
      )}
      <button
        // onClick={() => openCardModal()}
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
        Add another card
      </button>
      {/* {isCardModalOpen && (
        // <ModalCard
        //   // onClose={closeCardModal}
        //   title={editingCard ? "Edit card" : "Add card"}
        //   btnName={editingCard ? "Edit" : "Add"}
        //   // addCard={addCard}
        //   // updateCard={updateCard}
        //   editingCard={editingCard}
        //   cardTitle={editingCard?.title}
        //   cardDescription={editingCard?.description}
        //   currentPriority={editingCard?.priority}
        //   deadline={editingCard?.deadline}
        // />
      )} */}
    </div>
  );
};

export default Column;
