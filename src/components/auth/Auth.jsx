import './auth.css';
import AuthDisplay from './authDisplay/AuthDisplay';
import LogInForm from './authForms/LogInForm';
import RegisterForm from './authForms/RegisterForm';


// Main component for auth pages
const Auth = ({ page }) => {



    return (
        <div className='auth_container'>
            {/* Video Section */}
            <AuthDisplay page={page} />

            {/* Log In / Register Form */}
            {page === 'logIn' ? 
                <LogInForm /> : 
                <RegisterForm /> 
            }
        </div>
    );
};

export default Auth;
