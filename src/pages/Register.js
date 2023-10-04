import { useRef } from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import classes from "./Register.module.css";

import { auth } from "../Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Register() {
  const [emailError, setEmailError] = useState("");

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  function registerHandler(event) {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        updateProfile(auth.currentUser, { displayName: name });
        console.log(data);
        navigate("/Login");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
            setEmailError("Email already in use!");
            break;
          case "auth/invalid-email":
            setEmailError("Invalid Email");
            break;
          case "auth/weak-password":
            setEmailError("Weak Password");
            break;

          default:
        }
      });
  }

  return (
    <div className={classes.container}>
      <h1> Register Page </h1>{" "}
      <form onSubmit={registerHandler} className={classes.form}>
        <label htmlFor="name"> Name </label>{" "}
        <input
          type="text"
          placeholder="Name"
          required
          id="name"
          ref={nameInputRef}
          className={classes.inputtext}
        />{" "}
        <label htmlFor="email"> Email </label>{" "}
        <input
          type="email"
          required
          placeholder="Your Email"
          id="email"
          ref={emailInputRef}
          className={classes.inputtext}
        />{" "}
        <label htmlFor="password"> Password </label>{" "}
        <input
          type="password"
          required
          placeholder="Your Password"
          id="password"
          ref={passwordInputRef}
          className={classes.inputtext}
        />{" "}
        <button className={classes.button}> Register </button>{" "}
      </form>
      <p>{emailError}</p>
    </div>
  );
}

export default Register;
