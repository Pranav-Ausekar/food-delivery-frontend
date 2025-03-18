import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Order your favourite food here</h2>
                <p>Craving something delicious? We’ve got a menu packed <br /> with flavorful dishes made just for you. Order now and treat <br /> yourself to a tasty adventure!</p>
                <button>View Menu</button>
            </div>
        </div>
    )
}

export default Header