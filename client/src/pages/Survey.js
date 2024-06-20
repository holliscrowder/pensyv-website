import { React, useEffect, useState} from "react";
import "./Survey.css"
import { SurveyForm } from "../components/SurveyForm";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";


function Survey() {
    const [user, setUser] = useOutletContext();
    const [formSubmitted, setFormSubmitted] = useState(false);
    

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

    if (user) {
        if (formSubmitted == false) {
            return (
                <>
                <main>
                    <h2 className = "mood_header"> Daily Mood Questionnaire </h2>
                    <SurveyForm className = "survey" formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}/>
                </main>
                </>
            );
        }
        else {
            return (
                <div className = "submitted">
                    <p>Survey Submitted! What would you like to do next?</p>
                    <br />
                    <Link to={"/"} className = "button-update-profile">Home</Link>
                    <br />
                    <br />
                    <Link to={"/profile"} className = "button-update-profile">Profile</Link> 
                </div>    
                )
        }
    
    }
    else {
        return <p className = "loading">Loading Survey...</p>
    }

    
}

export default Survey;