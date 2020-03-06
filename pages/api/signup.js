import User from '../../models/User';
import connectDb from '../../utils/connectDb';

connectDb()

export default async (req, res) => {
    const { name, email, password } = req.body
    try {
        //1 check if user already exists in database

    } catch {

    }

}
