import React from 'react';
import Facebook from "../img/facebook.png";
import Google from "../img/google.png";
import { useNavigate } from "react-router-dom";

const Login = ({setUser}) => {
  const navigate = useNavigate();

  return (
    <div className="login-job">
      <div className="wrapper-job">
        <div className="left-job">
          <input className="input-job" type="text" placeholder="Username" />
          <input className="input-job" type="text" placeholder="Password" />
          <button className="submit-job" onClick={() => {
            setUser("Dimas");
            navigate("/");
          }
        }>Sign In</button>
        </div>
        <div className="center-job">
          <div className="line-job" />
          <div className="or-job">or</div>
        </div>
        <div className="right-job">
          <div className="loginButton google" onClick={() => {}}>
            <img src={Google} alt="" className="icon" />
            <p>Sign in with Google</p>
          </div>
          <div className="loginButton facebook" onClick={() => {}}>
            <img src={Facebook} alt="" className="icon" />
            <p>Sign in with Facebook</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login