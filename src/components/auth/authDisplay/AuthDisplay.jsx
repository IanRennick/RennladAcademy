import React from 'react';
import './authDisplay.css';
import video from '../../../videos/Spaceship2.mp4';
import { Link } from 'react-router-dom';


// Video section of the auth component
const AuthDisplay = ({ page }) => {



    return (
        <div className='authDisplay_container'>
            {/* Video */}
            <video className='auth_video' src={video} autoPlay muted loop></video>

            {/* Text */}
            <div className='display_banner'>
                <h2 className='banner_title'>Welcome to Rennlad Academy</h2>
                <p className='banner_text'>Which will definitely one day be a real website</p>
            </div>

            {/* Log in / Sign up link */}
            <div className="link_container">
                <span className="link_text">{page === "logIn" ? "Don't have an account?" : "Have an account?"}</span>

                <Link to={page === "logIn" ? "/register" : "/logIn"} >
                    <button className="link_button">{page === "logIn" ? "Sign Up" : "Log In"}</button>
                </Link>
            </div>
        </div>
    );
};

export default AuthDisplay;
