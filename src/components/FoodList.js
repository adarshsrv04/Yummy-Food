import React, { useState } from "react";
import FoodData from "../models/FoodData";
import FoodCategories from "./FoodCategories";

const foodItems = [
    {
        name: "Chicken Vegetable Soup",
        description:
            "Free range chicken with no antibiotics, potatoes, onions, carrots, tomatoes, celery, and parsley.",
        img: "https://img.freepik.com/free-photo/seafood-pizza_74190-5944.jpg?w=996&t=st=1693062328~exp=1693062928~hmac=53fd9ad496580db41c6ca8066510cd89c6b0a0389de8bb6b875a78a1eda09cb5",
        categpry: "Dosa",
        price: "$3.99",
        rating: 4.5,
        ratingCount: 130,
    },
    {
        name: "Chicken Chilli",
        description:
            "Free range chicken with no antibiotics, potatoes, onions, carrots, tomatoes, celery, and parsley.",
        img: "https://w7.pngwing.com/pngs/339/55/png-transparent-pizza-margherita-italian-cuisine-hot-dog-pizza-cheese-pizza-thumbnail.png",
        price: "$4.99",
        rating: 4.1,
        ratingCount: 179,
    },
];

const FoodItem = ({ selectedCategory, item }) => {
    // console.log(selectedCategory);
    const [quantity, setQuantity] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item, quantity) => {
        setCartItems([...cartItems, { ...item, quantity }]);
        setQuantity(quantity);
    };
    return (
        <div className="food-item">
            <div className="foodDisc">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <div className="rating">⭐ {(item.rating)} ({item.ratingCount})</div>
                
            </div>
            <div className="foodImg">
                <img src={item.img} />
                {quantity > 0 && <div className="quantity">
                    <button onClick={() => setQuantity(Math.max(0, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>}
            {quantity === 0 && <button className="add-to-cart" onClick={() => addToCart(item, quantity + 1)}>ADD</button>}
            </div>
        </div>
    );
};

function FoodList({ selectedCategory, addToCart }) {
    console.log(selectedCategory);
    return (
        // <div className="food-list">
        //     {FoodData.map((item) => (
        //         <FoodItem selectedCategory={selectedCategory} item={item} addToCart={addToCart} />
        //     ))}
        // </div>
        <>
        <div className="food-list">
            {FoodData
                .filter((item) => selectedCategory === "All" || item.category === selectedCategory)
                .map((item) => (
                    <FoodItem key={item.name} item={item} addToCart={addToCart} />
                ))}
        </div>
        </>
    );
};

export default FoodList;