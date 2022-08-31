import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Hola mundo</h1>} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default App;
