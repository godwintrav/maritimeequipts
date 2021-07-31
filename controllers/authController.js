const User = require('../models/User');
const jwt = require('jsonwebtoken');
const errorController = require('./errorController');

const maxAge = 365 * 24 * 60 * 60;

//Create JWT
const createToken = (id, scopes) => {
    const payload = {
        id: id,
        scopes: scopes
    }
    return jwt.sign( payload, process.env.SECRET_CODE, { expiresIn: maxAge });
}

module.exports.signup_post = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;  
    let token_name = "user_token";
    let username = firstName + " " + lastName;

    try{
        let user = await User.create({firstName, lastName, email, password});
        const token = createToken(user._id, ["user"]);
        //console.log(user._id);
        //remember to add secure when in production
        res.cookie(token_name, token, { httpOnly: true, maxAge: maxAge * 1000, secure: true});
        res.cookie("username", username, { httpOnly: true, overwrite: true, maxAge: maxAge * 1000, secure: true});
        res.status(201).json({ user: user._id, token: token });
    }catch(err){
        console.log(err);
        const errors = errorController.handleAuthErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    let token_name = "user_token";

    try{
        const user = await User.login(email, password);
        let username = user.firstName + " " + user.lastName;
        const token = createToken(user._id, ["user"]);
        //remember to add secure when in production
        res.cookie(token_name, token, { httpOnly: true, maxAge: maxAge * 1000, secure: true});
        res.cookie("username", username, { httpOnly: true, overwrite: true, maxAge: maxAge * 1000, secure: true});
        res.status(200).json({ user: user._id, token: token });
    }catch(err){
        console.log(err);
        const errors = errorController.handleAuthErrors(err);
        res.status(400).json({ errors });
    }
}