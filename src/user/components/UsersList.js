import React from "react";
import UsersItem from "./UsersItem";

import './UsersList.css';


const UsersList = (props) => {
  return (
    <ul className="cards">
      {props.items.map((item) => {
        return (
          <UsersItem
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            placeCount={item.placeCount}
            location={item.location}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
