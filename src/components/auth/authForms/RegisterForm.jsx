import { useEffect, useRef, useState } from 'react';
import './authForms.css';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../features/auth/authSlice';
import { MdMarkEmailRead } from 'react-icons/md';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { CircularProgress } from '@mui/material';
import useToggle from '../../../hooks/useToggle';
import { validateUsername, validateEmail, validatePassword } from '../../../helpers/regexHelpers';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const RegisterForm = () => {

    // Refs for adding focus
    const usernameRef = useRef();
    const errorRef = useRef();

    // Values entered into username, email, password and password match inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Has a valid username, email, password and password confirmation been entered?
    const [validUsername, setValidUsername] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validPasswordMatch, setValidPasswordMatch] = useState(false);

    // Which input is being focused on so we can show correct instructions
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passwordMatchFocus, setPasswordMatchFocus] = useState(false);

    // State for persist log in checkbox
    const [check, toggleCheck] = useToggle('persist', false);

    // Navigate function
    const navigate = useNavigate();
        
    // Redux functions
    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        // Adds focus to the username input when page is loaded
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        // Validate username
        validateUsername(name, setValidUsername);
    }, [name]);

    useEffect(() => {
        // Validate email
        validateEmail(email, setValidEmail);
    }, [email]);

    useEffect(() => {
        // Validate password and confirm password
        validatePassword(password, setValidPassword, passwordMatch, setValidPasswordMatch);
    }, [password, passwordMatch]);

    useEffect(() => {
        // Clear error message when user changes any input
        setErrorMessage('');
    }, [name, email, password, passwordMatch, setErrorMessage]);


    const handleSubmit = async (e) => {
        // Prevent page from reloading
        e.preventDefault();
    
        try {
            // Try log in call
            const response = await register({ email, name, password }).unwrap();

            console.log(response);
    
            // Store access token in state
            dispatch(setCredentials({ ...response }));
    
            // Reset email and password state
            setEmail('');
            setName('');
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


    return (
        <div className='authForm_container'>
            <form className='auth_form' onSubmit={handleSubmit}>
                {/* Error messages */}
                <p ref={errorRef} className={errorMessage ? "error_message" : "hide_message"}>{errorMessage}</p>

                <div>
                    {/* Username label*/}
                    <label className='form_label' htmlFor='username'>
                        Username:
                        <span className={validUsername ? 'valid' : 'hide'}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validUsername || !name ? 'hide' : 'invalid'}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>   
                    </label>
                
                    <div className="input_container">
                        {/* Username Icon*/}
                        <MdMarkEmailRead className="form_icon" />
                
                        {/* Username Input */}
                        <input 
                            type='text'
                            id='username'
                            className='form_input'
                            ref={usernameRef}
                            autoComplete='off'
                            onChange={(e) => setName(e.target.value)}
                            required
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={()=> setUsernameFocus(false)}
                        />
                    </div>
                </div>

                {/* Username Instructions */}
                <p id='username_note' className={usernameFocus && name && !validUsername ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>

                <div>
                    {/* Email label*/}
                    <label className='form_label' htmlFor='email'>
                        Email:
                        <span className={validEmail ? 'valid' : 'hide'}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validEmail || !email ? 'hide' : 'invalid'}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>

                    <div className="input_container">
                        {/* Email Icon*/}
                         <MdMarkEmailRead className="form_icon" />

                        {/* Email Input */}
                        <input 
                            type='email'
                            id='email'
                            className='form_input'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            onFocus={() => setEmailFocus(true)}
                            onBlur={()=> setEmailFocus(false)}
                        />
                    </div>
                </div>

                {/* Email Instructions */}
                <p id='email_note' className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Enter a valid email address.
                </p>

                <div>
                    {/* Password label*/}
                    <label className='form_label' htmlFor='password'>
                        Password:
                        <span className={validPassword ? 'valid' : 'hide'}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPassword || !password ? 'hide' : 'invalid'}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>

                    <div className="input_container">
                        {/* Password Icon */}
                        <BsFillShieldLockFill className="form_icon" />

                        {/* Password Input */}
                        <input
                            type='password'
                            id='password'
                            className='form_input'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={()=> setPasswordFocus(false)}
                        />
                    </div>
                </div>

                {/* Password Instructions */}
                <p id='password_note' className={passwordFocus && !validPassword ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include upper and lowercase letters, a number and a special character.<br />
                    Allowed special characters: ! @ # $ % 
                </p>


                <div>
                    {/* Confirm Password label*/}
                    <label className='form_label' htmlFor='confirm_password'>
                        Confirm Password:
                        <span className={validPasswordMatch && passwordMatch ? 'valid' : 'hide'}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPasswordMatch || !passwordMatch ? 'hide' : 'invalid'}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>    
                    </label>

                    <div className="input_container">
                        {/* Confirm Password Icon */}
                        <BsFillShieldLockFill className="form_icon" />

                        {/* Confirm Password Input */}
                        <input
                            type='password'
                            id='confirm_password'
                            className='form_input'
                            onChange={(e) => setPasswordMatch(e.target.value)}
                            required
                            onFocus={() => setPasswordMatchFocus(true)}
                            onBlur={()=> setPasswordMatchFocus(false)}
                        />
                    </div>
                </div>

                {/* Confirm Password Instructions */}
                <p id='password_confirm_note' className={passwordMatchFocus && !validPasswordMatch ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match first password.
                </p>


                {/* Register Button - disabled if loading */}
                <button className='submit_button' disabled={isLoading}>
                    {
                        isLoading ?
                            <CircularProgress /> : 
                            <><span>Register</span><AiOutlineSwapRight className='button_icon' /></>
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
            </form>
        </div>
    );
};

export default RegisterForm;
