import { Route, Routes } from "react-router-dom";

import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};
