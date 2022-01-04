const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")



//REGISTER

router.post("/register", async (req, res) =>{

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
            ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post("/login", async (req, res) => {
    try {
        
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Invalid Credentials");
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
         
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        Originalpassword !== req.body.password && res.status(401).json("Invalid Credentials");
        
        //json webtoken
        const accessToken = jwt.sign({
            id: user._id, 
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SEC,
        {expiresIn: "1d"}
        );
        
        //even though password is encrypted we never want to return it still
        const {password, ...others } = user._doc;
        res.status(200).json({...others, accessToken});

        /*writing the "..." before others returns just the object 
        instead of " others: [ etc  ]"   */
            
        
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router