import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function getProducts(req,res){

    try{
        const products = await Product.find()
        res.json(products)       
    }catch(err){
        res.json({
            message : "Failed to get products",
            error: err        
        })
    }
}

export function saveProduct(req,res){

    if(!isAdmin(req)){
        res.status(403).json({
            message : "You are not authorized to add a product"
        })
        return
    };
    const product = new Product(
        req.body
    )

    product
        .save()
        .then(() => {
            res.json({
                message : "Product added succesfully",
            })
        })
        .catch(()=>{
            res.status(500).json({
                message : "Failed to added products"
            })
        }
    )
}

