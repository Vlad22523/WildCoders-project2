import SvgIcon from "../../../hooks/SvgIcon.jsx";
import Card from "../Card/Card.jsx";
import s from "./Column.module.css";
// import ModalCard from "../../ModalCard/ModalCard.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCards,
  selectCardsByColumn,
  selectLoadingCards,
} from "../../../redux/cards/selectors.js";
import { fetchCardsThunk } from "../../../redux/cards/operations.js";
import { LineWave } from "react-loader-spinner";
import { selectFilteredCards } from "../../../redux/cards/slice.js";

const Column = ({ data: { title, _id } }) => {
  const loading = useSelector(selectLoadingCards);
  const dispatch = useDispatch();
  const filteredCards = useSelector(selectFilteredCards);
  const cards = useSelector(selectAllCards);
  console.log(cards);

  const [columnCards, setColumnCards] = useState([]);

  useEffect(() => {
    if (_id) {
      dispatch(fetchCardsThunk(_id));
    }
  }, [_id, dispatch]);

  // const openCardModal = (card = null) => {
  //   setEditingCard(card);
  //   setCardModalOpen(true);
  // };
  // const closeCardModal = () => {
  //   setEditingCard(null);
  //   setCardModalOpen(false);
  // };

  // const addCard = (newCard) => {
  //   setCards((prevCards) => [...prevCards, { id: Date.now(), ...newCard }]);
  // };

  // const updateCard = (updatedCard) => {
  //   setCards((prevCards) => {
  //     const updatedCards = prevCards.map((card) =>
  //       card.id === updatedCard.id ? updatedCard : card
  //     );
  //     return updatedCards;
  //   });
  // };

  // const deleteCard = (cardToDelete) => {
  //   setCards((prevCards) =>
  //     prevCards.filter((card) => card.id !== cardToDelete.id)
  //   );
  // };

  return (
    <div className={s.columnWrapper}>
      <button className={`${s.button} ${s.buttonColumn}`} type="button">
        {title}
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
