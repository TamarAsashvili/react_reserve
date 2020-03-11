// import Order from '../../models/Order'
// import jwt from 'jsonwebtoken'


// export default async (req, res) => {
//     try {
//         const { userId } = jwt.verify(req.headers.autorization, process.env.JWT_SECRET)
//         const orders = await Order.find({ user: userId }).populate({
//             path: 'products.product',
//             model: "Product"
//         })
//         res.status(200).json({ orders })
//     } catch (error) {
//         console.error(error)

//         res.status(403).send('please login again')
//     }
// }