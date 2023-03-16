import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true},
    place:{type:String, required:true, trim:true},
    mobile:{type:Number, required:true, trim:true},
    service:{type:String, required:true, trim:true},
    password:{type:String, required:true, trim:true},
    charges:{type:Number, required:true, trim:true}
})

const providerModel = mongoose.model("ServiceProvider", providerSchema)

export default providerModel