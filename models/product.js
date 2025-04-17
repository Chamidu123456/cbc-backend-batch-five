import mongoose from "mongoose";

const productScheme = mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true,
    },
    altNames : [
        {type : String}
    ],
    description : {
        type : String,
        required : true
    },
    images : [
        {type : String}
    ],
    labelPrice : {
        type : Number,
        required : true
    },
    Price : {
        type : Number,
        required : true
    },
    stock : {
        type : Number,
        required : true
    },
    isAvailable : {
        type : Boolean,
        required : true,
        default :true
    }

})

const Product = mongoose.model("products", productScheme)

export default Product