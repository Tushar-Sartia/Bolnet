import express from "express"
import verifyToken from "../middleware/verifyJwt.js"
import { orderProduct } from "../controller/order.controller.js"

export const orderRouter = express.Router()

orderRouter.get('/orderProduct', verifyToken, orderProduct)
