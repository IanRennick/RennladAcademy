import { apiSlice } from '../../app/api/apiSlice';


export const authApiSlice = apiSlice.injectEndpoints({
    
    endpoints: builder => ({

        // Log in call query
        logIn: builder.mutation({
            query: credentials => ({
                url: '/oauth/token',
                method: 'POST',
                body: { 
                    ...credentials,
                    client_id: process.env.REACT_APP_CLIENT_ID,
                    client_secret: process.env.REACT_APP_CLIENT_SECRET,
                    'grant_type': 'password'
                }
            })
        }),

        // Refresh token query
        refreshToken: builder.mutation({
            query: () => ({
                url: '/oauth/token',
                method: 'POST',
                body: { 
                    client_id: process.env.REACT_APP_CLIENT_ID,
                    client_secret: process.env.REACT_APP_CLIENT_SECRET,
                    'grant_type': 'refresh_token'
                }
            })
        }),

        // Log out query
        logOut: builder.mutation({
            query: () => ({
                url: '/oauth/revoke',
                method: 'POST',
                body: { 
                    client_id: process.env.REACT_APP_CLIENT_ID,
                    client_secret: process.env.REACT_APP_CLIENT_SECRET,
                }
            })
        }), 
    })
});



export const { useLogInMutation, useRefreshTokenMutation, useLogOutMutation } = authApiSlice;