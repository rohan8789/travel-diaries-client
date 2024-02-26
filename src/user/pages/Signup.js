import React, { useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'

import { validate } from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

import "../../places/pages/NewPlace.css";

const Signup = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
 
  const handleChange = (e) => {
    const {name,value} = e.target;
    console.log(name, value);
    setRegisterForm((prev) => {
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
  
  const switchHandle =(e) => {
      e.preventDefault();
      navigate("/login");
      auth.changeToggle();
  }

  const submitHandler = (e) => {
    e.preventDefault();
    let x = validate(registerForm);
    setFormError({ 
      name: x.name, email: x.email, password: x.password, repassword: x.repassword
    });
    if (x.name === "" && x.email === "" && x.password === "" && x.repassword === "") {
      console.log("data is sent to server", registerForm);
    } else {
      x.name = ""; x.email = ""; x.password = ""; x.repassword = "";
      console.log("can not be sent to server");
    }
  };

  return (
    <form className="place-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="name">Enter your Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={registerForm.name}
        />
        {formError.name ? <p>{formError.name}</p> : ""}
      </div>

      <div className="form-control">
        <label htmlFor="email">Enter your Email: </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={registerForm.email}
        />
        {formError.email ? <p>{formError.email}</p> : ""}
      </div>

      <div className="form-control">
        <label htmlFor="password">Enter your password: </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={registerForm.password}
        />
        {formError.password ? <p>{formError.password}</p> : ""}
      </div>

      <div className="form-control">
        <label htmlFor="repassword">Re-Enter your password: </label>
        <input
          type="password"
          name="repassword"
          onChange={handleChange}
          value={registerForm.repassword}
        />
        {formError.repassword ? <p>{formError.repassword}</p> : ""}
      </div>

      <Button type="submit" className="btn-shared submit-btn">
        Register
      </Button>
      <Button className="btn-shared switch-btn" id="btn-1" onClick={switchHandle}>
        Switch To Login
      </Button>
    </form>
  );
};

export default Signup;
