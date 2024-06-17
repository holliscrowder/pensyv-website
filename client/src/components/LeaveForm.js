import { useFormik } from "formik";
import * as yup from "yup";
import "./LeaveForm.css"
import { useNavigate, useOutletContext } from "react-router-dom";
import {useState} from "react";

export const LeaveForm = () => {
    const navigate = useNavigate();
    const [, , , handleLogout] = useOutletContext();
    const [errorMessage, setErrorMessage] = useState('');
    
    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter valid email"),
        password: yup.string().required("Must enter password").max(50)
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/api/users", {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            }).then((response) => {
                if (!response.ok && response.status != 204) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.error || 'Network response was not ok');
                    });
                }
                return;
                
            }).then((data) => {
                handleLogout();
                navigate("/");
            })
            .catch((error) => {
                setErrorMessage(error.message || 'An error occurred. Please try again later.');
            });
            ;
        },
    });

    return (
        <div className = "leave">
            <form onSubmit = {formik.handleSubmit}>
                <label htmlFor = "email">Email Address</label>
                <br />
                <input
                    id = "email"
                    name = "email"
                    placeholder = "email"
                    onChange = {formik.handleChange}
                    value = {formik.values.email}
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
                <button type = "submit">Leave</button>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    )




}