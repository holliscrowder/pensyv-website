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
              <Link
                to={`/profile/update_profile`}
                className="button-update-profile"
                onClick={toggleShowUpdateProfile}
              >
                Update Profile Details
              </Link>
              <br />
              <br />
              <p>You can update your password at any time.</p>
              <br />
              <Link
                to={`/profile/update_password`}
                className="button-update-profile"
                onClick={toggleShowUpdatePassword}
              >
                Update Password
              </Link>
              <br />
            </div>
        </>
      );
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