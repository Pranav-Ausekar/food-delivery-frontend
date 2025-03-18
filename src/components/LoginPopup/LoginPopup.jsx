import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

    const [currentState, setCurrentState] = useState("Sign Up")
    const { url, setToken } = useContext(StoreContext)

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value

        setData((data) => ({ ...data, [name]: value }))
        // console.log(data)
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        try {
            if (currentState === "Login") {
                newUrl += '/api/user/login'
            } else {
                newUrl += '/api/user/register'
            }

            const response = await axios.post(newUrl, data)
            // console.log(response)
            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)
                setShowLogin(false)
            } else {
                alert(response.data.message);
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>

                <div className='login-popup-title'>
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                <div className='login-popup-inputs'>
                    {currentState === "Login" ?
                        <></> :
                        <input
                            type="text"
                            placeholder='Your name'
                            required
                            name="name"
                            onChange={onChangeHandler}
                        />}
                    <input
                        type="email"
                        placeholder='Your email'
                        required
                        name="email"
                        onChange={onChangeHandler}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        required
                        name="password"
                        onChange={onChangeHandler}
                    />
                </div>

                <button type='submit'>{currentState === "Sign Up" ? "Create an account" : "Login"}</button>

                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>

                {currentState === "Login"
                    ? <p>Create a new account?  <span onClick={() => setCurrentState("Sign Up")}>Click here</span> </p>
                    : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span> </p>
                }
            </form>
        </div>
    )
}

export default LoginPopup