import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Context from "./Context";
import Home from "./Components/Home/Home";
import Membership from "./Components/Membership/Membership";
import Profile from "./Components/Profile/Profile";
import MobSidebar from "./Components/mobSidebar/mobSidebar";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import { useCookies } from "react-cookie";
import Robots from "./Components/Robots/Robots";
import Dashboard from "./Components/Dashboard/Dashboard";
import Flow from "./Components/Maps/CreateMaps";
import Maps from "./Components/Maps/Maps";
import Tasks from "./Components/Tasks/Tasks";

interface UserData {
  user_id: number | string;
  name: string;
  email: string;
  password: string;
  token: string;
}

function App() {
  const WEB_IP = process.env.REACT_APP_IP;
  /* const DASHBOARD_IP = process.env.REACT_APP_IP; */

  const [DASHBOARD_IP, setDashboardIP] = useState("0.0.0.0");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [logged_in, setLoggedIn] = useState<boolean>(false);
  const [sidebar, IsOpen] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies<string>(["user"]);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserData>({
    user_id: "",
    name: "",
    email: "",
    password: "",
    token: "",
  });

  const [previousPath, setPreviousPath] = useState<string | null>(null);
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (!cookies.rememberMe) {
      navigate(`/Membership`);
    } else {
      const lastVisitedPath = cookies.lastVisitedPath || "/";
      navigate(lastVisitedPath);
      for (const key in userData) {
        if (key in cookies) {
          userData[key as keyof UserData] = cookies[key as keyof UserData];
        }
      }
    }
  }, [cookies.rememberMe]);

  useEffect(() => {
    setCookie("lastVisitedPath", location.pathname, { path: "/" });
  }, [location, setCookie]);

  useEffect(() => {
    const handleGoBack = (event: KeyboardEvent) => {
      if (event.key === "Backspace" && previousPath) {
        navigate(previousPath);
      }
    };

    window.addEventListener("keydown", handleGoBack);

    return () => {
      window.removeEventListener("keydown", handleGoBack);
    };
  }, [navigate, previousPath]);

  useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location.pathname]);

  return (
    <Context.Provider
      value={{
        WEB_IP,
        DASHBOARD_IP,
        setDashboardIP,
        logged_in,
        setLoggedIn,
        userData,
        setUserData,
        sidebar,
        IsOpen,
        isLoading,
        setIsLoading,
        cookies,
        setCookie,
        removeCookie,
        isChecked,
        setIsChecked,
      }}
    >
      <div className="main-container">
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
          <Route
            path="/robots"
            element={
              <>
                <MobSidebar />
                <Sidebar />
                <Robots />
              </>
            }
          />
          <Route
            path="/robots/:id/dashboard"
            element={
              <>
                <MobSidebar />
                <Sidebar />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/maps"
            element={
              <>
                <MobSidebar />
                <Sidebar />
                <Maps />
              </>
            }
          />
          <Route
            path="/maps/newMap"
            element={
              <>
                <MobSidebar />
                <Sidebar />
                <Flow />
              </>
            }
          />
          <Route
            path="/maps/editMap/:id"
            element={
              <>
                <MobSidebar />
                <Sidebar />
                <Flow />
              </>
            }
          />
          <Route
            path="/tasks"
            element={
              <>
                <MobSidebar />
                <Sidebar />
                <Tasks />
              </>
            }
          />
          <Route path="/Membership" element={<Membership />} />
        </Routes>
        <Footer />
      </div>
    </Context.Provider>
  );
}

export default App;
