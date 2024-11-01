import Filters from "../Filters/Filters.jsx"
import s from "./HeaderDashboard.module.css"

const HeaderDashboard = () => {
  const isBoardCreated = true;

  return (
    <div className={`${s.wrapper} ${isBoardCreated ? s.visible : ''}`}>{isBoardCreated && <p className={s.title}>Name of board</p>}
      <Filters />
    </div>)
}

  export default HeaderDashboard;