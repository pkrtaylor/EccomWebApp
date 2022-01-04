const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Cart = require("../models/Cart")
const router = require("express").Router();

//we verifyToken since any user and create cart but must be a user 
router.post("/", verifyToken , async (req,res)=>{

    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err)
    }

});

router.put("/:id", verifyTokenAndAuthorization , async (req,res)=>{

    try {
        const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id, 
        {
           $set: req.body //take everything in req.body and set it again, this way wont return updated user which is why we write {new: true}
        },
        { new: true }
        );
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }

});

router.delete("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been removed from cart...")
        
    } catch (err) {
        res.status(500).json(err);
    }


});

//GET USER CART
router.get("find/:userId", verifyTokenAndAuthorization ,async (req,res) =>{

    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL PRODUCTS
//only admin can access this since we will get all carts of all users


router.get("/", verifyTokenAndAdmin, async (req, res) =>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router