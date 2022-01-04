const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

router.put("/:id", verifyTokenAndAuthorization, async (req,res) =>{

    //if user changed their password
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
        req.params.id, 
        {
           $set: req.body //take everything in req.body and set it again, this way wont return updated user which is why we write {new: true}
        },
        { new: true }
        );
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }

    


})


//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...")
        
    } catch (err) {
        res.status(500).json(err);
    }


});

//GET USER

router.get("find/:id", verifyTokenAndAdmin, async (req,res) =>{

    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL USERS

router.get("/", verifyTokenAndAdmin, async (req,res) =>{

    const query = req.query.new;


    try {
        /*if there is a query in our header we either output
        the latest 5 sign ups 
        else there is no query so we just output them all
        if we didnt include the {_id: -1} in sort itd return the first 5 not latest   */
        const users = query 
            ? await User.find().sort({_id: -1}).limit(5) 
            : await User.find();
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET STATS returns total number of users per month
router.get("/stats", verifyTokenAndAdmin, async (req, res)=>{
    
    
    
    const date = new Date(); // creates the current date
    const lastYear =new Date(date.setFullYear(date.getFullYear() - 1)); //returns the year before of the date 

    /* we can group items by using mongodb aggragte

    match is the condition, which is user must have been created greater than last year
    meaning their account must be under a year old.

    then we want to take month number
    we use project keyword 
    inside project month is a property which will we set to the month number the user was created
    " $month: "createdAt" " takes the month of the date a user acount was creatd at 
    after project we want to group out items 
    using the "$group" keyword 
    the new object being sent will have id of the months so 1-12
    and the total sum of each

     */
    try {

        const data = await User.aggregate([
            { $match: {createdAt : {$gte: lastYear } } },
            {
                $project:{
                    month: { $month:"$createdAt"},
                },
            },
            {
                $group:{
                    _id:"$month",
                    total: { $sum: 1 }
                },
            },
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err)
    }

    //not to self, i was getting an error here at first because i had "/:id instead of "/find/:id" why? find out
});


module.exports = router