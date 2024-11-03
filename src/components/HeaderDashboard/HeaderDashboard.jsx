import { useParams } from "react-router-dom";
import Filters from "../Filters/Filters.jsx"
import s from "./HeaderDashboard.module.css"

const HeaderDashboard = ({title}) => {
  const { boardId } = useParams();

  // console.log(boardId);
  
  
  // const isBoardCreated = true;

  return (
    <div className={`${s.wrapper} ${boardId ? s.visible : ''}`}>{boardId && <p className={s.title}>{title.title}</p>}
      <Filters />
    </div>)
}

  export default HeaderDashboard;