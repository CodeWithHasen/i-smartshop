import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import IshopHome from "./IshopHome";
import IshopLogin from "./IshopLogin";
import IshopRegister from "./IshopRegister";
import IshopDashboard from "./IshopDashboard";
import IshopProducts from "./IshopProducts";
import IshopProductDetails from "./IshopProductDetails";
import IshopCart from "./IshopCart";

export default function IshopIndex() {
    const [cart, setCart] = useState([]);

    function onAddToCart(product) {
        setCart([...cart, product]);
    }

    function removeFromCart(index) {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    return (
        <div className="container-fluid">
            <header className="bg-danger text-white text-center p-3 shadow">
                <h1>I-Shop</h1>
            </header>
            <section className="row">
                <nav className="col-md-3 col-sm-12 bg-light p-3 shadow-sm">
                    <h5 className="text-center mb-3">Navigation</h5>
                    <div className="d-grid gap-2">
                        <Link className="btn btn-danger fw-bold btn-sm py-1" to="/">
                            <i className="bi bi-house-door"></i> Home
                        </Link>
                        <Link className="btn btn-danger fw-bold btn-sm py-1" to="/register">
                            <i className="bi bi-person-plus"></i> Register
                        </Link>
                        <Link className="btn btn-danger fw-bold btn-sm py-1" to="/login">
                            <i className="bi bi-key"></i> Login
                        </Link>
                        <Link className="btn btn-danger fw-bold btn-sm py-1" to="/dashboard">
                            <i className="bi bi-speedometer2"></i> Dashboard
                        </Link>
                    </div>
                </nav>
                <main className="col-md-9 col-sm-12 p-4">
                    <Routes>
                        <Route path="/" element={<IshopHome />} />
                        <Route path="/home" element={<IshopHome />} />
                        <Route path="/login" element={<IshopLogin />} />
                        <Route path="/register" element={<IshopRegister />} />
                        <Route path="/dashboard" element={<IshopDashboard cart={cart} onAddToCart={onAddToCart} removeFromCart={removeFromCart} />} />
                        <Route path="/products/:category" element={<IshopProducts onAddToCart={onAddToCart} />} />
                        <Route path="/details/:id" element={<IshopProductDetails onAddToCart={onAddToCart} />} />
                        <Route path="/errorpage" element={
                            <div className="text-center">
                            <h2 className="text-danger">Invalid Credentials</h2>
                            <Link className="btn btn-outline-danger mt-3" to="/login">Try Again</Link>
                            </div>
                            }/>
                    </Routes>
                </main>
            </section>
            <IshopCart cart={cart} removeFromCart={removeFromCart} />
            <footer className="footer bg-dark text-white text-center p-3 mt-auto">
                <p className="m-0">© 2025 I-Shop | Developed by Hasen Ali</p>
            </footer>
        </div>
    );
}
