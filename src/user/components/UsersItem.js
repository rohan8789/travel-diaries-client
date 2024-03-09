import React from 'react'
import {Link} from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar'
import Card from '../../shared/components/UIElements/Card'

import './UsersItem.css'

const UsersItem = (props) => {
  const receivedImagePath = props?.image;
  const correctedImagePath = receivedImagePath.replace(/\\/g, "/");
  return (
    <Link to={`/${props.id}/places`} className='link-item'>
        <li className='li-item'>
          <Card>
            <div className="top">
              <h2 className="name">{props?.name}</h2>
              <Avatar image={`http://localhost:5000/${correctedImagePath}`} alt={props?.name}/>
            </div>
            <div className="bottom">
              <p className="places">
                {props?.places <= 1 ? "Place" : "Places"}: {props?.places}
              </p>
            </div>
          </Card>
        </li>
    </Link>

  );
}

export default UsersItem