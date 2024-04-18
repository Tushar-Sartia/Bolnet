import express from "express"
import { makeDb } from "../db.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const db = makeDb();
dotenv.config();
const app = express();
app.use(express.static('uploads'))
app.use(express.json());
const updatedAt = new Date();
export const router = express.Router();

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, mobile, password, country, state, city } = req.body;

        if (!name || !email || !mobile || !password || !country || !state || !city) {
            return res.status(400).json({ status: false, message: 'All fields are required' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const createUserQuery = `INSERT INTO users (name,email,mobile,password,country,state,city) VALUES ('${name}','${email}','${mobile}','${hashedPassword}','${country}','${state}','${city}')`;
        const values = [name, email, mobile, hashedPassword, country, state, city];
        const rows = await db.query(createUserQuery, values);
        console.log(rows)
        if (rows.affectedRows > 0) {
            res.status(200).json({ message: 'User successfully registered', status: true });
        } else {
            res.status(500).json({ status: false, message: 'Error in user registration' });
        }
    } catch (error) {
        console.error("Error Registering User:", error.message);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};
// Get all users
export const getAllUser = async (req, res) => {
    const getUserQuery = 'SELECT * FROM users';
    const data = await db.query(getUserQuery)
    if (data) {
        res.status(200).send({ data: data, status: true });
    }
    else {
        res.status(500).send('Error retrieving users');
    }
};
//User Login 
export const userLogin = async (req, res) => {
    try {
        const { password, mobile } = req.body
        const loginUserQuery = `SELECT * FROM users WHERE mobile='${mobile}'`;
        const data = await db.query(loginUserQuery)
        if (data.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = data[0];
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (passwordIsValid) {
            const token = jwt.sign(
                { userId: user.id, mobile: user.mobile },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '30d' }
            );
            console.log(token)
            return res.status(200).send({ data: data[0], token: token, status: true });
        }
        else {
            return res.status(401).send({ message: 'Invalid password', status: false });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message, status: false });
    }
};
// Get a single user by ID
router.get('/users/:id', (req, res) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving user');
        } else {
            res.status(200).json(result[0]);
        }
    });
});

// Update a user
export const changePassword = async (req, res) => {
    try {
        const { id, password } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const updatePassQuery = `UPDATE users SET Password = '${hashedPassword}' WHERE id = '${id}'`;
        const data = await db.query(updatePassQuery)
        if (data) {
            return res.status(200).json({ message: 'password Changed successfully', status: true })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })

    }
};
// update user Profile
export const updateProfile = async (req, res) => {
    try {
        const { filename, path } = req.file
        const { id, name, email, address, mobile, country, state, city, pincode } = req.body;
        const updatePassQuery = `UPDATE users SET name='${name}',email='${email}',image='${filename}',mobile='${mobile}',address='${address}',country='${country}',state='${state}',city='${city}',pincode=${pincode} ,updated_by='${id}',updated_at='${updatedAt.toISOString()}' WHERE id = '${id}'`;
        const data = await db.query(updatePassQuery)

        if (data) {
            const loginUserQuery = `SELECT * FROM users WHERE mobile='${mobile}'`;
            const newData = await db.query(loginUserQuery)
            // return console.log(newData[0])
            return res.status(200).json({ message: 'Profile Updated Successfully', status: true, data: newData[0] })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })
    }
};
// Delete a user
router.delete('/users/:id', (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting user');
        } else {
            res.status(200).send('User deleted');
        }
    });
});
// Update Nominee of user
export const nomineeUpdate = async (req, res) => {
    try {
        const { created_by, nominee } = req.body
        const { filename } = req.file
        //checking if the user is already present , if yes then update that ,if no then create new 
        const updateNomineeQuery = `UPDATE nominee SET nominee='${nominee}', nominee_image='${filename}',updated_by='${created_by}', created_by='${created_by}',updated_at='${updatedAt.toISOString()}' WHERE created_by='${created_by}'`
        const data = await db.query(updateNomineeQuery)
        if (data?.changedRows == 0) {
            const createNomineeQuery = `INSERT INTO nominee (nominee,nominee_image,created_by,created_at)
            VALUES ('${nominee}','${filename}','${created_by}','${updatedAt.toISOString()}')`
            const data = await db.query(createNomineeQuery)
            if (data.changedRows > 0) {
                return res.status(200).json({ message: 'Nominee Created Successfully', status: true })
            }
            else {
                return res.status(404).json({ message: 'Error While creating Nominee', status: false })
            }
        }
        else {
            return res.status(200).json({ message: 'Nominee Updated Successfully', status: true })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message, status: false })
    }
};
// Get Nominee of user
export const getNominee = async (req, res) => {
    try {
        const { Id } = req.params;
        const getNomnieeQuery = `SELECT nominee,nominee_image FROM nominee WHERE created_by=${Id}`
        const data = await db.query(getNomnieeQuery)
        if (data) {
            return res.status(200).json({ data: data, status: true })
        }
        else {
            return res.status(404).json({ message: 'Nominee Not Found', status: false })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false })

    }
}
// Add Bank Details of user
export const addBankDetails = async (req, res) => {
    try {
        const { userId, bankName, userName, ifscCode, accountNumber } = req.body;
        const selectQuery = await db.query(`select * from bankdetails where accountNumber = '${accountNumber}' AND userId ='${userId}'`);
        if (selectQuery.length > 0) {
            const updateBankDetails = `UPDATE bankdetails 
            SET bankName='${userId}', userName='${userName}',bankName='${bankName}', ifscCode='${ifscCode}', accountNumber='${accountNumber}',updated_by='${userId}'
            WHERE userId='${userId}'`;
            const result = await db.query(updateBankDetails, [userId, bankName, userName, ifscCode, accountNumber]);
            if (result.affectedRows > 0) {
                return res.status(200).json({ data: result, status: true, message: "Bank Details updated Successfully" });
            }
        } else {
            const addUpdateQuery = `INSERT INTO bankdetails (userId, bankName, userName, ifscCode, accountNumber,created_by) 
                VALUES('${userId}','${bankName}','${userName}','${ifscCode}','${accountNumber}','${userId}')`;
            const data = await db.query(addUpdateQuery, [userId, bankName, userName, ifscCode, accountNumber]);
            if (data.insertId > 0) {
                return res.status(200).json({ data: data, status: true, message: "Bank Details Added Successfully" });
            } else {
                return res.status(404).json({ message: 'Bank Details cannot be added', status: false });
            }
        }
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false });
    }
}
// Get Bank Details of user
export const getBankDetails = async (req, res) => {
    try {
        const { userId } = req.body
        const getBankQuery = `SELECT bankName,userName,accountNumber,ifscCode from bankdetails 
        WHERE userId='${userId}'`
        const result = await db.query(getBankQuery)
        if (result.length > 0) {
            return res.status(200).json({ data: result, staus: true })
        }
    } catch {
        return res.status(500).json({ data: 'No result', staus: false })

    }
}