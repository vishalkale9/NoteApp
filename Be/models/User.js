import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase: true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
},{timestamps:true});


export default mongoose.model("User",userSchema);