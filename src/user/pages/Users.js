import React, { useState, useEffect } from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UsersList from '../components/UsersList'
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './Users.css'


const Users = () => {
  const [usersData, setUsersData] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(()=>{
    const sendRequest = async() =>{
      setIsLoading(true);
      try{
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'/users');
        setIsLoading(false);
        setUsersData(response?.data?.users);
      }catch(err){
        setIsLoading(false);
        toast.error(err?.response?.data?.message);
      }
    }
    sendRequest();
  }, [])


  if(usersData===undefined){
    return (
      <>
        {<LoadingSpinner />}
        <Card className="container">
          <h2 className="h2">Error while fetching users data</h2>
        </Card>
      </>
    );
  }
  if(usersData.length===0){
    return (
      <>
        {isLoading && <LoadingSpinner/>}
        {!isLoading && <Card className='container'>
            <h2 className='h2'>Nothing to display</h2>
        </Card>}
      </>
    );
  }
  if(usersData){
    return (
      <>
        {isLoading && <LoadingSpinner/>}
       {!isLoading && <UsersList users={usersData}/>}
      </>
    )
  }
}

export default Users