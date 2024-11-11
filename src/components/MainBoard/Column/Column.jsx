import SvgIcon from "../../../hooks/SvgIcon.jsx";
import Card from "../Card/Card.jsx";
import s from "./Column.module.css";
import ModalCard from "../../ModalCard/ModalCard.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredCards,
  selectLoadingCards,
} from "../../../redux/cards/selectors.js";
import {
  addCardThunk,
  deleteCardThunk,
  editCardThunk,
  fetchCardsThunk,
} from "../../../redux/cards/operations.js";
import { LineWave } from "react-loader-spinner";
import toast from "react-hot-toast";

const Column = ({ data: { title, _id } }) => {
  const loading = useSelector(selectLoadingCards);
  const dispatch = useDispatch();
  const filteredCards = useSelector(selectFilteredCards);
  const [isCardModal, setCardModal] = useState(false);
  const [valueModal, setValueModal] = useState(false);
  const [editingCardData, setEditingCardData] = useState({});
  const [editingCard, setEditingCard] = useState(false);
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
      console.log(findCardById);
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
    console.log("updateCard called");
    setEditingCard(true);
    console.log(updatedCard);

    dispatch(
      editCardThunk({ cardId: editingCardData[0]._id, body: updatedCard })
    );
  };

  const deleteCard = (cardId) => {
    toast.custom((t) => (
      <div className={s.modalOverlay} onClick={(e) => e.stopPropagation()}>
        <div className={s.modalContainer}>
          <button
            type="button"
            onClick={cancelDelete}
            className={s.closeButton}
          >
            <svg width="18" height="18">
              <use href={`/src/images/icons.svg?t=1730829317287#icon-plus`} />
            </svg>
          </button>
          <h2 className={s.modalText}>Are you sure you want to delete card?</h2>
          <div className={s.containerButton}>
            <button className={s.modalButton} onClick={cancelDelete}>
              No
            </button>
            <button className={s.modalButton} onClick={confirmDelete}>
              Yes
            </button>
          </div>
        </div>
      </div>
    ));
    const confirmDelete = () => {
      toast.dismiss();
      dispatch(deleteCardThunk(cardId));
    };
    const cancelDelete = () => {
      toast.dismiss();
    };
  };

  return (
    <div className={s.columnWrapper}>
      <div className={`${s.button} ${s.buttonColumn}`}>
        {title}
        <div className={s.svgWrapperColumn}>
          <button type="button" className={s.columnSvgButton}>
            <SvgIcon
              name="icon-pencil"
              width="16"
              height="16"
              className={s.iconColumn}
            />
          </button>
          <button type="button" className={s.columnSvgButton}>
            <SvgIcon
              name="icon-trash"
              width="16"
              height="16"
              className={s.iconColumn}
            />
          </button>
        </div>
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
            {cardsForColumn.map((card) => (
              <Card
                key={card._id}
                data={card}
                openModal={openCardModal}
                onDelete={deleteCard}
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
