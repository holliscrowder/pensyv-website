import React, {useState} from "react";
// import { Line } from "react-chartjs-2";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Chart({allScores}) {
    // console.log(allScores)
    // const allScores = [
    //     {id: 1, score: 2},
    //     {id: 2, score: 1},
    //     {id: 3, score: 4}
    // ]

    return (

    <div style={{width:"100%", height:"100%", backgroundColor: "whitesmoke"}}>
        <ResponsiveContainer width={"100%"} aspect={4} >
            <LineChart
            width={500}
            height={300}
            data={allScores}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
     </div>
    )
}