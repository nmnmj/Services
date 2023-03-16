import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true},
    password:{type:String, required:true, trim:true},
    mobile:{type:Number, required:true, trim:true},
})

const userModel = mongoose.model("User", userSchema)

export default userModel