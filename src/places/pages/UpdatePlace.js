import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../../shared/components/FormElements/Button";
import { validate } from "../../shared/utils/validators";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";


const UpdatePlace = () => {
  const navigate = useNavigate();
  const placeId = useParams().placeId;
  const auth = useContext(AuthContext);
  const [placeForm, setPlaceForm] = useState({title:"", description:""});
  const [formError, setFormError] = useState({title: "", description: ""});
  const [isLoading, setIsLoading] = useState();

  useEffect(()=>{
    const sendRequest = async () =>{
      setIsLoading(true);
      try{
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);
        setPlaceForm(response?.data?.place)
        setIsLoading(false);
      }catch(err){
        toast.error(err?.response?.data?.message);
        setIsLoading(false);
      }
    }
    sendRequest();
  }, [placeId, setPlaceForm])


  
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
  
  const handleCancel = (e) =>{
    e.preventDefault();
    navigate(`/${auth.uid}/places`);
  }
  
  const sendRequest = async () =>{
    setIsLoading(true);
    console.log('this is token', auth.token);
    try{
      await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,{
          title: placeForm.title,
          description: placeForm.description,
        }, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setIsLoading(false);
      toast.success('Update request successful...');
      navigate(`/${auth.uid}/places`);
    }catch(err){
      setIsLoading(false);
      toast.error(err.response.data.message);
    }
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
    let x = validate(placeForm);
    setFormError({
      title: x.title,
      description: x.description,
    });
    if (x.title === "" && x.description === "") {
      sendRequest();
    } else {
      x.title = "";
      x.description = "";
    }
  };

  if(isLoading){
    return(
      <LoadingSpinner/>
    );
  } 
  if(placeForm===undefined){
    return (
      <>
        <Card className="container">
          <h2 className="h2">Could not find place, Something went wrong while fetching data</h2>
        </Card>
      </>
    );
  }
  if(placeForm){
    return (
      <>
      {!isLoading &&
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
        <Button className="btn-shared submit-btn" type="submit">
          Submit
        </Button>
        <Button type='submit' id='btn-3' className="btn-shared" onClick={handleCancel}>
          cancel
        </Button>
      </form>
      }
    </>
  );
  }
};

export default UpdatePlace;
