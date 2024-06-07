import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./SignupForm.css"
import { useNavigate } from "react-router-dom";

export const LoginForm = ({user, setUser}) => {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("Must enter valid email format"),
        password: yup.string().required("Must enter password")
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("api/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.email_status || 'Network response was not ok');
                    });
                }
                return response.json();
            })
            .then((data) => {
                setUser(data)
                navigate("/survey");
            })
            .catch((error) => {
                setErrorMessage(error.message || 'An error occurred. Please try again later.');
            });
        },
    });

    return (
        <>
            <div className = "login">
                <form onSubmit = {formik.handleSubmit}>
                    <label htmlFor = "email">Email Address</label>
                    <br />
                    <input
                        id = "email"
                        name = "email"
                        placeholder = "email"
                        onChange = {formik.handleChange}
                        value = {formik.values.email.toLowerCase()}
                    />
                    <p style = {{ color: "red" }}> {formik.errors.email}</p>
                    <label htmlFor = "password">Password</label>
                    <br />
                    <input
                        id = "password"
                        name = "password"
                        placeholder = "password"
                        onChange = {formik.handleChange}
                        value = {formik.values.password}
                    />
                    <p style = {{ color: "red" }}> {formik.errors.password}</p>
                    <br />
                    <button type = "submit">Login</button>
                </form>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </>
    )




}