import SvgIcon from '../../hooks/SvgIcon.jsx'
import s from './Task.module.css'

const Task = () => {
  return (
      <div className={s.taskContainer}>
          <h4 className={s.title}>The Watch Spot Design</h4>
          <p className={s.descr}>Create a visually stunning and eye-catching watch dial design that embodies
              our brand's essence of sleek aesthetics and modern elegance. Your design should be unique,
              innovative, and reflective of the latest trends in watch design.</p>
          <div className={s.line}></div>
          <div className={s.optionsContainer}>
              <div className={s.optionsWrapper}>
                  <div className={s.option}><span className={s.optionLabel}>Priority</span><p className={s.priorityValue}>Low</p></div>
                  <div className={s.option}><span className={s.optionLabel}>Deadline</span><p className={s.deadlineDate}>Date</p></div>
              </div>
              <div className={s.btnsWrapper}>
                  <button className={s.btnOptions} type='button'><SvgIcon name="icon-arrow-circle-broken-right" width="16" height="16" className={s.icon} /></button>
                  <button className={s.btnOptions} type='button'><SvgIcon name="icon-pencil" width="16" height="16" className={s.icon} /></button>
                  <button className={s.btnOptions} type='button'><SvgIcon name="icon-trash" width="16" height="16" className={s.icon} /></button>
              </div>
          </div>


    </div>
  )
}

export default Task