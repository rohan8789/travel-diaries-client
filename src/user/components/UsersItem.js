import React from 'react'
import {Link} from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar'
import Card from '../../shared/components/UIElements/Card'

import './UsersItem.css'

const UsersItem = (props) => {
  return (
    <Link to={`/u2/places`} className='link-item'>
        <li className='li-item'>
          <Card>
            <div className="top">
              <h2 className="name">{props.name}</h2>
              <Avatar image={props.image} alt={props.name}/>
            </div>
            <div className="bottom">
              <p className="places">
                {props.placeCount <= 1 ? "Place" : "Places"}: {props.placeCount}
              </p>
              <p className="places">{props.location <= 1 ? "Location":"Locations"}: {props.loaction} </p>
            </div>
          </Card>
        </li>
    </Link>

  );
}

export default UsersItem