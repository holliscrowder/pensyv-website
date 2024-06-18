import React, {useState} from "react";
// import { Line } from "react-chartjs-2";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";
import "./Chart.css";
import moment from "moment";

export default function Chart({allScores, dates, chartQuestion}) {

    // function to subtract selected days from current date
    Date.prototype.subtractDays = function (days) {
        this.setTime(this.getTime() - (days * 24 * 60 * 60 * 1000));
        return this;
        }

    // filter chart data based on question
    const questionLabel = {
        "Q1": "Question 1",
        "Q2": "Question 2",
        "Q3": "Question 3",
        "Q4": "Question 4",
        "Q5": "Question 5",
        "average": "Average"
    }

    return (

    <div className = "chart_container">
        <ResponsiveContainer width = "100%" aspect={3}>
            <LineChart
            className = "chart"
            label={"Chart"}
            width={500}
            height={400}
            data={allScores}
            margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
            }}
            >
            <CartesianGrid />
            <XAxis dataKey="created_on_str" tickFormatter={(timestamp) => new Date(timestamp).subtractDays(-1).toLocaleDateString()} domain = {['auto', 'auto']} name = "Time" className = "x-axis">
            </XAxis>
            <YAxis domain = {[0, 4]}>
                <Label 
                    style={{
                        textAnchor: "middle",
                        fontSize: "130%",
                        fill: "black",
                        }}
                    angle={270} 
                    value={"score"} 
                />
                
            </YAxis>
            <Tooltip />
            <Legend />
            <Line name = {questionLabel[chartQuestion]} type="monotone" dataKey={chartQuestion} stroke="#dc3895" activeDot={{ r: 8 }}>{questionLabel[chartQuestion]}
            </Line>
            </LineChart>
        </ResponsiveContainer>
        </div>
    )
}