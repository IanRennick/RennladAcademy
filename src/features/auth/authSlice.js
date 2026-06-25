import { createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
    
    // Slice name
    name: 'auth',

    // Initial state
    initialState: { email: null, token: null },

    reducers: {
        // Add user credentials to state when logging in or requesting new access token
        setCredentials: (state, action) => {
            const { email, access_token } = action.payload;
            state.email = email;
            state.token = access_token;
        },

        // Remove user credentials from state when logging out
        logOut: (state, action) => {
            state.email = null;
            state.token = null;
        }
    }
});

// Export actions
export const { setCredentials, logOut } = authSlice.actions;


// Selectors
export const selectCurrentEmail = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;


export default authSlice.reducer;