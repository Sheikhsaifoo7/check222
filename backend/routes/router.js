const express=require("express");
const router=new express.Router();
const userdb=require("../models/UserSchema");
const bcrypt=require("bcryptjs")
const authenticate=require("../middlewares/authenticate")

router.post("/register", async (req,res) => {
        // console.log(req.body)
        const {name,email,password,cpassword}=req.body;
        if(!name || !email || !password || !cpassword){
                res.status(422).json({error:"Fill All Field"})
        }
        try {
                const preUser=await userdb.findOne({email:email})
                if(preUser){
                        res.status(422).json({error:"Email Already Exist!"})
                }
                else if(password !== cpassword){
                        res.status(422).json({error:"Password and Confirm Password is not match"})
                }
                else{
                        const finalUser= new userdb({name,email,password,cpassword})
                        const storeData=await finalUser.save();
                        res.status(201).json({ status:201 });
                }
        } catch (error) {
                console.error("Error in backend:", error);
                res.status(500).json({ error: "Internal Server Error" });
        }
})


router.post("/login",async (req,res)=>{
        // console.log(req.body);
        const {email,password}=req.body;
        if(!email || !password){
                res.status(422).json({error:"fill all field"})
        }
        try {
                const userValid= await userdb.findOne({email:email})
                if(userValid){
                        const isMatch= await bcrypt.compare(password,userValid.password)
                        if(!isMatch){
                                res.status(422).json({error:"invalid password in login"})
                        }
                        else{
                                const token=await userValid.generateAuthtoken();
                                // console.log(token);
                               const check= res.cookie("usercookie",token,{
                                        expires:new Date(Date.now()+9000000),
                                        httpOnly:true
                                });
                                console.log(check)
                                const result={
                                        userValid,
                                        token
                                }
                                res.status(201).json({status:201,result})
                        }
                }
        } catch (error) {
                
        }
} )

router.get("/validuser",authenticate,async(req,res)=>{
try {
        const validUserOne=await userdb.findOne({_id:req.userId});
        res.status(201).json({status:201,validUserOne})

} catch (error) {
    res.status(401).json({status:401,error})    
}
})

router.get("/logout",authenticate,async(req,res)=>{
        try {
            req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
                return curelem.token !== req.token
            });
    
            res.clearCookie("usercookie",{path:"/"});
    
            req.rootUser.save();
    
            res.status(201).json({status:201})
    
        } catch (error) {
            res.status(401).json({status:401,error})
        }
    })

module.exports=router;