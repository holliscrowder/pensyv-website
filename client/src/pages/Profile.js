import React, { useState, useEffect } from "react";
import "./Profile.css"
import { useOutletContext } from "react-router-dom";
import {ProfileForm} from "../components/ProfileForm";
import { Link } from "react-router-dom";

function Profile() {
    const [user, setUser, isLoggedIn] = useOutletContext();
    const [isUpdated, setIsUpdated] = useState(false);

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


if (isUpdated === false & user) {
    return (
        <>
            <div className = "profile_header">
                <h2>User Profile</h2>
                <p>You can update your user profile details at any time.</p>
            </div>
            <div className = "profile_instructions">
                <p><b>Current email: </b> {user.email}</p>
                <p><b>Current username: </b> {user.username}</p>
            </div>
            <ProfileForm className = "profile" user={user} setUser={setUser} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
        </>
      );
    }
else if (isUpdated === true & user) {
        return (
            <div className = "updated">
                <p>Profile Updated! What would you like to do next?</p>
                <li>
                    <Link to="/">Home</Link>
                </li>  
                <li>
                    <Link to="/survey">Survey</Link> 
                </li>  
                <li>
                    <Link to="/profile">Update Profile</Link> 
                </li> 
            </div>    
            )
    }
  else {
    return (
      <div>
        <p>Whoops! Something went wrong.</p>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

export default Profile;