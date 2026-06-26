import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from '../../features/auth/authSlice';


// Checks for access token and redirects to log in page if not found
const RequireAuth = () => {

    // Get access token from state
    const token = useSelector(selectCurrentToken);

    // Get the page user is navigating to
    const location = useLocation();


    return (
        token ?
            // Navigate to desired page
            <Outlet /> :
            
            // Redirect to the log in page
            <Navigate to='/logIn' state={{ from: location }} replace />
    );
};

export default RequireAuth;
