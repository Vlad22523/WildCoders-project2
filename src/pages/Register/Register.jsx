import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Register.module.css";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import { useSelector } from "react-redux";
import { selectLoader } from "../../redux/auth/selectors.js";
import Loader from "../../components/Loader/Loader.jsx";

const Register = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  const loader = useSelector(selectLoader);

  return (
    <div className={s.regPage}>
      <div className={s.regBox}>
        <div className={s.nav}>
          {loader && <Loader />}
          <NavLink className={buildLinkClass} to="/auth/register">
            Registration
          </NavLink>
          <NavLink className={buildLinkClass} to="/auth/login">
            Log In
          </NavLink>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
