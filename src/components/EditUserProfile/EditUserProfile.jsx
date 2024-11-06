import Backdrop from "../Backdrop/Backdrop";
import s from "./EditUserProfile.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { updateUserThunk } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import SvgIcon from "../../hooks/SvgIcon";

const EditUserProfile = ({ user, onClose }) => {
  const dispatch = useDispatch();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(user.photo);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPhoto(file);
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("theme", user.theme);
      if (values.password) {
        formData.append("password", values.password);
      }
      if (selectedPhoto) {
        formData.append("photo", selectedPhoto);
      }

      await dispatch(updateUserThunk(formData));
      onClose();
    } catch (err) {
      console.error("Error during form submission:", err);
    }
  };

  const initialValues = {
    name: user.name || "",
    email: user.email || "",
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
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className={s.form}>
            <div className={s.photoWrapper}>
              <div className={s.photoPreview}>
                <img
                  className={s.userPhoto}
                  src={previewPhoto}
                  alt="Photo Preview"
                />
              </div>
              <label htmlFor="photo" className={s.photoChooseBtn}>
                +
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
            <div className={s.inputWrap}>
              <div className={s.relativeWrap}>
                <Field
                  className={s.input}
                  name="name"
                  placeholder="Enter your name"
                />
                <ErrorMessage name="name" component="div" className={s.error} />
              </div>
              <div className={s.relativeWrap}>
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
              <div className={s.relativeWrap}>
                <div className={s.passwordWrap}>
                  <Field
                    className={s.input}
                    name="password"
                    placeholder="Enter your password"
                    type={isPasswordVisible ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={`${s.btnShowPassword} ${
                      !isPasswordVisible ? s.eyeOpen : s.eyeClosed
                    }`}
                  >
                    <SvgIcon
                      name="icon-eye"
                      width="18"
                      height="18"
                      className={s.svgEye}
                    />
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