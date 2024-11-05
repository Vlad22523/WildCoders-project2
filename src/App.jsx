import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefresh } from "./redux/auth/selectors.js";
import Loader from "./components/Loader/Loader.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound.jsx";
import WelcomePage from "./pages/WelcomePage/WelcomePage.jsx";
import Auth from "./components/Auth/Auth.jsx";
import { Toaster } from "react-hot-toast";
import { PublicRoute } from "./routes/PublicRoute.jsx";
import { PrivateRoute } from "./routes/PrivateRoute.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";

function App() {
  const isRefreshing = useSelector(selectIsRefresh);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/home" : "/welcome"} />}
        />

        <Route
          path="/auth/:id"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />

        <Route
          path="/welcome"
          element={
            <PublicRoute>
              <WelcomePage />
            </PublicRoute>
          }
        />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }/> 
        <Route
          path="/board/:boardId"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
