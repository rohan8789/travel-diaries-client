import React from 'react'

import './Card.css'
const Card = (props) => {
  return (
    <div className={`card-item ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Card