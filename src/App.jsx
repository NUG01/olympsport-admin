import { useState } from "react";
import { Route, Routes } from "react-router-dom";

//pages
import DashboardLayout from "./layouts/DashboardLayout";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

import "./App.css";

function App() {
  const [authStatus, setAuthStatus] = useState(false);
  const [rendered, setRendered] = useState(false);

  return (
    <Routes>
      <Route
        path=""
        element={<LoginPage data={authStatus} dataIsFetched={rendered} />}
      ></Route>
      <Route
        path="/dashboard"
        element={<DashboardLayout data={authStatus} dataIsFetched={rendered} />}
      >
        <Route
          path="main"
          element={<MainPage data={authStatus} dataIsFetched={rendered} />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
