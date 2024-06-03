import React, {useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./SignupForm.css"
import { useNavigate } from "react-router-dom";

export const SignupForm = ({user, setUser}) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter valid email"),
        username: yup.string().required("Must enter username").max(50)
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("api/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            }).then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.user_status || "Network request not ok.")
                    })
                }
                
                return response.json()

            }).then((data) => {
                setUser(data);
                navigate("/survey");
            })
            .catch((error) => {
                console.log(error.message);
                setErrorMessage(error.message || "Invalid email and/or username. Please try again.")
            });
        },
    });

    return (
        <div className = "signup">
            <form onSubmit = {formik.handleSubmit}>
                <label htmlFor = "email">Email Address</label>
                <br />
                <input
                    id = "email"
                    name = "email"
                    onChange = {formik.handleChange}
                    value = {formik.values.email}
                />
                <p style = {{ color: "red" }}> {formik.errors.email}</p>
                <label htmlFor = "username">Username</label>
                <br />

                <input 
                    id = "username"
                    name = "username"
                    onChange = {formik.handleChange}
                    value = {formik.values.username}
                />
                <p style = {{ color: "red" }}> {formik.errors.username}</p>
                <button type = "submit">Sign Up</button>
            </form>
            {errorMessage && <div className = "error-message">{errorMessage}</div>}
        </div>
    )




}