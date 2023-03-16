import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    spname:{type:String, required:true, trim:true},
    uname:{type:String, required:true, trim:true},
    umobile:{type:Number, required:true, trim:true},
    service:{type:String, required:true, trim:true},
    charges:{type:Number, required:true, trime:true},
    accept:{type:String, default:"pending", required:true},
    time:{type:Date, default:Date.now}
})

const bookModel = mongoose.model("booking", bookSchema)

export default bookModel