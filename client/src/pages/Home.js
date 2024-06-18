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
    fetch("/api/questionnaires")
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

    let chartData = []

    // function to subtract selected days from current date
    Date.prototype.subtractDays = function (days) {
      this.setTime(this.getTime() - (days * 24 * 60 * 60 * 1000));
      return this;
    }

  // create summary chart data containing all question data across time
  for (let i = 0; i < submissions_q0.length; i++) {
    let scores = [submissions_q0[i].score, submissions_q1[i].score, submissions_q2[i].score, submissions_q3[i].score, submissions_q4[i].score]
    let scores_avg = scores.reduce((a, b) => a + b)/scores.length;
    chartData.push({
      "id": submissions_q0[i].submission_id,
      "created_on_str": submissions_q0[i].created_on.substring(0,10),
      "created_on_date": new Date(submissions_q0[i].created_on.substring(0,10)).subtractDays(-1),
      "checked": submissions_q0[i].checked,
      "Q1": scores[0],
      "Q2": scores[1],
      "Q3": scores[2],
      "Q4": scores[3],
      "Q5": scores[4],
      "average": scores_avg
    })
  };

  // sort chart data by created on string in descending order, prioritizing last submission on each day
  const chartDataDescending = chartData.sort((a,b) => b.created_on_date - a.created_on_date);

  // remove duplicate submissions made on the same day, prioritizing the last submission on each day
  let chartDataNoDuplicates = [];
  let unique = []
  chartDataDescending.forEach((data) => {
    if (!unique.includes(data.created_on_str)){
      unique.push(data.created_on_str);
      chartDataNoDuplicates.push(data);
    }
    return chartDataNoDuplicates;
  });

   // filter chart data to only display selected dates
  let dateFilter = new Date();
  if (dates === "oneMonth"){
    dateFilter.subtractDays(30);
  }
  else if (dates === "threeMonths"){
    dateFilter.subtractDays(90);
  }
  else if (dates === "oneYear"){
    dateFilter.subtractDays(365);
  }
  else {
    dateFilter.subtractDays(10000);
  }

  const chartDataSelectedDates = chartDataNoDuplicates.filter((data) => (new Date(data.created_on_date) >= new Date(dateFilter)));

  // re-sort by date in ascending order
  const chartDataSelectedDatesAscending = chartDataSelectedDates.sort((a,b) => new Date(a.created_on_str) - new Date(b.created_on_str));

    return (
      <>
        <div className = "chartHome">
          <ul className = "selectors">
            <DateSelector dates = {dates} setDates = {setDates} />
            <br />
            <QuestionSelector chartQuestion = {chartQuestion} setChartQuestion = {setChartQuestion} />
            <br />
          </ul>
          <Chart allScores = {chartDataSelectedDatesAscending} dates = {dates} chartQuestion = {chartQuestion} /> 
          <br />
          {chartQuestion === "average" ? 
            (
              <div className = "question-display">
                <p>Average score across all questions:</p>
                <br />
                {questions.map((question, index) => (
                  <div key = {index}>
                    <p><b>Question {String(index+1)}:</b> {question.question_text}</p>
                    <br />
                  </div>
                  ))}
              </div>
            )
          :
          (
            <div className = "question-display">
              <p><b>Question {chartQuestion.substring(1)}:</b> {questions[Number(chartQuestion.substring(1) - 1)].question_text}</p>

            </div>
          )
          
          }
        </div>
      </>
    );
  }
  else {
    return (<Mission />)
  }
}

export default Home;
