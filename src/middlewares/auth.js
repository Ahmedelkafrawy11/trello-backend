
import jwt from 'jsonwebtoken';


export const auth = async (req, res, next) => {
    let token = req.header('token')
    console.log(token)

    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {

        if (err) {
            res.json({ message: 'Token is not valid' })
        } else {

            req.decoded = decoded;

            next()
        }
    })
};
