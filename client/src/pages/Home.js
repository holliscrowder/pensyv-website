import React, { useEffect, useState } from "react";
import "./Home.css";
import Mission from "../components/Mission.js";
import Chart from "../components/Chart.js";
import { useOutletContext } from "react-router-dom";

function Home() {
  const [user, setUser, isLoggedIn, handleLogout, questions] = useOutletContext();
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

  if (isLoggedIn && submissions) {
   // flatten submissions data 
  const submissions_flat = submissions.flat().map(submission => (
      {
      "id": submission.id,
      "question_id": submission.question_id,
      "score": submission.score,
      "checked": submission.submission.checked,
      "created_on": submission.submission.created_on,
      "submission_id": submission.submission_id
    }
  ))

  // separate submissions data by question
  const submissions_q0 = submissions_flat.filter((submission) => (submission.question_id === questions[0].id))
  const submissions_q1 = submissions_flat.filter((submission) => (submission.question_id === questions[1].id))
  const submissions_q2 = submissions_flat.filter((submission) => (submission.question_id === questions[2].id))
  const submissions_q3 = submissions_flat.filter((submission) => (submission.question_id === questions[3].id))
  const submissions_q4 = submissions_flat.filter((submission) => (submission.question_id === questions[4].id))

  const chartData = []

  // for (let i = 0, i < )
  // console.log(submissions_q0.length)

  for (let i = 0; i < submissions_q0.length; i++) {
    let scores = [submissions_q0[i].score, submissions_q1[i].score, submissions_q2[i].score, submissions_q3[i].score, submissions_q4[i].score]
    let scores_avg = scores.reduce((a, b) => a + b)/scores.length;
    chartData.push({
      "id": submissions_q0[i].submission_id,
      "created_on": submissions_q0[i].created_on.substring(0,10),
      "checked": submissions_q0[i].checked,
      "Q1": scores[0],
      "Q2": scores[1],
      "Q3": scores[2],
      "Q4": scores[3],
      "Q5": scores[4],
      "average": scores_avg
    })
  };

  chartData.sort((a,b) => new Date(a.created_on) - new Date(b.created_on));

  console.log(chartData[0], chartData[1])

//   const new_data = submissions_q0.foreach(function(submission_q0) {
//     const index = submission_q0.index();
//     return {
//     "id": submission_q0.submission_id,
//     "created_on": submission_q0.created_on,
//     "Q1": submission_q0.score,
//     "Q2": submissions_q1[index].score,
//     "Q3": submissions_q2[index].score,
//     "Q4": submissions_q3[index].score,
//     "Q5": submissions_q4[index].score
//   }
// })

  // console.log(chartData[0])
    // const allScores = submissions.flat().map(questionnaire => ({"id": String(questionnaire.id), "score": questionnaire.score}))
    // console.log(allScores)
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
     <Chart allScores = {chartData}/> 
      </>
      );
  }
  else {
    return (<Mission />)
  }
}

export default Home;
