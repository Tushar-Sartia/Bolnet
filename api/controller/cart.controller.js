import { makeDb } from "../db.js"
import dotenv from "dotenv"
import express from 'express'
const db = makeDb()
dotenv.config();

//get cart item
export const getCartItems = async (req, res) => {
    try {
        const { userId } = req.params
        const addTocartQuery = `SELECT cart.created_at, cart.id,cart.productId,cart.quantity,pr.productName,pr.productImage,pr.price,pr.oldPrice,pr.discount,pr.discountType,pr.quantity AS totalQuantity FROM cart 
        LEFT JOIN product AS pr ON cart.productId=pr.id  
        WHERE userId='${userId}'
        ORDER BY cart.created_at DESC 
        `
        const results = await db.query(addTocartQuery)
        if (results.length > 0) {
            const totalQtyQuery = `SELECT 
            SUM(quantity) AS totalItems
            FROM cart WHERE userId = '${userId}'`
            const totalQtyResult = await db.query(totalQtyQuery);

            const totalPriceQuery = `SELECT SUM(cart.quantity * pr.price) AS totalPrice FROM cart
             LEFT JOIN product AS pr ON cart.productId = pr.id WHERE userId = '${userId}'`
            const totalPriceResult = await db.query(totalPriceQuery);
            const totalItems = totalQtyResult[0].totalItems;
            const totalPrice = totalPriceResult[0].totalPrice;
            return res.status(200).json({
                data: results,
                totalItems: totalItems,
                totalPrice: totalPrice,
                status: true
            });
        } else {
            return res.status(404).json({ message: "No Item Found !!", status: false })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })

    }
}
//Adding item in cart
export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body
        const addTocartQuery = `INSERT INTO cart(userId,productId,quantity,created_by)
        VALUES('${userId}','${productId}','${quantity}','${userId}')`
        const results = await db.query(addTocartQuery)
        if (results) {
            return res.status(200).json({ message: "Product added to cart successfully", status: true })
        } else {
            return res.status(404).json({ message: "Can't be added right now !!", status: false })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })

    }
}
//Remove item from cart
export const deleteItemFromCart = async (req, res) => {
    try {
        const { userId, productId, orderId } = req.body
        const deleteItemFromcartQuery = `DELETE FROM cart WHERE userId=${userId} AND productId=${productId} AND id='${orderId}'`
        const results = await db.query(deleteItemFromcartQuery)
        if (results) {
            return res.status(200).json({ message: "Product product removed successfully", status: true })
        } else {
            return res.status(404).json({ message: "Can't be removed right now !!", status: false })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })

    }
}
//update Item from Cart
export const updateItemFromCart = async (req, res) => {
    try {
        const { userId, productId, quantity, id } = req.body
        const updateItemFromcartQuery = `UPDATE cart SET quantity=${quantity} WHERE userId=${userId} AND productId=${productId}`
        const results = await db.query(updateItemFromcartQuery)
        if (results) {
            return res.status(200).json({ message: "Product product updated successfully", status: true })
        } else {
            return res.status(404).json({ message: "cannot be updated right now !!", status: false })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })

    }
}