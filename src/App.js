import React, { useContext, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./shared/components/Navigation/Navbar";

import Users from "./user/pages/Users";
// import UserPlace from "./places/pages/UserPlace";
// import NewPlace from "./places/pages/NewPlace";
// import UpdatePlace from "./places/pages/UpdatePlace.js";
import PageNotFound from "./shared/PageNotFound.js";
import { AuthContext } from "./shared/context/auth-context.js";
import Signup from "./user/pages/Signup.js";
import Login from "./user/pages/Login.js";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner.js";


const UserPlace = React.lazy(()=>import("./places/pages/UserPlace"));
const NewPlace =  React.lazy(()=>import("./places/pages/NewPlace"));
const UpdatePlace = React.lazy(()=>import("./places/pages/UpdatePlace.js"));



function App() {
  const auth = useContext(AuthContext);

  useEffect(()=>{
    const data =JSON.parse(localStorage.getItem('userData'));
    if(data?.userId && data?.token){
      auth.login(data?.userId, data?.token);
    }
  }, [auth])

  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <main>
        <Suspense fallback={<div><LoadingSpinner/></div>}>
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
        </Suspense>
      </main>
    </BrowserRouter>
  );
}

export default App;
