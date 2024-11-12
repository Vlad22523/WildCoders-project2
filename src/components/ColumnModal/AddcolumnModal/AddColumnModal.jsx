import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // For validation schema
import s from "../AddColumnModal/ColModal.module.css";
import SvgIcon from "../../../hooks/SvgIcon.jsx";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { fetchAddColumn } from "../../../redux/columns/operations.js";

// Validation schema for Formik
const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Title is required")
    .max(20, "Too long")
    .min(3, "Too short"),
});

const AddColumnModal = ({ isOpen, onClose, boardId }) => {
  const dispatch = useDispatch();
  // Close modal on Escape key press
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

  // Close modal on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onSubmit = (values, { resetForm }) => {
    const body = {
      title: values.title,
    };
    dispatch(fetchAddColumn({ body, boardId }));

    resetForm(); // Clear the form
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.content}>
        <div className={s.header}>
          <h2 className={s.text}>Add column</h2>
        </div>
        <button className={s.buttonClose} onClick={onClose}>
          <IoClose />
        </button>
        <Formik
          initialValues={{ title: "" }}
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
                <div className={s.svgWrapper}>
                  <SvgIcon
                    name="icon-plus"
                    width="14"
                    height="14"
                    className={s.icon}
                  />
                </div>
                Add
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddColumnModal;
