const router = require('express').Router();
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {registerValidation, loginValidation} from '../validation.js';



router.post('/register', async (req, res) =>{   // response gotten from the user can be validated

// Validate the data before a user is created
    const {error} = registerValidation(req.body)
    
    if(error) return res.status(400).send(error.details[0].message)

    //checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');

    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //create a new user
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        // res.send(savedUser); sends all the info of the saved user
        res.send({user: user._id})
    }catch (err){
        res.status(400).send(err);
    }
    });


//LOGIN
router.post('/login', async (req, res) =>{
    const {error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

        //checking if the Email exist
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send('Email  is not found');

        //password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid password')

        //create and assign a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);

        



});


export default router;
