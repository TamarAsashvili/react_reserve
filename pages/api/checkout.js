import Stripe from 'stripe'
import uuidv4 from 'uuid/v4'
import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import Order from '../../models/Order'
import calculateCartTotal from '../../utils/calculateCartTotal';


const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


export default async (req, res) => {
    const { paymentData } = req.body
    try {
        // 1. Verify and get user id from token
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)


        // 2. Find the acrt based on user id, populate it
        const cart = Cart.findOne({ user: userId }).populate({
            path: "products.product",
            model: "product"

        })


        // 3. Calculate cart totals again from cart products
        const { cartTotal, stripeTotal } = calculateCartTotal(cart.products)


        //4. Get email from payment data, and see if email linked whith existeng stripe customer
        const prevCustomer = await stripe.customers.list({
            email: paymentData.email,
            limit: 1

        })
        const isExistingCustomer = prevCustomer.data.length > 0;

        // 5. if not existeng costumer, create them base on their email
        let newCustomer;
        if (!isExistingCustomer) {
            newCustomer = await stripe.customers.create({
                email: paymentData.email,
                source: paymentData.id
            })
        }

        const customer = (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;
        // 6. Create charge with total, send reseipt email
        const charge = await stripe.charges.create({
            currency: "usd",
            amount: stripeTotal,
            receipt_email: paymentData.email,
            customer,
            description: `Checkout | ${paymentData.email} | ${paymentData.id}`
        }, {
            idempotency_key: uuidv4()
        })


        // 7. add order data to database



        // 8. Clear products in cart



        // 9. send back success (200 ) response




    } catch (error) {
        res.status(500).send('error processing charge')
    }
}








