import nodemailer from 'nodemailer'
import { htmlCode } from './html.js';
import jwt from 'jsonwebtoken';
import { forgetMessage } from './message.js';
export const sendEmail2 = async (options) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'kafrawy320@gmail.com',
            pass: 'tsvtgclrycivakwr'
        }
    })
    const token = jwt.sign({ email: options.email }, process.env.JWT_KEY2)
    const info = await transporter.sendMail({
        from: '"ahmed elkafrawy"<kafrawy320@gmail.com>',
        to: options.email,
        subject: "hello Ahmed",
        html: htmlCode(`http://localhost:3000/verify/${token}`)
    })
    console.log("message sent", info);
};
export const forget = async (options) => {
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'kafrawy320@gmail.com',
            pass: 'tsvtgclrycivakwr'
        }
    })
    const token = jwt.sign({ email: options.email }, process.env.JWT_KEY2)
    const info = await transporter.sendMail({
        from: '"ahmed elkafrawy"<kafrawy320@gmail.com>',
        to: options.email,
        subject: "hello Ahmed",
        html: forgetMessage(`http://localhost:3000/forgetPassword/${token}`)
    })
    console.log("message sent", info);
};

