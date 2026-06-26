import { useDispatch } from 'react-redux';
import { useLogOutMutation } from '../features/auth/authApiSlice';
import { removeCredentials } from '../features/auth/authSlice';




const useLogOut = () => {

    // Redux functions
    const [logOut] = useLogOutMutation();
    const dispatch = useDispatch();
    
    const logOutUser = async () => {
        // Remove access token from state
        dispatch(removeCredentials());

        // Try log out call
        await logOut().unwrap();  
    };

    // Return the log out method
    return logOutUser;
};

export default useLogOut;
