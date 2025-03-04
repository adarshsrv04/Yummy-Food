import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from '../redux/store';

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

// const Cart = () => {
//     const [isOpen, setIsOpen] = useState(true);
//     const cartItems = useSelector(state => state.cart);

//     React.useEffect(() => {
//         console.log("Cart Updated:", cartItems);
//     }, [cartItems]);

//     return (
//         <div className="cart-section1">
//             Welcome to Cart
//             <button className="cart-button">
//                 <FaShoppingCart />
//                 {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
//             </button>
//         </div>

//         // <>
//         // {cartItems.length > 0 && <div className={`checkout-container ${isOpen ? "active" : ""}`}>
//         //     <button className="checkout-close" onClick={onClose}>✖</button>
//         //     <h2>Checkout</h2>
//         //     <Link to="/goToCart">View Cart</Link>
//         // </div>}
//         // </>
//     );
// };

const Cart = () => {
    const cartItems = useSelector(state => state.cart);

    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    const removeFromCart = (item, quantity) => {
        setQuantity(quantity);
        dispatch(removeItem(item.id));
    }
    const addToCart = (item, quantity) => {
        console.log('item--' + item.name);
        setQuantity(quantity);
        dispatch(addItem(item));
    };

    return (
        <div className="cart-section">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <>
                    <p>Cart is empty</p>
                    <Link to="/menu-items" className="go-to-cartt">Browse Menu</Link>
                </>

            ) : (
                // <div>
                //     {cartItems.map((item) => (
                //         <div key={item.id} className="cart-item">
                //             <span style={{ width: "60%", textAlign: "left" }}>{item.name}</span>
                //             {/* <span>{item.quantity}</span> */}
                //             <div>
                //                 <div>
                //                 <button style={{ color: "cornflowerblue", fontWeight: "600" }} onClick={() => removeFromCart(item, Math.max(0, quantity - 1))}>−</button>
                //                 <span style={{ color: "cornflowerblue", fontWeight: "600" }}>{item.quantity}</span>
                //                 <button style={{ color: "cornflowerblue", fontWeight: "600" }} onClick={() => addToCart(item, Math.max(0, quantity + 1))}>+</button>
                //                 </div>
                //                 <span>₹{item.price * item.quantity}</span>
                //             </div>
                //         </div>
                //     ))}

                //     <h3>Total: ₹{totalPrice}</h3>
                // </div>
                <div className="cart-content">
                    <table className="cart-table">
                        {/* <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead> */}
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ textAign: "left" }}>{item.name}</td>
                                    <td>
                                        <div className="quantity-controls">
                                            <button className="quantity-btn" onClick={() => removeFromCart(item)}>−</button>
                                            <span className="quantity-value">{item.quantity}</span>
                                            <button className="quantity-btn" onClick={() => addToCart(item)}>+</button>
                                        </div>
                                    </td>
                                    <td>₹{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3 className="cart-total">Total: ₹{totalPrice} 😊</h3>
                </div>
            )}
        </div>
        // <div class="_3A7wW">
        //     <div class="_38bXh">
        //         <div class="_3Pi5K">
        //             <i class="_2FpMQ LCYc9 icon-Veg _2VX0M" role="presentation" aria-hidden="true" ></i>
        //             <div class="_1i2tH">Classic Family Feast for 4 - Veg</div>
        //         </div>
        //         <div class="_1Kddj">
        //             <div class="_4aTR-">
        //                 <div class="x3I9r _1zdcj">
        //                     <button class="_1bVjk _1v2pZ zKoxV">ADD</button>
        //                     <div class="BbiqG">+</div>
        //                     <div class="_t-T3"></div>
        //                     <div class="_1wC-f">1</div>
        //                 </div>
        //                 <div class="_7KS9N">
        //                     <span class="_21DvD">938.62</span>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div class="_38bXh">
        //         <div class="_3Pi5K">
        //             <i class="_2FpMQ LCYc9 icon-Veg _2VX0M" role="presentation" aria-hidden="true"></i>
        //             <div class="_1i2tH">Crispy Veg Double Patty Burger
        //                 <button class="dnSuE">Customize</button>
        //             </div>
        //         </div>
        //         <div class="_1Kddj">
        //             <div class="_4aTR-">
        //                 <div class="x3I9r _1zdcj">
        //                     <button class="_1bVjk _1v2pZ zKoxV">ADD</button>
        //                     <div class="BbiqG">+</div><div class="_t-T3">
        //                     </div>
        //                     <div class="_1wC-f">1</div>
        //                 </div>
        //                 <div class="_7KS9N">
        //                     <span class="_21DvD">99</span>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};


export default Cart;

{/* <div class="_3A7wW">
    <div class="_38bXh">
        <div class="_3Pi5K">
            <i class="_2FpMQ LCYc9 icon-Veg _2VX0M" role="presentation" aria-hidden="true" style="line-height: 1.2;"></i>
            <div class="_1i2tH">Classic Family Feast for 4 - Veg</div>
        </div>
        <div class="_1Kddj">
            <div class="_4aTR-">
                <div class="x3I9r _1zdcj">
                    <button class="_1bVjk _1v2pZ zKoxV">ADD</button>
                    <div class="BbiqG">+</div>
                    <div class="_t-T3"></div>
                    <div class="_1wC-f">1</div>
                </div>
                <div class="_7KS9N">
                    <span class="_21DvD">938.62</span>
                </div>
            </div>
        </div>
    </div>
    <div class="_38bXh">
        <div class="_3Pi5K">
            <i class="_2FpMQ LCYc9 icon-Veg _2VX0M" role="presentation" aria-hidden="true" style="line-height: 1.2;"></i>
            <div class="_1i2tH">Crispy Veg Double Patty Burger
                <button class="dnSuE">Customize</button>
            </div>
        </div>
        <div class="_1Kddj">
            <div class="_4aTR-">
                <div class="x3I9r _1zdcj">
                    <button class="_1bVjk _1v2pZ zKoxV">ADD</button>
                    <div class="BbiqG">+</div><div class="_t-T3">
                    </div>
                    <div class="_1wC-f">1</div>
                </div>
                <div class="_7KS9N">
                    <span class="_21DvD">99</span>
                </div>
            </div>
        </div>
    </div>
</div> */}