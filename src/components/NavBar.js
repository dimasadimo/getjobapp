import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({setUser}) => {

  const navigate = useNavigate();

  return (
    <div className="navbar-job">
      <span className="logo-job">
        <Link className="link-job" to="/">
          Job List
        </Link>
      </span>
      {
      //user ? 
      (
        <ul className="list-job">
          {/* <li className="listItem">
            <img
              //src={user.photos[0].value}
              alt=""
              className="avatar"
            />
          </li> */}
          {/* <li className="listItem">{user.displayName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li> */}
          <li className="listItem-job" onClick={() => {
            setUser("");
            navigate("/login");
          }}>
            Logout
          </li>
        </ul>
      ) 
      // : (
      //   <Link className="link" to="login">
      //     Login
      //   </Link>
      // )
      }
    </div>
  )
}

export default NavBar;
