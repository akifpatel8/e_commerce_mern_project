import React from 'react'
import appstore from "../../../images/Appstore.png"
import playstore from "../../../images/playstore.png"
import "./Footer.css"

function Footer() {
  return (
    <>
    <footer id='footer'>
      <div className='left-footer'>
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={appstore} alt='appstore'/>
        <img src={playstore} alt='playstore'/>
      </div>

      <div className='mid-footer'>
        <h1>Ecommerce</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2024 &copy; Akif </p>
      </div>
      <div className='right-footer'>
        <h4>Follow Us</h4>
        <a href="http://instagram.com/">Instagram</a>
        <a href="http://youtube.com/">Youtube</a>
        <a href="http://instagram.com/">Facebook</a>
      </div>
    </footer>
    </>
  )
}

export default Footer