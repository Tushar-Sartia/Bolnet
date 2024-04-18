import express from "express";
// import multer from "multer";
import dotenv from "dotenv";
import { makeDb } from "./db.js";
import { userRouter } from "./router/User.routes.js";
import { productRouter } from "./router/product.routes.js";
import { cartRouter } from "./router/cart.router.js";
import { orderRouter } from "./router/order.Route.js";
// import { userRouter } from "./router/User.routes.js";
// import { productRouter } from "./router/Product.routes.js";
// import { cartRouter } from "./router/Cart.router.js";
// import { categoryRoute } from "./router/category.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(express.static('uploads'))
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
