import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { validate } from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

import "../../places/pages/NewPlace.css";

const Login = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "", 
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setLoginForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setFormError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const switchHandle = (e) => {
      e.preventDefault();
      navigate("/signup");
      console.log('hi', auth.isLoggedIn);
      auth.changeToggle();
      console.log('heloooo', auth.isLoggedIn);
  }
  

  const submitHandler = (e) => {
    e.preventDefault();
    let x = validate(loginForm);
    setFormError({
      email: x.email,
      password: x.password,
    });
    if(x.email === "" && x.password === ""){
      console.log("data is sent to server", loginForm);
      auth.login();
      navigate("/");
    } else {
      x.email = "";
      x.password = "";
      console.log("can not be sent to server");
    }
  };

  return (
    <form className="place-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">Enter your Email: </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={loginForm.email}
        />
        {formError.email ? <p>{formError.email}</p> : ""}
      </div>

      <div className="form-control">
        <label htmlFor="password">Enter your password: </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={loginForm.password}
        />
        {formError.password ? <p>{formError.password}</p> : ""}
      </div>

      <Button type="submit" className="btn-shared submit-btn">
        Login
      </Button>
      <Button
        className="btn-shared switch-btn"
        id="btn-1"
        onClick={switchHandle}
      >
        Switch To Login
      </Button>
    </form>
  );
};

export default Login;
