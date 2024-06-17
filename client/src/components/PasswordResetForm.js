import React, {useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "./PasswordResetForm.css";
import { Link } from "react-router-dom";

export const PasswordResetForm = ({user, setUser, isUpdated, setIsUpdated}) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    /* add password confirm function */
    function equalTo(ref, msg) {
        return yup.mixed().test({
          name: 'equalTo',
          exclusive: false,
          message: msg || '${path} must be the same as ${reference}',
          params: {
            reference: ref.path,
          },
          test: function(value) {
            return value === this.resolve(ref);
          },
        });
      }
      yup.addMethod(yup.string, 'equalTo', equalTo);

    const formSchema = yup.object().shape({
        currentPassword: yup.string().required("Must enter valid current password"),
        newPassword: yup.string().required("Must enter valid new password"),
        newPasswordConfirm: yup.string().equalTo(yup.ref('newPassword'), 'Passwords must match').required('Required')
    })

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            newPasswordConfirm: ""
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
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.user_status || "Network request not ok.")
                    })
                }
                
                return response.json()

            }).then((data) => {
                setUser(data);
                setIsUpdated(true);
            })
            .catch((error) => {
                console.log(error.message);
                setErrorMessage(error.message || "Current password not authenticated. Please try again.")
            });
        },
    });

    return (
        <>
            <div className = "reset">
                <form onSubmit = {formik.handleSubmit}>
                <label htmlFor = "currentPassword">Current Password</label>
                    <br />
                    <input 
                        id = "currentPassword"
                        name = "currentPassword"
                        placeholder = "current password"
                        onChange = {formik.handleChange}
                        value = {formik.values.currentPassword}
                        onBlur={formik.handleBlur}
                    />
                    <p style = {{ color: "red" }}> {formik.errors.currentPassword}</p>
                    <label htmlFor = "newPassword">New Password</label>
                    <br />
                    <input 
                        id = "newPassword"
                        name = "newPassword"
                        placeholder = "new password"
                        onChange = {formik.handleChange}
                        value = {formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                    <p style = {{ color: "red" }}> {formik.errors.newPassword}</p>
                    <label htmlFor = "newPasswordConfirm">Confirn New Password</label>
                    <br />
                    <input 
                        id = "newPasswordConfirm"
                        name = "newPasswordConfirm"
                        placeholder = "confirm new password"
                        onChange = {formik.handleChange}
                        value = {formik.values.passwordConfirm}
                        onBlur={formik.handleBlur}
                        // secureTextEntry
                    />
                    <p style = {{ color: "red" }}> {formik.errors.newPasswordConfirm}</p>
                    <button type = "submit">Update Password</button>
                </form>
                {errorMessage && <div className = "error-message">{errorMessage}</div>}
            </div>
            <br />
            <Link to = {`/profile`} className = "button-update-profile">Back to Profile</Link>
        </>
    )
}