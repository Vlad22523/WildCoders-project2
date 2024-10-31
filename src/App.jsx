import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefresh } from "./redux/auth/selectors.js";
import Loader from "./components/Loader/Loader.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoute } from "./routes/publicRoute.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { PrivateRoute } from "./routes/privateRoute.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import WelcomePage from "./pages/WelcomePage/WelcomePage.jsx";
import ScreensPage from "./components/ScreensPage/ScreensPage.jsx";

function App() {
  const isRefreshing = useSelector(selectIsRefresh);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/home" : "/welcome"} />}
        />
        <Route
          path="/auth/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/register"
          element={
            <PublicRoute>
              <Register />
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
          }
          />
          <Route
            path="/home/:boardId" element={
              <PrivateRoute>
              <ScreensPage />
            </PrivateRoute>
             } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
