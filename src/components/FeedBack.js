// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addRating } from "../redux/store";
// import { FaStar } from "react-icons/fa";
// import "../styles/feedback.css";

// const Feedback = () => {
//     const { orderId } = useParams();
//     const navigate = useNavigate();

//     const dispatch = useDispatch();
//     const handleSubmitFeedback = () => {
//         if (!order) return;

//         // Dispatch to Redux and localStorage
//         dispatch(addRating({ orderId: order.id, ratings }));
//         console.log("Submitted Ratings: ", ratings);

//         navigate("/order-history");
//     };

//     const orderHistory = useSelector((state) => state.orderHistory);
//     const order = orderHistory.find((o) => o.id === parseInt(orderId));

//     // If order doesn't exist, create an empty ratings object (safe fallback)
//     const initialRatings = order
//         ? order.items.reduce((acc, item) => {
//             acc[item.id] = 0;
//             return acc;
//         }, {})
//         : {};

//     const [ratings, setRatings] = useState(initialRatings);

//     const handleStarClick = (itemId, rating) => {
//         setRatings({ ...ratings, [itemId]: rating });
//     };

//     // const handleSubmitFeedback = () => {
//     //     if (!order) return;

//     //     console.log("Submitted Ratings: ", ratings);
//     //     // Save to backend / localStorage / Redux if needed

//     //     navigate("/order-history");
//     // };

//     // Render error early if order not found
//     if (!order) {
//         return (
//             <div className="feedback-container">
//                 <h2>Order Not Found</h2>
//                 <button onClick={() => navigate("/order-history")}>Go Back</button>
//             </div>
//         );
//     }

//     return (
//         <div className="feedback-container">
//             <h2>Give Feedback</h2>

//             {order.items.map((item) => (
//                 <div key={item.id} className="feedback-item">
//                     <div className="feedback-item-info">
//                         <img src={item.img} alt={item.name} />
//                         <span>{item.name}</span>
//                     </div>

//                     <div className="star-rating">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                             <FaStar
//                                 key={star}
//                                 className={`star ${ratings[item.id] >= star ? "selected" : ""}`}
//                                 onClick={() => handleStarClick(item.id, star)}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             ))}

//             <button className="submit-feedback-btn" onClick={handleSubmitFeedback}>
//                 Submit Feedback
//             </button>
//         </div>
//     );
// };

// export default Feedback;



import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRating } from "../redux/store";
import "../styles/feedback.css";

const Feedback = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderHistory = useSelector((state) => state.orderHistory);
  const ratings = useSelector((state) => state.ratings);
  const existingRatings = ratings[orderId];
  const order = orderHistory.find((o) => o.id === parseInt(orderId));

  const [currentRatings, setCurrentRatings] = useState({});

  useEffect(() => {
    if (order) {
      const initial = {};
      order.items.forEach((item) => {
        initial[item.id] = 0;
      });
      setCurrentRatings(initial);
    }
  }, [order]);

  if (!order) {
    return <div>Order not found!</div>;
  }

  // If feedback already exists, show read-only stars
  if (existingRatings) {
    return (
        <div className="order-history-container feedback-page">
          <h2>Feedback for Order #{orderId}</h2>
          <div className="order-card ">
            {order.items.map((item) => (
              <div key={item.id} className="feedback-item">
                <div className="feedback-item-info">
                  <img src={item.img} alt={item.name} />
                  <span>{item.name}</span>
                </div>
                <div className="stars read-only">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        existingRatings[item.id] >= star ? "star selected" : "star"
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="submit-feedback-btn" onClick={() => navigate("/order-history")}>
            Back to Order History
          </button>
        </div>
    );
  }

  const handleRating = (itemId, ratingValue) => {
    setCurrentRatings((prev) => ({
      ...prev,
      [itemId]: ratingValue,
    }));
  };

  const handleSubmit = () => {
    dispatch(addRating({ orderId: orderId, ratings: currentRatings }));
    alert("Thankyou for your feedback!");
    navigate("/order-history");
  };

  return (
    <div className="order-history-container feedback-page">
      <h2>Rate Your Order #{orderId}</h2>
      <div className="order-card ">
        {order.items.map((item) => (
          <div key={item.id} className="feedback-item">
            <div className="feedback-item-info">
              <img src={item.img} alt={item.name} />
              <span>{item.name}</span>
            </div>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={
                    currentRatings[item.id] >= star ? "star selected" : "star"
                  }
                  onClick={() => handleRating(item.id, star)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="submit-feedback-btn" onClick={handleSubmit}>
        Submit Feedback
      </button>
    </div>
  );
};

export default Feedback;
