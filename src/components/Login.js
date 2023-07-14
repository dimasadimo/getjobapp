import React from 'react';
import Facebook from "../img/facebook.png";
import Google from "../img/google.png";
import { useNavigate } from "react-router-dom";
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login';


const clientId = "182422293903-ldcg2rrjfdh70vcp0h5tbu8vhbv8d8fv.apps.googleusercontent.com"
const appId = "213327338351963"

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
          <LoginSocialGoogle 
            client_id={clientId}
            scope='openid profile email'
            discoveryDocs='claims_supported'
            access_type='offline'
            onResolve={({provider, data}) => {
              setUser(data.name);
              navigate("/");
            }}
            onReject={(err) => {
              setUser("");
              navigate("/login");
            }}
          > 
            <div className="loginButton google" onClick={() => {}}>
              <img src={Google} alt="" className="icon" />
              <p>Sign in with Google</p>
            </div>
          </LoginSocialGoogle>
          <LoginSocialFacebook
            appId={appId}
            onResolve={({provider, data}) => {
              setUser("Dimas");
              navigate("/");
            }}
            onReject={(err) => {
              setUser("");
              navigate("/login");
            }}
          >
            <div className="loginButton facebook" onClick={() => {}}>
              <img src={Facebook} alt="" className="icon" />
              <p>Sign in with Facebook</p>
            </div>
          </LoginSocialFacebook>
        </div>
      </div>
    </div>
  )
}

export default Login