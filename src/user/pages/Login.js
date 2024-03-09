import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { validate } from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";


import "../../places/pages/NewPlace.css";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "", 
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
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
      auth.changeToggle();
  }
  
  const sendRequest = async () =>{
    setIsLoading(true);
    try{
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'/users/login', {
        email:loginForm.email,
        password:loginForm.password,
      })
      setIsLoading(false);
      const data = response.data;
      auth.login(data?.userId, data?.token);
      toast.success(`Welcome ${data?.name}`);
      navigate("/");
    }catch(error){
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    let x = validate(loginForm);
    setFormError({
      email: x.email,
      password: x.password,
    });
    if(x.email === "" && x.password === ""){
      sendRequest();
    } else {
      x.email = "";
      x.password = "";
    }
  };

  return (
    <>
    {isLoading && <LoadingSpinner/>}
    {!isLoading && 
    <form className="place-form" onSubmit={submitHandler}>
      <h1>Login Form</h1>
      <div className="form-control">
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={loginForm.email}
          placeholder="Enter your email "
          />
        {formError.email ? <p>{formError.email}</p> : ""}
      </div>

      <div className="form-control">
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={loginForm.password}
          placeholder="Enter your password "
          />
        {formError.password ? <p>{formError.password}</p> : ""}
      </div>

      <Button type="submit" className="btn-shared submit-btn">
        Login
      </Button>
      <Button
        className="btn-shared switch-btn"
        onClick={switchHandle}
        >
        Register
      </Button>
    </form>
    }
    </>
  );
};

export default Login;
