import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from 'bcrypt'

// ------------------------for craete user----------------------
export const createUser = async(req, res) => {
    const{name, dob, email, password} = req.body;
   console.log("Incoming Request",req.body);
    try{
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({
                message: "User Already Exist With This Email"
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, dob, email, 
            password : hashedPassword,
        });
        const token = jwt.sign(
            {id: user._id},
             process.env.JWT_SECRET,
             { expiresIn: process.env.JWT_EXPIRES });
       return res.status(201).json({ accessToken: token});

    } catch( error){
        console.error(" error:", error);
    
        res.status(500).json({
            message:'Internal Server Error!'
        });
    }
};


// ------------------------get user----------------------
export const getUser= async(req, res) =>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }
    catch(error){
        res.status(500).json({
            message:" Internal Server Error!"
        });
    }
    };


// ------------------------get user by id----------------------
 export const getUserById= async(req, res) =>{
    const{ user_id } = req.query;
       try{
        const user = await User.findById(user_id).select("-password");
        if(!user) {
            retuen.res.status(404).json({
                message:'User Not Found!'
            });
        }
        res.json(user);
       }
       catch(error){
        res.status(500).json({
            message:'Internal Server Error!'
        });
       }
    };


// ------------------------get all user----------------------
    export const getAllUsers = async(req, res)=>{
        try{
            const users = await User.find().select("-password");
            res.json(users);
        }catch(error){
            res.status(500).json({
                message:'Internal Server Error!'
            });
        }
    };
 
  
    
 // ------------------------delete user by id----------------------   
 export const deleteUserById = async(req, res) =>{
    const { user_id } = req.query;
    try{
        await User.findByIdAndDelete(user_id);
        res.json({
            message:'User Deleted Successfully!'
        });
    }catch(error){
        res.status(500).json({
            message:'Internal Server Error!'
        });
    }
 };