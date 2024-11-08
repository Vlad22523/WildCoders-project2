import { useState, useEffect } from 'react';
import s from '../AddcolumnModal/ColModal.module.css';
import SvgIcon from "../../../hooks/SvgIcon.jsx";
import { IoClose } from "react-icons/io5";

const AddColumnModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    // Add column logic here
    console.log('Column added:', title);
    setTitle('');
    onClose();
  };

// Close modal on Esc key press
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [onClose]);

// Close modal on backdrop click
const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) {
    onClose();
  }
};

  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.content}>
        <div className={s.header}>
          <h2 className={s.text}>Add column</h2>
        </div>
          <button className={s.buttonClose} onClick={onClose}><IoClose/></button>
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