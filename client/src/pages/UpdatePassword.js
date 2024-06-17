import React, { useState, useEffect } from "react";
import "./Profile.css"
import { useOutletContext } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import { PasswordResetForm } from "../components/PasswordResetForm";
import { Link } from "react-router-dom";

function UpdatePassword() {
    const [user, setUser, isLoggedIn] = useOutletContext();
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        fetch("/api/check_session")
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
            <div className = "profile_body">
                <ProfileCard className = "profile_card"/>
                <br />
                <p>If you wish to leave a characteristic as-is, simply leave that field blank, or select "prefer not to say".</p>
                <br />
                <PasswordResetForm className = "profile" user={user} setUser={setUser} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
                <br />
            </div>
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

export default UpdatePassword;