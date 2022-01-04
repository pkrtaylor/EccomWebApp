const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");


//CREATE

router.post("/", verifyTokenAndAdmin , async (req,res)=>{

    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err)
    }

})


router.put("/:id", verifyTokenAndAdmin , async (req,res)=>{

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id, 
        {
           $set: req.body //take everything in req.body and set it again, this way wont return updated user which is why we write {new: true}
        },
        { new: true }
        );
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err)
    }

})


//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...")
        
    } catch (err) {
        res.status(500).json(err);
    }


});


//GET PRODUCT
//no middleware needed since users and admin can access the product for viewing
router.get("/find/:id", async (req,res) =>{

    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
})



//GET ALL PRODUCTS

router.get("/", async (req,res) =>{

    const qNew = req.query.new;
    const qCategory = req.query.category;


    try {
        let products;
        //qNew gives the latest products
        if(qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(5);

        } else if(qCategory) { // qCategory gives the filtered products
            products = await Product.find({
                //if the qCategory is inside the category array then we hash out the products
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await Product.find();
        }


        res.status(200).json(products);
         
        
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router