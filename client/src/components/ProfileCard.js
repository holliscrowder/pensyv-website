import React, { useEffect } from "react";
import "./ProfileCard.css"
import { useOutletContext } from "react-router-dom";

function Profile() {
    const [user, setUser, isLoggedIn] = useOutletContext();

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

    return (
        <>
            <div className = "profile_instructions">
                <p><b>Current email: </b> {user.email}</p>
                <p><b>Current username: </b> {user.username}</p>
            </div>
            <ProfileForm className = "profile" user={user} setUser={setUser} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
        </>
      );
}

export default Profile;