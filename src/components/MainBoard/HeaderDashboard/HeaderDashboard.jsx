import s from "./HeaderDashboard.module.css";
import Filters from "../Filters/Filters.jsx";
import { useParams } from "react-router-dom";

const HeaderDashboard = ({ title }) => {
  const { boardId } = useParams();
  return (
    <div className={`${s.wrapper} ${boardId ? s.visible : ""}`}>
      {boardId && <p className={s.title}>{title}</p>}
      <Filters />
    </div>
  );
};

export default HeaderDashboard;
