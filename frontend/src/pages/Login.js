import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import img1 from "../assets/form1.jpg";

const LogIn = () => {
  let path = process.env.REACT_APP_PATH;

  const navigate = useNavigate();

  let [usernameLogin, setUsernameLogin] = useState("");
  let [passwordLogin, setPasswordLogin] = useState("");

  const [loginErrStatus, setLoginErrStatus] = useState("");

  axios.defaults.withCredentials = true;

  const handleSubmit = () => {
    if (usernameLogin === "" || passwordLogin === "") {
      setLoginErrStatus("username,password required!!!");
    } else {
      usernameLogin = usernameLogin.trim();
      passwordLogin = passwordLogin.trim();
      if (usernameLogin === "" || passwordLogin === "") {
        setLoginErrStatus("username,password required");
      } else {
        axios
          .post(`${path}/login`, {
            username: usernameLogin,
            password: passwordLogin,
          })
          .then((response) => {
            if (response.data.message) {
              setLoginErrStatus(response.data.message);
            }
          });
        if (usernameLogin !== "admin") {
          const timeoutId = setTimeout(() => {
            navigate("/home");
          }, 1500);
          return () => clearTimeout(timeoutId);
        } else if (passwordLogin === "admin") {
          const timeoutId = setTimeout(() => {
            navigate("/adminpage");
          }, 1500);
          return () => clearTimeout(timeoutId);
        }
      }
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="col-25 animate__animated animate__fadeInLeft animate__slow">
          <img src={img1} alt="noimg" className="img-left" />
        </div>
        <div className="col-75 animate__animated animate__fadeInRight animate__slow">
          <div className="right-div">
            <div>
              <div className="label">Username</div>
              <div>
                <input
                  type="text"
                  placeholder="your username"
                  className="res-inp"
                  onChange={(e) => setUsernameLogin(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="label">Password</div>
              <div>
                <input
                  type="password"
                  placeholder="your password"
                  className="res-inp"
                  onChange={(e) => setPasswordLogin(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p className="errcode">{loginErrStatus}</p>
            </div>
            <div>
              <button className="res-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
