import bookModel from "../models/bookschema.js"
import providerModel from "../models/providerschema.js"
import userModel from "../models/userschema.js"
import bcrypt from 'bcrypt'

class UserController{
    static newUser=async (req, res)=>{
        const {name, email, mobile, password}= req.body
        const hpassword = await bcrypt.hash(password, 10)
        try {
            const doc = new userModel({
                name, email, mobile, password:hpassword
            })
            const r = await doc.save()
            res.redirect("/")
        } catch (error) {
            res.status(204).send({"status":"error"})
        }

    }
    static userLogin = async (req,res )=>{
        try {
            const {email, password}= req.body
            const u = await userModel.findOne({email})
            const mpassword = await bcrypt.compare(password, u.password)
            if(mpassword){
                const sd = await providerModel.find()
                const ssd= sd
                await res.cookie("user",u.name)
                const kart = await bookModel.find({uname:u.name})

                res.render("uhome.ejs", {u, sd, ssd, kart})
                // console.log(sd)
            }else{
                res.send("Wrong login details")
            }
        } catch (error) {
            res.status(204).send({"status":204})
        }
    }
    static getspbyState = async (req, res)=>{
        try {
            const {state}= req.params
            let ssd=''
            if(state=='all'){
                ssd = await providerModel.find()
            }else{
                ssd = await providerModel.find({place:state})
            }
            
            const u = await userModel.findOne({name:req.cookies.user})
            const sd = await providerModel.find()
            const kart = await bookModel.find({uname:req.cookies.user})
            
            res.render("uhome.ejs",{ssd, u, sd, kart})
            // res.send(sd)
        } catch (error) {
            res.status(204).send({"status":204})
        }
    }
    static getspbyService = async (req, res)=>{
        try {
            const {service}= req.params
            let ssd=''
            if(service=='all'){
                ssd = await providerModel.find()
            }else{
                ssd = await providerModel.find({service: {'$regex' : service, '$options' : 'i'}})
            }
            
            const u = await userModel.findOne({name:req.cookies.user})
            const sd = await providerModel.find()
            const kart = await bookModel.find({uname:req.cookies.user})
            
            res.render("uhome.ejs",{ssd, u, sd, kart})
            // res.send(sd)
        } catch (error) {
            res.status(204).send({"status":204})
        }
    }
   
    static userLogout = (req, res)=>{
        try {
            res.clearCookie("user")
            res.render("index.ejs")
        } catch (error) {
            res.status(204).send({"status":204})
            
        }
    }

    static bookService = async (req, res)=>{
        try {
            const {spname, uname, umobile, service, charges, time}= req.params
            console.log(spname, uname, umobile)
            const chk = await bookModel.findOne({spname, uname})
            console.log(chk)
            if(chk!=null){
                return
            }
            const doc = new bookModel({
                spname, uname, umobile, service, charges, time
            })
            const r = await doc.save()
            // res.send(r)
            // console.log(r)
            const u = await userModel.findOne({name:req.cookies.user})
            const ssd = await providerModel.find()
            const sd = await providerModel.find()
            const kart = await bookModel.find({uname:req.cookies.user})
            res.render("uhome.ejs",{ssd, u, sd, kart})
        } catch (error) {
            res.status(204).send({"status":204})
            
        }
    }
}

export default UserController