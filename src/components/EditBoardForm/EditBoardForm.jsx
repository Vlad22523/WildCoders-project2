import { MainBoardForm } from "../MainBoardForm/MainBoardForm.jsx";
import * as Yup from "yup";
import s from "../MainBoardForm/MainBoardForm.module.css";

export const EditBoardForm = ({ onSubmit, setFormOpen, initialValues }) => {
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Min 3 characters")
      .max(14, "Max 14 characters")
      .required("Title is required"),
  });

  return (
    <MainBoardForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      title="Edit board"
      setFormOpen={setFormOpen}
      submitButton={
        <button className={s.button} type="submit">
          <svg className={s.iconButton} width="28" height="28">
            <use href={`/src/images/icons.svg#icon-plus`} />
          </svg>
          Update
        </button>
      }
    />
  );
};
