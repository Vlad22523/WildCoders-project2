import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./RegisterForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../redux/auth/operations.js";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import SvgIcon from "../../hooks/SvgIcon.jsx";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, options) => {
    dispatch(registerThunk(values));
    options.resetForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must not exceed 20 characters")
      .required("*"),
    email: Yup.string().email("Invalid email format").required("*"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must not exceed 20 characters")
      .matches(/[A-Z]/, "Password must include at least one uppercase letter")
      .matches(/[a-z]/, "Password must include at least one lowercase letter")
      .matches(/\d/, "Password must include at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must include at least one special character"
      )
      .required("*"),
  });

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

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
              type="text"
              name="name"
              placeholder="Enter your name"
              className={s.field}
            />

            <ErrorMessage name="name" component="div" className={s.error} />
          </label>

          <label>
            <Field
              type="email"
              name="email"
              placeholder="Enter your email"
              className={s.field}
            />

            <ErrorMessage name="email" component="div" className={s.error} />
          </label>

          <label className={s.passwordWrapper}>
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              className={s.field}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`${s.btnShowPassword} ${
                showPassword ? s.eyeOpen : s.eyeClosed
              }`}
            >
              <SvgIcon
                name="icon-eye"
                width="18"
                height="18"
                className={s.svgEye}
              />
            </button>

            <ErrorMessage name="password" component="div" className={s.error} />
          </label>
          <button type="submit" className={s.btn}>
            Register Now
          </button>
        </Form>
      </Formik>
    </>
  );
};
export default RegisterForm;
