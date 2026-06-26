import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, removeCredentials } from '../../features/auth/authSlice';



// Standard API call
const baseQuery = fetchBaseQuery({
    
    // Base url for all Api calls
    baseUrl: process.env.REACT_APP_BASE_URL,

    // Credentials needed for refresh token cookies
    credentials: 'include',

    prepareHeaders: (headers, { getState }) => {
        // Check for an access token in state
        const token = getState().auth.token;

        if (token) {
            // Add the access token into headers
            headers.set('Authorization', `Bearer ${token}`);
        };

        // Return headers
        return headers;
    }
});



// Wrapper for api calls to request a new access token and retry call
const baseQueryWithReauth = async (args, api, extraOptions) => {

    // Try original Api call
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403) {
        // Send refresh token to get new access token
        const refreshResult = await baseQuery({
            url: '/oauth/token',
            method: 'POST',
            body: {
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                'grant_type': 'refresh_token'
            }
        }, api, extraOptions);

        if (refreshResult?.data) {
            // Grab user from state
            const user = api.getState().auth.user;
            
            // Store new access token in state
            api.dispatch(setCredentials({ ...refreshResult.data, user }));

            // Retry Api call with new access token
            result = await baseQuery(args, api, extraOptions);

        } else {
            // Log out if we dont recieve a new access token
            api.dispatch(removeCredentials());
        };
    };

    // Return the result of the api call if everthing goes well
    return result;
};



// Create and export Api
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});