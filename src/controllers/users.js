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
        // .isLength({min:8, max: 16})
        // .withMessage("The password should be between 8 and 16 characters")
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
    const title = 'Login.'

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
            res.redirect('/dashboard');
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

const requiredLogin = async(req, res, next) => {
    if(!req.session || !req.session.user) {
        req.flash('error', 'It is required that you login to access this page.');
        return res.redirect('/login');
    }else{
        next();
    }
};

const showDashboard = async(req,res) => {
    const user = req.session.user;
    res.render('dashboard', {title: 'Dashboard', email: user.email});
};

/**
 * Middleware factory to require specific role for route access
 * Returns middleware that checks if user has the required role
 * 
 * @param {string} role - The role name required (e.g., 'admin', 'user')
 * @returns {Function} Express middleware function
 */
const requireRole = (role) => {
    return (req, res, next) => {
        // Check if user is logged in first
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }

        // Check if user's role matches the required role
        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/');
        }

        // User has required role, continue
        next();
    };
};

export { 
    showUserRegistrationForm,
    processUserRegistrationForm,
    userValidation,
    showLoginForm,
    processLoginForm,
    processLogout,
    requiredLogin,
    showDashboard,
    requireRole
};