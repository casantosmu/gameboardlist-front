import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Dialog from "./components/Dialog/Dialog";
import Loading from "./components/Loading/Loading";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAppSelector } from "./store/hooks";

library.add(fas);

const App = () => {
  const { token } = useAppSelector((store) => store.user);

  return (
    <>
      <Dialog />
      <Loading />
      <Routes>
        <Route
          element={<ProtectedRoute condition={!!token} rejectPath="/login" />}
        >
          <Route path="/" element={<h1>Home</h1>} />
        </Route>
        <Route element={<ProtectedRoute condition={!token} rejectPath="/" />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
