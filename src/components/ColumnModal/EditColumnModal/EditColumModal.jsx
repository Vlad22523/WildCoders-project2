import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // Для валідації
import s from "../EditColumnModal/EditModal.module.css";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  fetchColumnsThunk,
  fetchPatchColumn,
} from "../../../redux/columns/operations.js";

// Схема валідації для Formik
const validationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required").max(20, "Too long"),
});

const EditColumnModal = ({ isOpen, onClose, title, id, boardId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onSubmit = (values, { resetForm }) => {
    const body = {
      title: values.title,
    };
    dispatch(fetchPatchColumn({ body, id })).then(() => {
      dispatch(fetchColumnsThunk(boardId));
    });
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.content}>
        <div className={s.header}>
          <h2 className={s.text}>Edit column</h2>
        </div>
        <button className={s.buttonClose} onClick={onClose}>
          <IoClose className={s.svg} />
        </button>
        <Formik
          initialValues={{ title: title }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                name="title"
                placeholder="Title"
                className={`${s.field} ${
                  errors.title && touched.title ? s.errorField : ""
                }`}
              />
              {errors.title && touched.title && (
                <div className={s.errorMessage}>{errors.title}</div>
              )}
              <button
                type="submit"
                className={s.button}
                disabled={isSubmitting}
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditColumnModal;
