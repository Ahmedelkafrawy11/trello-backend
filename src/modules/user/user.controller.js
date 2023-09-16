import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { userModel } from '../../../models/user.model.js';

import { sendEmail2 } from '../../../email/mail.js';
import { forget } from '../../../email/mail.js';


export const signUp = async (req, res) => {
    const { userName, email, password, age, gender, phone } = req.body;
    let user = await userModel.findOne({ email })
    if (!user) {
        let hash = bcrypt.hash(password, 8, async function (err, hash) {
            await userModel.insertMany({
                userName, email, password: hash, confirmPassword: hash
                , age, gender, phone
            })
            sendEmail2({ email })
            res.json({ message: "user Added successfully" })
        })

    } else {
        res.json({ message: "user already exists with this email" })
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email })
    if (user && bcrypt.compare(password, user.password)
    ) {
        if (user.isDeleted === true) {
            res.json({ message: "User is not found, please sign up" });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_KEY)
            await userModel.findOneAndUpdate({ email }, { isOnline: true })

            res.json({ message: "log in successfully", token })
        }



    } else {
        res.json({ message: "email or password is incorrect please check" })
    }
}

export const verifyEmail = async (req, res) => {
    const { token } = req.params;
    jwt.verify(token, process.env.JWT_KEY2, async (err, decoded) => {
        if (err) {
            return res.json({ message: "error in token", err })
        } else {
            await userModel.findOneAndUpdate({ email: decoded.email }, { isVerified: true })
            res.json({ message: "verified" })
        }
    })

}

export const existEmail = async (req, res) => {
    const { email } = req.body;
    let user = await userModel.findOne({ email })
    if (!user || user.isVerified == false) {
        res.json({ message: "user doesn't exist with this email or he is not verified while sign up" })
    } else {
        forget({ email })

        res.json({ message: "user existed" })
    }
}

export const forgetPassword = async (req, res) => {
    const { email, newpassword, confirmpassword } = req.body;
    const { token } = req.params;
    jwt.verify(token, process.env.JWT_KEY2, async (err, decoded) => {
        if (err) {
            return res.json({ message: "error in token", err })
        } else {
            let hash = await bcrypt.hash(newpassword + confirmpassword, 8)
            await userModel.findOneAndUpdate({ email: decoded.email }, { password: hash, confirmpassword: hash })
            res.json({ message: "password changed" })
        }
    })
}







export const updateUser = async (req, res) => {
    const { userName, email, age, phone } = req.body;

    let userId = req.decoded.id;
    console.log(req.decoded.id)
    console.log(userId)
    const user = await userModel.findById(userId);
    if (!user) {
        res.json({ message: "user not found" })
    }
    else if (user.isOnline === false) {
        res.json({ message: "User is offline, please log in" });
    } else if (user.isDeleted === true) {
        res.json({ message: "User is not found, please sign up" });
    } else {
        console.log(userName, email, age, phone)
        await userModel.findOneAndUpdate({ _id: userId }, { userName, email, age, phone });

        res.json({ message: "User updated successfully" });
    }

};

export const deleteUser = async (req, res) => {

    let userId = req.decoded.id;

    const user = await userModel.findById(userId);

    if (!user) {
        res.json({ message: "User not found" });
    } else if (user.isDeleted === true) {
        res.json({ message: "User is deleted before" });
    } else {
        await userModel.findOneAndDelete({ _id: userId });
        res.json({ message: "User deleted successfully" });
    }

}

export const changePassword = async (req, res) => {
    const { oldpassword, newpassword, confirmpassword } = req.body

    let userId = req.decoded.id;
    let user = await userModel.findById(userId)
    if (user) {
        console.log(user)
        console.log(oldpassword)
        console.log(await bcrypt.compare(oldpassword, user.password))
        if (user.isOnline == false) {
            res.json({ message: "user is offline please sign in to change password" })
        } else if (user.isDeleted == true) {
            res.json({ message: "user doesn't exist cause it deleted before" })
        } else if (!await bcrypt.compare(oldpassword, user.password)) {
            res.json({ message: "user not found ." })
        } else if (newpassword != confirmpassword) {
            res.json({ message: "confirm password doesn't match the new password" })
        }
        else {
            let hash = await bcrypt.hash(newpassword, 8)
            await userModel.findOneAndUpdate({ _id: userId }, { oldpassword: user.password, password: hash, confirmpassword: hash })
            res.json({ message: "password changed successfully" })
        }
    } else {

        res.json({ message: "user not found....." })
    }
}

export const softDelete = async (req, res) => {

    let userId = req.decoded.id;
    let user = await userModel.findById(userId)
    if (user) {
        if (user.isOnline == false) {
            res.json({ message: "user is offline please sign in " })
        } else if (user.isDeleted == true) {
            res.json({ message: "user doesn't exist cause it deleted before" })
        } else {
            await userModel.findOneAndUpdate({ _id: userId }, { isDeleted: true })
            res.json({ message: "user is deleted successfully" })
        }
    } else {
        res.json({ message: "user not found" })
    }
}

export const logOut = async (req, res) => {

    let userId = req.decoded.id;
    let user = await userModel.findById(userId)
    if (user) {
        if (user.isOnline == false) {
            res.json({ message: "user is already offline " })
        } else if (user.isDeleted == true) {
            res.json({ message: "user doesn't exist cause it deleted before" })
        } else {
            await userModel.findOneAndUpdate({ _id: userId }, { isOnline: false })
            res.json({ message: "user is logged out successfully" })
        }
    } else {
        res.json({ message: "user not found" })
    }
}

export const addPhoto = async (req, res, next) => {
    const id = req.params.id
    // req.body.profile = req.file.filename

    const fileName = req.file.filename
    // let user = await userModel.findById(id)
    let user = await userModel.findByIdAndUpdate(id, { profile: fileName }, { new: true })
    if (user) {
        res.json({ message: 'added profile picture successfully' })
    } else {
        res.json({ message: "user not found" })
    }

}
export const addArrOfCover = async (req, res, next) => {
    const id = req.params.id
    const fileName = req.files.map((file) => {
        return file.filename
    })
    let user = await userModel.findByIdAndUpdate(id, { cover: fileName }, { new: true })
    if (user) {
        res.json({ message: 'added cover pictures successfully' })
    } else {
        res.json({ message: "user not found" })
    }
}



