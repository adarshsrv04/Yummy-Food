import React from 'react'
// import { Link } from 'react-router-dom'
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

const Header = () => (
  <div className="header fixed-heade">
    <h2>Domino's Pizza</h2>
    <div className="user-info">
      <span>Hello User!</span>
      <FaShoppingCart />
      {/* <IoMdInformationCircleOutline /> */}
    </div>
  </div>
);

export default Header;