import Backdrop from "../Backdrop/Backdrop";
import s from "./EditUserProfile.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

const EditUserProfile = ({ onClose }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [photo, setPhoto] = useState(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be less 15 characters"),
    email: Yup.string().email("Invalid email format"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
  });
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className={s.modal}>
        <h2 className={s.title}>Edit profile</h2>
        <button onClick={onClose} className={s.buttonClose}>
          <IoClose color="black" size="24px" />
        </button>

        <Formik
          initialValues={initialValues}
          onSubmit={() => {}}
          validationSchema={validationSchema}
        >
          <Form className={s.form}>
            <div className={s.photoWrapper}>
              <div className={s.photoPreview}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBSSpX3hNAqZQ7ME5h5-29zdrC2-XJDH5SRg&s"
                  alt="Photo Preview"
                />
              </div>
              <label htmlFor="avatar" className={s.photoChooseBtn}>
                +
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={() => {}}
              />
            </div>
            <div className={s.inputWrap}>
              <div>
                <Field
                  className={s.input}
                  name="name"
                  placeholder="Enter your name"
                />
                <ErrorMessage name="name" component="div" className={s.error} />
              </div>
              <div>
                <Field
                  className={s.input}
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={s.error}
                />
              </div>
              <div>
                <div className={s.passwordWrap}>
                  <Field
                    className={s.input}
                    name="password"
                    placeholder="Enter your password"
                    type={isPasswordVisible ? "text" : "password"}
                  />
                  <button
                    type="button"
                    className={s.visibilityToggle}
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={s.error}
                />
              </div>
            </div>
            <button className={s.submitBtn} type="submit">
              Send
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default EditUserProfile;
