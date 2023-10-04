import { useRef, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

import classes from "./Login.module.css";
import GoogleButton from "react-google-button";
import { auth } from "../Firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Login() {
  const [modal, setModal] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  function loginHandler(event) {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        cookies.set("firstname", data.user.displayName.split(" ")[0], {
          path: "/",
          maxAge: 3600,
          secure: true,
          sameSite: "none",
        });
        cookies.set("lastname", data.user.displayName.split(" ")[1], {
          path: "/",
          maxAge: 3600,
          secure: true,
          sameSite: "none",
        });
        cookies.set("email", data.user.email, {
          path: "/",
          maxAge: 3600,
          secure: true,
          sameSite: "none",
        });
        navigate("/Notes");
        console.log(data);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/Invalid-email":
            setModal("Invalid Email");
            break;
          case "auth/invalid-login-credentials":
            setModal("Invalid Login Credentials");
            break;
          case "auth/user-disabled":
            setModal("User Disabled By Administrator");
            break;
          case "auth/user-not-found":
            setModal("User Not Found");
            break;
          case "auth/wrong-password":
            setModal("Wrong Password");
            break;
          default:
        }
      });
  }

  const handleGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      cookies.set("firstname", result.user.displayName.split(" ")[0], {
        path: "/",
        maxAge: 3600,
        secure: true,
        sameSite: "none",
      });
      cookies.set("lastname", result.user.displayName.split(" ")[1], {
        path: "/",
        maxAge: 3600,
        secure: true,
        sameSite: "none",
      });
      cookies.set("email", result.user.email, {
        path: "/",
        maxAge: 3600,
        secure: true,
        sameSite: "none",
      });
      navigate("/Notes");
    });
  };
  return (
    <div className={classes.container}>
      <h1> Login Page </h1>{" "}
      <form onSubmit={loginHandler} className={classes.form}>
        <label htmlFor="email"> Registered Email </label>
        <input
          type="text"
          required
          placeholder=" your email here"
          id="email"
          ref={emailInputRef}
          className={classes.inputtext}
        />
        <label htmlFor="password"> Password </label>
        <input
          type="password"
          required
          placeholder="password"
          id="password"
          ref={passwordInputRef}
          className={classes.inputtext}
        />
        <button className={classes.button}> Login </button>
      </form>
      <p>{modal}</p>
      OR
      <GoogleButton onClick={handleGoogle} />
    </div>
  );
}

export default Login;
