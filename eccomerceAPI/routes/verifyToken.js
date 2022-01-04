const jwt = require("jsonwebtoken")


const verifyToken = (req, res, next) =>{
    // a token will be sent in the header
    const authHeader = req.headers.token;

    if(authHeader) {
        const token = authHeader.split(" ")[1];
        //if there is token then we verify it, then assign user to request header  
        jwt.verify(token, process.env.JWT_SEC, (err, user) =>{
            if(err) res.status(401).json("Token is not valid!");
            //so we have re.body, req.header, and we just created a new one req.user
            req.user = user;
            next();
        })
    }else{
        //if there is no token
        return res.status(401).json("You are not authenticated!");
    }
}


const verifyTokenAndAuthorization = (req,res, next) =>{
    //verifytoken is function that will complete its function but can also take in another function
    verifyToken(req,res, ()=>{
        //
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not authorized");
        }
    })
}


const verifyTokenAndAdmin = (req,res, next) =>{
    //verifytoken is function that will complete its function but can also take in another function
    verifyToken(req,res, ()=>{
        //
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not authorized");
        }
    })
}

module.exports = { 
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin 
};

