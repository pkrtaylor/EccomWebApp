const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({

    title: {type: String, required: true, unique: true}, //unique means the same user name cannit be created again
    desc: {type: String, required: true },
    img: {type: String, required: true},
    categories: {type: Array},
    size: {type: Array },
    color: {type: Array}, //changing from String to Array since items can have more than one color
    price: {type: Number, required: true},
    inStock: {type: Boolean, default: true },
    },
    {timestamps: true}

)

module.exports = mongoose.model("Product", ProductSchema)