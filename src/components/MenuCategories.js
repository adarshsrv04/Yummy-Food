import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FoodData from "../models/FoodData";
import FoodItem from "./FoodItem";
// import SortBar from "../App"

const SortBar = () => (
    <div>
      {/* <div className="sort-bar">
        Sort by:
        <select>
          <option>Name</option>
          <option>Price</option>
        </select>
      </div> */}
      <div class="ui search">
        <input class="prompt" type="text" placeholder="Search for dishes" />
        <div class="results"></div>
      </div>
    </div>
  );
const MenuCategories = () => {
    // console.log(selectedCategory);

    // const [quantity, setQuantity] = useState(0);
    // const [cartItems, setCartItems] = useState([]);
    const uniqueCategories = [...new Set(FoodData.map(item => item.category))];
    const [isOpen, setIsOpen] = useState("true");
    const [isOpenCategory, setIsOpenCategory] = useState(uniqueCategories[0]);

    const [openCategory, setOpenCategory] = useState(uniqueCategories.map(item => false));
    // const [isOpen, setIsOpen] = React.useState(false); // Initially closed
  
  const toggleCategory = (category) => {
    console.log(category);
    setIsOpen(category === isOpen ? "" : category); // Toggle category visibility
  };
    // const toggleCategory = (category) => {
    //     setOpenCategory(prevCategory => prevCategory === category ? null : category);
    // };

    const toggleOpenCategory = (category, isOpen) => {
        const index = uniqueCategories.indexOf(category);
        console.log(isOpen);
        setIsOpen(isOpen);
        setOpenCategory[index] = isOpen;
        console.log(openCategory);
    };


    // const addToCart = (item, quantity) => {
    //     setCartItems([...cartItems, { ...item, quantity }]);
    //     setQuantity(quantity);
    // };
    return (
        //     FoodData
        //             .filter((item) => item.category)
        //             .map((item) => (
        //     <div className="food-item">
        //         <div className="foodDisc">
        //             <h3>{item.name}</h3>
        //             <p>{item.desc}</p>
        //             <p>{item.category}</p>
        //             <p>₹{item.price}</p>
        //             <div className="rating">⭐ {(item.rating)} ({item.ratingCount})</div>

        //         </div>
        //         <div className="foodImg">
        //             <img src={item.img} />
        //             {quantity > 0 && <div className="quantity">
        //                 <button onClick={() => setQuantity(Math.max(0, quantity - 1))}>-</button>
        //                 <span>{quantity}</span>
        //                 <button onClick={() => setQuantity(quantity + 1)}>+</button>
        //             </div>}
        //         {quantity === 0 && <button className="add-to-cart" onClick={() => addToCart(item, quantity + 1)}>ADD</button>}
        //         </div>
        //     </div>
        //     )
        // )

        <div>
            <SortBar />
            {uniqueCategories.map((category) => (
                <div
                // key={item}
                // className={item === selectedCategory ? "active" : ""}                    
                >
                    <div className="itemCat">
                        <div className="category-header" onClick={() => setIsOpenCategory((category === isOpenCategory) ? "" : category)}>
                            <h3>{category}</h3>
                            {(isOpenCategory === category) ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {FoodData
                            .filter((item) => item.category === category && (isOpenCategory === category))
                            .map((item) => (
                                <FoodItem key={item.name} item={item} />
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MenuCategories;