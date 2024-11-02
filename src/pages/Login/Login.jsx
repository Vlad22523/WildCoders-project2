import { useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import { selectIsLoggedIn, selectLoader } from "../../redux/auth/selectors.js";
import clsx from "clsx";
import s from "./Login.module.css";
import Loader from "../../components/Loader/Loader.jsx";

const Login = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  const loader = useSelector(selectLoader);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }
  return (
    <div className={s.logPage}>
      <div className={s.logBox}>
        <div className={s.nav}>
          {loader && <Loader />}
          <NavLink className={buildLinkClass} to="/auth/register">
            Registration
          </NavLink>
          <NavLink className={buildLinkClass} to="/auth/login">
            Log In
          </NavLink>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
