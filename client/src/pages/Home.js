import React, { useEffect, useState } from "react";
import "./Home.css";
import Mission from "../components/Mission.js"
import { useOutletContext } from "react-router-dom";

function Home() {
  const [user, setUser, isLoggedIn] = useOutletContext();
  const [data, setData] = useState("")

  useEffect(() => {
    fetch("api/Questionnaires")
    .then((response) => {
      if (response.status == 200) {  
        return response.json()
      } else {
        throw response
      }
    })
    .then((data) => {
      setData(data)
  
    })
    .catch(e => {
    });
}, []);

    return (
      isLoggedIn ? <><p>{data[0][1]}</p></> :
        <Mission />
      );
}

export default Home;
