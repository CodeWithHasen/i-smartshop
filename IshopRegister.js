import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";

export default function IshopRegister() 
{
    let navigate = useNavigate();
    const validationSchema = yup.object({
        UserId: yup.string()
            .min(4, 'User ID too short')
            .max(12, 'User ID too long')
            .required('User ID Required'),
        UserName: yup.string()
            .min(4, 'Name too short')
            .max(12, 'Name too long')
            .required('Name Required'),
        Password: yup.string()
            .min(4, 'Weak Password')
            .max(12, 'Strong Password')
            .required('Password Required'),
        Age: yup.number()
            .min(18, 'Must be at least 18')
            .max(100, 'Must be below 100')
            .required('Age Required'),
        Mobile: yup.string()
            .matches(/^[0-9]{10}$/, 'Invalid Mobile Number')
            .required('Mobile Number Required'),
        Subscribed: yup.boolean()
    });

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100"
    style={{ background: "linear-gradient(to right, #f8f9fa, #e3f2fd)" }}>
            <h3 className="mb-4 me-4"><i className="bi bi-person-fill"></i> Register New User</h3>
            
            <Formik
                initialValues={{
                    UserId: '',
                    UserName: '',
                    Password: '',
                    Age: '',
                    Mobile: '',
                    Subscribed: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post("http://localhost:4040/registeruser", values)
                        .then(() => {
                            alert("Registered Successfully");
                            navigate("/login");
                        })
                        .catch((error) => {
                            console.error("Error during registration:", error);
                            alert("Registration Failed");
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="p-4 shadow-lg rounded border border-primary bg-white" 
                    style={{ width: "400px", borderWidth: "2px" }}>
                        <dl>
                            <dt>User ID</dt>
                            <dd><Field type="text" name="UserId" className="form-control" /></dd>
                            <dd className="text-danger"><ErrorMessage name="UserId" /></dd>

                            <dt>User Name</dt>
                            <dd><Field type="text" name="UserName" className="form-control" /></dd>
                            <dd className="text-danger"><ErrorMessage name="UserName" /></dd>

                            <dt>Password</dt>
                            <dd><Field type="password" name="Password" className="form-control" /></dd>
                            <dd className="text-danger"><ErrorMessage name="Password" /></dd>

                            <dt>Age</dt>
                            <dd><Field type="number" name="Age" className="form-control" /></dd>
                            <dd className="text-danger"><ErrorMessage name="Age" /></dd>

                            <dt>Mobile</dt>
                            <dd><Field type="text" name="Mobile" className="form-control" /></dd>
                            <dd className="text-danger"><ErrorMessage name="Mobile" /></dd>

                            <dt>Subscription</dt>
                            <dd className="form-switch">
                                <Field type="checkbox" name="Subscribed" className="form-check-input" />
                                <label className="ms-2">Yes</label>
                            </dd>
                        </dl>

                        <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>
                        <br /><br />
                        <Link to="/login" className="text-decoration-none">Already have an account?</Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
