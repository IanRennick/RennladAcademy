import { useState, useEffect } from 'react';



const getLocalValue = (key, initialValue) => {
    // Check if a value if already stored in local storage
    const localValue = JSON.parse(localStorage.getItem(key));

    // Return the value
    if (localValue) return localValue;

    // Return the value if its a function
    if (initialValue instanceof Function) return initialValue();

    // Return the initial value if nothing stored in local storage
    return initialValue;
};


// Reusable method for interacting with local storage
const useLocalStorage = (key, initialValue) => {

    // Take value from local storage or set as initial value
    const [value, setValue] = useState(() => {
        return getLocalValue(key, initialValue);
    });

    
    useEffect(() => {
        // Store value in local storage when it changes
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    // Return the value and setValue method
    return [value, setValue];
};

export default useLocalStorage;
