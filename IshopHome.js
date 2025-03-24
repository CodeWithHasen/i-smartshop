import React from "react";
import { Link } from "react-router-dom";

export default function IshopHome() {
    return (
        <div className="home-container d-flex justify-content-center align-items-center vh-100">
            <div className="text-center p-5 shadow-lg rounded">
                <h1 className="fw-bold text-danger">
                    <i className="bi bi-cart4"></i> Welcome to I-Shop
                </h1>
                <p className="lead text-muted" style={{color: 'black'}}>
                    Your one-stop shopping destination for the latest trends.
                </p>
                <div className="mt-4">
                    <Link to="/register" className="btn btn-danger btn-sm me-3 px-4 py-1">
                        <i className="bi bi-person-plus"></i> New Register
                    </Link>
                    <Link to="/login" className="btn btn-outline-dark btn-sm px-4 py-1">
                        <i className="bi bi-box-arrow-in-right"></i> Existing User
                    </Link>
                </div>
            </div>
        </div>
    );
}
