import users from './../models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const userLogin = async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(401).json({message: "Enter required fields"});
    }


    const existingUser = await users.find({email});
    if(!existingUser){
        return res.status(404).json({message : "user not found"});
    }

    const passwordValid = await bcrypt.compare(password,existingUser[0]?.password);
    if(!passwordValid){
        return res.status(403).json({message: "invalid password"});
    }

    const token = jwt.sign({
        userId : existingUser?._id
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })

    return res.status(200).json({message : "login successful",token});
}

export const userRegistration = async(req,res)=>{
    const {username,email,password, role} = req.body;

    if(!username || !email || !password){
        return res.status(401).json({message: "missing required fields"});
    }

    const checkExistingUser = await users.findOne({$or:[{
        email : email,
        username : username
    }]});


    if(checkExistingUser){
        return res.status(403).json({message : "user already exists, try logging in"});
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await users.create({
        username,
        email,
        password:hashedPass,
        role : role== undefined ? 'reader': role.toLowerCase()
    });

    console.log("new user", newUser);

    return res.status(201).json({message: "user created successfully"});
}