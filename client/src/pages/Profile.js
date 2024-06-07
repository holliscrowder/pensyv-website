import React, { useState, useEffect } from "react";
import "./Profile.css"
import { useOutletContext } from "react-router-dom";
import {ProfileForm} from "../components/ProfileForm";
import ProfileCard from "../components/ProfileCard";
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


if (isUpdated === false) {
    return (
        <>
            <div className = "profile_header">
                <h2>User Profile</h2>
            </div>
            <ProfileCard />
            <p>You can update your user profile details at any time.</p>
            <ProfileForm className = "profile" user={user} setUser={setUser} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
        </>
      );
    }
else if (isUpdated === true) {
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
  else if (!user) {
    return (
      <div>
        <p>Whoops! Something went wrong.</p>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

export default Profile;