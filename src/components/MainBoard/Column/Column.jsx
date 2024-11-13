import SvgIcon from "../../../hooks/SvgIcon.jsx";
import Card from "../Card/Card.jsx";
import s from "./Column.module.css";
import ModalCard from "../../ModalCard/ModalCard.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredCards,
  selectLoadingCards,
  selectRefreshCards,
} from "../../../redux/cards/selectors.js";
import {
  addCardThunk,
  editCardThunk,
  fetchCardsThunk,
} from "../../../redux/cards/operations.js";
import { LineWave } from "react-loader-spinner";
import EditColumnModal from "../../ColumnModal/EditColumnModal/EditColumModal.jsx";
import { DeleteColumn } from "../../ColumnModal/DeleteColumn/DeleteColumn.jsx";
import { refreshUserThunk } from "../../../redux/auth/operations.js";
import { resetRefreshCards } from "../../../redux/cards/slice.js";

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

  const [isCardModal, setCardModal] = useState(false);
  const [valueModal, setValueModal] = useState(false);
  const [editingCardData, setEditingCardData] = useState({});
  const [editingCard, setEditingCard] = useState(false);
  const refresh = useSelector(selectRefreshCards);
  useEffect(() => {
    if (_id) {
      dispatch(fetchCardsThunk(_id));
    }
  }, [_id, dispatch]);

  const cardsForColumn = filteredCards.filter((card) => card.columnId === _id);

  const openCardModal = (id) => {
    if (id) {
      setValueModal(true);
      setEditingCard(true);
      const findCardById = filteredCards.filter((card) => card._id === id);
      setEditingCardData(findCardById);
    }
    if (id === undefined) {
      setEditingCard(false);
      setValueModal(false);
      setEditingCardData({});
    }
    setCardModal(true);
  };

  const closeCardModal = () => {
    setValueModal(false);
    setCardModal(false);
  };

  const addCard = (newCard) => {
    const { columnId, ...filteredCard } = newCard;
    setEditingCard(false);
    dispatch(addCardThunk({ columnId: columnId, body: filteredCard }));
  };

  const updateCard = (updatedCard) => {
    setEditingCard(true);
    dispatch(
      editCardThunk({ cardId: editingCardData[0]._id, body: updatedCard })
    );
  };

  useEffect(() => {
    // Виконати логіку для refresh, якщо це необхідно
    if (refresh) {
      dispatch(refreshUserThunk()).then(() => {
        dispatch(resetRefreshCards());
        dispatch(fetchCardsThunk(_id)); // Скидаємо refresh після виконання
      });
    }
  }, [dispatch, refresh, _id]);

  const handleWheel = (event) => {
    if (event.deltaX === 0) {
      event.stopPropagation();
      return;
    }
  };

  return (
    <div className={s.columnWrapper}>
      <div className={`${s.button} ${s.buttonColumn}`}>
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
          color="rgb(var(--button-color-mainboard))"
          ariaLabel="line-wave-loading"
          wrapperClass={s.lineWaveLoader}
        />
      ) : (
        <div className={s.scrollBarTasks} onWheel={handleWheel}>
          <div className={s.tasksWrapper}>
            {cardsForColumn.map((card) => (
              <Card
                key={card._id}
                data={card}
                openModal={openCardModal}
                columnId={_id}
              />
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => openCardModal()}
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
      {isCardModal && (
        <ModalCard
          onClose={closeCardModal}
          title={valueModal ? "Edit card" : "Add card"}
          btnName={valueModal ? "Edit" : "Add"}
          columnId={_id}
          addCard={addCard}
          updateCard={updateCard}
          editingCard={editingCard}
          cardTitle={editingCardData[0]?.title}
          cardDescription={editingCardData[0]?.description}
          currentPriority={editingCardData[0]?.priority}
          deadline={editingCardData[0]?.deadline}
        />
      )}
    </div>
  );
};

export default Column;
