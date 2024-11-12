import SvgIcon from "../../../hooks/SvgIcon.jsx";
import s from "./InProgress.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAllColumns } from "../../../redux/columns/selectors.js";
import { editCardThunk } from "../../../redux/cards/operations.js";
import { toggleIsVisibleInPro } from "../../../redux/cards/slice.js";

const InProgress = ({ card }) => {
  const dispatch = useDispatch();
  const columns = useSelector(selectAllColumns);

  const handleClickColumn = (e) => {
    e.preventDefault();
    console.log("columnId=", e.currentTarget.id);
    console.log("cardId=", card);
    dispatch(toggleIsVisibleInPro());
    const updateCard = {
      title: card.title,
      description: card.description,
      priority: card.priority,
      dateDeadline: card.dateDeadline,
      columnId: e.currentTarget.id,
    };
    console.log(updateCard);
    dispatch(editCardThunk({ cardId: card._id, body: updateCard }));
  };

  return (
    <div className={s.modalOverlay}>
      <div
        className={s.modalContent}
        // ref={modalRef}
      >
        {columns.map((column) => {
          return (
            <div key={column._id}>
              <button
                className={s.column_btnChoice}
                id={column._id}
                onClick={handleClickColumn}
              >
                <div className={s.column_box}>
                  <p className={s.column_text}>{column.title}</p>
                  <SvgIcon
                    name="icon-arrow-circle-broken-right"
                    width="16"
                    height="16"
                    className={s.icon}
                  />
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InProgress;

//        <button>
//             <p className={s.column_text}>{item.tilte}</p>
//             <SvgIcon
//               name="icon-arrow-circle-broken-right"
//               width="16"
//               height="16"
//               className={s.icon}
//             />
//           </button>
//           <label className={s.column_choice}>
//             <input
//               type="radio"
//               name="column"
//               value="Light"
//               // checked={columnId === column.title}
//               // onChange={() => handleThemeSelect("light")}
//             />
//             <p className={s.column_text}>Light</p>
//             <SvgIcon
//               name="icon-arrow-circle-broken-right"
//               width="16"
//               height="16"
//               className={s.icon}
//             />
//           </label>
//         </li>
//         <li>
//           <label className={s.column_choice}>
//             <input
//               type="radio"
//               name="column"
//               value="Light"
//               // checked={columnId === column.title}
//               // onChange={() => handleThemeSelect("light")}
//             />
//             <p className={s.column_text}>Light</p>
//             <SvgIcon
//               name="icon-arrow-circle-broken-right"
//               width="16"
//               height="16"
//               className={s.icon}
//             />
//           </label>
//         </li>
// // <h4>List of columns</h4>
// // <ul>
// //   <li key={"ssseesesse"}>
// //     <button>
// //       <p>{material}</p>
// //       <SvgIcon
// //         name="icon-arrow-circle-broken-right"
// //         width="16"
// //         height="16"
// //         className={s.icon}
// //       />
// //     </button>
// //   </li>
// //   {/* {colimns.map((item) => {
// //     return (
// //       <li key={item._id}>
// //         <button>
// //           <p>{item.title}</p>
// //           <span>))))</span>
// //         </button>
// //       </li>
// //     );
// //   })} */}
// // </ul>
