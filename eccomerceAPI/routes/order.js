const router = require("express").Router();
const Order = require("../models/Order");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const moment = require("moment");


router.post("/", verifyToken , async (req,res)=>{

    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err)
    }

});


router.put("/:id", verifyTokenAndAdmin , async (req,res)=>{

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id, 
        {
           $set: req.body //take everything in req.body and set it again, this way wont return updated user which is why we write {new: true}
        },
        { new: true }
        );
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }

});

router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...")
        
    } catch (err) {
        res.status(500).json(err);
    }


});


//GET USER ORDERS
router.get("find/:userId", verifyTokenAndAuthorization ,async (req,res) =>{

    try {
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})


router.get("/", verifyTokenAndAdmin, async (req, res) =>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err)
    }
})



//GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req,res) =>{
  const productId = req.query.pid;  
    
    //ex  if today is sept 1
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    //we will add one more condition if there is a productID
    try {
        const income = await Order.aggregate([
            {$match : {createdAt: { $gte: previousMonth }, ...(productId && {
                products: {$elemMatch: {productId}},
            }) } },
            {
                $project: {
                    month: { $month: "$createdAt"},
                    sales: "$amount",
                    //amount comes from the Order model
                },
               
            },
            {
                $group:{
                    _id: "$month",
                    total: { $sum: "$sales" },
                 },
            },
        ]);
    //note to self i kept getting 500 error because i didnt put $group in its own bracket
    
    res.status(200).json(income);
   } catch (err) {
        res.status(500).json(err)
    };
   });

module.exports = router