import User from '../../models/User';
import connectDb from '../../utils/connectDb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


connectDb()

export default async (req, res) => {
    const { email, password } = req.body
    try {
        //1 check to see if user exists
        const user = await User.findOne({ email }).select('+password')
        //2 if not, return error
        if (!user) {
            return res.status(404).send('No User exists with that email')
        }

        //3 check to see if users password is matches to the one in DB
        const passwordMatch = await bcrypt.compare(password, user.password)
        //4 --if so, generate token
        if (passwordMatch) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

            //5 send that token to the client
            res.status(200).json(token)
        } else {
            res.status(401).send('Password do not match')
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Error logging in user ')
    }

}
