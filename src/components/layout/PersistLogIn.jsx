import { useEffect, useRef, useState } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectCurrentToken } from '../../features/auth/authSlice';
import useLocalStorage from '../../hooks/useLocalStorage';



const PersistLogIn = () => {

    // Has the use refresh hook been called
    const [hookCalled, setHookCalled] = useState(false);

    // Track if this is the first time component has mounted
    const firstMount = useRef(true);

    // Custom refresh access token hook
    const { refresh, isLoading} = useRefreshToken();

    // Get access token from state
    const token = useSelector(selectCurrentToken);

    // Get persist login status from local storage
    const [persist] = useLocalStorage('persist', false);




    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                // Try to get new access token
                await refresh();

            } catch(err) {
                // Console log errors
                console.log(err);

            } finally {
                if (isMounted) {
                    // Remove loading page
                    setHookCalled(true);
                }
            }
        };

        if (!token && firstMount.current) {
            // Block Strict Mode's second mount
            firstMount.current = false;

            // Call refresh hook if no token in state
            verifyRefreshToken();

        } else {
            // Remove loading page
            setHookCalled(true);
        }

        // Clean up
        return () => isMounted = false;
    }, [token, refresh]);


    return (
        <>
            {!persist ? <Outlet /> :
                hookCalled && !isLoading ? <Outlet /> : <p>Loading...</p>}
        </>
    )
};

export default PersistLogIn;
