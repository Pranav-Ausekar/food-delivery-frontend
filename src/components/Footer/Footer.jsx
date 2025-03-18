import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>

                <div className='footer-content-left'>
                    <img className='footer-image' src={assets.logo3} alt="" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, ducimus? Optio esse eligendi itaque? Voluptatibus corporis asperiores ducimus error a.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 878-808-3135</li>
                        <li>pranavausekar8808@gmail.com</li>
                    </ul>
                </div>

            </div>
            <hr />
            <p className='footer-copyright'>
                Copyright 2025 © yummy-tummy.com - All Right Reversed.
            </p>
        </div>
    )
}

export default Footer