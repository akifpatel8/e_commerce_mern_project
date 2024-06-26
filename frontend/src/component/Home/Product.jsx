import React from 'react'
import {Link }from "react-router-dom"
import ReactStars from "react-rating-stars-component";

const options={
    edit:false,
    color:"rgb(20, 20, 20, 0.1)",
    active:"tomato",
    size:window.innerWidth < 600 ? 20 : 25,
    value:2.5,
    isHalf:true
}
function Product({product}) {
  return (
    <Link className='product-card' to={product._id}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <ReactStars {...options}/><span>(256 reviews)</span>
        </div>
        <span>{product.price}</span>
    </Link>
  )
}

export default Product