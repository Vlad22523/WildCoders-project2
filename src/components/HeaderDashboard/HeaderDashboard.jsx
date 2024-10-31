import Filters from "../Filters/Filters.jsx"
import s from "./HeaderDashboard.module.css"

const HeaderDashboard = () => {
  return (
      <div className={s.wrapper}><p className={s.title}>Name of board</p>
          <Filters/>
    </div>
  )
}

export default HeaderDashboard