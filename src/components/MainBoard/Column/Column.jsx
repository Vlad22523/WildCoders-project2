import SvgIcon from "../../../hooks/SvgIcon.jsx";
import Card from "../Card/Card.jsx";
import s from "./Column.module.css";



const Column = () => {
  return (
              <div className={s.columnWrapper}>
                <button className={`${s.button} ${s.buttonColumn}`} type="button">To Do
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
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                  </div>
                </div>
                <button
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
                  </div>Add another card
                </button>
              </div>
  )
}

export default Column