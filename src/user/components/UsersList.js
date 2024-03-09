import React from "react";
import UsersItem from "./UsersItem";

import './UsersList.css';


const UsersList = (props) => {
  // console.log(props.users);
  return (
    <ul className="cards">
      {props.users.map((item) => {
        return (
          <UsersItem
            key={item?.id}
            id={item?.id}
            name={item?.name}
            image={item?.image}
            places={item?.places.length}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
