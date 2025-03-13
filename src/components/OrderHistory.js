import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../redux/store";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import { TbDownload } from "react-icons/tb";
import  downloadReceiptPDF  from './DownloadReceipt';

const OrderHistory = () => {
    const orderHistory = useSelector(state => state.orderHistory);
    const cartItems = useSelector(state => state.cart);
    const ratings = useSelector((state) => state.ratings);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState("true");
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleReorder = (items) => {
        items.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                dispatch(addItem(item));
            }
        });
    };
    return (
        <>
            <div className="order-history-container slide-in-top">
                <h2>Order History</h2>
                {orderHistory.length === 0 ? (
                    <p>No past orders found.</p>
                ) : (
                    [...orderHistory].reverse().map(order => (
                        <div key={order.id} className="order-card">
                            <div className="flexDisplay">
                                <h3>Order ID: {order.id}</h3>
                                <TbDownload onClick={() => downloadReceiptPDF(order)} className="download-receipt-btn" />
                            </div>
                            <p>Date: {order.date}</p>
                            <p>Total: ₹{order.total}</p>
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.id}>
                                        {item.name} - Qty: {item.quantity} - ₹{item.price * item.quantity}
                                    </li>
                                ))}
                            </ul>
                            <div className="flexDisplay">
                                <button className="reorder-btn" onClick={() => handleReorder(order.items)}>Reorder</button>
                                {ratings[order.id] ? (
                                    <button
                                        onClick={() => navigate(`/feedback/${order.id}`)}
                                        className="reorder-btn show-feedback-btn"
                                    >
                                        Show Feedback
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => navigate(`/feedback/${order.id}`)}
                                        className="reorder-btn give-feedback-btn"
                                    >
                                        Give Feedback
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cartItems.length > 0 &&
                <motion.div
                    initial={{ y: "10vh", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100vh", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 10 }}
                    className={`checkout-container ${isOpen ? "active" : ""}`}
                >
                    <h4> {totalItems} {totalItems === 1 ? "item" : "items"} added</h4>
                    <Link to="/cart">
                        <div style={{ display: "flex" }}>
                            <h3> View Cart </h3>
                            <FaChevronRight style={{ marginTop: "6px", marginLeft: "4px" }} />
                        </div>
                    </Link>
                </motion.div>
            }
        </>
    );
};

export default OrderHistory;
