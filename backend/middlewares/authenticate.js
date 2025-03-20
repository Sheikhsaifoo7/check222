const jwt=require('jsonwebtoken');
const userdb=require("../models/UserSchema");
const keysecret = "saifsaifsaifsaifsaif"

const authenticate = async(req,res,next)=>{
        try {
            const token=req.headers.authorization;
            
            const verifytoken=jwt.verify(token,keysecret)
            const rootUser=await userdb.findOne({_id:verifytoken._id})
            
            // console.log(rootUser);
            if(!rootUser){throw new Error("user not found")}
            res.token=token;
            res.rootUser=rootUser;
            req.userId=rootUser._id;

            next();
        } catch (error) {
                res.status(401).json({status:401,message:"Unauthorizated no token provide"})
        }
}

module.exports=authenticate



// const jwt = require("jsonwebtoken");
// const keysecret = "saifsaifsaifsaifsaif";

// const authenticate = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         console.log("Authorization Header:", authHeader);

//         if (!authHeader) {
//             return res.status(401).json({ message: "No token provided" });
//         }

//         const token = authHeader.split(" ")[1];
//         if (!token) {
//             return res.status(401).json({ message: "Invalid token format" });
//         }

//         const verifytoken = jwt.verify(token, keysecret);
//         console.log("Verified Token:", verifytoken);

//         next(); // Pass control to the next middleware
//     } catch (error) {
//         console.error("JWT Verification Error:", error.message);
//         return res.status(401).json({ message: "Unauthorized" });
//     }
// };

// module.exports = authenticate;
