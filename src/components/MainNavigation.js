import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useState, useEffect } from "react";
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

function MainNavigation() {
  const [firstName, getFirstName] = useState("Notes");
  const [lastName, getLastName] = useState("");
  const navigate = useNavigate();

  var cookies = new Cookie();
  let first_name = cookies.get("firstname");
  let last_name = cookies.get("lastname");
  useEffect(() => {
    getFirstName(first_name);
    getLastName(last_name);
  }, [firstName, first_name, last_name, lastName]);

  function Logout() {
    signOut(auth)
      .then(() => {
        console.log("Sign out done!");
      })
      .catch((error) => {
        console.log(error);
      });
    cookies.remove("firstname");
    cookies.remove("lastname");
    cookies.remove("email");

    navigate("/");
    window.location.reload(false);
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        {firstName} {lastName} Notes
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/Login"> Login </Link>
          </li>
          <li>
            <Link to="/Register"> Register </Link>
          </li>
          <li onClick={Logout}>
            <Link>Log Out</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default MainNavigation;
