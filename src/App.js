import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import Header from "./components/Header";
import FoodCategories from "./components/FoodCategories";
import FoodList from "./components/FoodList";
import "./App.css";
import MenuCategories from "./components/MenuCategories";
import Cart from "./components/Cart";
import { store } from "./redux/store";
import cartSlice from './redux/slices/Carts/CartUpdate'
import PopupImage from "./components/PopupImg";


const SortBar = () => (
  <div>
    <div className="sort-bar">
      Sort by:
      <select>
        <option>Name</option>
        <option>Price</option>
      </select>
    </div>
    <div class="ui search">
      <input class="prompt" type="text" placeholder="Search for dishes" />
      <div class="results"></div>
    </div>
  </div>
);

// const Cart = ({ cartItems }) => (
//   <div className="cart-section">
//     <button className="cart-button">
//       <FaShoppingCart />
//       {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
//     </button>
//   </div>
// );

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <div className="fixed-content">
            <Header />
            <SortBar />
            {/* <PopupImage /> */}
          </div>
          <div className="main-content">
          <Routes>
            
              {/* <MenuCategories /> */}
              <Route path="/menu-items" element={<MenuCategories />}></Route>
            
            {/* <Cart /> */}
            <Route path="/goToCart" element={<Cart />}></Route>
          </Routes>
          </div>







          {/* <div className="main-content">
        <FoodCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div className="content">
          <SortBar />
          <FoodList selectedCategory={selectedCategory} />
        </div>
      </div> */}
          {/* <Cart cartItems={cartItems} /> */}
        </div>
      </Router>
    </Provider>
  );
};

export default App;
