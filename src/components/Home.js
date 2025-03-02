import React from 'react'
import { Link } from 'react-router-dom'

export default function Home () {
  return (
    <div className='container'>
      <div>Add new item in the list</div>
      <Link to='/addItem'><button>Add Item</button></Link>
      <div>Add new cuisines in the list</div>
      <Link to='/addCuisines'><button>Add Cuisines</button></Link>
      
    </div>
  )
}