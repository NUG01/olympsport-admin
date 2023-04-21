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
import UserEdit from "./pages/users/UserEdit.jsx";
import Categories from './pages/categories/Categories';
import CategoryAdd from './pages/categories/CategoryAdd';
import CategoryEdit from './pages/categories/CategoryEdit';
import Brands from './pages/brands/Brands';
import BrandAdd from './pages/brands/BrandAdd';
import BrandEdit from './pages/brands/BrandEdit';
import Products from './pages/products/Products';
import ProductEdit from "./pages/products/ProductEdit";
import AdminProfile from "./pages/AdminProfile.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import AboutUs from "./pages/AboutUs.jsx";


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
        {/* Categories */}
        <Route path="categories" element={<Categories data={authStatus} />}></Route>
        <Route path="category/add" element={<CategoryAdd data={authStatus} />}></Route>
        <Route path="category/edit/:id" element={<CategoryEdit data={authStatus} />}></Route>
        {/* Brands */}
        <Route path="brands" element={<Brands data={authStatus} />}></Route>
        <Route path="brand/add" element={<BrandAdd data={authStatus} />}></Route>
        <Route path="brand/edit/:id" element={<BrandEdit data={authStatus} />}></Route>
        {/* Products */}
        <Route path="products" element={<Products data={authStatus} />}></Route>
        <Route path="product/edit/:1" element={<ProductEdit data={authStatus} />}></Route>
        <Route path="admin/profile" element={<AdminProfile data={authStatus} />}></Route>
        <Route path="terms_and_conditions" element={<TermsAndConditions data={authStatus} />}></Route>
        <Route path="about_us" element={<AboutUs data={authStatus} />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
