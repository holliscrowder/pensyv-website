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



//     const submissions_by_question = questions.foreach((question) => {
//       submissions.filter((submission) => (submission.question_id === question.id))
//   }
// )
    
    // submissions.filter((submission) => {submission.question_id == questions[0].id})
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

  const submissions_q1 = submissions_flat.filter((submission) => (submission.question_id === questions[0].id))
  console.log(submissions_q1)
  console.log(questions[0].id)
  console.log(submissions_flat[0])


    const allScores = submissions.flat().map(questionnaire => ({"id": String(questionnaire.id), "score": questionnaire.score}))
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
     <Chart allScores = {allScores}/> 
      </>
      );
  }
  else {
    return (<Mission />)
  }
}

export default Home;
