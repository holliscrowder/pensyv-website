import {React} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./ProfileForm.css";
import { Link } from "react-router-dom";


export const ProfileForm = ({user, setUser, isUpdated, setIsUpdated}) => {
    

    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email"),
        username: yup.string().max(50),
        age: yup.number().min(0).max(130),
        sex: yup.string(),
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            age: "",
            sex: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/api/users", {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            }).then((response) => {
                if (response.status == 201) {
                    return response.json()
                }

            }).then((data) => {
                console.log(data);
                setUser(data);
                setIsUpdated(true)
            });
        },
    });

    return (
        <>
            <div className = "profile">
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
                    <label htmlFor = "age">Age</label>
                    <br />
                    <input 
                        id = "age"
                        name = "age"
                        onChange = {formik.handleChange}
                        value = {formik.values.age}
                    />
                    <p style = {{ color: "red" }}> {formik.errors.age}</p>
                    <label htmlFor = "sex">Sex</label>
                    <br />
                    <select 
                        id = "sex"
                        name = "sex"
                        placeholder = "sex (optional)"
                        onChange = {formik.handleChange}
                        value = {formik.values.sex}
                    >
                        <option value = "" label = "prefer not to say">
                            prefer not to say
                        </option>
                        <option value = "F" label = "female">
                            female
                        </option>
                        <option value = "M" label = "male">
                            male
                        </option>
                        <option value = "I" label = "indeterminate">
                            indeterminate
                        </option>
                    </select>
                    <p style = {{ color: "red" }}> {formik.errors.age}</p>
                    <br />
                    <button type = "submit">Update Profile</button>
                </form>
                <br />
            </div>
            <br />
        <Link to = {`/profile`} className = "button-update-profile">Back to Profile</Link>
        </>
    )




}