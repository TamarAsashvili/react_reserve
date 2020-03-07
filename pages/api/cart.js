import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
    if (!("authorization" in req.headers)) {
        return res.status(401).send('No autorization token')
    }
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        await Cart.findOne({ user: userId })
    } catch (error) {

    }
}





