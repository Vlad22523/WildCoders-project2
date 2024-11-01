// import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { registerThunk } from "../../redux/auth/operations.js";
import s from "./RegisterForm.module.css";

const RegisterForm = () => {
    // const dispatch = useDispatch();

    const initialValues = {
        name: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(2, "Too Short!").max(32, "Too Long!").required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().min(8, "Too Short!").max(64, "Too Long!").required("Required"),
    });

    const handleSubmit = (values, { resetForm }) => {
        // dispatch(registerThunk(values));
        resetForm();
    };


    return (
        <>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
            <Form className={s.form}>
                <div className={s.formItem}>
                    <Field type="text" name="name" placeholder="Enter your name" className={s.field} />
                </div>
                <ErrorMessage name="name" component="div" className={s.error} />
                <div className={s.formItem}>
                    <Field type="email" name="email" placeholder="Enter your email" className={s.field} />
                </div>
                <ErrorMessage name="email" component="div" className={s.error} />
                <div className={s.formItem}>
                    <Field type="password" name="password" placeholder="Create a password" className={s.field} />
                </div>
                <ErrorMessage name="password" component="div" className={s.error}  />
                <button type="submit" className={s.btn}>Register Now</button>
            </Form>
        </Formik>
        </>
    )
};
export default RegisterForm;