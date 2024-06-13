import React from "react";
import "./Home.css";
import Mission from "../components/Mission.js"
import { useOutletContext } from "react-router-dom";

function Home() {
  const [user, setUser, isLoggedIn] = useOutletContext();
  

    return (
      isLoggedIn ? <><p>Logged In!</p></> :
        <Mission />
      );
}

export default Home;
