import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./SurveyForm.css";
import { useOutletContext } from "react-router-dom";

export const SurveyForm = ({formSubmiteed, setFormSubmitted}) => {
    const [user, setUser, isLoggedIn, handleLogout, questions] = useOutletContext();

    const formSchema = yup.object().shape({
        question1: yup.number().required("Must enter valid score between (0-4)").min(0).max(4),
        question2: yup.number().required("Must enter valid score between (0-4)").min(0).max(4),
        question3: yup.number().required("Must enter valid score between (0-4)").min(0).max(4),
        question4: yup.number().required("Must enter valid score between (0-4)").min(0).max(4),
        question5: yup.number().required("Must enter valid score between (0-4)").min(0).max(4),
        checked: yup.bool()
    })


    const formik = useFormik({
        initialValues: {
            question1: "",
            question2: "",
            question3: "",
            question4: "",
            question5: "",
            checked: false
        },
        validationSchema: formSchema,
        onSubmit: 
            (values) => {
                fetch("api/questionnaires", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(values, null, 2),
                }).then((response) => {
                    if (response.status == 201) {
                        setFormSubmitted(true);
                    }
                });
            },
    });

    if (!questions.length) {
        return <p className = "loading"> Loading Questions... </p>
    }

    return (
        <div className = "survey">
            <form onSubmit = {formik.handleSubmit}>
                <label htmlFor = "question1">{questions[0].question_text}</label>
                <br />
                <input
                    id = "question1"
                    name = "question1"
                    onChange = {formik.handleChange}
                    value = {formik.values.question1}
                />
                <p style = {{ color: "red" }}> {formik.errors.question1}</p>
                <div className = "mood_instructions">
                    <p> <i>The following questions will ask you for a response on a scale of 0-4 based on how you felt  
                    <b> in the past 24 hours:</b>
                    </i></p>
                    <p>
                        <i><b>4</b> - Extremely: This statement applies <b> without exception.</b></i>
                    </p>
                    <p>
                        <i><b>3</b> - Quite a Lot: This statement<b> pretty much </b> summarizes how I felt.</i>
                    </p>
                    <p>
                        <i><b>2</b> - Moderately: I felt like this <b> around half of the time. </b></i>
                    </p>
                    <p>
                        <i><b>1</b> - A Little: I felt like this <b> sometimes. </b></i>
                    </p>
                    <p>
                        <i><b>0</b> - Not at All: I <b> never </b> felt like this at any point.</i>
                    </p>
                </div>
                <label htmlFor = "question2">{questions[1].question_text}</label>
                <br />
                <input
                    id = "question2"
                    name = "question2"
                    onChange = {formik.handleChange}
                    value = {formik.values.question2}
                />
                <p style = {{ color: "red" }}>{formik.errors.question2}</p>
                <label htmlFor = "question3">{questions[2].question_text}</label>
                <br />
                <input
                    id = "question3"
                    name = "question3"
                    onChange = {formik.handleChange}
                    value = {formik.values.question3}
                />
                <p style = {{ color: "red" }}>{formik.errors.question3}</p>
                <label htmlFor = "question4">{questions[3].question_text}</label>
                <br />
                <input
                    id = "question4"
                    name = "question4"
                    onChange = {formik.handleChange}
                    value = {formik.values.question4}
                />
                <p style = {{ color: "red" }}>{formik.errors.question4}</p>
                <label htmlFor = "question5">{questions[4].question_text}</label>
                <br />
                <input
                    id = "question5"
                    name = "question5"
                    onChange = {formik.handleChange}
                    value = {formik.values.question5}
                />
                <p style = {{ color: "red" }}>{formik.errors.question5}</p>
                <input
                    className = "checked"
                    type = "checkbox" 
                    id = "checked"
                    name = "checked"
                    onChange={formik.handleChange}
                    value = {formik.values.checked}
                />
                <label htmlFor = "checked">I feel sick or something bad happened to me</label>
                <br />
                <button type = "submit">Submit Questionnaire</button>
            </form>
        </div>
    )

}