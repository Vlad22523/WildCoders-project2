import s from "./HelpModal.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  selectIsLoading,
  selectIsOpenHelpModal,
} from "../../redux/needHelp/selectors.js";
import { closeHelpModal } from "../../redux/needHelp/slice.js";
import { IoClose } from "react-icons/io5";
import Backdrop from "../Backdrop/Backdrop.jsx";
import { Toaster, toast } from "react-hot-toast";
import { submitHelpThunk } from "../../redux/needHelp/operations.js";

const HelpModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenHelpModal);
  const isLoading = useSelector(selectIsLoading);

  const initialValues = {
    email: "",
    comment: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    comment: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(submitHelpThunk(values)).unwrap();
      toast.success("Your message has been sent successfully!");
      dispatch(closeHelpModal());
    } catch (error) {
      toast.error(error.message || "Error sending message");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(closeHelpModal());
  };

  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClose={handleClose} />
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
          {({ isSubmitting }) => (
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
                  name="comment"
                  placeholder="Enter your message"
                />
                <ErrorMessage
                  className={s.error}
                  name="comment"
                  component="span"
                />
              </label>
              <button
                className={s.btn}
                type="submit"
                disabled={isSubmitting || isLoading}
              >
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster />
    </>
  );
};

export default HelpModal;
