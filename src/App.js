import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import "./App.css";
import MenuCategories from "./components/MenuCategories";
import Cart from "./components/Cart";
import { store, addOrder } from "./redux/store";
import Footer from "./components/Footer";
import OrderDetails from "./components/OrderDetails";
import OrderProcessing from "./components/OrderProcessing";
import OrderHistory from "./components/OrderHistory";
import Feedback from "./components/FeedBack";
// import Cartdemo from "./components/PopupImg";


// const SortBar = () => (
//   <div>
//     {/* <div className="sort-bar">
//       Sort by:
//       <select>
//         <option>Name</option>
//         <option>Price</option>
//       </select>
//     </div> */}
//     <div class="ui search">
//       <input class="prompt" type="text" placeholder="Search for dishes" />
//       <div class="results"></div>
//     </div>
//   </div>
// );

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
    <>
      <Router>
        <div className="app">
          <div className="fixed-content">
            <Header />
            {/* <Cartdemo /> */}
            {/* <PopupImage /> */}
          </div>
          <div className="main-content">
            {/* <SortBar /> */}
            <Routes>

              {/* <MenuCategories /> */}
              <Route path="/menu-items" element={<MenuCategories />}></Route>
              <Route path="/Yummy-Food" element={<MenuCategories />}></Route>

              {/* <Cart /> */}
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/order-details" element={<OrderDetails />}></Route>
              <Route path="/processing-order" element={<OrderProcessing />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/feedback/:orderId" element={<Feedback />} />
            </Routes>
            {/* <Popup /> */}
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
      <Footer />
    </>
  );
};

export default App;
