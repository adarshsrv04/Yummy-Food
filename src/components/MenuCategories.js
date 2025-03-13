import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FoodData from "../models/FoodData";
import FoodItem from "./FoodItem";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

// import SortBar from "../App"

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div>
    <div class="ui search">
      <input class="prompt" type="text" placeholder="Search for dishes" value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} />
      <div class="results"></div>
    </div>
  </div>
);
const MenuCategories = () => {

  // const [quantity, setQuantity] = useState(0);
  // const [cartItems, setCartItems] = useState([]);
  const uniqueCategories = [...new Set(FoodData.map(item => item.category))];
  const [searchTerm, setSearchTerm] = React.useState("");
  const filteredItems = FoodData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const [isOpen, setIsOpen] = useState("true");
  const [isOpenCategory, setIsOpenCategory] = useState(uniqueCategories[0]);

  const [openCategory, setOpenCategory] = useState(uniqueCategories.map(item => false));
  // const [isOpen, setIsOpen] = React.useState(false); // Initially closed
  const cartItems = useSelector(state => state.cart);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCategory = (category) => {
    console.log(category);
    setIsOpen(category === isOpen ? "" : category); // Toggle category visibility
  };

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
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {searchTerm ? (
        <div className="search-results">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => <FoodItem key={item.id} item={item} />)
          ) : (
            <p>No results found</p>
          )}
        </div>
      ) : (
        uniqueCategories.map((category) => (
          <div>
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
        )))}
        
      {cartItems.length > 0 &&
        <motion.div
          initial={{ y: "10vh", opacity: 0 }}  // Start off-screen
          animate={{ y: 0, opacity: 1 }}        // Animate to visible
          exit={{ y: "100vh", opacity: 0 }}     // Exit downwards
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          className={`checkout-container ${isOpen ? "active" : ""}`}
        >
          {/* <div className={`checkout-container ${isOpen ? "active" : ""}`}> */}
            <h4> {totalItems} {totalItems === 1 ? "item" : "items"} added</h4>
            <Link to="/cart">
              <div style={{ display: "flex" }}>
                <h3> View Cart </h3>
                <FaChevronRight style={{ marginTop: "6px", marginLeft: "4px" }} />
              </div>
            </Link>
            {/* <FaShoppingCart style={{ display: "block", width: "100%", height: "100%" }} />
                    {totalItems > 0 && <span className={"cart-count"}>{totalItems}</span>} */}
          {/* </div> */}
        </motion.div>
      }

    </div>
  );
};

export default MenuCategories;