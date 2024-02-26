import React from 'react'

import UsersList from '../components/UsersList'
import Card from '../../shared/components/UIElements/Card';

import './Users.css'


const Users = () => {
  let allUsers = [
    {
      id: "u1",
      name: "Rohan Singh",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s",
      placeCount: 1,
      location: 1,
    },
    {
      id: "u2",
      name: "Rohan Singh",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s",
      placeCount: 3,
      location: 3,
    },
    {
      id: "u1",
      name: "Rohan Singh",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s",
      placeCount: 3,
      location: 3,
    },
    {
      id: "u",
      name: "Rohan Singh",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s",
      placeCount: 3,
      location: 3,
    },
    {
      id: "u1",
      name: "Rohan Singh",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s",
      placeCount: 0,
      location: 0,
    },
    {
      id: "u1",
      name: "Rohan Singh",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s",
      placeCount: 3,
      location: 3,
    },
    {
      id: "u2",
      name: "Rahul Singh",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s",
      placeCount: 5,
      location: 8,
    },
  ];
  if(allUsers.length===0){
    return (
        <Card className='container'>
          <h2 className='h2'>Nothing to display</h2>
        </Card>
    );
  }else{
    return (
      <UsersList items={allUsers}/>
    )
  }
}

export default Users