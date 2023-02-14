import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png";
import "./styles/Navbar.css";
import axios from "axios";

const Navbar = (props) => {
  const path = process.env.REACT_APP_PATH;

  const navigate = useNavigate();

  const [isNavExpanded, setIsNavExpanded] = useState(false);
  let [loginStatus, setLoginStatus] = useState(false);
  let [userStatus, setUserStatus] = useState("");

  const handleLogOut = () => {
    try {
      axios.get(`${path}/logout`);
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`${path}/login`).then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
        setUserStatus(response.data.user[0].uname);
      }
    });
  }, []);

  return (
    <>
      <nav className="navigation">
        {!loginStatus ? (
          <>
            <ul>
              <Link to="/login">
                <li className="nav-img">
                  <img src={avatar} alt={"noimg"} />
                </li>
              </Link>
            </ul>
          </>
        ) : (
          <>
            <Link to="/home">
              <img src={logo} alt="noimg" className="logoimg" />
            </Link>
            <button
              className="hamburger"
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="white"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              className={
                isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
              }
            >
              <ul>
                <li>
                  <Link to="/properties" className="nav-link">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </li>

                <li>
                  <span className="nav-user">Hello!!{userStatus} </span>
                </li>
                <li>
                  <button className="logout-btn" onClick={handleLogOut}>
                    LogOut
                  </button>
                </li>
                {!props.post ? (
                  <li>
                    <Link to="/addproperty">
                      <button className="logout-btn">Post Property</button>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
