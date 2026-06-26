import { useRefreshTokenMutation } from '../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useCallback } from 'react';



// A resuable method for refreshing the access token
const useRefreshToken = () => {

    // Redux functions
    const [refreshToken, { isLoading }] = useRefreshTokenMutation();
    const dispatch = useDispatch();

  
    const refresh = useCallback(async () => {
        // Try refresh token call
        const response = await refreshToken().unwrap();
            
        // Store access token in state
        dispatch(setCredentials({ ...response }));

        // Return the response
        return response;
    },[refreshToken, dispatch]);

    // Return the refresh method and loading status
    return { refresh, isLoading };
};

export default useRefreshToken;
