import { FC, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.png";
import "./Sidebar.css";

const Sidebar: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="sidebar">
      <header>
        <div className="image-text">
          <div className="text logo-text d-flex align-items-center">
            <img src={logo} alt="logo" className="mb-3" />
            <h3 className="m-0">LOGO</h3>
          </div>
        </div>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links p-0">
            <li>
              <Link to="/" className={currentPath === "/" ? "active" : ""}>
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/robots"
                className={currentPath === "/robots" ? "active" : ""}
              >
                <i className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455M5 20V8h14l.001 3.996L19 12v2l.001.005l.001 5.995z"
                    />
                    <ellipse
                      cx="8.5"
                      cy="12"
                      fill="currentColor"
                      rx="1.5"
                      ry="2"
                    />
                    <ellipse
                      cx="15.5"
                      cy="12"
                      fill="currentColor"
                      rx="1.5"
                      ry="2"
                    />
                    <path fill="currentColor" d="M8 16h8v2H8z" />
                  </svg>
                </i>
                <span className="text nav-text">Robots</span>
              </Link>
            </li>
            <li>
              <Link
                to="/maps"
                className={currentPath === "/maps" ? "active" : ""}
              >
                <i className="bx bx-map icon"></i>
                <span className="text nav-text">Maps</span>
              </Link>
            </li>
            <li>
              <Link
                to="/tasks"
                className={currentPath === "/tasks" ? "active" : ""}
              >
                <i className="bx bx-task icon"></i>
                <span className="text nav-text">Tasks</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
