import useLocalStorage from './useLocalStorage';


// Reusable method for connecting toggles with local storage
const useToggle = (key, initValue) => {

    // Custom hook for using local storage
    const [value, setValue] = useLocalStorage(key, initValue);

    // Method for toggling the boolean stored in local storage
    const toggle = (value) => {
        setValue(prev => {
            return typeof value === 'boolean' ? value : !prev;
        });
    };

    // Return value and method
    return [value, toggle];
};

export default useToggle;