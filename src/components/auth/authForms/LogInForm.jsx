import React, { useEffect, useRef, useState } from 'react';
import './authForms.css';
import image from '../../../images/spaceship.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useLogInMutation } from '../../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../features/auth/authSlice';
import { MdMarkEmailRead } from 'react-icons/md';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { CircularProgress } from '@mui/material';
import useInput from '../../../hooks/useInput';
import useToggle from '../../../hooks/useToggle';




const LogInForm = () => {

    // Refs for adding focus
    const emailRef = useRef();
    const errorRef = useRef();
    
    // State for email and password inputs / any error messages
    const [email, resetEmail, emailAttributes] = useInput('emailInput', '');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // State for persist log in checkbox
    const [check, toggleCheck] = useToggle('persist', false);

    // Navigate function
    const navigate = useNavigate();
        
    // Redux functions
    const [logIn, { isLoading }] = useLogInMutation();
    const dispatch = useDispatch();
    
    
    
    useEffect(() => {
        // Set focus on email input when form first loads
        emailRef.current.focus();
    }, []);

    
    useEffect(() => {
        // Clear the error message whenever email or password is changed
        setErrorMessage('');
    }, [email, password]);
    
    
    
    const handleSubmit = async (e) => {
        // Prevent page from reloading
        e.preventDefault();
    
        try {
            // Try log in call
            const response = await logIn({ email, password }).unwrap();

            console.log(response);
    
            // Store access token in state
            dispatch(setCredentials({ ...response }));
    
            // Reset email and password state
            resetEmail();
            setPassword('');
    
            // Navigate to home page
            navigate('/quiz');
    
        } catch (err) {
            if (!err.response) {
                // No server response
                setErrorMessage('No server response');
    
            } else if (err.response?.status === 400) {
                // Missing a parameter
                setErrorMessage('Missing username or password');
    
            } else if (err.response?.status === 401) {
                // Wrong parameter
                setErrorMessage('Unauthorized');
    
            } else {
                // Catch all
                setErrorMessage('Log In failed');
            };
    
            // Set focus on error message
            errorRef.current.focus();
        };
    };
    
    
    // Set email and password in state
    const handlePasswordInput = (e) => setPassword(e.target.value);



    return (
        <div className='authForm_container'>
            <div className='message_container'>
                {/* Welcome message and spaceship image */}
                <Link to='/'><img className='message_image' src={image} alt='spaceship' /></Link>
                <h3 className='message'>Welcome Back!</h3>
            </div>

            <form className='auth_form' onSubmit={handleSubmit}>
                {/* Error messages */}
                <p ref={errorRef} className={errorMessage ? "error_message" : "hide_message"}>{errorMessage}</p>

                <div>
                    {/* Email label*/}
                    <label className='form_label' htmlFor='email'>Email</label>

                    <div className="input_container">
                        {/* Email Icon*/}
                         <MdMarkEmailRead className="form_icon" />

                         {/* Email Input */}
                        <input 
                            type='email'
                            id='email'
                            ref={emailRef}
                            {...emailAttributes}
                            autoComplete='off'
                            required
                            className='form_input'
                        />
                    </div>
                </div>

                <div>
                    {/* Password label*/}
                    <label className='form_label' htmlFor='password'>Password</label>

                    <div className="input_container">
                        {/* Password Icon */}
                        <BsFillShieldLockFill className="form_icon" />

                        {/* Password Input */}
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={handlePasswordInput}
                            required
                            className='form_input'
                        />
                    </div>
                </div>

                {/* Log In Button - disabled if loading */}
                <button className='submit_button' disabled={isLoading}>
                    {
                        isLoading ?
                            <CircularProgress /> : 
                            <><span>Log In</span><AiOutlineSwapRight className='button_icon' /></>
                    }         
                </button>

                {/* Persist Login checkbox */}
                <div className='persist_check'>
                    <input 
                        type='checkbox'
                        id='persist'
                        onChange={toggleCheck}
                        checked={check}
                    />

                    <label className='persist_label' htmlFor="persist">Trust this device?</label>
                </div>

                {/* Forgot password link */}
                <span className='forgot_password'>
                    Forgot your password? <Link to='/' className='forgot_link'>Click here</Link>
                </span>
            </form>
        </div>
    );
};


export default LogInForm;
