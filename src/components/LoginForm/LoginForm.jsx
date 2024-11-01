import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import s from "./LoginForm.module.css";
// import { useDispatch } from 'react-redux';
// import { loginThunk } from '../../redux/auth/operations.js';


const LoginForm = () => {
    // const dispatch = useDispatch();
    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8, "Too Short!").max(64, "Too Long!").required("Required"),
});


    const handleSubmit = (values, { resetForm }) => {
        // dispatch(loginThunk(values));
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
                    <Field name="email" placeholder="Enter your email" className={s.field} />
                </div>
                <ErrorMessage name="email" component="div" className={s.error} />
                <div className={s.formItem}>
                    <Field type="password" name="password" placeholder="Confirm a password" className={s.field} />
                </div>
                <ErrorMessage name="password" component="div" className={s.error}  />
                    <button type="submit" className={s.btn}>Log In Now</button>
                </Form>
            </Formik>
        </>
    )
};
export default LoginForm;