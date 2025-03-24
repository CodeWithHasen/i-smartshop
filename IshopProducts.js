import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import IshopCard from "./IshopCard";

export default function IshopProducts({ onAddToCart }) {
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);
    let params = useParams();

    useEffect(() => {
        setCategory(params.category);
        axios.get("http://localhost:4040/getproducts")
            .then(response => setProducts(response.data));
    }, [params.category]);

    return (
        <div className="container">
            <h2 className="text-center mb-3">{category ? category.toUpperCase() : "CATEGORY"} LIST</h2>

            <div className="mb-3 text-center">
                <Link to="/dashboard" className="btn btn-outline-primary btn-sm px-2 py-1" 
                     style={{ fontSize: "1rem" }}>
                    <i className="bi bi-arrow-left me-1" style={{ fontSize: "1.25rem" }}></i> Back to Categories
                </Link>
                </div>


            <div className="row g-3 justify-content-center">
                {products
                    .filter(item => item.category === category)
                    .map((product) => (
                        <div key={product.id} className="col-md-4 d-flex justify-content-center">
                            <IshopCard key={product.id} product={product} onAddToCart={onAddToCart} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
