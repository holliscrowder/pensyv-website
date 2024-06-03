import { React, useEffect, useState} from "react";
import "./Survey.css"
import { SurveyForm } from "../components/SurveyForm";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";


function Survey() {
    const [user, setUser] = useOutletContext();
    const [formSubmitted, setFormSubmitted] = useState(false);
    

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

    if (user) {
        if (formSubmitted == false) {
            return (
                <>
                <main>
                    <h2 className = "mood_header"> Daily Mood Questionnaire </h2>
                        <p className = "mood_instructions">The following questions will ask you for a response on a scale of 0-4 based on how you felt  
                            <b> in the past 24 hours:</b>
                        </p>
                        <p className = "mood_instructions">
                            4 - Extremely: This statement applies <b> without exception.</b>
                        </p>
                        <p className = "mood_instructions">
                            3 - Quite a Lot: This statement<b> pretty much </b> summarizes how I felt.
                        </p>
                        <p className = "mood_instructions">
                            2 - Moderately: I felt like this <b> around half of the time. </b>
                        </p>
                        <p className = "mood_instructions">
                            1 - A Little: I felt like this <b> sometimes. </b>
                        </p>
                        <p className = "mood_instructions">
                            0 - Not at All: I <b> never </b> felt like this at any point.
                        </p>
                    <SurveyForm className = "survey" formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}/>
                </main>
                </>
            );
        }
        else {
            return (
                <div className = "submitted">
                    <p>Survey Submitted! What would you like to do next?</p>
                    <li>
                        <Link to="/">Home</Link>
                    </li>  
                    <li>
                        <Link to="/survey">Re-submit Survey</Link> 
                    </li>  
                    <li>
                        <Link to="/profile">User Profile</Link> 
                    </li> 
                </div>    
                )
        }
    
    }
    else {
        return <p className = "loading">Loading Survey...</p>
    }

    
}

export default Survey;