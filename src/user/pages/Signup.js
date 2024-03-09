import React, { useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { validate } from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

import "../../places/pages/NewPlace.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Signup = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    image:null,
    email: "",
    password: "",
    repassword: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    image:null,
    email: "",
    password: "",
    repassword: "",
  });
  const [isLoading, setIsLoading] = useState();
 
  const handleChange = (e) => {
    const {name,files,value} = e.target;
    setRegisterForm((prev) => {
      return {
        ...prev,
        [name]: name==='image' ? files[0] : value,
      };
    });
    setFormError((prev) => ({
      ...prev,
      [name]: name==='image' ? null : "",
    }));
  };
  
  const switchHandle =(e) => {
      e.preventDefault();
      navigate("/login");
      auth.changeToggle();
  }

  const sendRequest = async () =>{
    setIsLoading(true);
    try{
      const formData = new FormData();
      formData.append('name', registerForm.name);
      formData.append("image", registerForm.image);
      formData.append("email", registerForm.email);
      formData.append("password", registerForm.password);
      formData.append("repassword", registerForm.repassword);
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'/users/signup', formData);
      setIsLoading(false);
      toast.success(response.data.message);
      navigate("/login");
    }catch(error){
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    let x = validate(registerForm);
    console.log(registerForm.image);
    setFormError({ 
      name: x.name, image:x.image, email: x.email, password: x.password, repassword: x.repassword
    });
    if (x.name === "" && x.image=== null && x.email === "" && x.password === "" && x.repassword === "") {
      sendRequest()
      
      registerForm.image=null;
    } else {
      x.name = ""; x.image=null; x.email = ""; x.password = ""; x.repassword = "";
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <form
          className="place-form"
          onSubmit={submitHandler}
          enctype="multipart/form-data"
        >
          <h1>Sign-up Form</h1>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={registerForm.name}
              placeholder="Enter your name: "
            />
            {formError.name ? <p>{formError.name}</p> : ""}
          </div>

          <div className="form-control">
            <label htmlFor="image">Image</label>
            <input
              style={{ backgroundColor: "white", color: "black" }}
              name="image"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleChange}
            />
            {formError.image ? <p>{formError.image}</p> : ""}
          </div>

          <div className="form-control">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={registerForm.email}
              placeholder="Enter your email"
            />
            {formError.email ? <p>{formError.email}</p> : ""}
          </div>

          <div className="form-control">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={registerForm.password}
              placeholder="Enter your password"
            />
            {formError.password ? <p>{formError.password}</p> : ""}
          </div>

          <div className="form-control">
            <label htmlFor="repassword">Confirm Password: </label>
            <input
              type="password"
              name="repassword"
              onChange={handleChange}
              value={registerForm.repassword}
              placeholder="Confirm your password"
            />
            {formError.repassword ? <p>{formError.repassword}</p> : ""}
          </div>

          <Button type="submit" className="btn-shared submit-btn">
            Register
          </Button>
          <Button className="btn-shared switch-btn" onClick={switchHandle}>
            Login
          </Button>
        </form>
      )}
    </>
  );
};

export default Signup;
