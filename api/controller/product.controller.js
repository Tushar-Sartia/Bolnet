import express from "express"
import { makeDb } from "../db.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const db = makeDb();
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static('uploads'))
const updatedAt = new Date();
export const router = express.Router();
//used for getting all the products
export const getProduct = async (req, res) => {
    try {
        const getProductQuery = `SELECT * FROM product`
        const results = await db.query(getProductQuery)
        if (results) {
            return res.status(200).json({ data: results, status: true })
        }
        else {
            return res.status(404).json({ message: "error while adding ", status: false })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message, status: false })
    }
}

//used for getting the product details 
export const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.params
        const getProductQuery = `SELECT *,product_details.* FROM product 
        LEFT JOIN product_details ON product.id=product_details.productId
        WHERE product.id=${productId}`
        const results = await db.query(getProductQuery)
        if (results.length > 0) {
            return res.status(200).json({ data: results, status: true })
        }
        else {
            return res.status(404).json({ message: 'error', status: false })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })
    }
}
//used for adding new products 
export const addProduct = async (req, res) => {
    try {
        const { filename } = req.file
        const { id, productName, price, oldPrice, discount, quantity } = req.body
        const addProductQuery = `INSERT INTO product (productName,productImage,price,oldPrice,discount,quantity,created_by) VALUES('${productName}','${filename}','${price}','${oldPrice}','${discount}','${quantity}','${id}')`
        const results = await db.query(addProductQuery)
        if (results.affectedRows > 0) {
            return res.status(200).json({ message: "Product Added Successfully", status: true })
        }
        else {
            return res.status(500).json({ message: "Product cannot be Added", status: false })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })
    }
}
//used for adding product details by productId 
export const productDetails = async (req, res) => {
    try {
        const { productId, details, warrantyUpto, freeDelivery, replacementUpto, features } = req.body
        const addProductDetailQuery = `INSERT INTO product_details (productId, details, warrantyUpto, freeDelivery, replacementUpto, features ) VALUES ('${productId}','${details}','${warrantyUpto}','${freeDelivery}',
        '${replacementUpto}','${features}')`
        const result = await db.query(addProductDetailQuery)
        if (result.affectedRows > 0)
            return res.status(200).json({ message: "added successfully", status: true })
        else {
            return res.status(500).json({ message: "can't be added", status: false })

        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })
    }
}

//used for gettting product Specification by productId 
export const getProductSpecification = async (req, res) => {
    try {
        const { productId } = req.params
        const getProductQuery = `SELECT * FROM product_specification
        WHERE productId=${productId}`
        const results = await db.query(getProductQuery)
        if (results.length > 0) {
            return res.status(200).json({ data: results, status: true })
        }
        else {
            return res.status(404).json({ message: 'error', status: false })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })
    }
}
//used for adding product specifications by productId 
export const productSpecification = async (req, res) => {
    try {
        const { userId, productId, productDimensions, color, finishType } = req.body
        const data = await db.query(`SELECT * FROM product_specification WHERE productId='${productId}'`)
        if (data.length > 0) {
            return res.status(404).json({ message: 'This Product is already having specifications', status: false })
        }
        else {
            const addProductDetailQuery = `INSERT INTO product_specification (productId, productDimensions, color, finishType ,created_by) VALUES ('${productId}','${productDimensions}','${color}','${finishType}','${userId}')`
            const result = await db.query(addProductDetailQuery)
            if (result.affectedRows > 0)
                return res.status(200).json({ message: "product Specification added successfully", status: true })
            else {
                return res.status(404).json({ message: "product Specification can't be added", status: false })
            }
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })
    }
}
//used for adding product specifications by productId 
export const productReviews = async (req, res) => {
    try {
        const { userId, productId, rating, reviews } = req.body
        const data = await db.query(`SELECT * FROM product_reviews WHERE userId='${userId}'AND productId='${productId}'`)
        if (data.length > 0) {
            return res.status(404).json({ message: 'You have already made a review for this product', status: false })
        }
        else {
            const addProductReviewQuery = `INSERT INTO product_reviews (userId, productId, rating,reviews) VALUES ('${userId}','${productId}','${rating}','${reviews}')`
            const result = await db.query(addProductReviewQuery)
            if (result.affectedRows > 0)
                return res.status(200).json({ message: "product reviews added successfully", status: true })
            else {
                return res.status(500).json({ message: "please try again later", status: false })
            }
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })
    }
}
export const getProductReview = async (req, res) => {
    try {
        const { productId } = req.params
        const getProductQuery = `SELECT product_reviews.*,users.image,users.name 
        FROM product_reviews
        LEFT JOIN users ON product_reviews.userId=users.id
        WHERE productId=${productId}`
        const results = await db.query(getProductQuery)
        if (results.length > 0) {
            return res.status(200).json({ data: results, status: true })
        }
        else {
            return res.status(404).json({ message: 'error', status: false })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })
    }
}
export const addPopularProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const getProductQuery = `SELECT product_reviews.*,users.image,users.name 
        FROM product_reviews
        LEFT JOIN users ON product_reviews.userId=users.id
        WHERE productId=${productId}`
        const results = await db.query(getProductQuery)
        if (results.length > 0) {
            return res.status(200).json({ data: results, status: true })
        }
        else {
            return res.status(404).json({ message: 'error', status: false })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })
    }
}
