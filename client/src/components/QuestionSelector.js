import React, { useEffect, useState } from "react";

export default function QuestionSelector ( {chartQuestion, setChartQuestion}) {

    return (
        <form>
            <label htmlFor = "chartQuestions">Select Questions</label>
            <br />
            <select 
                id = "chartQuestions"
                value = {chartQuestion}
                onChange = {(event) => {
                        setChartQuestion(event.target.value)
                    }}
            >
                <option value = "average" label = "Average">
                    Average
                </option>
                <option value = "Q1" label = "Question 1">
                    Question 1
                </option>
                <option value = "Q2" label = "Question 2">
                    Question 2
                </option>
                <option value = "Q3" label = "Question 3">
                    Question 3
                </option>
                <option value = "Q4" label = "Question 4">
                    Question 4
                </option>
                <option value = "Q5" label = "Question 5">
                    Question 5
                </option>

            </select>
        </form>
    )
}