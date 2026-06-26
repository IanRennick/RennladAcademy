import { createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
    
    // Slice name
    name: 'auth',

    // Initial state
    initialState: { token: null },

    reducers: {
        // Add user credentials to state when logging in or requesting new access token
        setCredentials: (state, action) => {
            const { access_token } = action.payload;
            state.token = access_token;
        },

        // Remove user credentials from state when logging out
        removeCredentials: (state, action) => {
            state.token = null;
        }
    }
});

// Export actions
export const { setCredentials, removeCredentials } = authSlice.actions;


// Selectors
export const selectCurrentToken = (state) => state.auth.token;


export default authSlice.reducer;