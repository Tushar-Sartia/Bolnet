import { addToCart, deleteItemFromCart, getCartItems, updateItemFromCart } from "../controller/cart.controller.js"
import express from "express"
import verifyToken from "../middleware/verifyJwt.js"

export const cartRouter = express.Router()

cartRouter.get('/:userId', verifyToken, getCartItems)
cartRouter.post('/addtoCart', verifyToken, addToCart)
cartRouter.post('/deleteItemFromCart', verifyToken, deleteItemFromCart)
cartRouter.put('/updateItemFromCart', verifyToken, updateItemFromCart)