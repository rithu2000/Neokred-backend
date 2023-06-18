import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt.js';
import { userModel } from '../model/userModel.js'

export async function registerUser(req, res) {
    try {
        const { fullName, emailAddress, password, confirmPassword, dateOfBirth, phoneNumber, address, city, state, zipCode, country, securityAnswer } = req.body
        const existingUser = await userModel.findOne({ emailAddress })
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        } else {
            if (password === confirmPassword) {

                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new userModel({
                    fullName: fullName,
                    emailAddress: emailAddress,
                    password: hashedPassword,
                    dateOfBirth: dateOfBirth,
                    phoneNumber: phoneNumber,
                    address: address,
                    city: city,
                    state: state,
                    zipCode: zipCode,
                    country: country,
                    securityAnswer: securityAnswer,
                });
                const validationError = newUser.validateSync();
                if (validationError) {
                    throw new Error(validationError.message);
                }
                await newUser.save();
                res.status(200).json({ message: 'User registered successfully' });
            } else {
                return res.status(400).json({ message: 'Password mismatch' });
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function loginUser(req, res) {
    try {
        const { emailAddress, password } = req.body;
        const user = await userModel.findOne({ emailAddress });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = generateToken(user._id);
        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
}

export async function userProfile(req, res) {
    try {
        const { userId } = req.user;
        const user = await userModel.findOne({ _id: userId })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: 'page not found' })
    }
}

export function Auth(req, res) {
    res.json({ message: "yes", status: true })
}