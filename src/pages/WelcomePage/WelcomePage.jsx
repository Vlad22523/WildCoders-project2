import { Link } from "react-router-dom";
import s from "./WelcomePage.module.css";
import SvgIcon from "../../hooks/SvgIcon.jsx";

const WelcomePage = () => {
  return (
    <div className={s.welcomePage}>
      <div className={s.welcomeContent}>
        <img
          src="/src/images/boy.png"
          width="124"
          height="124"
          alt=""
          className={s.welcomeImage}
        />
        <div className={s.taskPro}>
          <div className={s.logoContainer}>
            <SvgIcon
              name="icon-logo"
              width="20"
              height="24"
              className={s.svgLogo}
            />
          </div>
          <h1 className={s.welcomeHeader}>Task Pro</h1>
        </div>
        <p className={s.welcomeText}>
          Supercharge your productivity and take control of your tasks with Task
          Pro - Dont wait, start achieving your goals now!
        </p>
        <Link to="/auth/register" className={s.welcomeRegBtn}>
          Registration
          <span className="top"></span>
          <span className={s.right}></span>
          <span className={s.bottom}></span>
          <span className={s.left}></span>
        </Link>
        <Link to="/auth/login" className={s.welcomeLogBtn}>
          Log In
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
