import SvgIcon from "../../../hooks/SvgIcon.jsx";
import Card from "../Card/Card.jsx";
import s from "./Column.module.css";
import ModalCard from "../../ModalCard/ModalCard.jsx";
import { useState, useEffect } from "react";

const Column = () => {
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem("cards");
    return savedCards ? JSON.parse(savedCards) : [];
  });

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const openCardModal = (card = null) => {
    setEditingCard(card);
    setCardModalOpen(true);
  };
  const closeCardModal = () => {
    setEditingCard(null);
    setCardModalOpen(false);
  };

  const addCard = (newCard) => {
    setCards((prevCards) => [...prevCards, { id: Date.now(), ...newCard }]);
  };

  const updateCard = (updatedCard) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      );
      return updatedCards;
    });
  };

  const deleteCard = (cardToDelete) => {
    setCards((prevCards) =>
      prevCards.filter((card) => card.id !== cardToDelete.id)
    );
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
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              priority={card.priority}
              deadline={card.deadline}
              onEdit={() => openCardModal(card)}
              onDelete={() => deleteCard(card)}
            />
          ))}
        </div>
      </div>
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
      {isCardModalOpen && (
        <ModalCard
          onClose={closeCardModal}
          title={editingCard ? "Edit card" : "Add card"}
          btnName={editingCard ? "Edit" : "Add"}
          addCard={addCard}
          updateCard={updateCard}
          editingCard={editingCard}
          cardTitle={editingCard?.title}
          cardDescription={editingCard?.description}
          currentPriority={editingCard?.priority}
          deadline={editingCard?.deadline}
        />
      )}
    </div>
  );
};

export default Column;
