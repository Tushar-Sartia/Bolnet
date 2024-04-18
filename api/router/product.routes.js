import express from 'express';
import verifyToken from '../middleware/verifyJwt.js';
import { upload } from '../middleware/uploads.js';
import { addProduct, getProduct, getProductDetails, getProductReview, getProductSpecification, productDetails, productReviews, productSpecification } from '../controller/product.controller.js';

export const productRouter = express.Router();
const app = express();
app.use(express.static('uploads'))
const formData = upload.single("productImage")

productRouter.get('/', verifyToken, getProduct);
productRouter.get('/getProductDetail/:productId', verifyToken, getProductDetails);
productRouter.post('/addProduct', verifyToken, formData, addProduct);
productRouter.post('/productDetails', verifyToken, productDetails);

//product specification
productRouter.get('/getProductSpecification/:productId', verifyToken, getProductSpecification);
productRouter.post('/productSpecification', verifyToken, productSpecification);

//product reviews
productRouter.get('/getProductReviews/:productId', verifyToken, getProductReview);
productRouter.post('/productReviews', verifyToken, productReviews);
productRouter.post('/productReviews', verifyToken, productReviews);

