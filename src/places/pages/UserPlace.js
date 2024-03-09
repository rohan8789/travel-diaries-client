import React, {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from '../../shared/components/UIElements/Card'
import UserPlaceList from '../components/UserPlaceList'
import Button from '../../shared/components/FormElements/Button'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import './NewPlace.css';


const UserPlace = () => {
  const userId = useParams().userId;
  const [isLoading, setIsLoading] = useState();
  const [placeData, setPlaceData] = useState();
  const [name, setName] = useState();
  console.log(userId);
  
  useEffect(()=>{
    const sendRequest = async () =>{
      setIsLoading(true);
      try{
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
        setIsLoading(false);
        setName(response?.data?.user);
        setPlaceData(response?.data?.places);
      }catch(err){
        setIsLoading(false);
        toast.error(err?.response?.data?.message);
      }
    }
    sendRequest();
  }, [userId])


  const deletePlaceHandler = (placeId) =>{
    setPlaceData((prevPlace)=>prevPlace.filter((place)=>placeId!==place.id));
  }


  if(placeData===undefined){
    return (
      <>
      {isLoading && <LoadingSpinner/>}
      {!isLoading && <Card className="container">
        <h2 className="h2">Something went wrong while fetching data</h2>
      </Card>}
      </>
    );
  }

  if(placeData.length===0){
    return (
      <>
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <Card className="container">
            <h2 className="h2">
              <span style={{color:"lightGreen"}}>{name}</span> need to get out of bed and explore...
            </h2>
            <div className="when-no-place">
              <Button to="/places/new" id="btn-2" className="btn-shared">
                Add New
              </Button>
            </div>
          </Card>
        )}
      </>
    );
  }else{
    return (
      <>
        {isLoading && <LoadingSpinner/>}
        {!isLoading && <UserPlaceList items = {placeData} onDeletePlace = {deletePlaceHandler}/>}
      </>
    )
  }
}

export default UserPlace