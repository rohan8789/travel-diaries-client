import React from 'react'
import {Link} from 'react-router-dom'

import './Button.css'
const Button = (props) => {
  // console.log(props);
  if(props.id==='btn-1'){
    return (
      <button id={props.id} className={props.className} onClick={props.onClick}>{props.children}</button>
    );
  }
  if(props.to){
    return (
      <Link to={props.to} id={props.id} className={props.className}>{props.children}</Link>
    )
  }

  return <button type='submit' id={props.id} className={props.className} onClick={props.onClick}>{props.children}</button>;
}

export default Button
