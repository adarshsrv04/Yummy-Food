import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import React, { useState } from "react";
import FoodData from "../models/FoodData";
import FoodList from "./FoodList";


const FoodCategories = ({ selectedCategory, setSelectedCategory }) => {
    // const categories = ["All", "Dosa", "Soups", "Salads", "Breakfast", "Lunch", "Dinner", "Wraps", "Chicken", "Pizza", "Burger"];
    const uniqueCategories = [...new Set(FoodData.map(item => item.category))];
    // uniqueCategories.push("All");

    // <div className="sidebar">
    //     <h3>Categories</h3>
    //     {categories.map((category) => (
    //         <div
    //             key={category}
    //             className={category === selectedCategory ? "active" : ""}
    //             onClick={() => setSelectedCategory(category)}
    //         >
    //             {category}
    //         </div>
    //     ))}
    // </div>
    // ------------------------------
    return (
    <div className="category-nav">
        {uniqueCategories.map((item) => (
            <div
                key={item}
                className={item === selectedCategory ? "active" : ""}
                onClick={() => setSelectedCategory(item)}
            >
                {item}
                {/* <FoodList selectedCategory={selectedCategory} /> */}
            </div>
        ))}
    </div>
    );
};

export default FoodCategories;