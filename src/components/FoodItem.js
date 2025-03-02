import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodData from "../models/FoodData";
import FoodCategories from "./FoodCategories";
import { AiFillStar } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa";
import cartSlice from '../redux/slices/Carts/CartUpdate'
import { useDispatch } from "react-redux";
import { addItem, removeItem } from '../redux/store';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cartImg from "../images/cart-img.png";


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
    const [quantity, setQuantity] = useState(0);
    // const [cartItems, setCartItems] = useState([]);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cart);
    // const navigate = useNavigate();
    // console.log('item--' + item.id);
    // console.log('size--' + cartItems?.length);
    // console.log('quantity--' + cartItems?.[0]?.quantity || 0);


    const removeFromCart = (item, quantity) => {
        setQuantity(quantity);
        dispatch(removeItem(item.id));
    }
    const addToCart = (item, quantity) => {
        console.log('item--' + item.name);
        // setCartItems([...cartItems, { ...item, quantity }]);
        setQuantity(quantity);
        dispatch(addItem(item));
    };
    return (
        <>
            <div className="food-item">
                <div className="foodDisc">
                    <div>
                        <h3>{item.name}</h3>
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
                    {(cartItems.find(i => i.id === item.id )) && <div className="quantity">
                        <button onClick={() => removeFromCart(item, Math.max(0, quantity - 1))}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => addToCart(item, Math.max(0, quantity + 1))}>+</button>
                    </div>}
                    {(quantity === 0) && <button className="add-to-cart" onClick={() => addToCart(item, quantity + 1)}>ADD</button>}
                </div>
            </div>
            <div class="_207Gy"></div>
            {cartItems.length > 0 && 
            <div className={`checkout-container ${isOpen ? "active" : ""}`}>
                {/* <button className="checkout-close" onClick={onClose}>✖</button> */}
                {/* <h3>{cartItems.length} items added</h3> */}
                <Link to="/goToCart" className="go-to-cartt"><img style={{height: "100%", width: "100%"}} src={cartImg} /></Link>
            </div>}
        </>
    );
};

export default FoodItem;