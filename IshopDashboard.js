import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import IshopCart from "./IshopCart";

export default function IshopDashboard({ cart, onAddToCart, removeFromCart }) {
    const [cookies, setCookie, removeCookie] = useCookies(["userid"]);
    const [userid, setUserId] = useState("");
    const [categories, setCategories] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        if (!cookies["userid"]) {
            navigate("/login");
        } else {
            setUserId(cookies["userid"]);
            axios.get("http://localhost:4040/getcategories")
                .then(response => setCategories(response.data))
                .catch(error => console.error("Error fetching categories:", error));
        }
    }, [cookies, navigate]);

    function handleSignout() {
        removeCookie("userid");
        navigate("/login");
    }

    const categoryBackgrounds = {
        "electronics": "#ffcc80",
        "jewelery": "#f48fb1",
        "men's clothing": "#81d4fa",
        "women's clothing": "#d1c4e9"
    };

    return (
        <div className="container-fluid bg-light py-5">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="fw-bold"><i className="bi bi-bag-heart-fill"></i> Welcome to I-Shop, {userid}</h2>
                    <div>
                        <button className="btn btn-warning me-3" data-bs-toggle="modal" data-bs-target="#cartModal">
                            <i className="bi bi-cart3" style={{ fontSize: "1.2rem" }}></i> View Cart [{cart.length}]
                        </button>
                        <button onClick={handleSignout} className="btn btn-danger">
                            Sign Out
                        </button>
                    </div>
                </div>

                <h2 className="text-center mt-4">Shop by Category</h2>
                <div className="row mt-3">
                    {categories.map(item => (
                        <div className="col-md-6 col-lg-3 mb-4 d-flex align-items-stretch" key={item.category}>
                            <Link to={`/products/${item.category}`} className="text-decoration-none w-100">
                                <div className="category-card p-3 text-center rounded-4 shadow-sm border w-100"
                                     style={{
                                         height: "280px",
                                         display: "flex",
                                         flexDirection: "column",
                                         justifyContent: "center",
                                         alignItems: "center",
                                         background: categoryBackgrounds[item.category.toLowerCase()] || "#f5f5f5",
                                         overflow: "hidden"
                                     }}>
                                    <img src={item.image} alt={item.category} className="img-fluid rounded-circle"
                                         style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                                    <h5 className="mt-3 text-dark">{item.category.toUpperCase()}</h5>
                                    <p className="text-muted">Explore the best {item.category}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <IshopCart cart={cart} removeFromCart={removeFromCart} />
        </div>
    );
}
