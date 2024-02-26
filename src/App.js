import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./shared/components/Navigation/Navbar";

import Users from "./user/pages/Users";
import Signup from "./user/pages/Signup.js";
import Login from "./user/pages/Login.js";
import UserPlace from "./places/pages/UserPlace";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace.js";
import PageNotFound from "./shared/PageNotFound.js";
import { AuthContext} from "./shared/context/auth-context.js";

import "./index.css";

function App() {
  const auth = useContext(AuthContext);
  

  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          {!auth.isLoggedIn ? (
            <>
              <Route path="/" exact element={<Users />} />
              <Route path="/:userId/places" exact element={<UserPlace />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </>
          ) : (
            <>
              <Route path="/" exact element={<Users />} />
              <Route path="/:userId/places" exact element={<UserPlace />} />
              <Route path="/places/new" exact element={<NewPlace />} />
              <Route path="/places/:placeId" element={<UpdatePlace />} />
              <Route path="*" element={<PageNotFound />} />
            </>
          )}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
