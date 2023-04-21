import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BasicAxios from "./helpers/axios/BasicAxios.js";
import { useSelector, useDispatch } from "react-redux";
import { globalActions } from "./store/index";

//layout
import DashboardLayout from "./layouts/DashboardLayout";
//pages
import Dashobard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Users from "./pages/users/Users";
import Categories from './pages/Categories';
import Brands from './pages/Brands';
import Products from './pages/Products';
import AdminProfile from "./pages/AdminProfile.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import UserEdit from "./pages/users/UserEdit.jsx";


import "./App.css";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState(false);
  const [rendered, setRendered] = useState(false);

  const user = useSelector((state) => state.user);
  console.log(useSelector((state) => state.user));

  useEffect(() => {
    (async function () {
      if (user) {
        setAuthStatus(true);
      } else {
        try {
          const user = await BasicAxios.get("user");
          dispatch(globalActions.setUser(user.data));
          setAuthStatus(true);
        } catch (error) {
          console.log(error.message);
        }
      }
      setRendered(true);
    })();
  }, [location]);

  if (!rendered) return;

  return (
    <Routes>
      <Route path="" element={<LoginPage data={authStatus} />}></Route>
      <Route path="/login" element={<LoginPage data={authStatus} />}></Route>
      <Route path="/dashboard" element={<DashboardLayout data={authStatus} />}>
        <Route path="" element={<Dashobard data={authStatus} />}></Route>
        <Route path="users" element={<Users data={authStatus} />}></Route>
        <Route path="user/edit/:id" element={<UserEdit data={authStatus} />}></Route>
        <Route path="categories" element={<Categories data={authStatus} />}></Route>
        <Route path="brands" element={<Brands data={authStatus} />}></Route>
        <Route path="products" element={<Products data={authStatus} />}></Route>
        <Route path="admin/profile" element={<AdminProfile data={authStatus} />}></Route>
        <Route path="terms_and_conditions" element={<TermsAndConditions data={authStatus} />}></Route>
        <Route path="about_us" element={<AboutUs data={authStatus} />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
