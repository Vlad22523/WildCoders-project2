import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./RegisterForm.module.css";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth/operations.js";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, options) => {
    console.log("Submitting values:", values);
    dispatch(registerThunk(values));
    options.resetForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(32, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(64, "Too Long!")
      .required("Required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <div className={s.formItem}>
            <Field
              type="text"
              name="name"
              placeholder="Enter your name"
              className={s.field}
            />
          </div>
          <ErrorMessage name="name" component="div" className={s.error} />
          <div className={s.formItem}>
            <Field
              type="email"
              name="email"
              placeholder="Enter your email"
              className={s.field}
            />
          </div>
          <ErrorMessage name="email" component="div" className={s.error} />
          <div className={s.formItem}>
            <Field
              type="password"
              name="password"
              placeholder="Create a password"
              className={s.field}
            />
          </div>
          <ErrorMessage name="password" component="div" className={s.error} />
          <button type="submit" className={s.btn}>
            Register Now
          </button>
        </Form>
      </Formik>
    </>
  );
};
export default RegisterForm;
