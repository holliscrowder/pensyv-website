import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function ProfileCard() {
    const [user, setUser, isLoggedIn] = useOutletContext();

    // useEffect(() => {
    //     fetch("api/check_session")
    //       .then((response) => {
    //         if (response.status == 200) {  
    //           return response.json()
    //         } else {
    //           throw response
    //         }
    //       })
    //       .then((data) => {
    //         setUser(data)
        
    //       })
    //       .catch(e => {
    //       });
    //   }, []);

    return (
        <>
            <div className = "profile_card">
                <p><b>email: </b> {user.email}</p>
                <p><b>username: </b> {user.username}</p>
                <p><b>age: </b> {user.age ? user.age : "age not entered"}</p>
                <p><b>sex: </b> {user.sex ? user.sex : "sex not entered"}</p>
            </div>
        </>
      );
}

export default ProfileCard;