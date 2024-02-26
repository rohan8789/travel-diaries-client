import React, { useContext } from "react";

import Card from "./components/UIElements/Card";

import "../user/pages/Users.css";
import { AuthContext } from "./context/auth-context";

const PageNotFound = () => {
  const auth = useContext(AuthContext);
  return (
    <Card className="container">
      {auth.isLoggedIn === true ? (
        <h2 className="h2">Page Not Found</h2>
      ) : (
        <h2 className="h2">Bad Request. You may not be logged In or accessing a Page that doesnt exist.</h2>
      )}
    </Card>
  );
};

export default PageNotFound;
