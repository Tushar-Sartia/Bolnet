import { makeDb } from "../db.js"
import dotenv from "dotenv"
import express from 'express'
const db = makeDb()
dotenv.config();

export const orderProduct = async (req, res) => {
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