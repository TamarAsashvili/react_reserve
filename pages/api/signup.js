import User from '../../models/User';
import connectDb from '../../utils/connectDb';
import Cart from '../../models/Cart';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

connectDb()

export default async (req, res) => {
    const { name, email, password } = req.body
    try {
        //0 validator name/ email / password values
        if (!isLength(name, { min: 2, max: 12 })) {
            return res.status(422).send("Name must be 2-12 charachters long")
        } else if (!isLength(password, { min: 8 })) {
            return res.status(422).send("Password must be at least 8 charachters")
        } else if (!isEmail(email)) {
            return res.status(422).send("Email must be valid")
        }

        //1 check if user already exists in database
        const user = await User.findOne({ email })
        if (user) {
            return res.status(422).send(`User already exists with email ${email}`)
        }
        //2 if not, hash the password
        const hash = await bcrypt.hash(password, 10)
        //3 create user
        const newUser = await new User({
            name, email, password: hash
        }).save()
        console.log({ newUser })
        //4 create token for the new user you can change token to 7d or moor
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        //5 create cart for new user
        await new Cart({ user: newUser._id }).save();

        //6 send back the token
        res.status(201).json(token)


    } catch (error) {
        console.error(error)
        res.status(500).send("Error signup user. Plese try again later")
    }

}
