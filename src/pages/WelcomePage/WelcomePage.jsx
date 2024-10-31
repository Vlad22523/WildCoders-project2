import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <>
      <div>WelcomePage</div>
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/register">Register</Link>
    </>
  );
};

export default WelcomePage;
