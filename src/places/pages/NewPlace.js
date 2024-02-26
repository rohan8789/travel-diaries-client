import React, { useState, useContext } from "react";

import { validate } from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

import "./NewPlace.css";

const NewPlace = () => {
  const [placeForm, setPlaceForm] = useState({
    title: "",
    address: "",
    description: ""
  });
  const [formError, setFormError] = useState({
    title:"",
    address:"",
    description:""
  })
  const auth = useContext(AuthContext);
  console.log(auth);

  const handleChange = (e) => {
    
    const name = e.target.name;
    const value = e.target.value;
    setPlaceForm((prev) => {
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

  const submitHandler = (e) => {
    e.preventDefault();
    let x = validate(placeForm);
    setFormError({
      title:x.title,
      address:x.address,
      description:x.description
    });
    if (x.title==='' && x.address==='' && x.description==='') {
      console.log("data is sent to server", placeForm);
    } else {
      x.title = "";
      x.address = "";
      x.description = "";
      console.log("can not be sent to server");
    }
  };

  return (
    <form className="place-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label for="title">Title</label>
        <input type="text" name="title" onChange={handleChange} value={placeForm.title}/>
        {formError.title ? <p>{formError.title}</p> : ""}
      </div>

      <div className="form-control">
        <label for="title">Addres:</label>
        <input type="text" name="address" onChange={handleChange} value={placeForm.address}/>
        {formError.address ? <p>{formError.address}</p> : ""}
      </div>

      <div className="form-control">
        <label for="title">Description:</label>
        <textarea type="text" name="description" onChange={handleChange} value={placeForm.description} rows="4" />
        {formError.description ? <p>{formError.description}</p> : ""}
      </div>
      <Button className="btn-shared submit-btn" type="submit"> Submit </Button>
    </form>
  );
};

export default NewPlace;
