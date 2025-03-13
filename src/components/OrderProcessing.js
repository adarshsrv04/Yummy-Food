import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import "./styles/Processing.css";

const OrderProcessing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const  orderDetails  = location.state?.order || { orderDetails: [] };

  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Step 1: Show loader first for 2 seconds
    const celebrationTimer = setTimeout(() => {
      setShowCelebration(true);
    }, 2000);

    // Step 2: Redirect after 3 seconds (1 second after celebration)
    const redirectTimer = setTimeout(() => {
    navigate("/order-details", { state: { order: orderDetails }, replace: true });
    }, 4000);

    return () => {
      clearTimeout(celebrationTimer);
      clearTimeout(redirectTimer);
    };
  }, [orderDetails, navigate]);

  return (
    <div className="processing-container">
      {!showCelebration ? (
        <>
          <div className="loader"></div>
          <h2>Processing your order...</h2>
        </>
      ) : (
        <>
          <div className="celebrate-icon">🎉</div>
          <h2>Order Placed Successfully!</h2>
        </>
      )}
    </div>
  );
};

export default OrderProcessing;
