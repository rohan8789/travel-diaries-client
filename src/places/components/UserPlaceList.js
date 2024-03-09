import React from "react";

import UserPlaceItem from "./UserPlaceItem";



const UserPlaceList = (props) => {
  return (
    <ul className="cards card">
      {props.items.map((item) => {
        return <UserPlaceItem
          key={item.id}
          placeId={item.id}
          title={item.title}
          description={item.description}
          image={item.image}
          address={item.address}
          location={item.location}
          creatorId={item.creatorId}
          onDelete={props.onDeletePlace}
        />;
      })}
    </ul>
  );
};

export default UserPlaceList;
