import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from '../redux/store';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cartImg from "../images/cart-img.png";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const ShowDetails = ({ desc, name, onClose }) => {
    return (
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className="showDetails-container">
                <button className="close-btn" onClick={onClose}>✖</button>
                <h3>{name}</h3>
                <p>{desc}</p>
            </div>
        </>
    );
}

const FoodItem = ({ item, onClose }) => {
    // const [quantity, setQuantity] = useState(0);
    // const [cartItems, setCartItems] = useState([]);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();
    const [activeCart, setActiveCart] = useState(false);

    const cartItems = useSelector(state => state.cart);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        if (totalItems > 0) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 500); // Reset animation after 500ms
        }
    }, [totalItems]);


    const removeFromCart = (item, quantity) => {
        // setQuantity(quantity);
        dispatch(removeItem(item.id));
    }
    const addToCart = (item, quantity) => {
        console.log('item--' + item.name);
        // setCartItems([...cartItems, { ...item, quantity }]);
        // setQuantity(quantity);
        dispatch(addItem(item));
    };

    const cartItem = cartItems.find(i => i.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <>
            <div className="food-item">
                <div className="foodDisc">
                    <div>
                        <h4>{item.name}</h4>
                        <p>₹{item.price}</p>
                        <div className="rating">
                            <AiFillStar
                                className="star"
                                color="cornflowerblue"
                                size={18}
                            />
                            <span>{(item.rating)} ({item.ratingCount})</span>
                        </div>
                    </div>
                    <span className="showInMobile moreDetails" onClick={() => { setShowDetails(true) }}>More Details
                        <FaChevronRight className="right-arrow" />
                    </span>
                    {showDetails && <ShowDetails desc={item.desc} name={item.name}
                        onClose={() => { setShowDetails(false) }} />}
                    <p className="hideInMobile">
                        {showFullDesc ? item.desc : `${item.desc.substring(0, 250)}... `}
                        <span className="gJIdXj" onClick={() => setShowFullDesc(!showFullDesc)}>
                            {showFullDesc ? " less" : "more"}
                        </span>
                    </p>
                </div>
                <div className="foodImg">
                    <img src={item.img} />
                    {cartItem && <div className="quantity">
                        {/* <button style={{color: "cornflowerblue", fontWeight: "600"}} onClick={() => removeFromCart(item, Math.max(0, quantity - 1))}>−</button>
                        <span style={{color: "cornflowerblue", fontWeight: "600"}}>{quantity}</span>
                        <button style={{color: "cornflowerblue", fontWeight: "600"}} onClick={() => addToCart(item, Math.max(0, quantity + 1))}>+</button> */}
                        <div className="quantity-controls">
                            <button className="quantity-btn" onClick={() => removeFromCart(item, Math.max(0, quantity - 1))}>−</button>
                            <span className="quantity-value">{quantity}</span>
                            <button className="quantity-btn" onClick={() => addToCart(item, Math.max(0, quantity + 1))}>+</button>
                        </div>
                    </div>}
                    {(quantity === 0) && <button className="add-to-cart" onClick={() => addToCart(item, quantity + 1)}>ADD</button>}
                </div>
            </div>
            <div class="_207Gy"></div>
            {cartItems.length > 0 &&
                <div className={`checkout-container ${isOpen ? "active" : ""}`}>
                    {/* <button className="checkout-close" onClick={onClose}>✖</button> */}
                    {/* <h3>{cartItems.length} items added</h3> */}
                    <Link to="/goToCart">
                        <motion.span
                            animate={animate ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <FaShoppingCart style={{ display: "block", width: "100%", height: "100%" }} />
                            {totalItems > 0 && <span className={"cart-count"}>{totalItems}</span>}
                        </motion.span>
                    </Link>
                </div>}
            {/* <FaShoppingCart
        onClick={() => setActiveCart(!activeCart)}
        className={`rounded-full bg-white shadow-md text-5xl p-3 fixed bottom-4 right-4 ${
            cartItems.length > 0 && "animate-bounce delay-500 transition-all"
        } `}/> */}
        </>
    );
};

export default FoodItem;