import bookModel from '../models/bookschema.js'
import providerModel from '../models/providerschema.js'
import userModel from '../models/userschema.js'
import bcrypt from 'bcrypt'

class ProviderController{
    static newProvider= async (req, res)=>{
        try {
            const {name, email, mobile, place, service, password, charges}= req.body
            const hpassword = await bcrypt.hash(password, 10)
            const doc = new providerModel({
                name, email, mobile, place, service, password:hpassword, charges
            })
            const r = await doc.save()
            // console.log(r)
            res.redirect("/")
        } catch (error) {
            console.log(error)
            res.status(204).send({"status":204})
        }
    }
    static providerLogin = async (req,res )=>{
        try {
            const {email, password}= req.body
            const r = await providerModel.findOne({email})
            const mpassword = await bcrypt.compare(password, r.password)
            const kart = await bookModel.find({spname:r.name})
            if(mpassword){
                res.render("sphome.ejs", {r, kart})
            }else{
                res.send("Wrong login details")
            }
        } catch (error) {
            res.status(204).send({"status":204})
        }
    }
    static reject = async (req,res)=>{
        try {
            const {uname, spname}= req.params
            // const del = await bookModel.deleteOne({uname,spname })
            // console.log(del)
            const rej = await bookModel.findOneAndUpdate({uname, spname}, {$set:{accept:"NotAvailable"}})
            console.log(rej)
            const kart = await bookModel.find({spname})
            const r = await providerModel.findOne({name:spname})
            console.log(r)
            res.render("sphome.ejs", {r, kart})

        } catch (error) {
            res.status(204).send({"status":204})
            
        }
    }
    static accept = async (req,res)=>{
        try {
            const {uname, spname}= req.params
            // const del = await bookModel.deleteOne({uname,spname })
            // console.log(del)
            const rej = await bookModel.findOneAndUpdate({uname, spname}, {$set:{accept:"Accepted"}})
            console.log(rej)
            const kart = await bookModel.find({spname})
            const r = await providerModel.findOne({name:spname})
            res.render("sphome.ejs", {r, kart})

        } catch (error) {
            res.status(204).send({"status":204})
            
        }
    }
    static done = async (req,res)=>{
        try {
            const {uname, spname}= req.params
            const del = await bookModel.deleteOne({uname,spname })
            console.log(del)
            // const rej = await bookModel.findOneAndUpdate({uname, spname}, {$set:{accept:false}})
            // console.log(rej)
            const kart = await bookModel.find({spname})
            const r = await providerModel.findOne({name:spname})

            res.render("sphome.ejs", {r, kart})

        } catch (error) {
            res.status(204).send({"status":204})
            
        }
    }
    static spLogout = (req, res)=>{
        try {
            // res.clearCookie("user")
            res.render("index.ejs")
        } catch (error) {
            res.status(204).send({"status":204})
            
        }
    }
}

export default ProviderController