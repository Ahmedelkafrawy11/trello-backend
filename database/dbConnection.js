import mongoose from 'mongoose';
export function Connection() {
    mongoose.connect(process.env.DB_CONNECTION).then(() => {
        console.log('database connected successfully')
    }).catch((err) => {
        console.log('database error', err)
    })
} 
