// Validates username - Must start with letter, contain another 3 to 23 letters, numbers, hiphens or underscores
const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

// Method for validating a username passes regex test and adding result to state
export const validateUsername = (username, setValidUsername) => {
    setValidUsername(USERNAME_REGEX.test(username));
};

// Validates standard email address
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Method for validating an email address passes regex test and adding result to state
export const validateEmail = (email, setValidEmail) => {
    setValidEmail(EMAIL_REGEX.test(email));
};

// Validates password - must contain atleast 1 uppercase letter, lowercase letter, number and special character, and be between 8 and 24 characters
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// Method for validating an email address passes regex test and password confirmation matches
export const validatePassword = (password, setValidPassword, passwordMatch, setValidPasswordMatch) => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidPasswordMatch(password === passwordMatch);
};