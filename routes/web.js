import express from 'express'
import ProviderController from '../controller/Provider.js'
import UserController from '../controller/User.js'
const router = express.Router()

router.get("/", (req, res)=>{
    res.render("index.ejs")
})
router.get("/providerregister.ejs", (req, res)=>{
    res.render("providerregister.ejs")
})
router.get("/userregister.ejs", (req, res)=>{
    res.render("userregister.ejs")
})
router.post("/registersp", ProviderController.newProvider )
router.post("/providerlogin", ProviderController.providerLogin )
router.get("/reject/:uname/:spname", ProviderController.reject )
router.get("/done/:uname/:spname", ProviderController.done )
router.get("/accept/:uname/:spname", ProviderController.accept )
router.get("/logoutsp",ProviderController.spLogout)


router.post("/registeruser", UserController.newUser)
router.post("/userlogin", UserController.userLogin)
router.get("/getspbystate/:state", UserController.getspbyState)
router.get("/getspbyservice/:service", UserController.getspbyService)
router.get("/logout",UserController.userLogout)
router.get("/book/:spname/:uname/:umobile/:service/:charges",UserController.bookService)
// router.post("/getspbystate/:state", UserController.getspbyState)


export default router