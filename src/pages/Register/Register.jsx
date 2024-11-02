import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Register.module.css";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";

const Register = () => {
    const buildLinkClass = ({ isActive }) => {
        return clsx(s.link, isActive && s.active);
    };

    return (
        <div className={s.regPage}>
          <div className={s.regBox}>
              <div className={s.nav}>
                <NavLink className={buildLinkClass} to="/auth/register">Registration</NavLink>
                <NavLink className={buildLinkClass} to="/auth/login">Log In</NavLink>
              </div>
              <RegisterForm/>
          </div>
        </div>
  )
};

export default Register;
