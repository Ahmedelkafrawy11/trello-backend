import mongoose from 'mongoose';
export const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    phone: {
        type: String
    },
    profile: {
        type: String,
        required: true

    },
    cover: [{
        type: String
    }]
});

export const userModel = mongoose.model('user', userSchema)
