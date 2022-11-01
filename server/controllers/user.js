
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

import UserModel from '../models/user.js'
;


const secret = process.env.SECRET;


export const signin=async(req,res)=>{

    const {email,password}=req.body;

    try {
        const existingUser=await UserModel.findOne({email});

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token=jwt.sign({email:existingUser.email,id:existingUser._id},secret,{expiresIn: "2h" });

        res.status(200).json({ result: existingUser, token });
        
    } catch (error) {
         res.status(500).json({ message: "Something went wrong" });
    }

};

export const signup=async(req,res)=>{

};