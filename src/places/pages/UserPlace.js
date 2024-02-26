import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import UserPlaceList from '../components/UserPlaceList';
import { useParams } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';

import './NewPlace.css';

let dummyPlace = [
  {
    id: "p1",
    title: "VR Punjab",
    Description:
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
    Description:
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
const UserPlace = () => {
  const userId = useParams().userId;
  const dummyPlaceByuserId = dummyPlace.filter((itemsList)=>{
    // console.log(itemsList.creatorId, userId);
    return itemsList.creatorId===userId;
  })
  if(dummyPlaceByuserId.length===0){
      return (
        <Card className="container">
          <h2 className='h2'>You need to get out of bed and explore...</h2>
          <div className='when-no-place'>
           <Button to='/places/new' id='btn-2' className='btn-shared'>Add New</Button>
          </div>
        </Card>
      );
  }else{
    return (
      <UserPlaceList items = {dummyPlaceByuserId}/>
    )
  }
}

export default UserPlace