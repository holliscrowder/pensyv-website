import React, { useEffect, useState } from "react";
import "./Home.css";
import Mission from "../components/Mission.js";
import Chart from "../components/Chart.js";
import { useOutletContext } from "react-router-dom";

function Home() {
  const [user, setUser, isLoggedIn] = useOutletContext();
  const [submissions, setSubmissions] = useState("")

  useEffect(() => {
    fetch("api/questionnaires")
    .then((response) => {
      if (response.status === 200) {  
        return response.json()
      } else {
        throw response
      }
    })
    .then((data) => {
      setSubmissions(data)
    })
    .catch(e => {
      console.log(e)
    });
}, []);

  // let allScores = []
  // let chartData = []
  // let labels = []

  if (isLoggedIn && submissions) {
    const allScores = submissions.flat().map(questionnaire => ({"id": String(questionnaire.id), "score": questionnaire.score}))
    console.log(allScores)
    // const labels = allScores.map(myScore => String(myScore.id));
    // console.log(labels)
    // const chartData = {
    //   labels: labels,
    //   datasets: [{
    //     label: "Survey Scores Over Time",
    //     data: allScores.map(myScore => myScore.score),
    //     backgroundColor: [
    //       "rgba(75,192,192,1)",
    //       "#ecf0f1",
    //       "#50AF95",
    //       "#f3ba2f",
    //       "#2a71d0"
    //     ],
    //     borderColor: "black",
    //     borderWidth: 2
    //   }]
    // }
  
  

    return (<>
     <Chart allScores = {allScores}/> 
      </>
      );
  }
  else {
    return (<Mission />)
  }
}

export default Home;
