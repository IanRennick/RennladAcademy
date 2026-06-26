import useLocalStorage from './useLocalStorage';




// Reusable method for connecting inputs with local storage
const useInput = (key, initValue) => {

    // Custom hook for using local storage
    const [value, setValue] = useLocalStorage(key, initValue);

    // Method for clearing value
    const reset = () => setValue(initValue);

    // Method for setting value when value has changed in input
    const attributeObj = {
        value,
        onChange: (e) => setValue(e.target.value)
    };


    // Return value and methods
    return [value, reset, attributeObj];
};

export default useInput;