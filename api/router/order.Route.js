import express from "express"
import verifyToken from "../middleware/verifyJwt.js"
import { getAllOrder, placeOrder } from "../controller/order.controller.js"

export const orderRouter = express.Router()
orderRouter.post('/placeOrder', verifyToken, placeOrder)
orderRouter.get('/getAllOrder/:userId', verifyToken, getAllOrder)
