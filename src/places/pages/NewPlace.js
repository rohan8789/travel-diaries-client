import React, { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { validate } from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./NewPlace.css";

const NewPlace = () => {
  const [placeForm, setPlaceForm] = useState({
    title: "",
    address: "",
    description: "",
    image:null
  });
  const [formError, setFormError] = useState({
    title:"",
    address:"",
    description:"",
    image:null
  })
  const [isLoading, setIsLoading] = useState();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(auth);

  const handleChange = (e) => { 
    const {name, files, value} = e.target;
    setPlaceForm((prev) => {
      return {
        ...prev,
        [name]: name ==='image' ? files[0] : value,
      };
    });
    setFormError((prev) => ({
      ...prev,
      [name]: name==='image'? null: "",
    }));
  };

  const sendRequest = async () =>{
    setIsLoading(true);
    try{
      const formData = new FormData();
      formData.append('title', placeForm.title)
      formData.append('address', placeForm.address);
      formData.append('description', placeForm.description,);
      formData.append('image', placeForm.image);
      formData.append('creatorId', auth.uid);
      console.log('this is token', auth.token);
      await axios.post(process.env.REACT_APP_BACKEND_URL+'/places', formData, {
        headers:{
          'Authorization': `Bearer ${auth.token}`
        }
      });
      setIsLoading(false);
      navigate(`../${auth.uid}/places`);
      toast.success('New Place created successfully...')
    }catch(err){
      setIsLoading(false);
      toast.error(err.response.data.message);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    let x = validate(placeForm);
    setFormError({
      title:x.title,
      address:x.address,
      description:x.description,
      image:x.image
    });
    if (x.title==='' && x.image===null && x.address==='' && x.description==='') {
      sendRequest();
      console.log("data is sent to server", placeForm);
      placeForm.image=null;
    } else {
      x.title = "";
      x.address = "";
      x.description = "";
      x.image=null
      console.log("can not be sent to server");
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <form className="place-form" onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={placeForm.title}
            />
            {formError.title ? <p>{formError.title}</p> : ""}
          </div>

          <div className="form-control">
            <label htmlFor="title">Addres:</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={placeForm.address}
            />
            {formError.address ? <p>{formError.address}</p> : ""}
          </div>

          <div className="form-control">
            <label htmlFor="title">Description:</label>
            <textarea
              type="text"
              name="description"
              onChange={handleChange}
              value={placeForm.description}
              rows="4"
            />
            {formError.description ? <p>{formError.description}</p> : ""}
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
          <Button className="btn-shared submit-btn" type="submit">
            {" "}
            Submit{" "}
          </Button>
        </form>
      )}
    </>
  );
};

export default NewPlace;
