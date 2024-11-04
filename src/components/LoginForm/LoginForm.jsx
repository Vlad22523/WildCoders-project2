import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/auth/operations.js";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("*"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(64, "Too Long!")
      .required("*"),
  });

  const dispatch = useDispatch();
  const handleSubmit = (values, options) => {
    dispatch(loginThunk(values));
    options.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <label>
            <Field
              name="email"
              placeholder="Enter your email"
              className={s.field}
            />

            <ErrorMessage name="email" component="div" className={s.error} />
          </label>

          <label>
            <Field
              type="password"
              name="password"
              placeholder="Confirm a password"
              className={s.field}
            />

            <ErrorMessage name="password" component="div" className={s.error} />
          </label>
          <button type="submit" className={s.btn}>
            Log In Now
          </button>
        </Form>
      </Formik>
    </>
  );
};
export default LoginForm;
