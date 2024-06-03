import { useFormik } from "formik";
import * as yup from "yup";
import "./LeaveForm.css"
import { useNavigate, useOutletContext } from "react-router-dom";

export const LeaveForm = () => {
    const navigate = useNavigate();
    const [, , , handleLogout] = useOutletContext();
    
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
            fetch("api/users", {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            }).then((response) => {
                if (response.status == 201) {
                    return response
                }
                
                
            }).then((data) => {
                handleLogout();
                navigate("/");
            })
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
                <button type = "submit">Leave</button>
            </form>
        </div>
    )




}