import './auth.css';
import AuthDisplay from './authDisplay/AuthDisplay';
import LogInForm from './authForms/LogInForm';


// Main component for auth pages
const Auth = ({ page }) => {



    return (
        <div className='auth_container'>
            {/* Video Section */}
            <AuthDisplay page={page} />

            {/* Log In / Register Form */}
            <LogInForm />
        </div>
    );
};

export default Auth;
