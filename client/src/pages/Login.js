import React from "react";
import { LoginForm } from "../components/LoginForm";
import "./Login.css"
import { useOutletContext } from "react-router-dom";


function Login() {
    const [user, setUser, isLoggedIn] = useOutletContext();

    return (
        <>
            <main>
                <LoginForm user={user} setUser={setUser} className = "login"/>
            </main>
        </>
      );
}

export default Login;