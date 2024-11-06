import { useState } from "react";
import s from "../AddcolumnModal/ColModal.module.css";
import SvgIcon from "../../../hooks/SvgIcon.jsx";
import { IoClose } from "react-icons/io5";

const AddColumnModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    // Add column logic here
    console.log("Column added:", title);
    setTitle("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={s.overlay}>
      <div className={s.content}>
        <div className={s.header}>
          <h2 className={s.text}>Add column</h2>
        </div>
        <button className={s.buttonClose} onClick={onClose}>
          <IoClose className={s.svg} />
        </button>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={s.field}
        />
        <button className={s.button} onClick={handleAdd}>
          <div className={s.svgWrapper}>
            <SvgIcon
              name="icon-plus"
              width="14"
              height="14"
              className={s.icon}
            />
          </div>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddColumnModal;
