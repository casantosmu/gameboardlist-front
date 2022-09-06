import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Dialog from "./components/Dialog/Dialog";
import Loading from "./components/Loading/Loading";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

library.add(fas);

const App = () => {
  return (
    <>
      <Dialog />
      <Loading />
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <h1>Home</h1>
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
