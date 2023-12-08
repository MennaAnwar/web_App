import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Context from "./Context";
import Home from "./Components/Home/Home";
import Membership from "./Components/Membership/Membership";
import Profile from "./Components/Profile/Profile";
import MobSidebar from "./Components/mobSidebar/mobSidebar";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import { useCookies } from "react-cookie";

interface UserData {
  user_id: number | string;
  name: string;
  email: string;
  password: string;
}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [logged_in, setLoggedIn] = useState<boolean>(false);
  const [sidebar, IsOpen] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies<string>(["user"]);
  const [userData, setUserData] = useState<UserData>({
    user_id: "",
    name: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  useEffect(() => {
    if (cookies.rememberMe === false) {
      navigate(`/Membership`);
    } else {
      navigate(`/`);
    }
  }, [cookies.rememberMe]);

  return (
    <Context.Provider
      value={{
        logged_in,
        setLoggedIn,
        userData,
        setUserData,
        sidebar,
        IsOpen,
        isLoading,
        setIsLoading,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MobSidebar />
              <Sidebar />
              <Home />
            </>
          }
        />
        <Route
          path="/Profile"
          element={
            <>
              <MobSidebar />
              <Sidebar />
              <Profile element="EditProfile" />
            </>
          }
        />
        <Route
          path="/Profile/ChangePassword"
          element={
            <>
              <MobSidebar />
              <Sidebar />
              <Profile element="ChangePassword" />
            </>
          }
        />
        <Route
          path="/Profile/DeleteAccount"
          element={
            <>
              <MobSidebar />
              <Sidebar />
              <Profile element="DeleteAccount" />
            </>
          }
        />
        <Route path="/Membership" element={<Membership />} />
      </Routes>
      <Footer />
    </Context.Provider>
  );
}

export default App;
