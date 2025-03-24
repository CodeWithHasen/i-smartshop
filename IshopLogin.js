import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export default function IshopLogin() {
    let navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [cookies, setCookie] = useCookies(["userid"]);

    useEffect(() => {
        axios.get("http://localhost:4040/getusers")
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    const validationSchema = yup.object({
        UserId: yup.string()
            .min(4, 'User ID too short')
            .max(12, 'User ID too long')
            .required('User ID Required'),
        Password: yup.string()
            .min(4, 'Weak Password')
            .max(12, 'Strong Password')
            .required('Password Required'),
    });

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100"
             style={{ background: "linear-gradient(to right, #f8f9fa, #e3f2fd)" }}>
            <Formik
                initialValues={{ UserId: '', Password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const user = users.find(user => 
                        user.UserId === values.UserId && user.Password === values.Password
                    );

                    if (user) {
                        setCookie("userid", user.UserId);
                        navigate("/dashboard");
                    } else {
                        alert("Invalid Credentials");
                    }
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="p-4 shadow-lg rounded border border-primary bg-white" 
                          style={{ width: "400px", borderWidth: "2px" }}>
                        <h2 className="mb-4 text-center"><i className="bi bi-person"></i> User Login</h2>

                        <div className="mb-3">
                            <label className="form-label">User ID</label>
                            <Field type="text" name="UserId" className="form-control" />
                            <ErrorMessage name="UserId" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <Field type="password" name="Password" className="form-control" />
                            <ErrorMessage name="Password" component="div" className="text-danger" />
                        </div>

                        <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>

                        <div className="text-center mt-3">
                            <Link to="/register" className="text-decoration-none">New User? Register Here</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
