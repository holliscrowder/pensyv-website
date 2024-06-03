import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar"
import "./App.css"

function App() {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!user
  const navigate = useNavigate();

  useEffect(() => {
    fetch("api/check_session")
      .then((response) => {
        if (response.status == 200) {  
          return response.json()
        } else {
          throw response
        }
      })
      .then((data) => {
        setUser(data)
    
      })
      .catch(e => {
      });
  }, []);

  function handleLogout() {
    fetch("api/logout", {
      method: "DELETE",
      headers: {
          "Content-type": "application/json"
      }})
    .then((response) => {
      if (response.message == "204: No Content") {
        return response.json()
      }
    })
    .then((data) => {
      setUser(null)
      navigate("/")
    })
  }

  return (
  <div className = "App">
    <div className = "NavBar">
      <NavBar user={user} isLoggedIn={isLoggedIn}/>
      {isLoggedIn ? <button className = "logout" onClick = {handleLogout}>Logout</button> : <></>}
    </div>
    {user ? <p className = "welcome">Welcome, <i>{user.username}</i>!</p> :<></>}
    <main className = "Outlet">
      <Outlet 
        context = {[
          user,
          setUser,
          isLoggedIn,
          handleLogout
        ]}
      />
    </main>
  </div>
);
}

export default App;
