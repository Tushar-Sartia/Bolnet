import { makeDb } from "../db.js"
import dotenv from "dotenv"
import express from 'express'
const db = makeDb()
dotenv.config();
export const placeOrder = async (req, res) => {
    try {
        //this is inserting all orders history in a order table
        const { userId, totalPrice, shippingAddress, paymentMethod, items } = req.body;
        const orderQuery = `INSERT INTO orders (userId, totalPrice, shippingAddress, paymentMethod,orderStatus) VALUES ('${userId}','${totalPrice}','${shippingAddress}','${paymentMethod}','In-Transit')`;
        const orderResult = await db.query(orderQuery);
        const orderId = orderResult.insertId;
        // Use Promise.all to ensure all async operations complete before moving to the next step
        await Promise.all(items.map(async (item) => {
            const { productId, quantity, price, productName } = item;
            try {
                const itemQuery = `INSERT INTO order_items (orderId, productId, quantity, price,productName,subtotal) VALUES ('${orderId}','${productId}','${quantity}','${price}','${productName}',${quantity * price})`;
                await db.query(itemQuery);

                // Update product quantity in the products table
                const updateQuantityQuery = `UPDATE product SET quantity = quantity - ${quantity}, quantitySold=quantitySold + '${quantity}' WHERE id = '${productId}'`;
                await db.query(updateQuantityQuery);
            }
            catch (err) {
                console.error("error adding item to order", err);
            }
        }));

        //after successfully placing order we are emptying items from the user cart
        const emptyCartQuery = `DELETE FROM cart WHERE userId=${userId}`;
        await db.query(emptyCartQuery);
        
        return res.status(201).json({ orderId: orderId, message: `Your order has been placed, orderId=${orderId}`, status: true });
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false });
    }
};
export const getAllOrder = async (req, res) => {
    try {
        const { userId } = req.params;
        const getOrderQuery = `
        SELECT orders.orderId, 
        orders.userId, 
        orders.orderDate, 
        orders.totalPrice, 
        orders.paymentMethod, 
        orders.orderStatus, 
        orders.shippingAddress, 
        order_items.id, 
        order_items.productId, 
        order_items.price, 
        order_items.quantity AS orderedQuantity, 
        order_items.subtotal, 
        product.productName, 
        product.productImage 
 FROM orders 
 LEFT JOIN order_items ON orders.orderId = order_items.orderId 
 LEFT JOIN product ON order_items.productId = product.id 
 WHERE orders.userId = ${userId}
        `;
        const data = await db.query(getOrderQuery);

        if (data.length > 0) {
            // Grouping orders by orderId
            const groupedOrders = data.reduce((acc, order) => {
                const orderId = order.orderId;
                if (!acc[orderId]) {
                    acc[orderId] = { ...order, items: [] };
                }
                acc[orderId].items.push({
                    id: order.id,
                    image:order.productImage,
                    productName: order.productName,
                    orderedQuantity: order.orderedQuantity,
                    price: order.price,
                    subtotal: order.subtotal,
                });
                return acc;
            }, {});

            return res.status(200).json({ data: Object.values(groupedOrders), status: true });
        } else {
            return res.status(404).json({ message: "No orders found for this user.", status: false });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false });
    }
};