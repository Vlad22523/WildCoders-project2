import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./redux/auth/selectors.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Loader from "./components/Loader/Loader.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import ScreensPage from "./components/MainBoard/ScreensPage/ScreensPage.jsx";
const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage.jsx"));
const Auth = lazy(() => import("./components/Auth/Auth.jsx"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <Suspense fallback={<Loader />}>
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
            }
          >
            <Route
              path=":boardId"
              element={
                <PrivateRoute>
                  <ScreensPage />
                </PrivateRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
