import SvgIcon from "../../../hooks/SvgIcon.jsx";
import Card from "../Card/Card.jsx";
import s from "./Column.module.css";
import ModalCard from "../../ModalCard/ModalCard.jsx";
import { useState } from "react";

const Column = () => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [cards, setCards] = useState([]);

  const openCardModal = () => setCardModalOpen(true);
  const closeCardModal = () => setCardModalOpen(false);

  const addCard = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  return (
    <div className={s.columnWrapper}>
      <button className={`${s.button} ${s.buttonColumn}`} type="button">
        To Do
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
      <div className={s.scrollBarTasks}>
        <div className={s.tasksWrapper}>
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              priority={card.priority}
              deadline={card.deadline}
            />
          ))}
        </div>
      </div>
      <button
        onClick={openCardModal}
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
      {isCardModalOpen && (
        <ModalCard
          onClose={closeCardModal}
          title="Add card"
          btnName="Add"
          addCard={addCard}
        />
      )}
    </div>
  );
};

export default Column;
