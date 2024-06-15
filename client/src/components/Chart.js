import React, {useState} from "react";
// import { Line } from "react-chartjs-2";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";
import "./Chart.css";

export default function Chart({allScores, dates, chartQuestion}) {
    const today = new Date();
    console.log(today);
    return (

    <div className = "chart_container">
        <ResponsiveContainer width = "100%" aspect={4}>
            <LineChart
            className = "chart"
            label={"Chart"}
            width={500}
            height={300}
            data={allScores}
            margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
            }}
            >
            <CartesianGrid />
            <XAxis dataKey="created_on" tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()} domain = {['auto', 'auto']} name = "Time" className = "x-axis">
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
            {/* <Line label = "Question 1" type="monotone" dataKey="Q1" stroke="#dc3895" activeDot={{ r: 8 }}>Question 1
            </Line>
            <Line label = "Question 2" type="monotone" dataKey="Q2" stroke="#fe6b41" activeDot={{ r: 8 }}>Question 2
            </Line>
            <Line label = "Question 3" type="monotone" dataKey="Q3" stroke="#6c1a48" activeDot={{ r: 8 }}>Question 3
            </Line>
            <Line label = "Question 4" type="monotone" dataKey="Q4" stroke="#97290a" activeDot={{ r: 8 }}>Question 4
            </Line>
            <Line label = "Question 5" type="monotone" dataKey="Q5" stroke="#feabda" activeDot={{ r: 8 }}>Question 5
            </Line> */}
            <Line label = "Avg" type="monotone" dataKey="average" stroke="#feabda" activeDot={{ r: 8 }}>Avg
            </Line>
            </LineChart>
        </ResponsiveContainer>
        </div>
    )
}