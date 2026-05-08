import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//signup ,register the new user
export const register = async (req,res)=>{
  try {
    const {email,password} = req.body 
    const existingUser = await User.findOne({email});
    if (existingUser) 
    {
      return res.status(400).json({message:"User already exists "});
    }   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({email,password:hashedPassword});

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn: "1h"
    });

    res.status(201).json({message:"Registration successful",token,user});
  } catch(error)
   {
    res.status(500).json({message:error.message});
   }
};

//login user
export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
          return res.status(400).json({message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h"
        });
        res.status(200).json({message:"Login successful!",token,user});
    } catch (error) {
        res.status(500).json({message:error.message});
    }   
};  
