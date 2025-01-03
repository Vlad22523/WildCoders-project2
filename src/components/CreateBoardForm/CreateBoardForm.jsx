import { MainBoardForm } from "../MainBoardForm/MainBoardForm.jsx";
import * as Yup from "yup";
import s from "../MainBoardForm/MainBoardForm.module.css";
import { useDispatch } from "react-redux";
import { createBoardThunk } from "../../redux/boards/operations.js";
import { useNavigate } from "react-router-dom";
import SvgIcon from "../../hooks/SvgIcon.jsx";

export const CreateBoardForm = ({ setFormOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const newBoardData = {
      title: data.title,
      icon: data.icon,
      background: data.background,
    };
    dispatch(createBoardThunk(newBoardData)).then((item) => {
      navigate(`/home/${item?.payload?._id}`);
    });
    setFormOpen(false);
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Min 3 characters")
      .max(14, "Max 14 characters")
      .required("Title is required"),
  });

  return (
    <MainBoardForm
      initialValues={{ title: "", icon: "icon-1", background: "bg-1" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      title="New board"
      setFormOpen={setFormOpen}
      submitButton={
        <button className={s.button} type="submit">
          <SvgIcon
            name="icon-plus"
            width="28"
            height="28"
            className={s.iconButton}
          />
          Create
        </button>
      }
    />
  );
};
