import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // For validation schema
import s from "../AddColumnModal/ColModal.module.css";
import SvgIcon from "../../../hooks/SvgIcon.jsx";
import { IoClose } from "react-icons/io5";
import Backdrop from "../../Backdrop/Backdrop.jsx";

// Validation schema for Formik
const validationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
});

const AddColumnModal = ({ isOpen, onClose, onAddColumn }) => {
  // Close modal on Escape key press

  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClose={onClose} />
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
          onSubmit={(values, { resetForm }) => {
            onAddColumn(values.title); // Add the new column
            resetForm(); // Clear the form
            onClose(); // Close the modal
          }}
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
    </>
  );
};

export default AddColumnModal;
