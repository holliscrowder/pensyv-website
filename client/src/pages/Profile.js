import React, { useState, useEffect } from "react";
import "./Profile.css"
import { useOutletContext } from "react-router-dom";
import {ProfileForm} from "../components/ProfileForm";
import ProfileCard from "../components/ProfileCard";
import { PasswordResetForm } from "../components/PasswordResetForm";
import { Link } from "react-router-dom";

function Profile() {
    const [user, setUser, isLoggedIn] = useOutletContext();
    const [isUpdated, setIsUpdated] = useState(false);

    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const toggleShowUpdateProfile = () => {
      setShowUpdateProfile(!showUpdateProfile);
    };

    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const toggleShowUpdatePassword = () => {
      setShowUpdatePassword(!showUpdatePassword);
    };

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
              <p>You can update your user profile details at any time. </p>
              <br />
              {showUpdateProfile ? (
                <>
                  <p>If you wish to leave a characteristic as-is, simply leave that field blank, or select "prefer not to say".</p>
                  <br />
                  <ProfileForm />
                </>
                ) : (
                  <>
                    <Link
                      to={`/profile/update_profile`}
                      className="button-update-profile"
                      onClick={toggleShowUpdateProfile}
                    >
                      Update Profile Details
                    </Link>
                    <br />
                  </>
                )}
            <br />
            <p>You can update your password at any time.</p>
              {showUpdatePassword ? (
                <>
                  <br />
                  <PasswordResetForm className = "reset" user={user} setUser={setUser} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
                </>
                ) : (
                  <>
                    <br />
                    <Link
                      to={`/profile/update_password`}
                      className="button-update-profile"
                      onClick={toggleShowUpdatePassword}
                    >
                      Update Password
                    </Link>
                    <br />
                  </>
                )}
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

export default Profile;