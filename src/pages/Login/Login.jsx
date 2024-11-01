import { useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import clsx from "clsx";
import s from "./Login.module.css";

const Login = () => {
    const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
    };

    const isLoggedIn = useSelector(selectIsLoggedIn);
    if (isLoggedIn) {
        return <Navigate to='/'/>
    }
    return (
      <div className={s.logPage}>
        <div className={s.logBox}>
            <div className={s.nav}>
              <NavLink className={buildLinkClass} to="/auth/register">Registration</NavLink>
              <NavLink className={buildLinkClass} to="/auth/login">Log In</NavLink>
            </div>
            <LoginForm/>
        </div>
      </div>
    )
};

export default Login;
