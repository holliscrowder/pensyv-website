import React, { useEffect, useState } from "react";
import "./Home.css";
import Mission from "../components/Mission.js";
import Chart from "../components/Chart.js";
import DateSelector from "../components/DateSelector.js";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import QuestionSelector from "../components/QuestionSelector.js";

function Home() {
  const [user, setUser, isLoggedIn, handleLogout, questions] = useOutletContext();
  const [submissions, setSubmissions] = useState("");
  const [dates, setDates] = useState("oneMonth");
  const [chartQuestion, setChartQuestion] = useState("average")

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

  // create 
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

    return (
      <>
        <div className = "chartHome">
          <DateSelector dates = {dates} setDates = {setDates} className = "selector"/>
          <br />
          <QuestionSelector chartQuestion = {chartQuestion} setChartQuestion = {setChartQuestion} className = "selector"/>
          <br />
          <Chart allScores = {chartData} dates = {dates} chartQuestion = {chartQuestion}/> 
        </div>
      </>
    );
  }
  else {
    return (<Mission />)
  }
}

export default Home;
