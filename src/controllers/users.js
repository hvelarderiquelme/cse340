import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { 
    createNewUser,
    authenticateUser
 } from '../models/users.js'

// Define validation and sanitization rules for organization form
// Define validation rules for organization form
const userValidation = [
        body('email')
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
        body('password')
        .notEmpty()
        .withMessage("Please provide a password")
        .isLength({min:8, max: 16})
        .withMessage("The password should be between 8 and 16 characters")
];

const showUserRegistrationForm = async(req,res) => {
    const title = 'Register';

    res.render('register', {title});
};

const processUserRegistrationForm = async(req,res) => {
    // Check for validation errors
        const results = validationResult(req);
        if (!results.isEmpty()) {
            // Validation failed - loop through errors
            results.array().forEach((error) => {
                req.flash('error', error.msg);
            });
    
            // Redirect back to the edit organization form
            return res.redirect('/register');
        }

    const {name, email, password } = req.body;
    try{
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password,saltRounds);
        
        await createNewUser(name, email, password_hash);

        //Success flash message
        req.flash('success', 'New user created successfully. PLease log in.');
        res. redirect('/');
    }catch (error){
        console.error('Error registering user: ', error);
        req.flash('error', "An error ocurred during registration. Please try again.");
        res.redirect('/register');
    }
};

const showLoginForm = async(req,res) => {
    const title = 'Please login.'

    res.render('login', {title});
};

const processLoginForm = async(req,res) => {
    const {email, password} = req.body;
    
    try{
        const user = await authenticateUser(email,password);
        if(user){//store info in session
            req.session.user = user;
            req.flash('success', "Login sucessfull");
            if (res.locals.NODE_ENV === 'development') {
                console.log("User logged in:", req.session.user);
            }
            res.redirect('/');
        }else{
            req.flash('error', 'Login failed');
            res.redirect('/login');
        }
    }catch (error){
        console.log("Error during login: ", error);
        req.flash('error')
    }   
};

const processLogout = async(req,res) => {
    if(req.session.user){
        delete req.session.user;
    }
    
    req.flash('success', 'You have logged out successfully.');
    res.redirect('/login');
};

export { 
    showUserRegistrationForm,
    processUserRegistrationForm,
    userValidation,
    showLoginForm,
    processLoginForm,
    processLogout
};