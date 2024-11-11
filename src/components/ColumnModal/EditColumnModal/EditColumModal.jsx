import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // Для валідації
import s from "../EditColumnModal/EditModal.module.css";
import { IoClose } from "react-icons/io5";
import Backdrop from "../../Backdrop/Backdrop";

// Схема валідації для Formik
const validationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
});

const EditColumnModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className={s.content}>
        <div className={s.header}>
          <h2 className={s.text}>Edit column</h2>
        </div>
        <button className={s.buttonClose} onClick={onClose}>
          <IoClose className={s.svg} />
        </button>
        <Formik
          initialValues={{ title: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("Saved title:", values.title); // Наприклад, замість збереження
            resetForm(); // Очищення форми
            onClose(); // Закриття модального вікна
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
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EditColumnModal;
