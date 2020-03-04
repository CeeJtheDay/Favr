import React from "react";
import { Link } from "react-router-dom";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";
import Logo from "../../img/logo.png";
import "../../css/style.css";
import "../../css/dev-profile.css";
import "../../css/developer.css";
import "../../css/register.css";
import "../../css/startup-profile.css";
import "./style.css";


function Nav({children,loginModalShow,setLoginModalShow,registerModalShow,setRegModalShow}) {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top mx-auto">
      <div className="container navcont">
        <Link to={"/"} className="navbar-brand p-0" id="logo">
          <img src={Logo} alt="logo" className="logo"></img>
        </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {children}
              {/* <li className="nav-item pr-4">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item pr-4">
                <a href="#" className="nav-link" data-toggle="modal" data-target="#modalLoginForm">Login</a>
              </li>
              <li className="nav-item pr-4">
                <a href="#" className="nav-link register" data-toggle="modal" data-target="#modalRegisterForm">Register</a>
              </li> */}
            </ul>
          </div>
      </div>
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
      <RegisterModal
        show={registerModalShow}
        onHide={() => setRegModalShow(false)}
      />
  </nav>
      );
    }
    
    export default Nav;
