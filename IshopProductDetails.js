import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import IshopCard from "./IshopCard";

export default function IshopProductDetails({ onAddToCart }) {
    const [product, setProduct] = useState(null);
    let params = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4040/getproduct/${params.id}`)
            .then(response => setProduct(response.data[0]))
            .catch(error => console.error("Error fetching product details:", error));
    }, [params.id]);

    if (!product) {
        return <h2>Loading product details...</h2>;
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h2 className="mb-4">Product Details</h2>

            <IshopCard product={product} hideDetailsButton={true} onAddToCart={onAddToCart} />

            <div className="mt-3 text-center">
                <Link to={`/products/${product.category}`} className="btn btn-outline-primary btn-sm px-2 py-1"
                    style={{fontSize: "1rem"}}>
                    <i className="bi bi-arrow-left me-1" style={{fontSize: "1.25rem"}}></i> Back to Products
                </Link>
            </div>
        </div>
    );
}
