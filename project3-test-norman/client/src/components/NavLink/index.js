import React from "react";
import "../../css/style.css";
import "../../css/dev-profile.css";
import "../../css/developer.css";
import "../../css/register.css";
import "../../css/startup-profile.css";


function NavLink({href, children, setModalShow, extraClass}) {

  return (
    <li className="nav-item pr-4">
      <a className= {`nav-link ${extraClass || ""}`} href={href} onClick={() => setModalShow ? (setModalShow(true)) : (null)}>{children}</a>
    </li>
  );
}

export default NavLink;
