import { useParams } from "react-router-dom";
import Login from "../../pages/Login/Login.jsx";
import Register from "../../pages/Register/Register.jsx";
import NotFound from "../../pages/NotFound/NotFound.jsx";

const Auth = () => {
  const { id } = useParams();

  if (id === "login") {
    return <Login />;
  } else if (id === "register") {
    return <Register />;
  } else {
    return <NotFound />;
  }
};

export default Auth;
