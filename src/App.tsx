import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFound from "./components/NotFound/NotFound";
import Dialog from "./components/Dialog/Dialog";
import Loading from "./components/Loading/Loading";
import { useAppSelector } from "./store/hooks";
import ProtectedLayout from "./components/ProtectedLayout/ProtectedLayout";
import HomePage from "./pages/HomePage/HomePage";
import CreatePage from "./pages/CreatePage/CreatePage";
import "@fontsource/sunflower/500.css";
import AuthProtectedLayout from "./components/AuthProtectedLayout/AuthProtectedLayout";
import DetailsPage from "./pages/DetailsPage/DetailsPage";

const App = () => {
  const { token } = useAppSelector((store) => store.user);

  return (
    <>
      <Dialog />
      <Loading />
      <Routes>
        <Route path="/" element={<ProtectedLayout token={token} />}>
          <Route index element={<HomePage />} />
          <Route path="/gameboard/create" element={<CreatePage />} />
          <Route path="/gameboard/:id" element={<DetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<AuthProtectedLayout token={token} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
