import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Provider, useDispatch, useSelector } from "react-redux";

// const Cart = () => {
//     const cartItems = useSelector(state => state.cart);
//     return (
//         <div className="cart-section">
//             <button className="cart-button">
//                 <FaShoppingCart />
//                 {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
//             </button>
//         </div>
//     );
// };

// export default Cart;

const Cart = () => {
    const [isOpen, setIsOpen] = useState(true);
    const cartItems = useSelector(state => state.cart);

    React.useEffect(() => {
        console.log("Cart Updated:", cartItems);
    }, [cartItems]);

    return (
        <div className="cart-section1">
            Welcome to Cart
            <button className="cart-button">
                <FaShoppingCart />
                {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
            </button>
        </div>

        // <>
        // {cartItems.length > 0 && <div className={`checkout-container ${isOpen ? "active" : ""}`}>
        //     <button className="checkout-close" onClick={onClose}>✖</button>
        //     <h2>Checkout</h2>
        //     <Link to="/goToCart">View Cart</Link>
        // </div>}
        // </>
    );
};

export default Cart;