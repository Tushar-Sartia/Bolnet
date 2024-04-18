import express from 'express';
import { createUser, getAllUser, userLogin, changePassword, updateProfile, nomineeUpdate, getNominee, addBankDetails, getBankDetails } from '../controller/user.controller.js';
import multer from 'multer';
import verifyToken from '../middleware/verifyJwt.js';
import { upload } from '../middleware/uploads.js';

export const userRouter = express.Router();
const formData = upload.single("image")
const nominee = upload.single("nominee_image")

const app = express();

app.use(express.static('uploads'))

userRouter.get('/', getAllUser);
userRouter.post('/createUser', formData, createUser);
userRouter.post('/userLogin', userLogin)
userRouter.post('/changePassword', verifyToken, changePassword);
userRouter.post('/updateProfile', verifyToken, formData, updateProfile);
userRouter.post('/nomineeUpdate', verifyToken, nominee, nomineeUpdate);
userRouter.get('/getNominee/:Id', verifyToken, getNominee);
userRouter.post('/addBankDetails',verifyToken, addBankDetails);
userRouter.post('/getBankDetails',verifyToken, getBankDetails);



// userRouter.delete('/deleteUser/:id', deleteUser);

// /* THIS IS WITHOUT TOKEN VERIFICATION*/
// userRouter.post('/registerUser', registerUser);
// userRouter.post('/loginUser', loginUser)
// export { userRouter };
