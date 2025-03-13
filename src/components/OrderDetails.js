import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from '../redux/store';
import  downloadReceiptPDF  from './DownloadReceipt';
import { TbDownload } from "react-icons/tb";


// const downloadReceipt = (order) => {
//     const header = `
//   🧾 ANDY'S KITCHEN - ORDER RECEIPT 🧾
  
//   Order ID: ${order.id}
//   ----------------------------------------
//   Items:
//   `;
  
//     // Define fixed widths for each column (adjust as needed)
//     const itemNameWidth = 32; // space for the item name
//     const quantityWidth = 5;  // e.g., "x1  "
//     const priceWidth = 8;     // e.g., " ₹150.00"
  
//     const itemLines = order.items.map(item => {
//       // Truncate if too long, or pad if too short
//       const name = item.name.length > itemNameWidth
//         ? item.name.slice(0, itemNameWidth - 3) + '...'
//         : item.name.padEnd(itemNameWidth, ' ');
  
//       const quantity = `x${item.quantity}`.padEnd(quantityWidth, ' ');
//       const price = `₹${(item.price * item.quantity).toFixed(2)}`.padStart(priceWidth, ' ');
  
//       // Combine columns with spacing
//       return `${name}${quantity}${price}`;
//     }).join('\n');
  
//     const footer = `
//   ----------------------------------------
//   Total: ₹${order.total.toFixed(2)}
  
//   Thank you for ordering with Andy's Kitchen! 😊
//   `;
  
//     const receiptContent = `${header}${itemLines}${footer}`;
  
//     const blob = new Blob([receiptContent], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
  
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `${order.id}_receipt.txt`;
//     link.click();
  
//     URL.revokeObjectURL(url);
//   };
  
const OrderDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderDetails = location.state?.order || { orderDetails: [] };

    // useEffect(() => {
    //     // Clear the cart once we land on OrderDetails page
    //     dispatch(clearCart());
    // }, [dispatch]);

    const totalAmount = orderDetails.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="order-details">
            <h2>Order Placed Successfully! 🎉</h2>
            {/* <p>Thank you for your order.</p> */}
            <p>Here are your order details:</p>
            <p>Order ID: {orderDetails.id}</p>
            <div className="order-items">
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.items.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>₹{item.price}</td>
                                <td>₹{item.price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3>Total Amount to Pay: ₹{totalAmount}</h3>
                <p>Pay via Cash or UPI at counter!</p>
            </div>
            {/* <Link to="/order-history">
                <button className="view-history-btn">View Order History</button>
            </Link> */}
            <button className="back-to-home-btn" onClick={() => navigate("/Yummy-Food")}>
                Back to Home
            </button>
            <TbDownload onClick={() => downloadReceiptPDF(orderDetails)} className="download-receipt-btn" />
            {/* <TbDownload />
            </button> */}

        </div>
    );
};

export default OrderDetails;
