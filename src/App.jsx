import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BasicAxios from "./helpers/axios/BasicAxios.js";
import { useSelector, useDispatch } from "react-redux";
import { globalActions } from "./store/index";

//pages
import DashboardLayout from "./layouts/DashboardLayout";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

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
        <Route path="main" element={<MainPage data={authStatus} />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
