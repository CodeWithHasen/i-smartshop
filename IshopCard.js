import React from "react";
import { Link } from "react-router-dom";

export default function IshopCard({ product, hideDetailsButton = false, onAddToCart }) {
    return (
        <div className="card m-0 p-2 border border-dark shadow-lg text-center"
             style={{ width: "290px", height: "350px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>  
            
            <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                <img src={product.image} className="card-img-top" alt={product.title}
                     style={{ width: "130px", height: "100px", objectFit: "contain" }} />
            </div>

            <div className="card-body d-flex flex-column align-items-center">
                <h6 className="card-title">{product.title}</h6>
                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                
                {product.rating && (
                    <p className="card-text">
                        <strong>Rating:</strong> <i className="bi bi-star-fill" style={{ fontSize: "1rem", color: "gold" }}></i> {product.rating.rate} ({product.rating.count} reviews)</p>
                )}
                
                <div className="d-flex gap-2">
                    {!hideDetailsButton && (
                        <Link to={`/details/${product.id}`} className="btn btn-primary flex-fill w-50">View Details</Link>
                    )}
                    <button 
                        onClick={() => { 
                            onAddToCart(product); 
                            alert(`${product.title} added to cart!`); 
                        }} 
                        className="btn btn-warning flex-fill w-50">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
