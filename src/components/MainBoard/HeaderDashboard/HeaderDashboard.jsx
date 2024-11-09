import { useParams } from "react-router-dom";
import s from "./HeaderDashboard.module.css";
import Filters from "../Filters/Filters.jsx";

const HeaderDashboard = ({ title }) => {
  const { boardId } = useParams();
  if (!title) {
    console.log("Заголовок не знайдений");
    return;
  }

  // console.log(boardId);

  // const isBoardCreated = true;

  return (
    <div className={`${s.wrapper} ${boardId ? s.visible : ""}`}>
      {boardId && <p className={s.title}>{title.title}</p>}
      <Filters />
    </div>
  );
};

export default HeaderDashboard;
