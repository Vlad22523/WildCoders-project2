import s from "./HelpModal.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectIsOpenHelpModal } from "../../redux/needHelp/selectors.js";
import { closeHelpModal } from "../../redux/needHelp/slice.js";
import { IoClose } from "react-icons/io5";

const HelpModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenHelpModal);

  const initialValues = {
    email: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("*"),
    text: Yup.string().required("Required"),
  });

  const handleSubmit = () => {
    dispatch(closeHelpModal());
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={s.overlay}>
        <div className={s.content}>
          <div>
            <h2 className={s.header}>Need Help</h2>
            <button
              className={s.closeBtn}
              type="button"
              onClick={() => dispatch(closeHelpModal())}
            >
              <IoClose className={s.svg} />
            </button>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={s.form}>
              <label>
                <Field
                  className={s.field}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  className={s.error}
                  name="email"
                  component="span"
                />
              </label>
              <label>
                <Field
                  className={s.textarea}
                  as="textarea"
                  name="message"
                  placeholder="Enter your message"
                  rows="4"
                />
                <ErrorMessage
                  className={s.error}
                  name="message"
                  component="span"
                />
              </label>
              <button className={s.btn} type="submit">
                Send
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default HelpModal;
