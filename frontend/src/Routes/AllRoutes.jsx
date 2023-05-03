import React from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "../Pages/HomePage";
import RegisterPage from "../Pages/RegisterPage";
import LoginPage from "../Pages/LoginPage";
import { useSelector } from "react-redux";
import ErrorPage from "../Pages/ErrorPage";

function UserProtected() {
  const { userInfo } = useSelector((state) => state.userLogin);
  return userInfo?.token ? <Outlet /> : <Navigate to="/login" />;
}

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<UserProtected />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path ="*" element ={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
