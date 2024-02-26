import React from 'react'

const Avatar = ({image, alt}) => {
  return <img className="circle-img" src={image} alt={alt} />;
}

export default Avatar