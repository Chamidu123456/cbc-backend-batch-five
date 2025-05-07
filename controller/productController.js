import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function getProducts(req,res){

    try{
        if(isAdmin(req)){
            const products = await Product.find()
            res.json(products)       
        }else{
            const products = await Product.find({isAvailable : true})
            res.json(products)  
        }
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

export async function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "You are not authorized to delete a product"
        })
        return
    }
    try{
        await Product.deleteOne({productId: req.params.productId})

        res.json({
            message : "Product deleted successfully"
        })
    }catch(err){
        res.status(500).json({
            message : "Failed to delete a product",
            error: err
        })
    }    
}

export async function  updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "You are not authorized to update a product"
        })
        return
    }
    const product = req.params.productId
    const updatingData = req.body

    try{
        await Product.updateOne(
            {productId: product},
            updatingData
        )
        res.json({
            message : "Product updated successfully"
        })

    }catch(err){
        res.status(500).json({
            message : "Internal server error",
            error: err
        })
    }
}    

export async function getProductById(req,res){
    const productId = req.params.productId
    
    try{
        const product = await Product.findOne(
            {productId: productId}
        )
        if(product == null){
            res.status(404).json({
                message : "Product not found"
            }) 
            return 
        }
        if(product.isAvailable){
            res.json(product)
        }else{
            if(!isAdmin(req)){
                res.status(403).json({
                    message : "Product not found"
                })
                return
            }else{
                res.json(product)
            }
        }

    }catch{
        res.status(500).json({
            message : "Internal server error",
            error: err
        })
    }
}       