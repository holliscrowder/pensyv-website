import React, {useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./SignupForm.css"
import { useNavigate } from "react-router-dom";

export const SignupForm = ({user, setUser}) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    /* add password confirm function */
    function equalTo(ref: any, msg: any) {
        return yup.mixed().test({
          name: 'equalTo',
          exclusive: false,
          message: msg || '${path} must be the same as ${reference}',
          params: {
            reference: ref.path,
          },
          test: function(value: any) {
            return value === this.resolve(ref);
          },
        });
      }
      yup.addMethod(yup.string, 'equalTo', equalTo);

    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter valid email"),
        username: yup.string().required("Must enter username").max(50),
        password: yup.string().required("Must enter valid password"),
        passwordConfirm: yup.string().equalTo(yup.ref('password'), 'Passwords must match').required('Required')
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            passwordConfirm: ""
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
                    placeholder = "email"
                    onChange = {formik.handleChange}
                    value = {formik.values.email}
                />
                <p style = {{ color: "red" }}> {formik.errors.email}</p>
                <label htmlFor = "username">Username</label>
                <br />
                <input 
                    id = "username"
                    name = "username"
                    placeholder = "username"
                    onChange = {formik.handleChange}
                    value = {formik.values.username}
                />
                <p style = {{ color: "red" }}> {formik.errors.username}</p>
                <label htmlFor = "password">Password</label>
                <br />
                <input 
                    id = "password"
                    name = "password"
                    placeholder = "password"
                    onChange = {formik.handleChange}
                    value = {formik.values.password}
                    onBlur={formik.handleBlur}
                />
                <p style = {{ color: "red" }}> {formik.errors.password}</p>
                <label htmlFor = "passwordConfirm">Confirn Password</label>
                <br />
                <input 
                    id = "passwordConfirm"
                    name = "passwordConfirm"
                    placeholder = "confirm password"
                    onChange = {formik.handleChange}
                    value = {formik.values.passwordConfirm}
                    onBlur={formik.handleBlur}
                    secureTextEntry
                />
                <p style = {{ color: "red" }}> {formik.errors.passwordConfirm}</p>
                <button type = "submit">Sign Up</button>
            </form>
            {errorMessage && <div className = "error-message">{errorMessage}</div>}
        </div>
    )




}