import React from "react";

import UserPlaceItem from "./UserPlaceItem";



const UserPlaceList = (props) => {
  console.log(props.items[0].address);
  return (
    <ul className="cards card">
      {props.items.map((item) => {
        return <UserPlaceItem
          key={item.id}
          placeId={item.id}
          title={item.title}
          Description={item.Description}
          image={item.imageURL}
          address={item.address}
          coordinates={item.coordinates}
          creatorID={item.creatorId}
        />;
      })}
    </ul>
  );
};

export default UserPlaceList;
