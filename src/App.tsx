import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Dialog from "./components/Dialog/Dialog";
import Loading from "./components/Loading/Loading";
import { useAppSelector } from "./store/hooks";
import ProtectedLayout from "./components/ProtectedLayout/ProtectedLayout";
import HomePage from "./pages/HomePage/HomePage";
import CreatePage from "./pages/CreatePage/CreatePage";
import "@fontsource/sunflower/500.css";
import AuthProtectedLayout from "./components/AuthProtectedLayout/AuthProtectedLayout";

library.add(fas);

const App = () => {
  const { token } = useAppSelector((store) => store.user);

  return (
    <>
      <Dialog />
      <Loading />
      <Routes>
        <Route element={<ProtectedLayout token={token} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/gameboard/create" element={<CreatePage />} />
        </Route>
        <Route element={<AuthProtectedLayout token={token} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
