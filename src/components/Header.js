import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

// export default function Header() {
//   return (
//     <div className='container'>
//       <div>Add new item in the list</div>
//       <Link to='/addItem'><button>Add Item</button></Link>

//     </div>
//   )
// }

const Header = () => {

  const [activeCart, setActiveCart] = useState(false);
  const cartItems = useSelector(state => state.cart);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isShaking, setIsShaking] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500); // Reset animation after 500ms
    }
  }, [totalItems]);

  return (
    <div className="header fixed-heade">
      <h2>Domino's Pizza</h2>
      <div className="user-info">
        {/* <span>Hello User!</span> */}
        {/* <motion.span
          // className="cart-button"
          animate={animate ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <FaShoppingCart />
          {cartItems.length > 0 && <span className="cart-count">{totalItems}</span>}
        </motion.span> */}
        <motion.span
          // className="cart-button"
          animate={animate ? { scale: [1, 1.4, 1], rotate: [0, 20, -10, 0] } : {}}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
        <FaShoppingCart />
        {totalItems > 0 && <span className={"cart-count"}>{totalItems}</span>}
          </motion.span>
        {/* <IoMdInformationCircleOutline /> */}
      </div>
    </div>);
};

export default Header;