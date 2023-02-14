import img1 from "../assets/form1.jpg";
import "./styles/SignIn.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const path = process.env.REACT_APP_PATH;

  const navigate = useNavigate();

  let [email, setEmail] = useState("");
  let [usernameReg, setUserNameReg] = useState("");
  let [passwordReg, setPasswordReg] = useState("");

  let [registerStatus, setRegisterStatus] = useState("");

  const handleRegister = () => {
    if (email === "" || usernameReg === "" || passwordReg === "") {
      setRegisterStatus("enter email,user,password please!!");
    } else {
      email = email.trim();
      usernameReg = usernameReg.trim();
      passwordReg = passwordReg.trim();
      if (email === "" || usernameReg === "" || passwordReg === "") {
        setRegisterStatus("enter email,username and password!!!!");
      } else {
        axios
          .post(`${path}/register`, {
            email: email,
            username: usernameReg,
            password: passwordReg,
          })
          .then((response) => {
            console.log(response);
          });
        navigate("/login");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="col-25 animate__animated animate__fadeInLeft animate__slow">
        <img src={img1} alt="noimg" className="img-left" />
      </div>
      <div className="col-75 animate__animated animate__fadeInRight animate__slow">
        <div className="right-div">
          <div>
            <div className="label">Email</div>
            <div>
              <input
                type="email"
                placeholder="your email"
                className="res-inp"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="label">Username</div>
            <div>
              <input
                type="text"
                placeholder="your username"
                className="res-inp"
                onChange={(e) => setUserNameReg(e.target.value)}
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
                onChange={(e) => setPasswordReg(e.target.value)}
              />
            </div>
          </div>
          <div>
            <p className="errcode">{registerStatus}</p>
          </div>
          <div>
            <button className="res-btn" onClick={handleRegister}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
