import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PlaceOrder = () => {

    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (event) => {
        event.preventDefault();

        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id]
                orderItems.push(itemInfo)
            }
        })
        // console.log(orderItems)
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 15,
        }

        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url)
        }
        else {
            alert("Error");
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className='multi-fields'>
                    <input
                        type="text"
                        placeholder='First name'
                        name="firstName"
                        value={data.firstName}
                        onChange={onChangeHandler}
                        required
                    />
                    <input
                        type="text"
                        placeholder='Last name'
                        name='lastName'
                        value={data.lastName}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <input
                    type="email"
                    placeholder='Email address'
                    name="email"
                    value={data.email}
                    onChange={onChangeHandler}
                    required
                />
                <input
                    type="text"
                    placeholder='Street'
                    name='street'
                    value={data.street}
                    onChange={onChangeHandler}
                    required
                />
                <div className='multi-fields'>
                    <input
                        type="text"
                        placeholder='City'
                        name='city'
                        value={data.city}
                        onChange={onChangeHandler}
                        required
                    />
                    <input
                        type="text"
                        placeholder='State'
                        name='state'
                        value={data.state}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='multi-fields'>
                    <input
                        type="text"
                        placeholder='Zip code'
                        name='zipcode'
                        value={data.zipcode}
                        onChange={onChangeHandler}
                        required
                    />
                    <input
                        type="text"
                        placeholder='Country'
                        name='country'
                        value={data.country}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <input
                    type="text"
                    placeholder='Phone'
                    name='phone'
                    value={data.phone}
                    onChange={onChangeHandler}
                    required
                />
            </div>

            <div className="place-order-right">
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>Rs.{getTotalCartAmount()}/-</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : 15}/-</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>Rs. {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 15}/-</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder