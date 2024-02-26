import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import { validate } from "../../shared/utils/validators";
import Card from "../../shared/components/UIElements/Card";

let dummyPlace = [
  {
    id: "p1",
    title: "VR Punjab",
    description:
      "VR Punjab is a premium retail shopping Centre in the Chandigarh Capital Region anchored by top national and international brands such as H&M, PVR .It is a mall located near Kharar, nearest mall to chandigarh where you can watch movies. It is a mall located near Kharar, nearest mall to chandigarh where you can watch movies. It is a mall located near Kharar, nearest mall to chandigarh where you can watch movies.",
    imageURL: "https://files.yappe.in/place/full/vr-punjab-66934.webp",
    address:
      "NH-21, Chandigarh Kharar, Chandigarh Rd, Sector 118, Sahibzada Ajit Singh Nagar, Punjab 160055",
    location: {
      lat: "30.7377007",
      lng: "76.5349937",
    },
    creatorId: "u1",
  },
  {
    id: "p2",
    title: "Elante Mall",
    description:
      " Elante Mall hosts retailers of various Indian and international brands, a food court and a courtyard full of cafes. The Mall has an 8-screen Multiplex of PVR Cinemas. On its top floor, the mall has restaurants, fast food joints and a Fun City for kids entertainment.",
    imageURL:
      "https://www.scai.in/wp-content/uploads/2020/01/RODP8926-copy-revised.jpg",
    address: "PQ3X+5X4, Industrial Area Phase I, Chandigarh, 160002",
    location: {
      lat: "30.7377007",
      lng: "76.5349937",
    },
    creatorId: "u2",
  },
];

const UpdatePlace = () => {
  const navigate = useNavigate();
  const placeId = useParams().placeId;
  const findPlaceItemById = dummyPlace.find((items) =>{
    return items.id===placeId;
  })
  //console.log(placeId);
  //console.log(findPlaceItemById);

  const [placeForm, setPlaceForm] = useState({
    title: findPlaceItemById?.title || "",
    address: findPlaceItemById?.address || "",
    description: findPlaceItemById?.description || "",
  });
  const [formError, setFormError] = useState({
    title: "",
    address: "",
    description: "",
  });

  if(findPlaceItemById===undefined){
    return(
        <Card className="container">
            <h2 className="h2">There is no such place explored by you.</h2>
        </Card>
    );
  } 

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
    navigate('/u2/places');
  }


  const submitHandler = (e) => {
    e.preventDefault();
    let x = validate(placeForm);
    setFormError({
      title: x.title,
      address: x.address,
      description: x.description,
    });
    if (x.title === "" && x.address === "" && x.description === "") {
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
      <Button className="btn-shared submit-btn" type="submit">
        Submit
      </Button>
      <Button type='submit' id='btn-3' className="btn-shared" onClick={handleCancel}>
        cancel
      </Button>
    </form>
  );
};

export default UpdatePlace;
