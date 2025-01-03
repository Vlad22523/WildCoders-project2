import { MainBoardForm } from "../MainBoardForm/MainBoardForm.jsx";
import * as Yup from "yup";
import s from "../MainBoardForm/MainBoardForm.module.css";
import { useDispatch } from "react-redux";
import {
  getBoardsThunk,
  updateBoardThunk,
} from "../../redux/boards/operations.js";
import { useState } from "react";
import SvgIcon from "../../hooks/SvgIcon.jsx";

export const EditBoardForm = ({ setFormOpen, initialValues }) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialValues);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Min 3 characters")
      .max(14, "Max 14 characters")
      .required("Title is required"),
  });

  const handleSubmit = async (values) => {
    const { _id } = initialValues;
    const updatedData = {
      title: values.title,
      icon: values.icon,
      background: values.background,
    };

    if (!_id) {
      console.error("Board ID is missing");
      return;
    }

    try {
      await dispatch(updateBoardThunk({ _id, updatedData }));
      setFormValues({
        ...formValues,
        title: values.title,
        icon: values.icon,
        background: values.background,
      });
      setFormOpen(false);
      dispatch(getBoardsThunk());
    } catch (error) {
      console.error("Error updating board:", error);
    }
  };

  return (
    <MainBoardForm
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      title="Edit board"
      setFormOpen={setFormOpen}
      submitButton={
        <button className={s.button} type="submit">
          <SvgIcon
            name="icon-plus"
            width="28"
            height="28"
            className={s.iconButton}
          />
          Update
        </button>
      }
    />
  );
};
