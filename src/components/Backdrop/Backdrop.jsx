import s from "./Backdrop.module.css";

export const Backdrop = ({ onClick }) => {
  return <div className={s.backdrop} onClick={onClick}></div>;
};
