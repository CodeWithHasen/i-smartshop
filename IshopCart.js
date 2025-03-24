import React from "react";

export default function IshopCart({ cart, removeFromCart }) {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    return (
        <div className="modal fade" id="cartModal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border border-primary shadow-lg">
                    <div className="modal-header bg-primary text-white">
                        <h3 className="m-0">Your Cart Items</h3>
                        <button className="btn-close btn-close-danger" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body bg-light">
                        {cart.length === 0 ? (
                            <p className="text-center text-muted">Your cart is empty</p>
                        ) : (
                            <table className="table table-hover table-bordered">
                            <thead className="table-primary">
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Preview</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => (
                                    <tr key={index}>
                                        <td className="align-middle">{item.title}</td>
                                        <td className="align-middle">${item.price.toFixed(2)}</td>
                                        <td className="align-middle">
                                            <img 
                                                src={item.image} 
                                                alt={item.title} 
                                                className="img-thumbnail border border-secondary" 
                                                style={{ width: "60px", height: "60px", objectFit: "contain", background: "#fff" }} />
                                        </td>
                                        <td className="align-middle">
                                        <button className="btn btn-danger btn-sm d-flex align-items-center justify-content-center"
                                            style={{ width: "60px", height: "60px", padding: "0" }}
                                            onClick={() => removeFromCart(index)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        )}
                        <h4 className="text-end mt-3"><strong>Total: </strong> <span className="text-success">&#8377; {totalPrice}</span></h4>
                    </div>
                    <div className="modal-footer bg-light border-0">
                        <button className="btn btn-success px-4" data-bs-dismiss="modal">Checkout</button>
                        <button className="btn btn-danger px-4" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
