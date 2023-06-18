import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        maxlength: 50,
        match: /^[A-Za-z\s]+$/,
    },
    emailAddress: {
        type: String,
        required: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (value) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
            },
            message: 'Password must contain at least 8 characters with at least one uppercase letter and one digit.',
        },
    },
    dateOfBirth: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return !isNaN(value);
            },
            message: 'Invalid date of birth.',
        },
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^\d{10}$/,
    },
    address: {
        type: String,
        required: true,
        maxlength: 100,
    },
    city: {
        type: String,
        required: true,
        maxlength: 50,
        match: /^[A-Za-z\s]+$/,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
        match: /^\d{6}$/,
    },
    country: {
        type: String,
        required: true,
    },
    securityAnswer: {
        type: String,
        required: true,
        maxlength: 100,
    },
});

export const userModel = mongoose.model('User', userSchema);